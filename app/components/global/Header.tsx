import { Profile, ThemeSwitch } from "@/components/header";
import { ArrowDownUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const isDashboard = pathname.includes("/dashboard");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`h-14 px-8 md:px-16 w-full z-40 fixed min-w-[360px] transition-all transition-colors duration-300 items-center ${
          isDashboard ? "border-b h-[65px]" : ""
        } ${isScrolled ? "bg-background/50 shadow-md border-b" : ""}`}>
        <nav className="flex items-center h-full flex-row justify-start gap-16">
          {isDashboard ? (
            <></>
          ) : (
            <Link href="/" className="flex flex-row gap-2 items-center">
              <ArrowDownUp />
              <span className="text-foreground">
                Portfolio<span className="text-blue-500">Share</span>
              </span>
            </Link>
          )}

          <div className="ml-auto flex gap-2 flex-row-reverse">
            <Profile />
            <ThemeSwitch />
          </div>
        </nav>
      </header>
    </>
  );
}
