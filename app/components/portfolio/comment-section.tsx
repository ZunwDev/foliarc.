import { CommentInput } from "@/components/portfolio/comment-input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Flag, MessageCircle, MoreHorizontal, ThumbsDown, ThumbsUp } from "lucide-react";
import Link from "next/link";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  date: number | string;
}

interface CommentSectionProps {
  comments: Comment[];
  handleCommentSubmit: (value: string) => void;
  handleCommentChange: (value: string) => void;
}

function timeAgo(dateString: string | number): string {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return diffInSeconds === 1 ? "1 second ago" : `${diffInSeconds} seconds ago`;
  }
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  }
  if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return days === 1 ? "1 day ago" : `${days} days ago`;
  }
  if (diffInSeconds < 31536000) {
    const months = Math.floor(diffInSeconds / 2592000);
    return months === 1 ? "1 month ago" : `${months} months ago`;
  }
  const years = Math.floor(diffInSeconds / 31536000);
  return years === 1 ? "1 year ago" : `${years} years ago`;
}

export function CommentSection({ comments, handleCommentSubmit, handleCommentChange }: CommentSectionProps) {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div className="pt-16">
      <div className="mt-4 flex flex-col gap-4">
        {user ? (
          <CommentInput onChange={handleCommentChange} handleSubmit={handleCommentSubmit} />
        ) : (
          <p className="text-muted-foreground text-sm text-center">Log in to add a comment or interact with comments.</p>
        )}
      </div>
      {comments.map((comment) => (
        <div key={comment.id} className="mb-4 pb-4 border-b last:border-b-0 mt-6">
          <div className="flex items-start space-x-4">
            <Avatar>
              <AvatarImage src={comment.avatar} alt={comment.author} />
              <AvatarFallback>{comment.author[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold flex items-center space-x-2">
                  <Link href="#" className="hover:underline">
                    {comment.author}
                  </Link>
                  <span className="text-sm text-muted-foreground">• {timeAgo(comment.date)}</span>
                </h3>
              </div>
              <p className="mt-1 text-sm">{comment.content}</p>

              <div className="flex justify-between items-center mt-1 pr-1">
                <div className="flex space-x-2">
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm" className="rounded-full" disabled={!user}>
                      <ThumbsUp size={16} />
                    </Button>
                    12
                    <Button variant="ghost" size="sm" className="rounded-full" disabled={!user}>
                      <ThumbsDown size={16} />
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" disabled={!user}>
                    <MessageCircle size={16} />
                    Reply
                  </Button>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8 p-0 hover:bg-muted focus-visible:ring-1 focus-visible:ring-ring"
                      disabled={!user}>
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
  );
}
