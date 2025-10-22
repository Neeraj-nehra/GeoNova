import { Button } from "@/components/ui/button";
import { Mountain } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 sm:p-6">
        <div className="container mx-auto flex justify-between items-center">
           <Link href="/" className="flex items-center gap-2 text-foreground">
            <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
              <Mountain className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold font-headline text-foreground">GeoNova</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">About</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-headline">About GeoNova Landslide Guardian</DialogTitle>
                  <DialogDescription className="text-left pt-4 text-muted-foreground">
                    GeoNova Landslide Guardian is an intelligent, data-driven application built to monitor, assess, and reduce the risks of landslides—specifically focused on the vulnerable terrain of Uttarakhand, India. By combining real-time data analysis with advanced AI models, the platform empowers users to stay informed and make proactive decisions. Whether you're a local resident, a policymaker, or a researcher, GeoNova offers critical tools such as GPS-based risk assessments, an interactive susceptibility map, early warning systems, and crowdsourced reporting features. It also includes an AI-generated news feed and a comprehensive dashboard filled with live statistics on vegetation, rainfall, and historical alerts. Designed for both awareness and action, GeoNova Landslide Guardian is your companion in navigating and mitigating landslide threats.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Button asChild variant="outline" size="sm">
                <Link href="/login">Login</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-7xl font-bold font-headline tracking-tighter leading-tight animate-fade-in-up">
          Guardians of the Slopes
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground animate-fade-in-up animation-delay-300">
          Leveraging AI and real-time data to predict, monitor, and mitigate landslide risks in the Uttarakhand region.
        </p>
        <div className="mt-8 animate-fade-in-up animation-delay-600">
          <Button asChild size="lg" className="rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95">
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </main>

      <footer className="p-4 text-center text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} GeoNova. All rights reserved.</p>
      </footer>
    </div>
  );
}
