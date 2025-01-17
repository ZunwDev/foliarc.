import { Button } from "@/components/ui/button";
import { ExternalLink, Flag, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Picture({ src, link = "https://www.example.com" }: { src: string; link: string }) {
  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleDivClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="md:w-full space-y-6">
      <div className="relative w-full h-full rounded-lg overflow-hidden group">
        <Link href={link} target="_blank">
          <Image loading="lazy" src={src} alt="Creation Preview" width={900} height={300} />
          <div className="absolute inset-0 top-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ExternalLink className="text-white size-10" />
          </div>
        </Link>
        <div className="absolute top-2 right-2 flex space-x-1" onClick={handleDivClick}>
          <Button variant="outline" size="icon" className="rounded-full hover:text-red-500" onClick={handleButtonClick}>
            <Heart />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full hover:text-yellow-500" onClick={handleButtonClick}>
            <Star />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full hover:text-red-700" onClick={handleButtonClick}>
            <Flag />
          </Button>
        </div>
      </div>
    </div>
  );
}
