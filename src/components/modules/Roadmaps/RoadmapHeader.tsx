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
    <section className="relative pt-32 pb-40 overflow-hidden bg-muted/30 border-b border-border">
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] font-bold uppercase tracking-[0.25em] mb-10 shadow-sm backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 fill-current" />
          <span>Curated Learning Paths</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-6xl md:text-8xl font-black text-foreground mb-8 tracking-[-0.04em] leading-tight"
        >
          Master your <br />
          <span className="text-blue-600 dark:text-blue-500">
            Coding Journey
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-16 font-medium leading-relaxed"
        >
          Structured, industry-level roadmaps to take you from hello world to professional engineer.
        </motion.p>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-8 max-w-4xl mx-auto"
        >
          {/* Search Bar */}
          <div className="relative w-full md:w-[600px] group">
            <div className="relative flex items-center bg-background border border-border rounded-[2rem] h-16 px-6 shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-500/30">
              <Search className="w-6 h-6 text-muted-foreground group-focus-within:text-blue-500 transition-colors mr-4" />
              <input
                type="text"
                placeholder="What do you want to learn today?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-foreground font-bold text-lg focus:outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 border ${
                  activeFilter === filter
                    ? "bg-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-600/20 shadow-sm scale-105"
                    : "bg-background text-muted-foreground border-border hover:bg-muted/50"
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
