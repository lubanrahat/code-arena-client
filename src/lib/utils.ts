import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getUserInitials = (name: string): string => {
  return name?.trim().split(/\s+/).slice(0, 2).map((w) => w[0]?.toUpperCase() || "").join("");
};

export const getRoleBadgeColor = (role: string): string => {
  switch (role) {
    case "ADMIN":
      return "bg-linear-to-r from-purple-500 to-pink-500";
    default:
      return "bg-linear-to-r from-blue-500 to-cyan-500";
  }
};
