"use client";
import { PortfolioCard, SortDropdown } from "@/components/homepage";
import { useEffect, useState } from "react";

export function PortfolioGallery() {
  const likeAmount = 1;
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-[1600px] mx-auto z-10 w-full mt-12 px-4">
      <div className="flex flex-row justify-between mb-5">
        <SortDropdown />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {items.map((item, index) => (
          <PortfolioCard key={index} likeAmount={likeAmount} index={index} />
        ))}
      </div>
    </div>
  );
}
