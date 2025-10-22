"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const demoUsers = {
  "demo@geonova.com": "demo123",
  "admin@geonova.com": "admin123",
  "test@geonova.com": "test123",
};

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (demoUsers[email as keyof typeof demoUsers] === password) {
        toast({
          title: "Login Successful",
          description: "Welcome back! Redirecting to your dashboard.",
        });
        router.push("/dashboard");
      } else {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md shadow-2xl animate-fade-in-up backdrop-blur-sm bg-white/90">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-center">
          Welcome to GeoNova
        </CardTitle>
        <CardDescription className="text-center">
          Enter your credentials to access your dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="demo@geonova.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="demo123"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          {error && (
            <p className="text-sm font-medium text-destructive">{error}</p>
          )}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : "Sign In"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Demo Credentials</AlertTitle>
          <AlertDescription>
            Use <span className="font-semibold">demo@geonova.com</span> and password{" "}
            <span className="font-semibold">demo123</span>.
          </AlertDescription>
        </Alert>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <a href="#" className="font-medium text-primary hover:underline">
            Sign Up
          </a>
        </p>
      </CardFooter>
    </Card>
  );
}
