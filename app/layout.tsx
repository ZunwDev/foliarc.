"use client";
import { Header, ScrollUpButton } from "@/components/global";
import { useScrollPosition } from "@/lib/hooks/useScrollPosition";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import React from "react";
import "./globals.css";

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const showGoToTop = useScrollPosition();
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <title>folioarc.</title>
          <meta name="description" content="Folioarc is an app to share your portfolio and get feedback from others" />
        </head>
        <UserProvider>
          <body className="antialiased min-w-[360px] min-h-[100dvh]">
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Header />
              {children}
            </ThemeProvider>
            {showGoToTop && <ScrollUpButton />}
          </body>
        </UserProvider>
      </html>
    </QueryClientProvider>
  );
}
