import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Heart, MapPin } from "lucide-react";
import Link from "next/link";

export function MainProfile({ likeAmount }: { likeAmount: number }) {
  return (
    <Card className="bg-secondary/50 p-4 rounded-lg">
      <div className="flex flex-row">
        <div className="flex items-center space-x-4">
          <Link className="text-xl font-semibold" href="/johndoe">
            <Avatar className="h-16 w-16">
              <AvatarImage src="" alt="Jane Doe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col gap-1">
            <Link className="text-xl font-semibold hover:underline" href="/johndoe">
              Jane Doe
            </Link>
            <div className="flex flex-row flex-wrap gap-1">
              <Badge>Developer</Badge>
              <Badge>UI/UX Designer</Badge>
            </div>
          </div>
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
    </Card>
  );
}
