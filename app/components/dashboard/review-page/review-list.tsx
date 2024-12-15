"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Check, ExternalLink, Mail, X } from "lucide-react";
import { useState } from "react";

interface ReviewItem {
  id: string;
  userName: string;
  email: string;
  portfolioUrl: string;
  avatarUrl: string;
  submitDate: string;
  status: "pending" | "approved" | "denied";
}

export function ReviewList() {
  const [items, setItems] = useState<ReviewItem[]>([
    {
      id: "1",
      userName: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      portfolioUrl: "https://portfolio.sarahjohnson.com",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      submitDate: "2023-12-15",
      status: "pending",
    },
    {
      id: "2",
      userName: "Mike Chen",
      email: "mike.chen@example.com",
      portfolioUrl: "https://mikechen.dev",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      submitDate: "2023-12-14",
      status: "pending",
    },
    {
      id: "3",
      userName: "Emily Rodriguez",
      email: "emily.rodriguez@example.com",
      portfolioUrl: "https://emilyrodriguez.design",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      submitDate: "2023-12-13",
      status: "pending",
    },
    {
      id: "4",
      userName: "Alex Thompson",
      email: "alex.thompson@example.com",
      portfolioUrl: "https://alexthompson.io",
      avatarUrl: "/placeholder.svg?height=40&width=40",
      submitDate: "2023-12-12",
      status: "pending",
    },
  ]);

  const handleApprove = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, status: "approved" } : item)));
  };

  const handleDeny = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, status: "denied" } : item)));
  };

  return (
    <div className="min-h-screen bg-background p-6 w-full">
      <div className="mx-auto max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Review Dashboard</h1>
            <p className="text-muted-foreground">Review user portfolios and projects</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">Pending: {items.filter((item) => item.status === "pending").length}</Badge>
            <Badge className="bg-green-500/15 text-green-500">
              Approved: {items.filter((item) => item.status === "approved").length}
            </Badge>
            <Badge variant="destructive">Denied: {items.filter((item) => item.status === "denied").length}</Badge>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Portfolios to Review</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={item.avatarUrl} alt={item.userName} />
                            <AvatarFallback>
                              {item.userName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h3 className="font-semibold">{item.userName}</h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Mail className="h-4 w-4" />
                              <span>{item.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span>Submitted: {item.submitDate}</span>
                            </div>
                            <a
                              href={item.portfolioUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-500 hover:underline flex items-center">
                              View Portfolio
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </div>
                        </div>
                        <div className="flex gap-2 items-end space-y-2">
                          {item.status === "pending" ? (
                            <div className="flex flex-row flex-row-reverse gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-500 hover:text-green-600 hover:bg-green-500/10"
                                onClick={() => handleApprove(item.id)}>
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                onClick={() => handleDeny(item.id)}>
                                <X className="h-4 w-4 mr-1" />
                                Deny
                              </Button>
                            </div>
                          ) : (
                            <Badge
                              className={`capitalize ${
                                item.status === "approved" ? "bg-green-500/15 text-green-500" : "bg-red-500/15 text-red-500"
                              }`}>
                              {item.status}
                            </Badge>
                          )}
                        </div>
                      </div>
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
