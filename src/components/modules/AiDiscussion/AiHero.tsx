"use client";

import { motion } from "framer-motion";
import { Bot, Zap } from "lucide-react";

export default function AiHero() {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden bg-background">

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-muted text-muted-foreground border border-border text-[11px] font-bold uppercase tracking-[0.25em] mb-12 shadow-sm backdrop-blur-md"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>Next-Gen AI Capabilities</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl md:text-9xl font-black text-foreground mb-10 tracking-[-0.05em] leading-[0.9]"
        >
          Revolutionize <br />
          Coding <span className="text-blue-600 dark:text-blue-500">with AI</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-16 font-medium leading-relaxed"
        >
          Chat with <span className="text-foreground font-bold">LeetBot</span> in real-time, now live in your workspace.
          Soon, unlock personalized AI roadmaps and adaptive learning paths.
        </motion.p>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="group relative px-10 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-sm">
            <span className="relative z-10 flex items-center gap-3">
              <Bot className="w-5 h-5" />
              Try CodeArenaBot Now
            </span>
          </button>

          <button className="px-10 py-5 bg-background border border-input text-foreground rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:bg-accent hover:text-accent-foreground hover:scale-105 active:scale-95">
            Join Waitlist
          </button>
        </motion.div>
      </div>
    </section>
  );
}
