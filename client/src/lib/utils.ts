import type { LocaleStorageAuthData } from "@/types/auth";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { redirect } from "@tanstack/react-router"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getAuthData = () => {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("user");

  if (!token || !userStr) return null;

  try {
    const user = JSON.parse(userStr);
    return { token, user };
  } catch {
    return null;
  }
};

export const isAuthenticated = () => {
  return !!getAuthData();
};

// Helper function for creating authenticated routes
export const requireAuth = (context: { auth: LocaleStorageAuthData | null }) => {
  if (!context.auth) {
    throw redirect({
      to: '/login',
    })
  }
}

// Helper function for redirecting authenticated users away from auth pages
export const redirectIfAuthenticated = (context: { auth: LocaleStorageAuthData | null }) => {
  if (context.auth) {
    throw redirect({
      to: '/',
    })
  }
}
