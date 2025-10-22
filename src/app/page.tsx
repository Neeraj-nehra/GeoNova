
import { Button } from "@/components/ui/button";
import { Mountain, MoveDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
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
      <header className="p-4 sm:p-6 sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
           <Link href="/" className="flex items-center gap-2 text-foreground">
            <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
              <Mountain className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold font-headline text-foreground">GeoNova</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm">About</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>About GeoNova</DialogTitle>
                  <DialogDescription>
                    Your companion in navigating and mitigating landslide threats.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 text-sm text-muted-foreground">
                  <p>
                    GeoNova Landslide Guardian is an intelligent, data-driven application built to monitor, assess, and reduce the risks of landslides—specifically focused on the vulnerable terrain of Uttarakhand, India. By combining real-time data analysis with advanced AI models, the platform empowers users to stay informed and make proactive decisions. Whether you're a local resident, a policymaker, or a researcher, GeoNova offers critical tools such as GPS-based risk assessments, an interactive susceptibility map, early warning systems, and crowdsourced reporting features. It also includes an AI-generated news feed and a comprehensive dashboard filled with live statistics on vegetation, rainfall, and historical alerts. Designed for both awareness and action, GeoNova Landslide Guardian is your companion in navigating and mitigating landslide threats.
                  </p>
                </div>
              </DialogContent>
            </Dialog>

            <Button asChild variant="outline" size="sm">
                <Link href="/login">Login</Link>
            </Button>
          </nav>
          <div className="md:hidden">
             <Button asChild variant="default" size="sm">
                <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 overflow-hidden">
           <Image
            src="https://picsum.photos/seed/green-mountains/1920/1080"
            alt="Mountain background"
            fill
            className="object-cover -z-10"
            data-ai-hint="green mountains"
          />
          <div className="absolute inset-0 bg-black/30 -z-10"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-7xl font-bold font-headline tracking-tighter leading-tight animate-fade-in-up bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
              Guardians of the Slopes
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-200 animate-fade-in-up animation-delay-300">
              Leveraging AI and real-time data to predict, monitor, and mitigate landslide risks in the Uttarakhand region.
            </p>
            <div className="mt-8 animate-fade-in-up animation-delay-600">
              <Button asChild size="lg" className="rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95">
                <Link href="/login">Get Started</Link>
              </Button>
            </div>
             <div className="absolute bottom-[-8rem] left-1/2 -translate-x-1/2 animate-bounce mt-8">
              <MoveDown className="h-6 w-6 text-gray-400/70" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
