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
import { InputFormItem } from "@/components/util";
import { useUser } from "@auth0/nextjs-auth0/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const PortfolioSchema = z.object({
  name: z.string().nonempty("Name is required"),
  url: z.string().url("Invalid URL format"),
});

export function Hero() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, error, isLoading } = useUser();
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const form = useForm<z.infer<typeof PortfolioSchema>>({
    mode: "onChange",
    resolver: zodResolver(PortfolioSchema),
    defaultValues: {
      name: "",
      url: "",
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof PortfolioSchema>) => {
    console.log(values);
    console.log("Portfolio submitted!");
    setHasSubmitted(true);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {}, [form.watch()]);

  return (
    <div className="flex flex-col items-center text-center px-4 py-16 w-full text-foreground relative z-10">
      <a href="/changelog" className="mx-auto mb-4 flex w-fit items-center rounded-full bg-muted px-4 py-2 text-sm">
        <span className="mr-1 font-semibold">What&#x27;s new</span>| Read more
        <ArrowRight className="ml-2 size-4" />
      </a>
      <h1 className="text-6xl font-extrabold mb-4">Your Work, Your Stage</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-lg">
        Showcase your portfolios and projects, learn from others, and be part of a vibrant creative community.
      </p>
      <div className="flex space-x-4">
        {!user ? (
          <Link href="/api/auth/login">
            <Button className="px-6 text-blue-400 border-2 border-blue-400 hover:text-white hover:border-blue-600 bg-transparent transition-all duration-300 transform hover:scale-105 hover:bg-blue-400 shadow-xl hover:shadow-2xl hover:shadow-blue-500">
              Get Started
            </Button>
          </Link>
        ) : !hasSubmitted ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="px-6 text-white bg-green-500 border-2 border-green-500 hover:bg-green-600 shadow-lg transition-all duration-300 transform hover:scale-105 relative group">
                Submit Your Portfolio
                <span className="absolute inset-0 rounded-lg bg-green-400 opacity-0 group-hover:opacity-40 transition-opacity duration-300 blur-md"></span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Submit a portfolio</DialogTitle>
                <DialogDescription>
                  Fill out your name and a link to your portfolio or GitHub. Approval may take some time. Click{" "}
                  <strong>submit</strong> when done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form className="mt-4">
                  <div className="flex flex-col w-full gap-4">
                    <InputFormItem
                      label="Your Name"
                      id="name"
                      placeholder="Hasnan Patel"
                      form={form}
                      required
                      description="Enter your full name."
                    />
                    <InputFormItem
                      label="Portfolio URL"
                      id="url"
                      form={form}
                      required
                      description="Insert a link to your portfolio or project."
                      placeholder="https://www.example.com"
                    />
                  </div>
                </form>
              </Form>
              <DialogFooter>
                <Button onClick={form.handleSubmit(handleFormSubmit)}>Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : null}
      </div>
    </div>
  );
}
