import { Profile, ThemeSwitch } from "@/components/header";
import { ArrowDownUp } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  // Check if the current path includes "dashboard"
  const isDashboard = pathname.includes("/dashboard");

  return (
    <>
      <header
        className={`h-14 lg:h-[60px] px-8 md:px-16 pt-4 w-full z-[999] fixed md:min-w-[1200px] min-w-[360px] text-accent ${
          isDashboard ? "border-b lg:h-[65px] h-[65px] pb-4" : ""
        }`}>
        <nav className="flex items-center h-full flex-row justify-start gap-16">
          <Link className={`flex flex-row gap-2 items-center ${isDashboard ? "text-foreground" : "text-foreground"}`} href="/">
            {isDashboard ? (
              <></>
            ) : (
              <>
                <ArrowDownUp />
                <span className="text-foreground">
                  Portfolio<span className="text-red-500">Share</span>
                </span>
              </>
            )}
          </Link>
          <div className="ml-auto flex gap-2 flex-row-reverse">
            <Profile />
            <ThemeSwitch />
          </div>
        </nav>
      </header>
    </>
  );
}
