import { Button } from "@/components/ui/button";
import { Mountain } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col h-screen w-full">
      <Image
        src="https://picsum.photos/seed/mountain-bg/1920/1080"
        alt="Mountain background"
        fill
        className="object-cover -z-10"
        data-ai-hint="mountain landscape"
      />
      <div className="absolute inset-0 bg-black/30 -z-10"></div>
      
      <header className="p-4 sm:p-6">
        <div className="container mx-auto flex justify-between items-center">
           <Link href="/" className="flex items-center gap-2 text-white">
            <div className="bg-white/20 p-2 rounded-lg">
              <Mountain className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold font-headline">GeoNova</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium text-white/80 hover:text-white transition">About</Link>
            <Button asChild variant="secondary" size="sm">
                <Link href="/login">Login</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tighter leading-tight animate-fade-in-up">
          Guardians of the Slopes
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/80 animate-fade-in-up animation-delay-300">
          Leveraging AI and real-time data to predict, monitor, and mitigate landslide risks in the Uttarakhand region.
        </p>
        <div className="mt-8 animate-fade-in-up animation-delay-600">
          <Button asChild size="lg" className="bg-white text-emerald-700 hover:bg-white/90">
            <Link href="/login">Get Started</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
