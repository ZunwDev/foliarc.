"use client";

import { SidebarLinks } from "@/components/dashboard";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary/50 text-foreground flex flex-col">
        <div className="flex items-center justify-center px-3 py-8 rounded mx-auto h-14 w-full">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <nav className="flex flex-col space-y-4 border-t border-foreground p-4 w-full">
          <SidebarLinks />
        </nav>
      </aside>

      <main className="flex-1 bg-background p-8 mt-8">{children}</main>
    </div>
  );
}
