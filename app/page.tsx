"use client";
import Hero from "@/components/homepage/Hero";
import PortfolioGallery from "./components/homepage/PortfolioGallery";

export default function Home() {
  return (
    <section className="relative flex flex-col min-w-[360px] h-[100dvh] pt-16 bg-background">
      <div
        className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(ellipse_750px_500px_at_50%_-200px,rgba(200,250,255,0.6),transparent)]"
        style={{ filter: "blur(200px)" }}></div>

      <Hero />
      <PortfolioGallery />
    </section>
  );
}
