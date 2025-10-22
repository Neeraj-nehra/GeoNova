import { LoginForm } from "@/components/auth/login-form";
import { Mountain } from "lucide-react";

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-br from-emerald-500 to-teal-600 p-4">
      <div className="flex items-center gap-4 mb-8 text-white">
        <div className="bg-white/20 p-3 rounded-full">
          <Mountain className="h-10 w-10 text-white" />
        </div>
        <div>
          <h1 className="text-5xl font-bold font-headline tracking-tighter">
            GeoNova
          </h1>
          <p className="text-emerald-100">Landslide Guardian</p>
        </div>
      </div>

      <LoginForm />
    </main>
  );
}
