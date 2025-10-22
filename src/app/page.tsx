
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
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center h-screen overflow-hidden">
           <Image
            src="https://picsum.photos/seed/dramatic-mountains/1920/1080"
            alt="Dramatic mountain background"
            fill
            className="object-cover -z-10"
            data-ai-hint="dramatic mountains"
          />
          <div className="absolute inset-0 bg-black/50 -z-10"></div>
          
          <header className="absolute top-0 w-full p-4 sm:p-6 z-50">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2 text-white">
                <Mountain className="h-7 w-7" />
                <span className="text-2xl font-bold font-headline">GeoNova</span>
              </Link>
              <nav className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">About</Button>
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

                <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Link href="/login">Login</Link>
                </Button>
              </nav>
            </div>
          </header>

          <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-8xl font-bold font-headline tracking-tighter leading-tight animate-fade-in-up bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
              Guardians of the Slopes
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-gray-200 animate-fade-in-up animation-delay-300">
              Leveraging AI and real-time data to predict, monitor, and mitigate landslide risks in the Uttarakhand region.
            </p>
            <div className="mt-8 animate-fade-in-up animation-delay-600">
              <Button asChild size="lg" className="rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/login">Get Started</Link>
              </Button>
            </div>
             <div className="absolute bottom-[-8rem] left-1/2 -translate-x-1/2 animate-bounce mt-8">
              <MoveDown className="h-8 w-8 text-gray-400/70" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
