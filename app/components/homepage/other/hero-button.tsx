import { SubmitSubmissionDialog } from "@/components/dialogs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchUser } from "@/lib/api/hooks";
import { useMount } from "@/lib/hooks";
import { NewSubmissionSchema } from "@/lib/schemas";
import { useUser } from "@auth0/nextjs-auth0/client";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function HeroButton() {
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
    if (!mounted) {
      return <Skeleton className="h-10 sm:h-11 md:h-12 lg:h-14 w-48 rounded-full" />;
    }

    if (!user && !isLoading) {
      return (
        <Link href="/api/auth/login?returnTo=/welcome">
          <Button className="h-10 sm:h-11 md:h-12 lg:h-14 px-4 sm:px-8 md:px-10 lg:px-12 text-lg sm:text-xl md:text-2xl rounded-full text-blue-400 border-2 border-blue-400 hover:text-white hover:border-blue-600 bg-transparent transition-all duration-300 transform hover:scale-105 hover:bg-blue-400 shadow-xl hover:shadow-2xl hover:shadow-blue-500">
            Get Started
          </Button>
        </Link>
      );
    }

    if (!currentUser && !isLoading) {
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

  return <>{renderButton()}</>;
}
