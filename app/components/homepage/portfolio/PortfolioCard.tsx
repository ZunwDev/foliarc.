import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Flag, Heart, MapPin, Star } from "lucide-react";
import Image from "next/image";

interface PortfolioCardProps {
  likeAmount: number;
  index: number;
}

export default function PortfolioCard({ likeAmount, index }: PortfolioCardProps) {
  return (
    <Card
      key={index}
      className="rounded-lg shadow-lg overflow-hidden bg-secondary transition-all hover:bg-muted-foreground/30 hover:shadow-xl cursor-pointer relative">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            width={1200}
            height={300}
            src="/cats-9024710_960_720.jpg"
            alt="Portfolio Image"
            className="w-full h-[250px] object-cover"
          />
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
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center">
          <Avatar className="mr-3">
            <AvatarImage src="https://via.placeholder.com/40" alt="Creator's Avatar" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <p className="text-lg">John Doe</p>
            <div className="flex flex-row flex-wrap gap-1">
              <Badge>Developer</Badge>
              <Badge>UI/UX Designer</Badge>
            </div>
            <div className="text-sm text-muted-foreground flex flex-row items-center gap-2">
              <div className="flex items-center gap-1">
                <MapPin className="size-4" />
                <span>Atlanta</span>
              </div>
              {likeAmount > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-muted-foreground">•</span>
                  <Heart className="size-4 text-red-500 fill-red-500" />
                  <span className="font-medium">{likeAmount}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      <div className="bg-muted-foreground/10 py-4 flex items-center justify-around">
        {[
          { label: "Hireability", value: 80 },
          { label: "Creativity", value: 95 },
          { label: "Aesthetic", value: 90 },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center">
            <div className="relative w-14 h-14">
              <svg className="w-14 h-14">
                <circle cx="28" cy="28" r="24" className="stroke-muted-foreground fill-none" strokeWidth="4" />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  className="stroke-primary fill-none"
                  strokeWidth="4"
                  strokeDasharray="150"
                  strokeDashoffset={(150 - (150 * stat.value) / 100).toFixed(1)}
                  style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">{stat.value}%</div>
            </div>
            <span className="text-xs text-muted-foreground mt-2">{stat.label}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
