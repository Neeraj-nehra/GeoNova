
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
import { User as UserIcon, Bell, Database, Cog, Loader2 } from "lucide-react";
import { useUser } from "@/firebase";
import { useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { updateProfile } from "firebase/auth";

const profileFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email(),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

export default function SettingsPage() {
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

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
        <CardContent className="space-y-4">
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
              <Label htmlFor="theme">Theme</Label>
              <p className="text-sm text-muted-foreground">Light (System Default)</p>
            </div>
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
            <Button variant="outline" className="w-full">Export My Submitted Reports (CSV)</Button>
            <Button variant="outline" className="w-full">Export Historical Warnings (JSON)</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
