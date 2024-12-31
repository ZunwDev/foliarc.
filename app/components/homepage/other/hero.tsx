"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { InputFormItem, MultiSelectFormItem } from "@/components/util";
import { useFetchUser } from "@/lib/api/hooks";
import { technologies } from "@/lib/constants";
import { useUser } from "@auth0/nextjs-auth0/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const PortfolioSchema = z.object({
  url: z.string().url("Invalid URL format"),
  technologies: z.array(z.object({ value: z.string(), label: z.string() })).min(1, "At least one tag must be selected"),
});

export function Hero() {
  const { user } = useUser();
  const { data: fetchedUsers, isLoading } = useFetchUser(user?.sub || "", "id");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentUser = fetchedUsers?.[0] || null;

  const form = useForm<z.infer<typeof PortfolioSchema>>({
    mode: "onChange",
    resolver: zodResolver(PortfolioSchema),
    defaultValues: {
      url: "",
      technologies: [],
    },
  });

  const handleFormSubmit = (values: z.infer<typeof PortfolioSchema>) => {
    console.log(values);
    setHasSubmitted(true);
  };

  const renderButton = () => {
    if (!mounted || isLoading) {
      return <Skeleton className="h-10 sm:h-11 md:h-12 lg:h-14 w-48 rounded-full"></Skeleton>;
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
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-10 sm:h-11 md:h-12 lg:h-14 px-4 sm:px-8 md:px-10 lg:px-12 text-lg sm:text-xl md:text-2xl rounded-full text-white bg-blue-600 border-2 border-blue-600 hover:bg-blue-700 shadow-lg transition-all duration-300 transform hover:scale-105 relative group">
              Submit Your Work
              <span className="absolute inset-0 rounded-full bg-blue-600 opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-md"></span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Submit Your Work</DialogTitle>
              <DialogDescription>
                Fill out your name and a link to your portfolio, project, or GitHub. Approval may take some time. Click{" "}
                <strong>submit</strong> when done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form className="mt-4">
                <div className="flex flex-col w-full gap-4">
                  <InputFormItem
                    label="Portfolio URL"
                    id="url"
                    form={form}
                    required
                    description="Insert a link to your portfolio or project."
                    placeholder="https://www.example.com"
                  />
                  <MultiSelectFormItem
                    id="technologies"
                    label="Technologies"
                    placeholder="Choose technologies..."
                    description="Select one or more technologies you use in your project/portfolio."
                    form={form}
                    data={technologies}
                    required
                  />
                </div>
              </form>
            </Form>
            <DialogFooter>
              <Button onClick={form.handleSubmit(handleFormSubmit)}>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
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
