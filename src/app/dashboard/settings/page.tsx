
'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { User as UserIcon, Bell, Database, Cog, Loader2, UploadCloud } from "lucide-react";
import { useFirestore, useStorage, useUser, useCollection, useMemoFirebase } from "@/firebase";
import { useEffect, useRef, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { updateProfile } from "firebase/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, query, where } from "firebase/firestore";
import type { WithId } from "@/firebase/firestore/use-collection";

const profileFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email(),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

export default function SettingsPage() {
  const { user, isUserLoading } = useUser();
  const storage = useStorage();
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const reportsQuery = useMemoFirebase(() => 
    firestore && user ? query(collection(firestore, "landslidePoints"), where("userId", "==", user.uid)) : null, 
  [firestore, user]);
  const { data: userReports } = useCollection(reportsQuery);

  const alertsQuery = useMemoFirebase(() => 
    firestore ? collection(firestore, "alerts") : null,
  [firestore]);
  const { data: historicalAlerts } = useCollection(alertsQuery);


  useEffect(() => {
    if (user) {
      form.reset({
        name: user.displayName || "",
        email: user.email || "",
      });
    }
  }, [user, form]);
  
  const onProfileUpdate = async (data: ProfileFormData) => {
    if (!user) return;

    try {
      await updateProfile(user, { displayName: data.name });
      toast({
        title: "Profile Updated",
        description: "Your name has been successfully updated.",
      });
    } catch(error: any) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error.message,
      });
    }
  };
  
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user || !storage) return;

    setIsUploading(true);
    try {
      const storageRef = ref(storage, `avatars/${user.uid}/${file.name}`);
      const uploadResult = await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(uploadResult.ref);
      await updateProfile(user, { photoURL });
      toast({
        title: "Avatar Updated",
        description: "Your new profile picture has been saved.",
      });
    } catch(error: any) {
       toast({
        variant: "destructive",
        title: "Upload Failed",
        description: error.message,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const downloadFile = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const exportReportsToCSV = () => {
    if (!userReports || userReports.length === 0) {
      toast({
        variant: "destructive",
        title: "No Reports",
        description: "You have not submitted any reports yet.",
      });
      return;
    }
    const headers = ["ID", "Latitude", "Longitude", "Description", "Severity", "Source", "Photo URL", "Created At"];
    const csvRows = [
      headers.join(','),
      ...userReports.map(report => [
        report.id,
        report.locationLatitude,
        report.locationLongitude,
        `"${report.description?.replace(/"/g, '""')}"`,
        report.severity,
        report.source,
        report.photoUrl,
        report.createdAt?.toDate().toISOString() || ''
      ].join(','))
    ];
    downloadFile("my_submitted_reports.csv", csvRows.join('\n'), "text/csv;charset=utf-8;");
  };

  const exportAlertsToJSON = () => {
    if (!historicalAlerts || historicalAlerts.length === 0) {
      toast({
        variant: "destructive",
        title: "No Alerts",
        description: "There are no historical warnings to export.",
      });
      return;
    }
    const jsonContent = JSON.stringify(historicalAlerts.map(alert => ({
        ...alert,
        createdAt: alert.createdAt?.toDate().toISOString() || null
    })), null, 2);
    downloadFile("historical_warnings.json", jsonContent, "application/json;charset=utf-8;");
  };


  return (
    <div className="animate-fade-in-up space-y-8">
      <PageHeader title="Settings" />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <UserIcon className="h-6 w-6 text-primary" />
            <CardTitle>User Profile</CardTitle>
          </div>
          <CardDescription>Manage your personal information and password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.photoURL ?? undefined} />
                <AvatarFallback>
                  <UserIcon className="h-10 w-10" />
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                onClick={handleAvatarClick}
                disabled={isUploading}
              >
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
                <span className="sr-only">Upload new avatar</span>
              </Button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/png, image/jpeg"
              />
            </div>
             <p className="text-sm text-muted-foreground">Click the icon to upload a new avatar.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onProfileUpdate)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={form.formState.isSubmitting || isUserLoading} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
              </div>
              <Button type="submit" disabled={form.formState.isSubmitting || isUserLoading}>
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Update Profile
              </Button>
            </form>
          </Form>
          
          <Separator className="my-6" />
          <h3 className="text-lg font-medium">Change Password</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
          </div>
          <Button variant="secondary">Change Password</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Bell className="h-6 w-6 text-primary" />
            <CardTitle>Notification Settings</CardTitle>
          </div>
          <CardDescription>Choose how you receive alerts and updates.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive alerts for high-risk events via email.</p>
            </div>
            <Switch defaultChecked />
          </div>
           <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">SMS Notifications</p>
              <p className="text-sm text-muted-foreground">Get critical alerts via text message (charges may apply).</p>
            </div>
            <Switch />
          </div>
           <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <p className="font-medium">Weekly Summary</p>
              <p className="text-sm text-muted-foreground">Receive a weekly report of system activity.</p>
            </div>
            <Switch defaultChecked/>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Cog className="h-6 w-6 text-primary" />
              <CardTitle>System Preferences</CardTitle>
            </div>
            <CardDescription>Customize your dashboard experience.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="language">Language</Label>
              <p className="text-sm text-muted-foreground">English</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Database className="h-6 w-6 text-primary" />
              <CardTitle>Data Export</CardTitle>
            </div>
            <CardDescription>Download your reports and historical data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full" onClick={exportReportsToCSV}>Export My Submitted Reports (CSV)</Button>
            <Button variant="outline" className="w-full" onClick={exportAlertsToJSON}>Export Historical Warnings (JSON)</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

    