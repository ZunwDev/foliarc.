"use client";

import { CommentSection, MainProfile, Picture, Rating, RatingCircles, Socials } from "@/components/creations";
import { useState } from "react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: number | string;
}

export default function WorkView() {
  const likeAmount = 1;
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Alice Johnson",
      avatar: "",
      content: "Impressive work! The attention to detail is outstanding.",
      date: "2024-12-23T12:45:30Z",
    },
    {
      id: "2",
      author: "Bob Smith",
      avatar: "",
      content: "I love the color scheme and overall design. Great job!",
      date: "2024-12-23T12:40:30Z",
    },
    {
      id: "3",
      author: "Charlie Brown",
      avatar: "",
      content: "Fantastic layout and typography. Looks professional!",
      date: "2024-12-23T10:45:30Z",
    },
    {
      id: "4",
      author: "Diana Prince",
      avatar: "",
      content: "Could use some more animations. Otherwise, awesome!",
      date: "2024-12-20T12:45:30Z",
    },
    {
      id: "5",
      author: "Eve Adams",
      avatar: "",
      content: "The design speaks for itself. Stunning work!",
      date: "2024-10-23T12:45:30Z",
    },
    {
      id: "6",
      author: "Frank Wright",
      avatar: "",
      content: "Clean and crisp UI. Great work!",
      date: "2023-12-23T12:45:30Z",
    },
    {
      id: "7",
      author: "Grace Hopper",
      avatar: "",
      content: "Timeless design. Loved it!",
      date: "2019-12-23T12:45:30Z",
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
        date: Date.now() as unknown as string,
      };

      setComments([...comments, newComment]);
      setComment("");
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 pt-48 w-full overflow-hidden relative">
      <div className="mx-auto max-w-6xl space-y-8 w-full">
        <div className="flex flex-col lg:flex-row gap-6">
          <Picture src="/img-demo.png" link="https://www.example.com" />

          <div className="lg:w-1/3 space-y-6">
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
