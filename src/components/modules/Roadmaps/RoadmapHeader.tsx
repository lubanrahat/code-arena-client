"use client";

import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";

interface RoadmapHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
}

const filters = ["All", "Beginner", "Intermediate", "Advanced"];

export default function RoadmapHeader({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
}: RoadmapHeaderProps) {
  return (
    <section className="relative pt-32 pb-40 overflow-hidden">
      {/* CodeArena Brand Background (Indigo/Blue/Violet) */}
      <div className="absolute inset-0 bg-white dark:bg-zinc-950 -z-10" />
      
      {/* Ambient Glows - Matching Hero Section */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-linear-to-b from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold uppercase tracking-[0.25em] mb-10 shadow-2xl shadow-indigo-500/5 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>Curated Learning Paths</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-8xl font-black text-zinc-900 dark:text-white mb-8 tracking-[-0.04em] leading-tight"
        >
          Master your <br />
          <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
            Coding Journey
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto mb-16 font-medium leading-relaxed"
        >
          Structured, industry-level roadmaps to take you from hello world to professional engineer.
        </motion.p>

        {/* Search and Filters with Premium Styling */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-8 max-w-4xl mx-auto"
        >
          {/* Search Bar */}
          <div className="relative w-full md:w-[600px] group">
            <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-indigo-600 rounded-[2rem] blur-xl opacity-20 group-focus-within:opacity-40 transition-opacity duration-500" />
            <div className="relative flex items-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-[2rem] h-16 px-6 shadow-2xl shadow-indigo-500/5 transition-all">
              <Search className="w-6 h-6 text-zinc-400 group-focus-within:text-indigo-500 transition-colors mr-4" />
              <input
                type="text"
                placeholder="What do you want to learn today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-zinc-900 dark:text-white font-bold text-lg focus:outline-hidden placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
              />
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-indigo-600 text-white shadow-xl shadow-indigo-500/40 scale-105 border-transparent"
                    : "bg-white dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-100 dark:border-zinc-800 hover:border-indigo-500/50 hover:text-indigo-500"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
