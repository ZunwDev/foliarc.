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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export function Hero() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, error, isLoading } = useUser();
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const handleSubmit = () => {
    console.log("Portfolio submitted!");
    setHasSubmitted(true);
  };

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
        {
          !user ? (
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
                <div className="flex flex-col gap-6 py-4">
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="name">Your Name</Label>
                    <Input id="name" placeholder="Hasnan Patel" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label htmlFor="url">URL</Label>
                    <Input id="url" placeholder="www.yourportfolio.com" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          ) : null /* Hide the button entirely if submitted */
        }
      </div>
    </div>
  );
}
