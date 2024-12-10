import { Button } from "../ui/button";

export default function Hero() {
  return (
    <div className="flex flex-col items-center text-center px-4 py-16 w-full text-foreground relative">
      <h1 className="text-6xl font-extrabold mb-4">Discover & Share Portfolios</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-lg">
        Share your work, get feedback, and grow with a vibrant creative community.
      </p>
      <div className="flex space-x-4">
        <Button className="px-6 py-3 z-10">Get Started</Button>
        <Button variant="outline" className="px-6 py-3 z-10">
          Learn More
        </Button>
      </div>
    </div>
  );
}
