"use client";

import { Logo } from "@/components/global";
import { LoadingSpinner } from "@/components/util";

export function Loading({ mounted }: { mounted: boolean }) {
  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center mr-8">
        <Logo size={75} />
        <span className="text-foreground text-4xl pb-1">foliarc.</span>
      </div>
      {mounted && <LoadingSpinner mounted={mounted} />}
    </div>
  );
}
