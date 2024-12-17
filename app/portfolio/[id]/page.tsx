"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Flag,
  Github,
  Heart,
  Linkedin,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Send,
  ThumbsDown,
  ThumbsUp,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
}

export default function PortfolioView() {
  const likeAmount = 1;
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Alice Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Impressive work! The attention to detail is outstanding.",
      date: "2023-12-10",
    },
    {
      id: "2",
      author: "Bob Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "I love the color scheme and overall design. Great job!",
      date: "2023-12-11",
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now().toString(),
        author: "Current User",
        avatar: "/placeholder.svg?height=40&width=40",
        content: newComment,
        date: new Date().toISOString().split("T")[0],
      };
      setComments([...comments, comment]);
      setNewComment("");
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 pt-48 w-full overflow-x-hidden relative">
      <div
        className="absolute top-0 left-0 w-[800px] h-[600px] bg-[radial-gradient(ellipse,rgba(200,250,255,0.6),transparent)]"
        style={{
          filter: "blur(200px)",
          transform: "translate(-50%, -20%)",
        }}></div>
      <div
        className="absolute bottom-0 right-0 w-[900px] h-[700px] bg-[radial-gradient(ellipse,rgba(130,170,255,0.4),transparent)]"
        style={{
          filter: "blur(250px)",
          transform: "translate(50%, 50%)",
        }}></div>
      <div className="mx-auto max-w-6xl space-y-8 w-full">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3 space-y-6">
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image src="/cats-9024710_960_720.jpg" alt="Portfolio Preview" layout="fill" objectFit="cover" />
            </div>
          </div>

          <div className="md:w-1/3 space-y-6">
            <Card className="bg-secondary/50 p-4 rounded-lg">
              <div className="flex flex-row justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt="Jane Doe" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold">Jane Doe</h2>
                    <div className="flex flex-row flex-wrap gap-1">
                      <Badge>Developer</Badge>
                      <Badge>UI/UX Designer</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <Button variant="outline" size="icon">
                    <Heart className="size-4" />
                  </Button>
                </div>
              </div>
              <div className="pl-20 text-sm text-muted-foreground flex flex-row gap-2">
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

              {/* Social Media Buttons */}
              <div className="flex justify-start space-x-2 mt-4">
                <Button variant="outline" size="icon">
                  <Github className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Linkedin className="h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Circular Progress Bars */}
            <Card className="bg-secondary/50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                {["Design", "Functionality", "Creativity"].map((label, index) => {
                  const percentages = [92, 88, 95];
                  return (
                    <div key={label} className="flex flex-col items-center space-y-2">
                      <div className="relative w-16 h-16">
                        <svg className="w-16 h-16">
                          <circle cx="32" cy="32" r="28" className="stroke-muted-foreground fill-none" strokeWidth="4" />
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            className="stroke-primary fill-none rotate-[-90deg] origin-center"
                            strokeWidth="4"
                            strokeDasharray="176"
                            strokeDashoffset={(176 - (176 * percentages[index]) / 100).toFixed(1)}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                          {percentages[index]}%
                        </div>
                      </div>
                      <span className="text-sm text-muted-foreground">{label}</span>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>

        {/* Comments Section */}
        <div>
          <h2 className="text-2xl font-semibold mt-24">Comments</h2>
          <p className="text-muted-foreground mb-4">Share your thoughts on this portfolio</p>
          <div className="comment-section">
            {/* Scrollable Comments */}
            <ScrollArea className="h-[300px] pr-4">
              {comments.map((comment) => (
                <div key={comment.id} className="mb-4 pb-4 border-b last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage src={comment.avatar} alt={comment.author} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{comment.author}</h3>
                        <span className="text-sm text-muted-foreground">{comment.date}</span>
                      </div>
                      <p className="mt-1 text-sm">{comment.content}</p>

                      {/* Comment Action Buttons */}
                      <div className="flex justify-between items-center mt-1 pr-1 ">
                        <div className="flex space-x-2">
                          <div className="flex items-center">
                            <Button variant="ghost" size="sm" className="rounded-full">
                              <ThumbsUp size={16} />
                            </Button>
                            12
                            <Button variant="ghost" size="sm" className="rounded-full">
                              <ThumbsDown size={16} />
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm">
                            <MessageCircle size={16} />
                            Reply
                          </Button>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 p-0 hover:bg-muted focus-visible:ring-1 focus-visible:ring-ring">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem className="cursor-pointer focus:bg-muted">
                              <Flag />
                              Report
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
          <div className="mt-4 flex space-x-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleCommentSubmit}>
              <Send className="h-4 w-4 mr-2" />
              Post
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
