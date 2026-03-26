"use client";

import { motion } from "framer-motion";
import { XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { toast } from "sonner";

export default function PaymentCancelPage() {
  useEffect(() => {
    toast.error("Payment process was cancelled.");
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-background via-background to-rose-500/10 bg-linear-to-b">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md p-10 border border-border/50 rounded-2xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm shadow-2xl"
      >
        <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-10 h-10 text-rose-500" />
        </div>
        <h2 className="text-3xl font-black text-foreground mb-4">Payment Cancelled</h2>
        <p className="text-muted-foreground mb-8">
          The payment process was cancelled before completion. Don&apos;t worry, you haven&apos;t been charged.
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold py-3 px-8 rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-105 transition-all w-full justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
          Return to Pricing
        </Link>
      </motion.div>
    </div>
  );
}
