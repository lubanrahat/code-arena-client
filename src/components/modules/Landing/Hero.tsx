"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Code2, Globe, CheckCircle, Star, Terminal, Cpu, Wifi } from "lucide-react";
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";

const codeSnippets = [
  {
    lang: "python",
    name: "climbing_stairs.py",
    label: "Python",
    color: "#3b82f6",
    code: `def climbStairs(n: int) -> int:
    # Dynamic programming - O(1) space
    a, b = 1, 1
    for _ in range(n - 1):
        a, b = b, a + b
    return b

# Runtime: 32ms | Beats 98.4% of solutions`,
  },
  {
    lang: "javascript",
    name: "two_sum.js",
    label: "JavaScript",
    color: "#f59e0b",
    code: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement))
      return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
}
// Runtime: 56ms | Beats 96.2% of solutions`,
  },
  {
    lang: "cpp",
    name: "binary_search.cpp",
    label: "C++",
    color: "#8b5cf6",
    code: `int search(vector<int>& nums, int target) {
  int lo = 0, hi = nums.size() - 1;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    if (nums[mid] == target) return mid;
    else if (nums[mid] < target) lo = mid+1;
    else hi = mid - 1;
  }
  return -1;
}
// Runtime: 4ms | Beats 99.1% of solutions`,
  },
  {
    lang: "go",
    name: "linked_list.go",
    label: "Go",
    color: "#10b981",
    code: `func reverseList(head *ListNode) *ListNode {
    var prev *ListNode
    curr := head
    for curr != nil {
        next := curr.Next
        curr.Next = prev
        prev = curr
        curr = next
    }
    return prev
}
// Runtime: 0ms | Beats 100% of solutions`,
  },
];

const statsItems = [
  { label: "Problems Solved", value: "50K+" },
  { label: "Active Users", value: "10K+" },
  { label: "Avg Rating", value: "4.9★" },
];

export default function Hero() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const currentSnippet = codeSnippets[snippetIndex];
  const isDone = isTyping && displayedCode.length === currentSnippet.code.length;

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentCode = currentSnippet.code;

    if (isTyping) {
      if (displayedCode.length < currentCode.length) {
        timeout = setTimeout(() => {
          setDisplayedCode(currentCode.slice(0, displayedCode.length + 1));
        }, 22);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2500);
      }
    } else {
      if (displayedCode.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedCode(displayedCode.slice(0, -1));
        }, 8);
      } else {
        timeout = setTimeout(() => {
          setSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
          setIsTyping(true);
        }, 400);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedCode, isTyping, currentSnippet.code]);

  return (
    <div className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white dark:bg-zinc-950">
      {/* Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, transparent 30%, hsl(0,0%,100%) 80%), linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none dark:block hidden"
        style={{
          backgroundImage: `radial-gradient(circle at center, transparent 30%, hsl(240,10%,4%) 80%), linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
        }}
      />

      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* LEFT COLUMN */}
          <div className="flex-1 text-center lg:text-left max-w-xl mx-auto lg:mx-0">

            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-bold uppercase tracking-[0.25em] mb-8"
            >
              <Zap className="w-3 h-3 fill-current" />
              <span>Elite Coding Platform</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.04em] text-zinc-900 dark:text-white mb-6 leading-[1.05]"
            >
              Master Algorithms.
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
                Land Your Dream Job.
              </span>
            </motion.h1>

            {/* Sub-heading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-10 leading-relaxed font-medium"
            >
              CodeArena is a premium practice environment built for serious engineers. Tackle curated DSA challenges, get AI-powered feedback, and track your growth in real time.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-14"
            >
              <Link
                href="/register"
                className="group relative inline-flex items-center gap-2.5 h-13 px-8 text-sm font-bold text-white rounded-2xl overflow-hidden shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
              >
                {/* shimmer overlay */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                Start for Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/problems"
                className="inline-flex items-center gap-2 h-13 px-8 text-sm font-bold text-zinc-700 dark:text-zinc-200 rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md hover:border-zinc-400 dark:hover:border-zinc-500 hover:bg-white dark:hover:bg-zinc-900 transition-all duration-300"
              >
                Browse Problems
              </Link>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
            >
              {/* Avatars */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {["from-sky-400 to-blue-500", "from-violet-400 to-purple-600", "from-emerald-400 to-teal-500", "from-amber-400 to-orange-500"].map((g, i) => (
                    <div
                      key={i}
                      className={cn("w-9 h-9 rounded-full border-2 border-white dark:border-zinc-950 bg-gradient-to-br shadow-sm", g)}
                    />
                  ))}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Trusted by <span className="text-zinc-900 dark:text-white font-black">10,000+</span> developers</p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden sm:block w-px h-10 bg-zinc-200 dark:bg-zinc-800" />

              {/* Stats */}
              <div className="flex items-center gap-6">
                {statsItems.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-base font-black text-zinc-900 dark:text-white tracking-tight">{s.value}</div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Glass IDE */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] as any }}
            className="flex-1 w-full max-w-[580px] lg:max-w-none"
          >
            <div
              className="relative rounded-[2rem] overflow-hidden"
              style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.08), 0 32px 64px -12px rgba(0,0,0,0.25), 0 0 80px rgba(99,102,241,0.08)" }}
            >
              {/* IDE Chrome */}
              <div className="bg-zinc-900 px-5 py-3.5 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSnippet.lang}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="flex items-center gap-2.5 px-4 py-1 rounded-full bg-white/5 border border-white/8"
                  >
                    <Code2 className="w-3.5 h-3.5" style={{ color: currentSnippet.color }} />
                    <span className="text-[11px] font-mono font-bold text-zinc-300 tracking-wide">{currentSnippet.name}</span>
                  </motion.div>
                </AnimatePresence>

                {/* Language pills */}
                <div className="flex items-center gap-1.5">
                  {codeSnippets.map((s, i) => (
                    <div
                      key={s.lang}
                      className="w-2 h-2 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: i === snippetIndex ? s.color : "rgba(255,255,255,0.2)",
                        boxShadow: i === snippetIndex ? `0 0 8px ${s.color}` : "none",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Code Area */}
              <div className="bg-[#1a1b26] relative min-h-[320px] overflow-hidden">
                {/* Line numbers gutter */}
                <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col items-center pt-6 text-zinc-700 select-none border-r border-white/5">
                  {Array.from({ length: 10 }, (_, i) => (
                    <span key={i} className="block h-[1.6rem] leading-[1.6rem] text-[11px] font-mono">{i + 1}</span>
                  ))}
                </div>

                <div className="pl-14 pr-5 py-6">
                  <SyntaxHighlighter
                    language={currentSnippet.lang}
                    style={oneDark}
                    customStyle={{
                      background: "transparent",
                      padding: 0,
                      margin: 0,
                      fontSize: "13px",
                      lineHeight: "1.6rem",
                      overflow: "visible",
                    }}
                    codeTagProps={{ style: { background: "transparent", fontFamily: "'Fira Code', 'JetBrains Mono', monospace" } }}
                  >
                    {displayedCode}
                  </SyntaxHighlighter>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.9, repeat: Infinity }}
                    className="inline-block w-[2px] h-[1.1em] align-middle ml-0.5"
                    style={{ backgroundColor: currentSnippet.color }}
                  />
                </div>

                {/* Success Glow when typing is done */}
                <AnimatePresence>
                  {isDone && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at bottom right, ${currentSnippet.color}18, transparent 70%)` }}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Status Bar */}
              <div className="bg-zinc-900/90 border-t border-white/5 px-5 py-2.5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Ready</span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentSnippet.label}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest"
                    >
                      {currentSnippet.label}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <div className="flex items-center gap-4 text-zinc-600">
                  <div className="flex items-center gap-1">
                    <Cpu className="w-3 h-3" />
                    <span className="text-[10px] font-mono">2.3ms</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Terminal className="w-3 h-3" />
                    <span className="text-[10px] font-mono">v8·LTS</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wifi className="w-3 h-3" />
                    <span className="text-[10px] font-mono">12ms</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating "Accepted" Badge */}
            <AnimatePresence>
              {isDone && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="absolute -bottom-4 -right-4 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-emerald-500 text-white font-bold text-sm shadow-2xl shadow-emerald-500/40"
                >
                  <CheckCircle className="w-4 h-4 fill-white/20 stroke-white" />
                  Accepted ✓
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400"
        >
          <Globe className="w-4 h-4 animate-bounce" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Explore</span>
        </motion.div>
      </div>
    </div>
  );
}
