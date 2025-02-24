"use client";
import { useMount } from "@/lib/hooks";
import { useTheme } from "next-themes";

interface LogoProps {
  size?: number;
}

export function Logo({ size = 50 }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const mounted = useMount();
  if (!mounted) return null;

  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="-50 0 290 290"
      preserveAspectRatio="xMidYMid meet"
      style={{ color: resolvedTheme === "dark" ? "white" : "black" }} // Use resolvedTheme here
    >
      <metadata>Created by potrace 1.10, written by Peter Selinger 2001-2011</metadata>
      <g transform="translate(0.000000,300.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
        <path d="M1475 2209 c-227 -33 -336 -119 -462 -364 -106 -208 -113 -234 -113 -420 l0 -157 198 4 c196 3 197 3 250 32 105 58 131 119 132 304 l0 132 118 -1 c72 -1 105 -4 87 -8 -49 -12 -89 -37 -128 -80 -59 -65 -67 -96 -67 -252 l0 -139 -205 0 c-228 0 -253 -5 -314 -63 -48 -46 -71 -101 -71 -172 0 -77 24 -129 84 -182 141 -124 376 -52 469 145 25 53 30 79 35 167 l5 105 41 2 c23 0 142 1 266 2 l225 1 3 85 c8 197 -25 286 -127 347 -29 17 -65 34 -80 36 -15 2 -8 5 20 6 167 5 285 130 263 277 -12 85 -89 170 -173 194 -43 12 -371 11 -456 -1z" />
      </g>
    </svg>
  );
}
