
import { Button } from "@/components/ui/button";
import { BarChart, Map, Mountain, Siren, FileText, Users, Mail, Twitter, Linkedin, Github, MoveDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const features = [
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "Real-time Risk Assessment",
    description: "Get instant landslide risk analysis for any location in the monitored region using real-time data.",
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
           <Image
            src="https://picsum.photos/seed/green-mountains/1920/1080"
            alt="Mountain background"
            fill
            className="object-cover -z-10"
            data-ai-hint="green mountains"
          />
          <div className="absolute inset-0 bg-black/30 -z-10"></div>
          
          <header className="absolute top-0 w-full p-4 sm:p-6 z-50">
            <div className="container mx-auto flex justify-between items-center">
              <Link href="/" className="flex items-center gap-2">
                <Mountain className="h-7 w-7 text-white" />
                <span className="text-2xl font-bold font-headline text-white">GeoNova</span>
              </Link>
              <nav className="flex items-center gap-2">
                <Button asChild variant="ghost" size="sm" className="text-white hover:bg-white/10 hover:text-white">
                  <a href="#about">About</a>
                </Button>

                <Button asChild variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                    <Link href="/login">Login</Link>
                </Button>
              </nav>
            </div>
          </header>
          
          <div className="relative z-10 px-4">
            <h1 className="text-4xl md:text-8xl font-bold font-headline tracking-tighter leading-tight animate-fade-in-up bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              Predicting the Unstable Earth
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-white/80 animate-fade-in-up animation-delay-300 text-center">
              Forecasting and mitigating landslide risks to protect communities in the Uttarakhand region.
            </p>
            <div className="mt-8 animate-fade-in-up animation-delay-600">
              <Button asChild size="lg" className="rounded-full shadow-lg transition-transform transform hover:scale-105 active:scale-95 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/login">Get Started</Link>
              </Button>
            </div>
          </div>
          <a href="#features" className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-10" aria-label="Scroll to features">
              <MoveDown className="h-8 w-8 text-white/70" />
          </a>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-transparent">
            <div className="container mx-auto px-4 animate-fade-in-up">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline text-white">Key Features</h2>
                    <p className="text-white/70 mt-2 max-w-2xl mx-auto">Our platform provides a comprehensive suite of tools to monitor and mitigate landslide risks.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="text-center p-8 rounded-2xl glass-card text-white">
                            <div className="flex justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                            <p className="text-white/80">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        
        {/* About Section */}
        <section id="about" className="py-20 bg-transparent">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center animate-fade-in-up">
                <div className="glass-card rounded-2xl p-8 text-white h-80 flex flex-col justify-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">About GeoNova</h2>
                    <p className="text-sm text-white/80">
                        GeoNova Landslide Guardian is a data-driven application built to monitor, assess, and reduce the risks of landslides, with a focus on the vulnerable terrain of Uttarakhand, India. It empowers local residents, policymakers, and researchers to stay informed and make proactive safety decisions.
                    </p>
                </div>
                <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
                   <Image
                    src="https://picsum.photos/seed/landslide/800/600"
                    alt="Image of a landslide"
                    fill
                    className="object-cover"
                    data-ai-hint="landslide"
                    />
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-background/80 backdrop-blur-sm border-t border-border/50 py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center items-center gap-2">
              <Mountain className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold font-headline">GeoNova</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-2 mb-4">Built by The GeoNova Team: Neeraj Kumar , Mohan Ingale, Lakshay Meena</p>
            <p className="max-w-xl mx-auto text-muted-foreground mb-8">
              Stay connected with our mission to safeguard communities through technology and data.
            </p>
            <div className="flex justify-center gap-6 mb-8">
                <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin className="h-6 w-6" /></a>
                <a href="mailto:your-email@example.com" className="text-muted-foreground hover:text-primary transition-colors"><Mail className="h-6 w-6" /></a>
            </div>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>For any help or inquiries, feel free to contact us.</p>
              <p>&copy; {new Date().getFullYear()} GeoNova. All rights reserved.</p>
            </div>
          </div>
      </footer>
    </div>
  );
}
