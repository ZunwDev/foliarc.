"use client";
import { BlurBackground } from "@/components/global";
import { CreationGallery, Hero } from "@/components/homepage";

export default function Home() {
  return (
    <section className="relative flex flex-col min-h-[100dvh] py-16 bg-background overflow-hidden">
      <BlurBackground />
      <Hero />
      <CreationGallery />
    </section>
  );
}
