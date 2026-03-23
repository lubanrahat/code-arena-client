"use client";

import { motion } from "motion/react";
import { Code2, Database, Layout } from "lucide-react";

export function VisualStack() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center perspective-[1000px]">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-orange-500/20 blur-[100px] rounded-full scale-75 animate-pulse" />

      {/* 3D Floating Cards */}
      <motion.div
        initial={{ rotateY: -20, rotateX: 10, y: 0 }}
        animate={{
          rotateY: [-20, -10, -20],
          rotateX: [10, 20, 10],
          y: [0, -20, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20 w-64 h-80 bg-white/10 dark:bg-neutral-900/40 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col p-6 space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <Code2 size={20} />
          </div>
          <div className="h-2 w-24 bg-neutral-200 dark:bg-neutral-700 rounded-full" />
        </div>
        <div className="space-y-2 pt-4">
          <div className="h-2 w-full bg-neutral-100 dark:bg-neutral-800 rounded-full" />
          <div className="h-2 w-[80%] bg-neutral-100 dark:bg-neutral-800 rounded-full" />
          <div className="h-2 w-[90%] bg-neutral-100 dark:bg-neutral-800 rounded-full" />
        </div>
        <div className="mt-auto h-12 w-full bg-orange-500/10 border border-orange-500/20 rounded-xl" />
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, 15, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-10 -right-10 z-10 w-24 h-24 bg-blue-500/10 backdrop-blur-lg border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500 shadow-xl"
      >
        <Database size={32} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, -40, 0],
          rotate: [0, -20, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -bottom-5 -left-10 z-30 w-32 h-32 bg-purple-500/10 backdrop-blur-lg border border-purple-500/20 rounded-3xl flex items-center justify-center text-purple-500 shadow-xl"
      >
        <Layout size={40} />
      </motion.div>

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-0 left-20 w-4 h-4 rounded-full bg-orange-400 blur-sm"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 right-0 w-6 h-6 rounded-full bg-blue-400 blur-md"
      />
    </div>
  );
}
