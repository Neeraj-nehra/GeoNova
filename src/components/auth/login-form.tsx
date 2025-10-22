
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Loader2, Lock, User, Mountain, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useAuth } from "@/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  AuthError,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { cn } from "@/lib/utils";


const GoogleIcon = () => (
  <svg className="h-5 w-5" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="currentColor"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="currentColor"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="currentColor"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);


export function LoginForm() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  
  const [isSigningUp, setIsSigningUp] = useState(false);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (isSigningUp) {
      // Handle Sign Up
      if (!username) {
        setError("Username is required for sign up.");
        setIsLoading(false);
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: username });
        toast({
          title: "Account Created",
          description: "Welcome! You're now logged in.",
        });
        router.push("/dashboard");
      } catch (err: any) {
        const authError = err as AuthError;
        setError(authError.message || "Failed to create an account.");
      }
    } else {
      // Handle Sign In
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "Login Successful",
          description: "Welcome back! Redirecting to your dashboard.",
        });
        router.push("/dashboard");
      } catch (err: any) {
        const authError = err as AuthError;
        if (authError.code === 'auth/user-not-found' || authError.code === 'auth/invalid-credential') {
          setError("Invalid credentials. Please check your email and password.");
        } else {
          setError(authError.message || "Failed to sign in.");
        }
      }
    }
    setIsLoading(false);
  };
  
  const handleGoogleSignIn = async () => {
    setIsLoadingGoogle(true);
    setError("");
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
        toast({
            title: "Signed in with Google",
            description: "Welcome! Redirecting to your dashboard.",
        });
        router.push("/dashboard");
    } catch (err: any) {
        const authError = err as AuthError;
        setError(authError.message || "Failed to sign in with Google.");
    } finally {
        setIsLoadingGoogle(false);
    }
  }

  return (
    <div className="w-full max-w-md animate-fade-in-up">
      <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 text-white">
          <div className="mb-6 text-center">
            <Link href="/" className="flex items-center justify-center gap-2 text-white mb-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <Mountain className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold font-headline">GeoNova</span>
            </Link>
             <div className="inline-flex rounded-full bg-black/20 p-1">
                <Button 
                    onClick={() => setIsSigningUp(false)}
                    variant="ghost"
                    type="button"
                    className={cn(
                        "rounded-full px-6 py-1 text-sm font-semibold hover:bg-primary/90",
                        !isSigningUp ? "bg-primary text-primary-foreground" : "text-white/70 hover:text-white"
                    )}
                >Sign In</Button>
                <Button 
                    onClick={() => setIsSigningUp(true)}
                    variant="ghost"
                    type="button"
                    className={cn(
                        "rounded-full px-6 py-1 text-sm font-semibold hover:bg-primary/90",
                        isSigningUp ? "bg-primary text-primary-foreground" : "text-white/70 hover:text-white"
                    )}
                >Sign Up</Button>
            </div>
          </div>
        
          <form onSubmit={handleSubmit} className="space-y-4">
             {isSigningUp && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="bg-black/20 border-white/20 rounded-full pl-10 text-white placeholder:text-white/50 focus:ring-offset-0 focus:ring-white/50 h-12"
                />
              </div>
            )}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                id="email"
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading || isLoadingGoogle}
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
                disabled={isLoading || isLoadingGoogle}
                className="bg-black/20 border-white/20 rounded-full pl-10 text-white placeholder:text-white/50 focus:ring-offset-0 focus:ring-white/50 h-12"
              />
            </div>
            
            {error && (
              <p className="text-sm font-medium text-red-400 text-center">{error}</p>
            )}

            {!isSigningUp && (
              <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                      <Checkbox id="remember-me" className="border-white/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"/>
                      <Label htmlFor="remember-me" className="text-white/80 font-normal">Remember me</Label>
                  </div>
                  <Link href="#" className="text-white/80 hover:text-white hover:underline">
                      Forgot password?
                  </Link>
              </div>
            )}

            <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base font-bold h-12 transition-all duration-300 transform hover:scale-105" 
                disabled={isLoading || isLoadingGoogle}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (isSigningUp ? 'Create Account' : 'Sign In')}
            </Button>

            <div className="relative flex items-center justify-center my-4">
                <div className="absolute inset-x-0 h-px bg-white/20"></div>
                <div className="relative bg-[#192b23] px-2 text-xs text-white/60">OR</div>
            </div>

            <Button 
                type="button" 
                variant="outline"
                className="w-full bg-black/20 border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full h-12 transition-all"
                disabled={isLoading || isLoadingGoogle}
                onClick={handleGoogleSignIn}
            >
              {isLoadingGoogle ? <Loader2 className="animate-spin" /> : <><GoogleIcon /> <span className="ml-2">Continue with Google</span></>}
            </Button>
            
          </form>
        </div>
      </div>
       {!isSigningUp && (
        <Alert className="mt-6 bg-black/20 border-white/20 text-white">
            <Info className="h-4 w-4 text-white/80" />
            <AlertTitle className="text-white/90">No Account?</AlertTitle>
            <AlertDescription className="text-white/70">
              Select 'Sign Up' above to create a new account.
            </AlertDescription>
        </Alert>
       )}
    </div>
  );
}

    