"use client";

import dynamic from "next/dynamic";
import { PageHeader } from "@/components/layout/page-header";

const InteractiveMap = dynamic(() => import('@/components/interactive-map'), {
  ssr: false,
  loading: () => <div className="aspect-[4/3] w-full rounded-lg bg-muted animate-pulse" />,
});

export default function SusceptibilityMapPage() {
  return (
    <div className="animate-fade-in-up">
      <PageHeader title="Susceptibility Map" />
      <InteractiveMap />
    </div>
  );
}
