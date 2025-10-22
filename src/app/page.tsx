
import { Button } from "@/components/ui/button";
import { BarChart, Map, MoveDown, Mountain, Siren } from "lucide-react";
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

const features = [
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "Real-time Risk Assessment",
    description: "Get instant, AI-powered landslide risk analysis for any location in the monitored region using real-time data.",
  },
  {
    icon: <Map className="h-10 w-10 text-primary" />,
    title: "Interactive Susceptibility Map",
    description: "Explore a dynamic map that visualizes landslide susceptibility zones based on geological and environmental factors.",
  },
  {
    icon: <Siren className="h-10 w-10 text-primary" />,
    title: "Early Warning System",
    description: "Receive timely alerts and notifications for high-risk areas, allowing for proactive safety measures and evacuation.",
  },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center h-screen overflow-hidden">
          
          <header className="absolute top-0 w-full p-4 sm:p-6 z-50">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2">
                <Mountain className="h-7 w-7 text-white" />
                <span className="text-2xl font-bold font-headline text-white">GeoNova</span>
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
                        GeoNova Landslide Guardian is an intelligent, data-driven application built to monitor, assess, and reduce the risks of landslides—specifically focused on the vulnerable terrain of Uttarakhand, India. By combining real-time data analysis with advanced AI models, the platform empowers users to stay informed and make proactive decisions. Whether you're a local resident, a policymaker, or a researcher, GeoNova offers critical tools such as GPS-based risk assessments, an interactive susceptibility map, early warning systems, and crowdsourced reporting features. It also includes an AI-generated news feed, and a comprehensive dashboard filled with live statistics on vegetation, rainfall, and historical alerts. Designed for both awareness and action, GeoNova Landslide Guardian is your companion in navigating and mitigating landslide threats.
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
          
          <Image
            src="https://picsum.photos/seed/green-mountains/1920/1080"
            alt="Hero background"
            fill
            className="object-cover -z-10"
            data-ai-hint="green mountains"
          />
          <div className="absolute inset-0 bg-black/50 -z-10"></div>

          <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-8xl font-bold font-headline tracking-tighter leading-tight animate-fade-in-up bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              Guardians of the Slopes
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground animate-fade-in-up animation-delay-300">
              Leveraging AI and real-time data to predict, monitor, and mitigate landslide risks in the Uttarakhand region.
            </p>
            <div className="mt-8 animate-fade-in-up animation-delay-600">
              <Button asChild size="lg" className="rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/login">Get Started</Link>
              </Button>
            </div>
             <div className="absolute bottom-16 left-1/2 -translate-x-1/2 animate-bounce mt-8">
              <MoveDown className="h-8 w-8 text-muted-foreground/70" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline">Key Features</h2>
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">Our platform provides a comprehensive suite of tools to monitor and mitigate landslide risks.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center p-8 rounded-lg bg-card border border-border/50">
                            <div className="flex justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border/50 py-8">
          <div className="container mx-auto px-4 text-center text-muted-foreground">
              <p className="mb-2">Built by the GeoNova Team</p>
              <p className="text-sm">&copy; {new Date().getFullYear()} GeoNova. All rights reserved.</p>
          </div>
      </footer>
    </div>
  );
}
