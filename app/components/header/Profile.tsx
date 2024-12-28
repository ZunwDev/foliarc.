/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from "@/lib/utils";
import { useUser } from "@auth0/nextjs-auth0/client";
import { DoorOpen, FileText, LayoutDashboard, User } from "lucide-react";
import Link from "next/link";

export function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <Skeleton className="size-8 rounded-full mt-1"></Skeleton>;
  if (error) return <div>{error.message}</div>;

  const validUserIds = process.env.NEXT_PUBLIC_ALLOWED_USERS?.split(",") || [];

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full text-foreground" title={user.name ?? ""}>
          <Avatar className="size-8">
            <AvatarImage src={user.picture ?? undefined} alt="Profile picture" />
            <AvatarFallback>{getInitials(user.name ?? "")}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-background rounded-md shadow-lg py-2">
        <DropdownMenuLabel className="px-3 text-xs text-foreground flex flex-col">
          Account<span className="text-muted-foreground truncate">{user?.email || user?.name || ""}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1 h-px bg-muted" />

        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-md">
          <User className="size-5" />
          <span className="text-sm font-medium">My Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-md">
          <FileText className="size-5" />
          <span className="text-sm font-medium">My Submissions</span>
        </DropdownMenuItem>

        {validUserIds.includes(user?.sub ?? "") && (
          <>
            <DropdownMenuSeparator className="my-1 h-px bg-muted" />
            <DropdownMenuLabel className="px-3 text-xs text-foreground">Admin</DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1 h-px bg-muted" />
            <DropdownMenuItem className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-md">
              <LayoutDashboard className="size-5" />
              <Link href="/dashboard" className="text-sm font-medium">
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
            </DropdownMenuItem>
          </>
        )}

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
      <Link href="/api/auth/login?returnTo=/welcome">Login</Link>
    </Button>
  );
}
