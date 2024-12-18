import { CommentInput } from "@/components/portfolio/comment-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Flag, MessageCircle, MoreHorizontal, ThumbsDown, ThumbsUp } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: string;
}

interface CommentSectionProps {
  comments: Comment[];
  handleCommentSubmit: (value: string) => void;
  handleCommentChange: (value: string) => void;
}

export function CommentSection({ comments, handleCommentSubmit, handleCommentChange }: CommentSectionProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mt-24">Comments</h2>
      <p className="text-muted-foreground mb-4">Share your thoughts on this portfolio</p>
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-4 pb-4 border-b last:border-b-0 mt-6">
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

                <div className="flex justify-between items-center mt-1 pr-1">
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
                        className="size-8 p-0 hover:bg-muted focus-visible:ring-1 focus-visible:ring-ring">
                        <MoreHorizontal className="size-4" />
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
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <CommentInput onChange={handleCommentChange} handleSubmit={handleCommentSubmit} />
      </div>
    </div>
  );
}
