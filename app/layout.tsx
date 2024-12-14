"use client";
import { Header, ScrollUpButton } from "@/components/global";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "next-themes";
import React from "react";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const showGoToTop = useScrollPosition();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>PortfolioShare</title>
        <meta name="description" content="Portfolio share is an app to share your portfolio and get feedback from others" />
      </head>
      <UserProvider>
        <body className="antialiased">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            {children}
          </ThemeProvider>
          {showGoToTop && <ScrollUpButton />}
        </body>
      </UserProvider>
    </html>
  );
}
