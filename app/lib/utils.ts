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

export function formatISODate(isoDate: string, locale = "en-US"): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  };

  return new Date(isoDate).toLocaleString(locale, options);
}
