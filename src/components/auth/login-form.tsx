
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Loader2, Lock, User, Mountain, Mail, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { useAuth } from "@/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  AuthError,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import { cn } from "@/lib/utils";


type AuthState = 'signIn' | 'signUp' | 'forgotPassword';

export function LoginForm() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  
  const [authState, setAuthState] = useState<AuthState>('signIn');
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const isSigningUp = authState === 'signUp';

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setResetSent(false);

    try {
        await sendPasswordResetEmail(auth, email);
        setResetSent(true);
        toast({
            title: "Password Reset Email Sent",
            description: "Check your inbox for a link to reset your password.",
        });
    } catch (err: any) {
        const authError = err as AuthError;
        setError(authError.message || "Failed to send reset email.");
    }
    setIsLoading(false);
  }

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
        await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
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
  

  return (
    <div className="w-full max-w-md animate-fade-in-up">
      <div className="glass-card rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 text-white">
            { authState === 'forgotPassword' ? (
                <div className="mb-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-white mb-4">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <Lock className="h-6 w-6" />
                        </div>
                        <h2 className="text-xl font-bold font-headline">Forgot Password</h2>
                    </div>
                    <p className="text-sm text-white/70">Enter your email to receive a reset link.</p>
                </div>
            ) : (
                <div className="mb-6 text-center">
                    <Link href="/" className="flex items-center justify-center gap-2 text-white mb-4">
                    <div className="bg-white/20 p-2 rounded-lg">
                        <Mountain className="h-6 w-6" />
                    </div>
                    <span className="text-xl font-bold font-headline">GeoNova</span>
                    </Link>
                    <div className="inline-flex rounded-full bg-black/20 p-1">
                        <Button 
                            onClick={() => setAuthState('signIn')}
                            variant="ghost"
                            type="button"
                            className={cn(
                                "rounded-full px-6 py-1 text-sm font-semibold hover:bg-primary/90",
                                authState === 'signIn' ? "bg-primary text-primary-foreground" : "text-white/70 hover:text-white"
                            )}
                        >Sign In</Button>
                        <Button 
                            onClick={() => setAuthState('signUp')}
                            variant="ghost"
                            type="button"
                            className={cn(
                                "rounded-full px-6 py-1 text-sm font-semibold hover:bg-primary/90",
                                authState === 'signUp' ? "bg-primary text-primary-foreground" : "text-white/70 hover:text-white"
                            )}
                        >Sign Up</Button>
                    </div>
                </div>
            )}
        
          { authState === 'forgotPassword' ? (
             <form onSubmit={handlePasswordReset} className="space-y-4">
                 {resetSent ? (
                     <div className="text-center p-4 rounded-lg bg-green-500/20 text-green-200">
                        <p>A password reset link has been sent to your email address. Please check your inbox.</p>
                    </div>
                 ) : (
                    <>
                        <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
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
                        {error && (
                            <p className="text-sm font-medium text-red-400 text-center">{error}</p>
                        )}
                        <Button 
                            type="submit" 
                            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base font-bold h-12 transition-all duration-300 transform hover:scale-105" 
                            disabled={isLoading}
                        >
                        {isLoading ? <Loader2 className="animate-spin" /> : 'Send Reset Link'}
                        </Button>
                    </>
                 )}
                <Button variant="link" className="text-white/70 hover:text-white w-full" onClick={() => { setAuthState('signIn'); setError(''); setResetSent(false); }} type="button">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Sign In
                </Button>
             </form>
          ) : (
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

                {!isSigningUp && (
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                        <Checkbox 
                            id="remember-me"
                            checked={rememberMe}
                            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                            className="border-white/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary"/>
                        <Label htmlFor="remember-me" className="text-white/80 font-normal">Remember me</Label>
                    </div>
                    <button type="button" onClick={() => setAuthState('forgotPassword')} className="text-white/80 hover:text-white hover:underline">
                        Forgot password?
                    </button>
                </div>
                )}

                <Button 
                    type="submit" 
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full text-base font-bold h-12 transition-all duration-300 transform hover:scale-105" 
                    disabled={isLoading}
                >
                {isLoading ? <Loader2 className="animate-spin" /> : (isSigningUp ? 'Create Account' : 'Sign In')}
                </Button>

            </form>
          )}
        </div>
      </div>
       {authState === 'signIn' && (
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

    
    