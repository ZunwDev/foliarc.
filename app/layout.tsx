"use client";
import Header from "@/components/global/Header";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider, useTheme } from "next-themes";
import localFont from "next/font/local";
import React, { useEffect } from "react";

import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();
  localStorage.removeItem("theme");
  useEffect(() => {
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (userPrefersDark) {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }, [setTheme]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>PortfolioShare</title>
        <meta name="description" content="Portfolio share is an app to share your portfolio and get feedback from others" />
      </head>
      <UserProvider>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <Header />
            {children}
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
