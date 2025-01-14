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
    <div className="md:w-2/3 space-y-6">
      <div className="aspect-video relative rounded-lg overflow-hidden group">
        <Link href={link} target="_blank">
          <Image
            loading="lazy"
            src={src}
            alt="Portfolio Preview"
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay with icon */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <ExternalLink className="text-white w-10 h-10" />
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
