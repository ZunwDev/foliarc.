"use client";

import { SubmitSubmissionDialog } from "@/components/dialogs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchUser } from "@/lib/api/hooks";
import { useMount } from "@/lib/hooks";
import { NewSubmissionSchema } from "@/lib/schemas";
import { useUser } from "@auth0/nextjs-auth0/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function Hero() {
  const { user } = useUser();
  const { data: fetchedUsers, isLoading } = useFetchUser(user?.sub || "", "id");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const mounted = useMount();

  const currentUser = fetchedUsers?.[0] || null;

  const form = useForm<z.infer<typeof NewSubmissionSchema>>({
    mode: "onChange",
    resolver: zodResolver(NewSubmissionSchema),
    defaultValues: {
      url: "",
      technologies: [],
      type: "portfolio",
      title: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewSubmissionSchema>) => {
    console.log(values);
    setHasSubmitted(true);
  };

  const renderButton = () => {
    if (!mounted || isLoading || !user) {
      return <Skeleton className="h-10 sm:h-11 md:h-12 lg:h-14 w-48 rounded-full" />;
    }

    if (!user) {
      return (
        <Link href="/api/auth/login?returnTo=/welcome">
          <Button className="h-10 sm:h-11 md:h-12 lg:h-14 px-4 sm:px-8 md:px-10 lg:px-12 text-lg sm:text-xl md:text-2xl rounded-full text-blue-400 border-2 border-blue-400 hover:text-white hover:border-blue-600 bg-transparent transition-all duration-300 transform hover:scale-105 hover:bg-blue-400 shadow-xl hover:shadow-2xl hover:shadow-blue-500">
            Get Started
          </Button>
        </Link>
      );
    }

    if (!currentUser) {
      return (
        <Link href="/welcome">
          <Button className="h-10 sm:h-11 md:h-12 lg:h-14 px-4 sm:px-8 md:px-10 lg:px-12 text-lg sm:text-xl md:text-2xl rounded-full text-blue-400 border-2 border-blue-400 hover:text-white hover:border-blue-600 bg-transparent transition-all duration-300 transform hover:scale-105 hover:bg-blue-400 shadow-xl hover:shadow-2xl hover:shadow-blue-500">
            Complete Your Profile
          </Button>
        </Link>
      );
    }

    if (!hasSubmitted) {
      return <SubmitSubmissionDialog form={form} onSubmit={onSubmit} />;
    }

    return null;
  };

  return (
    <div className="flex flex-col items-center text-center px-4 py-16 w-full text-foreground relative z-10 mt-40">
      <Link href="/changelog" className="mx-auto mb-10 flex w-fit items-center rounded-full bg-muted px-4 py-2 text-sm border">
        <span className="mr-1 font-semibold">What&#x27;s new</span>| Read more
        <ArrowRight className="ml-2 size-4" />
      </Link>
      <h1 className="text-6xl sm:text-8xl md:text-9xl font-extrabold mb-4 !specialtext">Your Work, Your Stage</h1>
      <p className="text-sm sm:text-lg md:text-2xl text-muted-foreground mb-8 max-w-4xl mt-8">
        Showcase your portfolios and projects, learn from others, and be part of a vibrant creative community.
      </p>
      <div className="flex space-x-4">{renderButton()}</div>
    </div>
  );
}
