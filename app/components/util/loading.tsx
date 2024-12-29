import { Logo } from "@/components/global";
import { useTheme } from "next-themes";
import { PropagateLoader } from "react-spinners";

export function Loading({ mounted }: { mounted: boolean }) {
  const { theme } = useTheme();
  if (!mounted) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center mr-8">
        <Logo size={75} />
        <span className="text-foreground text-4xl pb-1">foliarc.</span>
      </div>
      {mounted && <PropagateLoader color={theme === "dark" ? "#ffffff" : "#000"} size={16} />}
    </div>
  );
}
