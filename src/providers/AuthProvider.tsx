"use client";

import React, { createContext, useContext, useEffect, useReducer } from "react";
import { AuthUser } from "@/hooks/useAuth";
import { logoutUser } from "@/app/(auth)/login/_action";

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
};

type AuthAction = 
  | { type: "SET_USER"; user: AuthUser | null }
  | { type: "LOGOUT" };

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "SET_USER":
      return { user: action.user, loading: false };
    case "LOGOUT":
      return { user: null, loading: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    loading: true,
  });

  useEffect(() => {
    const raw = localStorage.getItem("user");
    let currentUser: AuthUser | null = null;
    if (raw) {
      try {
        currentUser = JSON.parse(raw) as AuthUser;
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
        localStorage.removeItem("user");
      }
    }
    dispatch({ type: "SET_USER", user: currentUser });
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    logoutUser();
    dispatch({ type: "LOGOUT" });
  };

  const setUser = (user: AuthUser | null) => {
    dispatch({ type: "SET_USER", user });
  };

  return (
    <AuthContext.Provider value={{ user: state.user, loading: state.loading, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
