import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getInitials } from "@/lib/utils";
import { Badge, Linkedin, Mail, MapPin, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface UserInfoProps {
  user: {
    username: string;
    name: string;
    email: string;
    avatar: string;
    bio: string;
    location: string;
    website: string;
  };
}

export function UserInfo({ user }: UserInfoProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="w-full mx-auto overflow-hidden transition-all duration-300 hover:shadow-xl relative">
      <div className="h-32 bg-gradient-to-r from-primary/10 to-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-primary/10" />
      </div>

      <Button
        variant="outline"
        className="absolute top-2 right-2 rounded-full shadow-md transition-colors"
        onClick={() => console.log("Edit Profile clicked")}>
        Edit Profile
      </Button>

      <CardContent className="relative pt-0 pb-8">
        <div className="flex flex-col items-center">
          <Avatar className="size-40 border-4 border-background shadow-xl -mt-16" onError={() => setImageError(true)}>
            <AvatarImage src={imageError ? undefined : user.avatar} alt={user.name} className="object-cover" />
            <AvatarFallback className="text-3xl bg-primary/10">{getInitials(user?.name ?? "")}</AvatarFallback>
          </Avatar>

          <div className="text-center mt-4 space-y-1">
            <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            {user.status && (
              <Badge variant="secondary" className="mt-2">
                {user.status}
              </Badge>
            )}
          </div>

          {/* Bio Section */}
          {user.bio && <p className="mt-4 text-center text-foreground max-w-sm leading-relaxed">{user.bio}</p>}

          {/* Contact Information */}
          <div className="w-full mt-6 space-y-1">
            {user.location && (
              <div className="flex items-center space-x-2 group hover:text-primary transition-colors">
                <MapPin size={18} className="text-muted-foreground" />
                <span>{user.location}</span>
              </div>
            )}

            {user.email && (
              <Link
                href={`mailto:${user.email}`}
                className="flex items-center space-x-2 group hover:text-blue-500 hover:underline">
                <Mail size={18} className="text-muted-foreground" />
                <span>{user.email}</span>
              </Link>
            )}
          </div>

          {(user?.socials?.twitter || user?.socials?.linkedin) && (
            <div className="flex items-center justify-center space-x-4 mt-6">
              {user?.socials?.twitter && (
                <Link
                  href={`https://twitter.com/${user.socials.twitter}`}
                  target="_blank"
                  className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                  aria-label="Twitter Profile">
                  <X size={20} className="text-primary hover:scale-110 transition-transform" />
                </Link>
              )}
              {user?.socials?.linkedin && (
                <Link
                  href={`https://linkedin.com/in/${user.socials.linkedin}`}
                  target="_blank"
                  className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                  aria-label="LinkedIn Profile">
                  <Linkedin size={20} className="text-primary hover:scale-110 transition-transform" />
                </Link>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
