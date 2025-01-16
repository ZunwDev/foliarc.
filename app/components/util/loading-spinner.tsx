"use client";

import { useTheme } from "next-themes";
import { PropagateLoader } from "react-spinners";

export function LoadingSpinner({ size = 16, mounted }: { size?: number; mounted: boolean }) {
  const { resolvedTheme } = useTheme();
  return mounted ? <PropagateLoader color={resolvedTheme === "dark" ? "#ffffff" : "#000"} size={size} /> : null;
}
