import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { ExternalLink, Flag, Heart, MapPin, MessageCircle, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PortfolioCardProps {
  index: number;
}

export function PortfolioCard({ index }: PortfolioCardProps) {
  const likeAmount = 1;
  const replyAmount = 1;
  const overallScore = 88;
  const calculations = "Hireability: 80%\nCreativity: 95%\nAesthetic: 90%";

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Card
      key={index}
      className="rounded-lg shadow-lg overflow-hidden transition-all hover:bg-secondary hover:shadow-xl relative duration-300">
      <CardHeader className="p-0 relative group">
        <div className="relative">
          <Link href={`/works/${index}`} className="flex flex-col gap-4" passHref>
            <div className="relative overflow-hidden">
              <Image
                loading="lazy"
                width={1200}
                height={300}
                src="/cats-9024710_960_720.jpg"
                alt="Portfolio Image"
                className="w-full h-[250px] object-cover object-top transform transition-transform duration-300 group-hover:scale-105"
              />
              {/* Icon overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-background/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ExternalLink className="text-foreground/70 size-10" />
              </div>
            </div>
          </Link>
          <div className="absolute top-2 right-2 flex space-x-1">
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
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex flex-row justify-between w-full items-center">
          <div className="flex flex-row items-start">
            <Link className="text-lg" href="/johndoe">
              <Avatar className="mr-3">
                <AvatarImage src="https://via.placeholder.com/40" alt="Creator's Avatar" />
                <AvatarFallback className="bg-muted">AB</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-col gap-1">
              <Link className="text-lg hover:underline" href="/johndoe">
                John Doe
              </Link>
              <div className="flex flex-row flex-wrap gap-1">
                <Badge>Developer</Badge>
                <Badge>UI/UX Designer</Badge>
              </div>
              <div className="text-sm text-muted-foreground flex flex-row items-center gap-3 pt-2">
                <div className="flex items-center gap-1">
                  <MapPin className="size-4" />
                  <span>Atlanta</span>
                </div>
                {likeAmount > 0 && (
                  <div className="flex items-center gap-1">
                    <Heart className="size-4 text-red-500 fill-red-500" />
                    <span className="font-medium">{likeAmount}</span>
                  </div>
                )}
                {replyAmount > 0 && (
                  <div className="flex items-center gap-1">
                    <MessageCircle className="size-4 text-muted-foreground" />
                    <span className="font-medium">{replyAmount}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-col items-center">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16">
                      <circle cx="32" cy="32" r="28" className="stroke-muted-foreground fill-none" strokeWidth="4" />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        className="stroke-primary fill-none"
                        strokeWidth="4"
                        strokeDasharray="176"
                        strokeDashoffset={(176 - (176 * overallScore) / 100).toFixed(1)}
                        style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                      {overallScore}%
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground mt-2">Overall Score</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 whitespace-pre-line">
                {calculations}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
