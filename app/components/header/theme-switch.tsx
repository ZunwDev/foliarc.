"use client";

import { Button } from "@/components/ui/button";
import { useMount } from "@/lib/hooks";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useMount();
  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle dark mode">
      {resolvedTheme === "dark" ? <Sun className="text-foreground" /> : <Moon className="text-foreground" />}
    </Button>
  );
}
