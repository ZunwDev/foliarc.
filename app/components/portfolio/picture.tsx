import { Button } from "@/components/ui/button";
import { Flag, Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Picture({ src, link = "https://www.example.com" }: { src: string; link: string }) {
  return (
    <div className="md:w-2/3 space-y-6">
      <div className="aspect-video relative rounded-lg overflow-hidden">
        <Link href={link} target="_blank">
          <Image src={src} alt="Portfolio Preview" layout="fill" objectFit="cover" />
        </Link>
        <div className="absolute top-2 right-2 flex space-x-1">
          <Button variant="outline" size="icon" className="rounded-full hover:text-red-500">
            <Heart />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full hover:text-yellow-500">
            <Star />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full hover:text-red-700">
            <Flag />
          </Button>
        </div>
      </div>
    </div>
  );
}
