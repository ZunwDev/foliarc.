"use client";

import { CommentSection, MainProfile, Picture, Rating, RatingCircles, Socials } from "@/components/portfolio";
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
      avatar: "",
      content: "Impressive work! The attention to detail is outstanding.",
      date: "2023-12-10",
    },
    {
      id: "2",
      author: "Bob Smith",
      avatar: "",
      content: "I love the color scheme and overall design. Great job!",
      date: "2023-12-11",
    },
    {
      id: "3",
      author: "Bob Smith",
      avatar: "",
      content: "I love the color scheme and overall design. Great job!",
      date: "2023-12-11",
    },
    {
      id: "4",
      author: "Bob Smith",
      avatar: "",
      content: "I love the color scheme and overall design. Great job!",
      date: "2023-12-11",
    },
    {
      id: "5",
      author: "Bob Smith",
      avatar: "",
      content: "I love the color scheme and overall design. Great job!",
      date: "2023-12-11",
    },
    {
      id: "6",
      author: "Bob Smith",
      avatar: "",
      content: "I love the color scheme and overall design. Great job!",
      date: "2023-12-11",
    },
    {
      id: "7",
      author: "Bob Smith",
      avatar: "",
      content: "I love the color scheme and overall design. Great job!",
      date: "2023-12-11",
    },
  ]);
  const [ratings, setRatings] = useState<{ [key: string]: number | null }>({
    hireability: null,
    creativity: null,
    aesthetic: null,
  });

  const [comment, setComment] = useState<string>("");

  const handleCommentChange = (value: string) => {
    setComment(value);
  };

  const handleCommentSubmit = (value: string) => {
    console.log(comment || value);
    if (comment.trim()) {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: "Current User",
        avatar: "",
        content: comment || value,
        date: new Date().toISOString().split("T")[0],
      };

      setComments([...comments, newComment]);
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 pt-48 w-full overflow-hidden relative">
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
          <Picture src="/cats-9024710_960_720.jpg" link="https://www.example.com" />

          <div className="md:w-1/3 space-y-6">
            <MainProfile likeAmount={likeAmount} />
            <Socials />
            <RatingCircles />
          </div>
        </div>

        <Rating ratings={ratings} setRatings={setRatings} />
        <CommentSection
          comments={comments}
          handleCommentSubmit={handleCommentSubmit}
          handleCommentChange={handleCommentChange}
        />
      </div>
    </div>
  );
}
