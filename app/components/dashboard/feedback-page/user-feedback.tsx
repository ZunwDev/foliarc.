"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Star } from "lucide-react";

interface Feedback {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export function UserFeedback() {
  const feedbacks: Feedback[] = [
    {
      id: "1",
      userName: "Alex Johnson",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment:
        "This app has revolutionized how I manage my tasks. It's intuitive, fast, and has all the features I need. Highly recommended!",
      date: "2023-12-10",
    },
    {
      id: "2",
      userName: "Sarah Lee",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      comment:
        "Great app overall. The interface is clean and user-friendly. Would love to see a dark mode option in the future.",
      date: "2023-12-08",
    },
    {
      id: "3",
      userName: "Mike Chen",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment: "As a project manager, this app has been a game-changer for my team. The collaboration features are top-notch!",
      date: "2023-12-05",
    },
    {
      id: "4",
      userName: "Emily Rodriguez",
      userAvatar: "/placeholder.svg?height=40&width=40",
      rating: 3,
      comment:
        "The app is good, but it could use some improvements in terms of customization options. Looking forward to future updates.",
      date: "2023-12-01",
    },
  ];

  return (
    <div className="p-6">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Feedback</h1>
          <p className="text-muted-foreground">See what our users are saying about our app</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              <div className="space-y-6">
                {feedbacks.map((feedback) => (
                  <Card key={feedback.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={feedback.userAvatar} alt={feedback.userName} />
                            <AvatarFallback>
                              {feedback.userName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h3 className="font-semibold">{feedback.userName}</h3>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{feedback.date}</span>
                        </div>
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground">{feedback.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
