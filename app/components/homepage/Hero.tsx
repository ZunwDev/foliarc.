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

export default function Hero() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user, error, isLoading } = useUser();
  return (
    <div className="flex flex-col items-center text-center px-4 py-16 w-full text-foreground relative z-10">
      <h1 className="text-6xl font-extrabold mb-4">Discover & Share Portfolios</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-lg">
        Share your work, get feedback, and grow with a vibrant creative community.
      </p>
      <div className="flex space-x-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="px-6 text-blue-400 border-2 border-blue-400 hover:text-white hover:border-blue-600 bg-transparent transition-all duration-300 transform hover:scale-105 hover:bg-blue-400 shadow-xl hover:shadow-2xl hover:shadow-blue-500">
              Get Started
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
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
