/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import { DoorOpen, Image, ListChecks, MessageCircleQuestion, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full text-foreground">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.picture ?? undefined} alt="Profile picture" />
            <AvatarFallback>{getInitials(user.name ?? "")}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-background rounded-md shadow-lg py-2">
        <DropdownMenuLabel className="px-3 text-xs font-semibold text-foreground">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 h-px bg-muted" />

        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-md">
          <User className="size-5" />
          <span className="text-sm font-medium">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-md">
          <Image className="size-5" />
          <span className="text-sm font-medium">My portfolio</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 h-px bg-muted" />
        <DropdownMenuLabel className="px-3 text-xs font-semibold text-foreground">Admin</DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 h-px bg-muted" />
        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-md">
          <MessageCircleQuestion className="size-5" />
          <span className="text-sm font-medium">Feedback</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-md">
          <ListChecks className="size-5" />
          <span className="text-sm font-medium">For review</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 h-px bg-muted" />
        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-md">
          <DoorOpen className="size-5 text-red-500" />
          <Link href="/api/auth/logout" className="text-red-500 text-sm font-medium">
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Button asChild>
      <Link href="/api/auth/login">Login</Link>
    </Button>
  );
}

function getInitials(name: string) {
  if (!name) return "A";
  const words = name.match(/\b[a-zA-Z]/g);

  if (words && words.length > 1) {
    return words.slice(0, 2).join("").toUpperCase();
  }
  const firstValidLetter = name.match(/[a-zA-Z]/);
  return firstValidLetter ? firstValidLetter[0].toUpperCase() : "A";
}
