"use client";

import { SidebarLinks } from "@/components/dashboard";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || isLoading) return;

    if (!user) {
      console.log("User is not logged in, redirecting to home...");
      router.push("/");
      return;
    }

    const validEmails = process.env.NEXT_PUBLIC_VALID_EMAILS?.split(",") || [];
    if (user.email && !validEmails.includes(user.email)) {
      console.log("Invalid email, redirecting to home...");
      router.push("/");
    }
  }, [user, isLoading, mounted, router]);

  if (isLoading || !mounted) return <div>Loading...</div>;

  return (
    <div className="flex min-h-[100dvh]">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary/50 text-foreground flex flex-col fixed top-0 left-0 h-full z-[999]">
        <div className="flex items-center justify-center px-3 py-8 rounded mx-auto h-14 w-full">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <nav className="flex flex-col space-y-4 border-t border-secondary/50 p-4 w-full">
          <SidebarLinks />
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 bg-background p-8 ml-64 overflow-y-auto">{children}</main>
    </div>
  );
}
