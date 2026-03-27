"use client";

import { motion } from "framer-motion";
import { Roadmap } from "@/data/roadmap-data";
import Link from "next/link";
import { ArrowUpRight, Clock, Users } from "lucide-react";

interface RoadmapCardProps {
  roadmap: Roadmap;
  index: number;
}

export default function RoadmapCard({ roadmap, index }: RoadmapCardProps) {
  const difficultyColors = {
    Beginner: "text-emerald-500 bg-emerald-500/5",
    Intermediate: "text-indigo-500 bg-indigo-500/5",
    Advanced: "text-violet-500 bg-violet-500/5",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-full"
    >
      <Link href={`/roadmaps/${roadmap.id}`} className="block h-full">
        <div className="relative h-full bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-100 dark:border-zinc-800/50 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-indigo-500/30 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] flex flex-col">
          
          {/* Decorative Shimmer */}
          <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Image Container */}
          <div className="relative h-56 w-full flex items-center justify-center p-10 bg-zinc-50/50 dark:bg-zinc-950/50">
            <motion.img
              src={roadmap.image}
              alt={roadmap.title}
              className="w-full h-full object-contain relative z-10 drop-shadow-2xl group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Hover Floating Icon */}
            <div className="absolute top-6 right-6 w-12 h-12 rounded-2xl bg-white dark:bg-zinc-800 flex items-center justify-center shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
              <ArrowUpRight className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col flex-1 relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${difficultyColors[roadmap.difficulty]}`}>
                {roadmap.difficulty}
              </span>
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest px-1">
                • {roadmap.category}
              </span>
            </div>

            <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {roadmap.title}
            </h3>
            
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-8 leading-relaxed line-clamp-2">
              {roadmap.description}
            </p>

            {/* Stats/Footer */}
            <div className="mt-auto pt-6 border-t border-zinc-50 dark:border-zinc-800/50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold">
                  <Users className="w-4 h-4" />
                  <span>2.4k</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-bold">
                  <Clock className="w-4 h-4" />
                  <span>{roadmap.steps.length * 4}h</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                 <span className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Explore</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
