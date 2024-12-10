import { ArrowDownUp } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <>
      <header className="h-14 lg:h-[60px] px-8 pt-4 w-full z-[999] fixed md:min-w-[1200px] min-w-[360px] text-accent">
        <nav className="flex items-center h-full flex-row justify-between px-16">
          <Link className="flex flex-row gap-2 items-center text-foreground" href="/">
            <ArrowDownUp />
            <span className="text-foreground">
              Portfolio<span className="text-red-500">Share</span>
            </span>
          </Link>
          <div className="flex md:gap-2 flex-row-reverse">
            <Button asChild>
              <Link href="/api/auth/login">Login</Link>
            </Button>
          </div>
        </nav>
      </header>
    </>
  );
}
