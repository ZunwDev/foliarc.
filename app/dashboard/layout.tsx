"use client";

import { SidebarLinks } from "@/components/dashboard";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
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
