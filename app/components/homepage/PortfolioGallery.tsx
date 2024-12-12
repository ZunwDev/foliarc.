import { SortDropdown, ViewDropdown } from "@/components/homepage";
import PortfolioCard from "@/components/homepage/portfolio/PortfolioCard";
import { useEffect, useState } from "react";

export default function PortfolioGallery() {
  const [viewToggle, setViewToggle] = useState("compact");
  const likeAmount = 1;
  const items = [1, 2, 3, 4];

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="max-w-[1200px] mx-auto z-10 w-full mt-12">
      <div className="flex flex-row justify-between mb-5">
        <SortDropdown />
        <ViewDropdown setViewToggle={setViewToggle} />
      </div>
      {viewToggle === "list" ? (
        <div className="flex flex-col gap-4">
          <PortfolioCard likeAmount={likeAmount} index={0} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {items.map((item, index) => (
            <PortfolioCard key={index} likeAmount={likeAmount} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
