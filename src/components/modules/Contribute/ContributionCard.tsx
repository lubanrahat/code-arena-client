"use client";

import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ContributionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

export default function ContributionCard({
  title,
  description,
  icon: Icon,
  delay = 0,
}: ContributionCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group relative h-full flex flex-col p-6 lg:p-8 rounded-2xl bg-zinc-950/80 border border-zinc-900/50 hover:border-blue-500/30 transition-all duration-500 overflow-hidden shadow-2xl"
    >
      {/* Accent Gradient */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors duration-500" />

      {/* Icon */}
      <div className="mb-6 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-zinc-900/50 border border-zinc-800 group-hover:border-blue-500/30 group-hover:bg-blue-500/10 transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3 shadow-inner">
        <Icon className="h-6 w-6 text-zinc-400 group-hover:text-blue-400 transition-colors duration-500" />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-500">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-zinc-400 font-medium group-hover:text-zinc-300 transition-colors duration-500">
          {description}
        </p>
      </div>

      {/* Subtle indicator */}
      <div className="mt-auto pt-6 flex items-center gap-2">
        <div className="h-1 w-8 rounded-full bg-zinc-800 transition-all duration-500 group-hover:w-16 group-hover:bg-blue-500/40" />
      </div>
    </motion.div>
  );
}
