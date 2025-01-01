"use client";
import { Logo } from "@/components/global";

export function ErrorMessage({ error }: { error: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center mr-8">
        <Logo size={75} />
        <span className="text-foreground text-4xl pb-1">foliarc.</span>
      </div>
      <p className="text-red-500">{error}</p>
    </div>
  );
}
