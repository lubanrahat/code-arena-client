"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/providers/AuthProvider";

export interface AuthUser {
  id: string;
  email: string;
  role: "USER" | "ADMIN";
  [key: string]: unknown;
}

export function useAuth(requiredRole?: "USER" | "ADMIN") {
  const router = useRouter();
  const { user, loading } = useAuthContext();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (requiredRole && user.role !== requiredRole) {
      if (user.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    }
  }, [user, loading, router, requiredRole]);

  return { user, loading };
}

export function useAuthUser() {
  const { user, loading } = useAuthContext();
  return { user, loading };
}