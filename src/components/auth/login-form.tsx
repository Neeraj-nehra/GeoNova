"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Loader2, Lock, User, Mountain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

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
      // Demo login logic
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
    <div className="w-full max-w-md animate-fade-in-up">
      <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 text-white">
          <div className="mb-8 text-center">
             <div className="inline-block bg-blue-600 px-4 py-2 rounded-md mb-4">
                 <h2 className="text-2xl font-bold text-white">Login</h2>
             </div>
          </div>
        
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                id="email"
                type="email"
                placeholder="Username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="bg-black/20 border-white/20 rounded-full pl-10 text-white placeholder:text-white/50 focus:ring-offset-0 focus:ring-white/50"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="bg-black/20 border-white/20 rounded-full pl-10 text-white placeholder:text-white/50 focus:ring-offset-0 focus:ring-white/50"
              />
            </div>
            
            {error && (
              <p className="text-sm font-medium text-red-400">{error}</p>
            )}

            <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                    <Checkbox id="remember-me" className="border-white/50 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"/>
                    <Label htmlFor="remember-me" className="text-white/80 font-normal">Remember me</Label>
                </div>
                <Link href="#" className="text-white/80 hover:text-white hover:underline">
                    Forgot password
                </Link>
            </div>

            <Button 
                type="submit" 
                className="w-full bg-white text-slate-800 hover:bg-white/90 rounded-full text-base font-bold h-12" 
                disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
            
            <p className="text-center text-xs text-white/60">
              Don't have an account?{" "}
              <Link href="#" className="font-semibold text-white/80 hover:text-white hover:underline">
                Register
              </Link>
            </p>

          </form>
        </div>
      </div>
       <Alert className="mt-6 bg-black/20 border-white/20 text-white">
          <Info className="h-4 w-4 text-white/80" />
          <AlertTitle className="text-white/90">Demo Credentials</AlertTitle>
          <AlertDescription className="text-white/70">
            Use <span className="font-semibold text-white">demo@geonova.com</span> and password{" "}
            <span className="font-semibold text-white">demo123</span>.
          </AlertDescription>
        </Alert>
    </div>
  );
}
