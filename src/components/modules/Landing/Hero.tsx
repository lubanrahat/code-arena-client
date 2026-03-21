"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Zap, Code2, Globe } from "lucide-react";
import { useState, useEffect } from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";


const codeSnippets = [

  {
    lang: "cpp",
    name: "solution.cpp",
    code: `#include <iostream>
using namespace std;

int main() {
    cout << "Master C++ today!" << endl;
    return 0;
}`,
  },
  {
    lang: "javascript",
    name: "script.js",
    code: `const arena = "Code Arena";

function greet() {
    console.log(\`Level up on \${arena}\`);
}

greet();`,
  },
  {
    lang: "python",
    name: "main.py",
    code: `def prepare_for_interview():
    skills = ["DSA", "System Design"]
    for s in skills:
        print(f"Mastering {s}...")

prepare_for_interview()`,
  },
  {
    "lang" : "go",
    "name" : "main.go",
    "code" : `package main

import "fmt"

func main() {
    fmt.Println("Master Go today!")
}`,
  }
];

export default function Hero() {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentCode = codeSnippets[snippetIndex].code;
    
    if (isTyping) {
      if (displayedCode.length < currentCode.length) {
        timeout = setTimeout(() => {
          setDisplayedCode(currentCode.slice(0, displayedCode.length + 1));
        }, 30);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 3000);
      }
    } else {
      if (displayedCode.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedCode(displayedCode.slice(0, -1));
        }, 15);
      } else {
        timeout = setTimeout(() => {
          setSnippetIndex((prev) => (prev + 1) % codeSnippets.length);
          setIsTyping(true);
        }, 500);
      }
    }


    return () => clearTimeout(timeout);
  }, [displayedCode, isTyping, snippetIndex]);

  return (
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-6"
          >
            <Zap className="w-3 h-3 fill-current" />
            <span>The Future of Coding Practice</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.1]"
          >
            Master the Art of <br />
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Algorithmic Excellence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-10 max-w-2xl leading-relaxed"
          >
            Elevate your engineering career with CodeArena. Sharpen your skills with curated challenges, expert editorials, and real-time performance tracking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Button asChild size="lg" className="h-12 px-8 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl shadow-blue-500/20 rounded-full group">
              <Link href="/register">
                Start Coding Now
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-full border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
              <Link href="/problems">
                Explore Problems
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Visual Element: Dynamic Multi-Language Terminal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-20 container mx-auto px-6 max-w-4xl"
      >
        <div className="relative rounded-3xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl p-3">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-4 bg-zinc-50/50 dark:bg-zinc-900/30 border-b border-zinc-200/50 dark:border-zinc-800/50 rounded-t-[20px]">
             <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/60" />
                <div className="w-3 h-3 rounded-full bg-amber-400/60" />
                <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
             </div>
             
             <div className="flex items-center gap-3 bg-zinc-200/50 dark:bg-zinc-800/50 px-3 py-1 rounded-full border border-zinc-300/30 dark:border-zinc-700/30">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={codeSnippets[snippetIndex].lang}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-2"
                  >
                    <Code2 className="w-3.5 h-3.5 text-blue-500" />
                    <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                      {codeSnippets[snippetIndex].name}
                    </span>
                  </motion.div>
                </AnimatePresence>
             </div>

             <div className="flex items-center gap-2 opacity-0 md:opacity-100">
                <Globe className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-[10px] font-mono text-zinc-500">utf-8</span>
             </div>
          </div>

          {/* Code Area */}
          <div className="relative min-h-[380px] bg-zinc-50/30 dark:bg-zinc-900/10 p-8 rounded-b-[20px] font-mono text-sm leading-relaxed overflow-hidden">
             {/* Line Numbers */}
             <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col items-center py-8 text-zinc-300 dark:text-zinc-700 border-r border-zinc-200/20 dark:border-zinc-800/20 select-none">
                {[1,2,3,4,5,6,7,8,9,10].map(n => (
                  <span key={n} className="h-6 leading-6 text-[10px]">{n}</span>
                ))}
             </div>

             {/* Code Content */}
             <div className="pl-8 relative">
                <SyntaxHighlighter
                  language={codeSnippets[snippetIndex].lang}
                  style={oneDark}

                  customStyle={{
                    background: "transparent",
                    padding: 0,
                    margin: 0,
                    fontSize: "inherit",
                    lineHeight: "inherit",
                    overflow: "visible",
                  }}
                  codeTagProps={{
                    style: {
                       background: "transparent",
                       fontFamily: "inherit",
                    }
                  }}
                >
                  {displayedCode}
                </SyntaxHighlighter>
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="inline-block w-2 h-4.5 bg-blue-500 ml-0.5 align-middle"
                />
             </div>


             {/* Decorative Background Elements */}
             <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
             <div className="absolute -left-20 -top-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
