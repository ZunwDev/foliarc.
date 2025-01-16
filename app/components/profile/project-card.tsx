import { ProjectCardInfoDialog } from "@/components/dialogs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Project } from "@/lib/types";
import { Clock, ExternalLink, Flag, Heart, MessageCircle, Star, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function ProjectCard({ data, isCurrentUser }: { data: Project; isCurrentUser: boolean }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const overallScore = 8.8;
  const calculations = "Hireability: 8\nCreativity: 9.5\nAesthetic: 9";

  const handleDelete = () => {
    console.log("Project deleted");
    setDialogOpen(false);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="p-0 relative group">
        <div className="relative">
          {data.status === "approved" ? (
            <div className="relative">
              <Link href="/works/1" className="flex flex-col gap-4" passHref>
                <div className="relative overflow-hidden">
                  <Image
                    loading="lazy"
                    width={1200}
                    height={300}
                    src={data.image}
                    alt={data.title ? data.title : "image"}
                    className="w-full h-[200px] object-cover object-top transform transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <ExternalLink className="text-foreground size-10" />
                  </div>
                </div>
              </Link>
              {!isCurrentUser && (
                <div className="absolute top-2 right-2 flex space-x-1">
                  <Button variant="outline" size="icon" className="rounded-full hover:text-red-500" onClick={handleButtonClick}>
                    <Heart />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full hover:text-yellow-500"
                    onClick={handleButtonClick}>
                    <Star />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full hover:text-red-700" onClick={handleButtonClick}>
                    <Flag />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <Image
                loading="lazy"
                width={1200}
                height={300}
                src={data.image}
                alt={data.title ? data.title : "image"}
                className={`w-full h-[200px] object-cover object-top ${
                  data.status === "denied" ? "grayscale blur" : "opacity-50"
                }`}
              />
              <div className="absolute top-2 right-2 flex">
                <ProjectCardInfoDialog
                  data={data}
                  isOpen={isDialogOpen}
                  setDialogOpen={setDialogOpen}
                  onSubmit={handleDelete}
                />
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      {data.status === "approved" && (
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-1 flex-col">
              <h3 className="text-lg font-bold">{data.type === "project" ? data.title : "Portfolio"}</h3>
              <div className="flex flex-wrap gap-1 justify-start">
                {data.technologies && data.technologies.map((item, index) => <Badge key={index}>{item}</Badge>)}
              </div>
              <div className="flex flex-row gap-3 pt-1.5">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Heart className="size-4 text-red-500 fill-red-500" />
                  <span className="text-muted-foreground">{data.likeAmount}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MessageCircle className="size-4" />
                  <span>{data.repliesCount}</span>
                </div>
              </div>
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex flex-col items-center">
                    <div className="relative size-16">
                      <svg className="size-16">
                        <circle cx="32" cy="32" r="28" className="stroke-muted-foreground fill-none" strokeWidth="4" />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          className="stroke-primary fill-none"
                          strokeWidth="4"
                          strokeDasharray="176"
                          strokeDashoffset={(176 - (176 * overallScore) / 10).toFixed(1)}
                          style={{ transformOrigin: "center", transform: "rotate(-90deg)" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                        {overallScore}
                      </div>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent
                  className="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
                  style={{ whiteSpace: "pre-line" }}>
                  {calculations}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      )}

      {(data.status === "pending" || data.status === "denied") && (
        <CardFooter className="p-4">
          <div className="flex items-center justify-center w-full h-20 pt-4">
            {data.status === "pending" ? (
              <>
                <Clock className="size-6 text-yellow-400 mr-2" />
                <span className="text-lg font-semibold">WAITING FOR APPROVAL</span>
              </>
            ) : (
              <>
                <XCircle className="size-6 text-red-600 mr-2" />
                <span className="text-lg font-semibold">DENIED</span>
              </>
            )}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
