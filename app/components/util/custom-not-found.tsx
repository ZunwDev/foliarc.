"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Compass } from "lucide-react";
import Link from "next/link";

export function Custom404() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background dark:to-gray-950 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-secondary dark:bg-gray-900 rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6 relative">
            <div className="animate-pulse">
              <Compass className="w-16 h-16 mx-auto text-primary" />
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h1 className="text-9xl font-black text-primary animate-in slide-in-from-top duration-500">404</h1>
            <h2 className="text-2xl font-semibold text-foreground">Lost in digital space</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Looks like you&apos;ve ventured into uncharted territory. Don&apos;t worry though – even the best explorers
              sometimes lose their way.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" passHref>
              <Button
                variant="default"
                size="lg"
                className="w-full sm:w-auto group transition-all duration-300 hover:shadow-md">
                <ArrowLeft className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Return Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Lost? No problem. Every wrong turn is just another adventure.</p>
        </div>
      </div>
    </div>
  );
}
