
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain, Map, ShieldCheck, Siren, Send, Twitter, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";


const features = [
  {
    icon: <Map className="h-8 w-8 text-primary" />,
    title: "Interactive Susceptibility Map",
    description: "Click any location in Uttarakhand to get an instant, AI-powered landslide risk assessment for the next 7 days.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Real-time Risk Assessment",
    description: "Enter GPS coordinates to receive a detailed analysis based on vegetation, rainfall, and historical data.",
  },
  {
    icon: <Siren className="h-8 w-8 text-primary" />,
    title: "Early Warning System",
    description: "Stay informed with live warnings for high-risk zones and review a log of all historical alerts.",
  },
  {
    icon: <Send className="h-8 w-8 text-primary" />,
    title: "Crowdsourced Reporting",
    description: "Submit your own landslide observations with photos to help improve our AI model's accuracy.",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 sm:p-6 sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center">
           <Link href="/" className="flex items-center gap-2 text-foreground">
            <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
              <Mountain className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold font-headline text-foreground">GeoNova</span>
          </Link>
          <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild><Link href="#about">About</Link></Button>
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
        <section className="relative flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 overflow-hidden text-white">
           <Image
            src="https://picsum.photos/seed/hero-bg/1920/1080"
            alt="Lush green mountains"
            fill
            className="object-cover -z-10"
            data-ai-hint="mountain landscape"
          />
          <div className="absolute inset-0 bg-black/40 -z-10"></div>
          <h1 className="text-4xl md:text-7xl font-bold font-headline tracking-tighter leading-tight animate-fade-in-up">
            Guardians of the Slopes
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-200 animate-fade-in-up animation-delay-300">
            Leveraging AI and real-time data to predict, monitor, and mitigate landslide risks in the Uttarakhand region.
          </p>
          <div className="mt-8 animate-fade-in-up animation-delay-600">
            <Button asChild size="lg" className="rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95">
              <Link href="/login">Get Started</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-center mb-12">
              Our Core Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center animate-fade-in-up" style={{animationDelay: `${300 + index * 150}ms`}}>
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4 border border-primary/20">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-6">
              About GeoNova
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              GeoNova Landslide Guardian is an intelligent, data-driven application built to monitor, assess, and reduce the risks of landslides—specifically focused on the vulnerable terrain of Uttarakhand, India. By combining real-time data analysis with advanced AI models, the platform empowers users to stay informed and make proactive decisions. Whether you're a local resident, a policymaker, or a researcher, GeoNova offers critical tools such as GPS-based risk assessments, an interactive susceptibility map, early warning systems, and crowdsourced reporting features. It also includes an AI-generated news feed and a comprehensive dashboard filled with live statistics on vegetation, rainfall, and historical alerts. Designed for both awareness and action, GeoNova Landslide Guardian is your companion in navigating and mitigating landslide threats.
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-foreground text-background">
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
               <div className="flex-1">
                  <Link href="/" className="flex items-center justify-center md:justify-start gap-2 mb-4">
                      <div className="bg-background/10 p-2 rounded-lg border border-background/20">
                          <Mountain className="h-6 w-6 text-background" />
                      </div>
                      <span className="text-xl font-bold font-headline text-background">GeoNova</span>
                  </Link>
                  <p className="text-sm text-muted-foreground max-w-sm mx-auto md:mx-0">
                      Guardians of the Slopes. Built with AI to protect communities.
                  </p>
               </div>
               <div className="flex-1 flex justify-center md:justify-end">
                  <div className="space-y-4">
                    <h3 className="font-semibold tracking-wider uppercase">Connect With Us</h3>
                    <div className="flex justify-center md:justify-start gap-4">
                      <Link href="#" className="text-muted-foreground hover:text-background"><Twitter /></Link>
                      <Link href="#" className="text-muted-foreground hover:text-background"><Github /></Link>
                      <Link href="#" className="text-muted-foreground hover:text-background"><Linkedin /></Link>
                    </div>
                  </div>
               </div>
            </div>
            <div className="mt-12 pt-8 border-t border-background/20 text-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} GeoNova. Built by Firebase Studio. All rights reserved.</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
