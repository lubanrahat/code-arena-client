"use client";

import { motion } from "motion/react";
import { Users, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SheetCardProps {
  title: string;
  followers: number;
  questions: number;
  description: string;
  progress?: number;
  isPopular?: boolean;
}

export function SheetCard({
  title,
  followers,
  questions,
  description,
  progress = 0,
}: SheetCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white dark:bg-neutral-900 rounded-[2rem] border border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500"
    >
      {/* Top Progress Bar Area */}
      <div className="h-10 bg-orange-50 dark:bg-orange-950/20 px-6 flex items-center justify-between border-b border-neutral-200/50 dark:border-neutral-800/50">
        <div className="h-1.5 flex-1 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden mr-4">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${progress}%` }}
            className="h-full bg-orange-500"
          />
        </div>
        <span className="text-[10px] font-black text-orange-600 dark:text-orange-400 uppercase tracking-widest">
          {progress}%
        </span>
      </div>

      <div className="p-8 space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-black text-neutral-950 dark:text-white leading-tight group-hover:text-orange-600 transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-4 text-neutral-500 dark:text-neutral-400">
            <div className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5" />
              <span className="text-[11px] font-bold tracking-tight">
                {followers.toLocaleString()} Followers
              </span>
            </div>
          </div>
        </div>

        <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
            <ListChecks className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-black uppercase tracking-widest">
              {questions} Questions
            </span>
          </div>

          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest px-6 h-10 shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
          >
            Follow
          </Button>
        </div>
      </div>

      {/* Hover Background Accent */}
      <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
