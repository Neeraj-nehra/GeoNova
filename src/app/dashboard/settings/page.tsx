import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { User, Bell, Database, Cog } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="animate-fade-in-up space-y-8">
      <PageHeader title="Settings" />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <User className="h-6 w-6 text-primary" />
            <CardTitle>User Profile</CardTitle>
          </div>
          <CardDescription>Manage your personal information and password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="Demo User" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="demo@geonova.com" disabled />
            </div>
          </div>
          <Button>Update Profile</Button>
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
