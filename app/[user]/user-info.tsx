import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Globe, MapPin } from "lucide-react";
import Link from "next/link";

interface UserInfoProps {
  user: {
    username: string;
    name: string;
    avatar: string;
    bio: string;
    location: string;
    website: string;
  };
}

export function UserInfo({ user }: UserInfoProps) {
  return (
    <Card className="z-50">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center">
          <Avatar className="size-32">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mt-4">{user.name}</h1>
          <p className="text-muted-foreground">{user.username}</p>
        </div>
        <p className="mt-4 text-center">{user.bio}</p>
        <div className="mt-4 space-y-2">
          <div className="flex items-center">
            <MapPin size={16} className="mr-2" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center">
            <Globe size={16} className="mr-2" />
            <Link href={user.website} className="text-blue-500 hover:underline">
              {user.website}
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
