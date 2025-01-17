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
          <title>foliarc. | Share and Get Feedback on Your Portfolio/Project</title>
          <meta
            name="description"
            content="foliarc. is a platform for showcasing your portfolio/project, sharing your projects, and getting valuable feedback from others in the community."
          />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="foliarc. | Share and Get Feedback on Your Portfolio/Project" />
          <meta
            property="og:description"
            content="foliarc. is a platform for showcasing your portfolio/project, sharing your projects, and getting valuable feedback from others in the community."
          />
          <meta property="og:url" content="https://www.foliarc.com" />
          <meta property="og:image" content="https://www.foliarc.com/logo.jpg" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="foliarc. | Share and Get Feedback on Your Portfolio/Project" />
          <meta
            name="twitter:description"
            content="foliarc. is a platform for showcasing your portfolio/project, sharing your projects, and getting valuable feedback from others in the community."
          />
          <meta name="twitter:image" content="https://www.foliarc.com/logo.jpg" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "foliarc.",
                url: "https://www.foliarc.com",
                description:
                  "foliarc. is a platform for showcasing your portfolio/project, sharing your projects, and getting valuable feedback from others in the community.",
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
