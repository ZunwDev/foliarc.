import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Clock, ExternalLink, Heart, Info, MessageCircle, Trash2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { formatISODate } from "../../lib/utils";

type Project = {
  id: string;
  type: "portfolio" | "project";
  status: "pending" | "denied" | "approved";
  title?: string;
  likeAmount: number;
  createdAt: string;
  repliesCount: number;
  image: string;
  technologies: string[];
  reason?: string;
};

export function ProjectCard({ data }: { data: Project }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const overallScore = 88;
  const calculations = "Hireability: 80%\nCreativity: 95%\nAesthetic: 90%";

  const handleDelete = () => {
    console.log("Project deleted");
    setDialogOpen(false);
  };

  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="p-0 relative group">
        <div className="relative">
          {data.status === "approved" ? (
            <Link href="/portfolio/1" className="flex flex-col gap-4" passHref>
              <div className="relative">
                <Image
                  loading="lazy"
                  width={1200}
                  height={300}
                  src={data.image}
                  alt={data.title ? data.title : "image"}
                  className="w-full h-[200px] object-cover object-top transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ExternalLink className="text-foreground size-10" />
                </div>
              </div>
            </Link>
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
                <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full hover:text-muted-foreground">
                      <Info className="size-4" />
                    </Button>
                  </DialogTrigger>

                  <DialogContent>
                    <DialogTitle className="text-xl font-semibold">
                      {data.status === "denied" ? "Denial Details" : "Submission Details"}
                    </DialogTitle>
                    <div className="text-sm text-muted-foreground space-y-2">
                      <div>
                        Type: <strong>{data.type === "project" ? "Project" : "Portfolio"}</strong>
                      </div>
                      <div>
                        Technologies:
                        <span className="pl-1 space-x-1">
                          {data.technologies && data.technologies.map((item, index) => <Badge key={index}>{item}</Badge>)}
                        </span>
                      </div>
                      {data.type === "project" && (
                        <div>
                          Title: <strong>{data.title}</strong>
                        </div>
                      )}
                      <div>
                        Submitted On: <strong>{formatISODate(data.createdAt) || "Unknown"}</strong>
                      </div>
                      {data.status === "denied" && (
                        <div>
                          Deny Reason: <strong>{data.reason || "No specific reason provided."}</strong>
                        </div>
                      )}
                    </div>
                    <DialogFooter className="space-x-4 pt-4">
                      <Button variant="outline" onClick={() => setDialogOpen(false)} className="w-full sm:w-auto">
                        Close
                      </Button>
                      {data.status === "denied" && (
                        <Button
                          variant="destructive"
                          onClick={handleDelete}
                          className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white">
                          <Trash2 size={20} />
                          Delete Submission
                        </Button>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      </CardHeader>

      {data.status === "approved" && (
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-2 flex-col">
              <h3 className="text-lg font-bold">{data.type === "project" ? data.title : "Portfolio"}</h3>
              <div className="flex flex-wrap gap-1 justify-start">
                {data.technologies && data.technologies.map((item, index) => <Badge key={index}>{item}</Badge>)}
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MessageCircle className="size-4" />
                <span>{data.repliesCount}</span>
                <span>•</span>
                <Heart className="size-4 text-red-500 fill-red-500" />
                <span className="text-muted-foreground">{data.likeAmount}</span>
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
                <TooltipContent className="z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95">
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
