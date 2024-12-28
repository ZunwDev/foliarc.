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
          <title>Foliarc | Share and Get Feedback on Your Portfolio</title>
          <meta
            name="description"
            content="Foliarc is a platform for showcasing your portfolio, sharing your projects, and getting valuable feedback from others in the community."
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Foliarc | Share and Get Feedback on Your Portfolio" />
          <meta
            property="og:description"
            content="Foliarc is a platform for showcasing your portfolio, sharing your projects, and getting valuable feedback from others in the community."
          />
          <meta property="og:url" content="https://www.foliarc.com" />
          <meta property="og:image" content="https://www.foliarc.com/logo.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Foliarc | Share and Get Feedback on Your Portfolio" />
          <meta
            name="twitter:description"
            content="Foliarc is a platform for showcasing your portfolio, sharing your projects, and getting valuable feedback from others in the community."
          />
          <meta name="twitter:image" content="https://www.foliarc.com/logo.jpg" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Foliarc",
                url: "https://www.foliarc.com",
                description:
                  "Foliarc is a platform for showcasing your portfolio, sharing your projects, and getting valuable feedback from others in the community.",
              }),
            }}
          />
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
