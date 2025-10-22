import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="relative flex h-screen flex-col items-center justify-center p-4">
       <Image
        src="https://picsum.photos/seed/green-mountains/1920/1080"
        alt="Mountain background"
        fill
        className="object-cover -z-10"
        data-ai-hint="green mountains"
      />
      <div className="absolute inset-0 bg-black/30 -z-10"></div>

      <LoginForm />
    </main>
  );
}
