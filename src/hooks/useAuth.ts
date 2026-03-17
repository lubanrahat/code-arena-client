"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export interface AuthUser {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  [key: string]: unknown;
}

function getStoredUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function useAuth(requiredRole?: "USER" | "ADMIN") {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      try {
        const currentUser = getStoredUser();

        if (!currentUser) {
          router.push("/login");
          return;
        }

        if (requiredRole && currentUser.role !== requiredRole) {
          if (currentUser.role === "ADMIN") {
            router.push("/admin");
          } else {
            router.push("/");
          }
          return;
        }

        setUser(currentUser);
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, requiredRole]);

  return { user, loading };
}