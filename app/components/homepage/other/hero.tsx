"use client";

import { HeroButton } from "@/components/homepage";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <div className="flex flex-col items-center text-center px-4 py-16 w-full text-foreground relative z-10 mt-40">
      <Link href="/changelog" className="mx-auto mb-10 flex w-fit items-center rounded-full bg-muted px-4 py-2 text-sm border">
        <span className="mr-1 font-semibold">What&#x27;s new</span>| Read more
        <ArrowRight className="ml-2 size-4" />
      </Link>
      <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold mb-4 !specialtext">Your Work, Your Stage</h1>
      <p className="text-sm sm:text-lg md:text-2xl text-muted-foreground my-8 max-w-4xl">
        Showcase your portfolios and projects, learn from others, and be part of a vibrant creative community.
      </p>
      <div className="flex space-x-4">
        <HeroButton />
      </div>
    </div>
  );
}
