"use client";

import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

export const LoaderOne = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center gap-1.5", className)}>

      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-3 w-3 rounded-full bg-gray-400"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
