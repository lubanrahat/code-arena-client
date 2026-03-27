"use client";

import { motion } from "framer-motion";
import { MessageSquare, Code2, Cpu, CheckCircle2, Sparkles } from "lucide-react";

export default function AiCompanion() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-8 tracking-[-0.04em] leading-tight">
              Meet CodeArenaBot: Your <br />
              <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
                Coding Companion
              </span>
            </h2>

            <p className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-12 font-medium leading-relaxed max-w-xl">
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
                  className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300 font-bold"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                  </div>
                  {feature}
                </motion.li>
              ))}
            </ul>

            <button className="px-8 py-4 bg-zinc-900 dark:bg-zinc-800 text-white rounded-xl font-bold transition-all hover:bg-zinc-800 dark:hover:bg-zinc-700 hover:scale-105 active:scale-95">
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
            <div className="absolute -inset-4 bg-blue-500/20 rounded-[2.5rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />

            <div className="relative bg-zinc-900 border border-zinc-800 rounded-[2rem] overflow-hidden shadow-2xl h-[500px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-linear-to-tr from-blue-600 to-indigo-600 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-none mb-1">CodeArenaBot</h4>
                    <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                      Online
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                  <div className="w-2 h-2 rounded-full bg-zinc-800" />
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[80%] p-4 bg-indigo-600 text-white rounded-2xl rounded-tr-none text-xs font-medium leading-relaxed shadow-lg">
                    Explain the Time Complexity of Merge Sort in simple terms?
                  </div>
                </div>

                {/* AI Message */}
                <div className="flex justify-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex flex-shrink-0 items-center justify-center order-first">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="max-w-[80%] p-4 bg-zinc-800/50 text-zinc-300 rounded-2xl rounded-tl-none text-xs font-medium leading-relaxed border border-zinc-700/50">
                    <p className="mb-2">Merge Sort always has a time complexity of <span className="text-white font-bold">O(n log n)</span>.</p>
                    <p>Imagine you have a stack of 8 cards. You split them in half until you have 8 single cards (that&apos;s the <span className="text-white font-bold">log n</span> part). Then you merge them back together in pairs (that&apos;s the <span className="text-white font-bold">n</span> part).</p>
                  </div>
                </div>

                {/* Coding Suggestion Message */}
                <div className="flex justify-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex flex-shrink-0 items-center justify-center order-first">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="max-w-[80%] p-4 bg-zinc-800/50 text-zinc-300 rounded-2xl rounded-tl-none text-xs font-medium leading-relaxed border border-zinc-700/50">
                    <div className="flex items-center gap-2 mb-2 text-indigo-400">
                      <Code2 className="w-4 h-4" />
                      <span className="font-bold uppercase tracking-wider text-[10px]">Code Snippet</span>
                    </div>
                    <pre className="p-3 bg-zinc-950 rounded-lg text-[10px] font-mono text-indigo-300 border border-zinc-800">
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
              <div className="p-4 border-t border-zinc-800">
                <div className="relative">
                  <input
                    disabled
                    placeholder="Ask LeetBot anything..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-xs font-medium text-zinc-500"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-lg bg-indigo-600/20 flex items-center justify-center">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 p-4 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-2xl z-20"
            >
              <Sparkles className="w-6 h-6 text-indigo-600" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
