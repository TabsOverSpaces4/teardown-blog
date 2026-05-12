import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export const siteConfig = {
  name: "Unboxd",
  description: "Weekly product teardowns by Harsh, Vamsi & David. We rip apart competing products so you don't have to.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://unboxd.blog",
  ogImage: "/og-default.png",
  links: {
    twitter: "https://twitter.com/unboxd",
  },
};
