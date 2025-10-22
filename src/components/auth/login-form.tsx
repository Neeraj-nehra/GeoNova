
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
import { useAuth } from "@/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  AuthError,
} from "firebase/auth";


export function LoginForm() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Login Successful",
        description: "Welcome back! Redirecting to your dashboard.",
      });
      router.push("/dashboard");
    } catch (err: any) {
      // If user is not found, create a new account
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
         try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast({
                title: "Account Created",
                description: "Welcome! Your new account has been created.",
            });
            router.push("/dashboard");
         } catch (signUpError: any) {
             if (signUpError.code === 'auth/email-already-in-use') {
                setError("Invalid credentials. Please check your email and password.");
             } else {
                const authError = signUpError as AuthError;
                setError(`Failed to sign up: ${authError.message}`);
             }
         }
      } else {
        const authError = err as AuthError;
        setError(`Failed to sign in: ${authError.message}`);
      }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md animate-fade-in-up">
      <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 text-white">
          <div className="mb-8 text-center">
            <Link href="/" className="flex items-center justify-center gap-2 text-white mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Mountain className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold font-headline">GeoNova</span>
            </Link>
            <h2 className="text-2xl font-bold">Login to your account</h2>
          </div>
        
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                id="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="bg-black/20 border-white/20 rounded-full pl-10 text-white placeholder:text-white/50 focus:ring-offset-0 focus:ring-white/50 h-12"
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
                className="bg-black/20 border-white/20 rounded-full pl-10 text-white placeholder:text-white/50 focus:ring-offset-0 focus:ring-white/50 h-12"
              />
            </div>
            
            {error && (
              <p className="text-sm font-medium text-red-400 text-center">{error}</p>
            )}

            <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                    <Checkbox id="remember-me" className="border-white/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"/>
                    <Label htmlFor="remember-me" className="text-white/80 font-normal">Remember me</Label>
                </div>
                <Link href="#" className="text-white/80 hover:text-white hover:underline">
                    Forgot password?
                </Link>
            </div>

            <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base font-bold h-12 transition-all duration-300 transform hover:scale-105" 
                disabled={isLoading}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : "Sign In / Sign Up"}
            </Button>
            
          </form>
        </div>
      </div>
       <Alert className="mt-6 bg-black/20 border-white/20 text-white">
          <Info className="h-4 w-4 text-white/80" />
          <AlertTitle className="text-white/90">Sign In or Sign Up</AlertTitle>
          <AlertDescription className="text-white/70">
            Enter any email and password. If the account doesn't exist, one will be created for you.
          </AlertDescription>
        </Alert>
    </div>
  );
}
