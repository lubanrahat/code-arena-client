"use client";

import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Loader2, Info } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useAuthContext } from "@/providers/AuthProvider";
import { useSearchParams } from "next/navigation";


export default function PaymentSuccessPage() {
  const { user, setUser } = useAuthContext();
  const searchParams = useSearchParams();

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // The backend redirect verified and saved the payment natively.
    // We just optimistically update the local state if they are still logged in.
    if (sessionId && user && !user.isPremium) {
      const updatedUser = { ...user, isPremium: true };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  }, [user, setUser, sessionId]);

  if (!sessionId) {
    return (
      <div className="flex h-screen items-center justify-center bg-background via-background to-red-500/10 bg-linear-to-b">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md p-10 border border-red-500/50 rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-2xl"
        >
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">❌</span>
          </div>
          <h2 className="text-3xl font-black text-foreground mb-4">No Payment Found</h2>
          <p className="text-red-500 font-medium mb-8">
            Your session could not be located.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-linear-to-r from-red-500 to-orange-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all w-full justify-center"
          >
            Go Back
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center bg-background via-background to-emerald-500/10 bg-linear-to-b">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md p-10 border border-border/50 rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-2xl"
      >
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-emerald-500" />
        </div>
        <h2 className="text-3xl font-black text-foreground mb-4">Payment Successful!</h2>
        <p className="text-muted-foreground mb-4">
          Welcome to Code Arena Pro. Your account has been upgraded.
        </p>
        {!user && (
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 p-3 rounded-lg mb-6 flex flex-col gap-2 items-start text-left text-sm">
             <div className="flex gap-2 items-center font-bold">
               <Info className="w-4 h-4" /> Please Login Again
             </div>
             <p className="text-xs">
               Your browser&apos;s strict privacy policy securely locked your session upon returning from Stripe. Please login to access your new premium features.
             </p>
          </div>
        )}
        <Link
          href={user ? "/problems" : "/login"}
          className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-teal-500/40 hover:scale-105 transition-all w-full justify-center"
        >
          {user ? "Start Coding" : "Login Now"}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </div>
  );
}
