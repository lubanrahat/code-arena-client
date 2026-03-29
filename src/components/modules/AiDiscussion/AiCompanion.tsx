"use client";

import { motion } from "framer-motion";
import { MessageSquare, Code2, Cpu, CheckCircle2, Sparkles } from "lucide-react";

export default function AiCompanion() {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-foreground mb-8 tracking-[-0.04em] leading-tight">
              Meet CodeArenaBot: Your <br />
              <span className="text-blue-600 dark:text-blue-500">
                Coding Companion
              </span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground mb-12 font-medium leading-relaxed max-w-xl">
              Engage in real-time coding discussions with CodeArenaBot, now live in the CodeArena workspace.
              Get instant feedback, debug code, and master concepts with 24/7 AI support.
            </p>

            <ul className="space-y-6 mb-12">
              {[
                "Instant logic debugging & explanations",
                "Personalized learning suggestions",
                "Deep dives into complex algorithms",
                "Available 24/7 in your workspace"
              ].map((feature, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 text-foreground font-bold"
                >
                  <div className="shrink-0 w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                  </div>
                  {feature}
                </motion.li>
              ))}
            </ul>

            <button className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-sm">
              Explore CodeArenaBot
            </button>
          </motion.div>

          {/* Chat Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Ambient Shadow */}
            <div className="absolute -inset-4 bg-blue-500/5 rounded-[2.5rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="relative bg-card border border-border rounded-[2rem] overflow-hidden shadow-xl h-[500px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-border bg-card/50 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-card-foreground leading-none mb-1">CodeArenaBot</h4>
                    <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                      Online
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted" />
                  <div className="w-2 h-2 rounded-full bg-muted" />
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] p-4 bg-blue-600 text-primary-foreground rounded-2xl rounded-tr-none text-xs font-medium leading-relaxed shadow-sm">
                    Explain the Time Complexity of Merge Sort in simple terms?
                  </div>
                </div>

                {/* AI Message */}
                <div className="flex justify-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex shrink-0 items-center justify-center order-first">
                    <Cpu className="w-4 h-4 text-foreground/80" />
                  </div>
                  <div className="max-w-[80%] p-4 bg-muted/50 text-foreground rounded-2xl rounded-tl-none text-xs font-medium leading-relaxed border border-border shadow-sm">
                    <p className="mb-2">Merge Sort always has a time complexity of <span className="font-bold">O(n log n)</span>.</p>
                    <p>Imagine you have a stack of 8 cards. You split them in half until you have 8 single cards (that&apos;s the <span className="font-bold">log n</span> part). Then you merge them back together in pairs (that&apos;s the <span className="font-bold">n</span> part).</p>
                  </div>
                </div>

                {/* Coding Suggestion Message */}
                <div className="flex justify-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex shrink-0 items-center justify-center order-first">
                    <Cpu className="w-4 h-4 text-foreground/80" />
                  </div>
                  <div className="max-w-[80%] p-4 bg-muted/50 text-foreground rounded-2xl rounded-tl-none text-xs font-medium leading-relaxed border border-border shadow-sm">
                    <div className="flex items-center gap-2 mb-2 text-foreground/80">
                      <Code2 className="w-4 h-4" />
                      <span className="font-bold uppercase tracking-wider text-[10px]">Code Snippet</span>
                    </div>
                    <pre className="p-3 bg-background rounded-lg text-[10px] font-mono text-muted-foreground border border-border shadow-inner overflow-x-auto">
                      <code>{`void mergeSort(int arr[], int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-border">
                <div className="relative">
                  <input
                    disabled
                    placeholder="Ask LeetBot anything..."
                    className="w-full bg-background border border-border rounded-xl py-3 px-4 text-xs font-medium text-muted-foreground focus:outline-none"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-muted flex items-center justify-center">
                    <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 p-4 bg-card rounded-2xl border border-border shadow-xl z-20"
            >
              <Sparkles className="w-6 h-6 text-blue-500" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
