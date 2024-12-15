import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

export const getInitials = (name: string) => {
  if (!name.trim()) return "A";
  const words = name.match(/\b\w/g) || [];
  return words.length > 1 ? words.slice(0, 2).join("").toUpperCase() : name[0].toUpperCase();
};
