"use client";

import { motion } from "framer-motion";
import { Bot, Zap } from "lucide-react";

export default function AiHero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 bg-white dark:bg-zinc-950 -z-10" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-linear-to-b from-blue-500/10 via-indigo-500/5 to-transparent pointer-events-none" />
      <div className="absolute top-40 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-60 right-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse" />

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-bold uppercase tracking-[0.25em] mb-12 shadow-2xl shadow-blue-500/5 backdrop-blur-md"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Next-Gen AI Capabilities</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl md:text-9xl font-black text-zinc-900 dark:text-white mb-10 tracking-[-0.05em] leading-[0.9]"
        >
          Revolutionize <br />
          Coding <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">with AI</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 max-w-3xl mx-auto mb-16 font-medium leading-relaxed"
        >
          Chat with <span className="text-zinc-900 dark:text-white font-bold">LeetBot</span> in real-time, now live in your workspace.
          Soon, unlock personalized AI roadmaps and adaptive learning paths.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="group relative px-10 py-5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/20">
            <span className="relative z-10 flex items-center gap-3">
              <Bot className="w-5 h-5" />
              Try CodeArenaBot Now
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity" />
          </button>

          <button className="px-10 py-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:border-indigo-500/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:scale-105 active:scale-95">
            Join Waitlist
          </button>
        </motion.div>
      </div>
    </section>
  );
}
