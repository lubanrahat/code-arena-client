"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Layers,
  GitBranch,
  Cpu,
  Network,
  Braces,
  Binary,
  TreePine,
  Boxes,
  Trophy,
  Lock,
} from "lucide-react";
import { cn } from "@/lib/utils";

const levels = [
  {
    tier: "Beginner",
    label: "Foundation",
    color: "emerald",
    gradient: "from-emerald-500 to-green-500",
    iconBg: "bg-emerald-500/10",
    iconText: "text-emerald-500",
    borderColor: "border-emerald-500/20",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400",
    badgeBorder: "border-emerald-500/20",
    progress: 100,
    topics: [
      { name: "Arrays & Strings", icon: Layers, count: 25 },
      { name: "Hash Maps", icon: Braces, count: 18 },
      { name: "Two Pointers", icon: GitBranch, count: 15 },
      { name: "Sorting & Searching", icon: Binary, count: 20 },
    ],
  },
  {
    tier: "Intermediate",
    label: "Growth",
    color: "blue",
    gradient: "from-blue-500 to-indigo-500",
    iconBg: "bg-blue-500/10",
    iconText: "text-blue-500",
    borderColor: "border-blue-500/20",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400",
    badgeBorder: "border-blue-500/20",
    progress: 60,
    topics: [
      { name: "Trees & BST", icon: TreePine, count: 22 },
      { name: "Graphs & BFS/DFS", icon: Network, count: 28 },
      { name: "Stack & Queue", icon: Boxes, count: 16 },
      { name: "Recursion", icon: GitBranch, count: 20 },
    ],
  },
  {
    tier: "Advanced",
    label: "Mastery",
    color: "violet",
    gradient: "from-violet-500 to-purple-500",
    iconBg: "bg-violet-500/10",
    iconText: "text-violet-500",
    borderColor: "border-violet-500/20",
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-400",
    badgeBorder: "border-violet-500/20",
    progress: 25,
    topics: [
      { name: "Dynamic Programming", icon: Cpu, count: 35 },
      { name: "Advanced Graphs", icon: Network, count: 20 },
      { name: "Segment Trees", icon: TreePine, count: 12 },
      { name: "System Design", icon: Boxes, count: 15 },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  },
};

export default function LearningRoadmap() {
  return (
    <section
      id="learning-roadmap"
      className="py-32 relative overflow-hidden bg-white dark:bg-zinc-950"
    >
      {/* Background */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <div className="absolute top-[10%] right-[5%] w-[500px] h-[500px] bg-emerald-500/5 dark:bg-emerald-500/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] bg-violet-500/5 dark:bg-violet-500/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 shadow-2xl shadow-cyan-500/5 backdrop-blur-md"
          >
            <Sparkles className="w-3 h-3 fill-current" />
            <span>Learning Roadmap</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-8 tracking-[-0.04em] leading-tight"
          >
            Your Path to{" "}
            <br className="hidden md:block" />
            <span className="bg-linear-to-r from-cyan-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Engineering Excellence
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg leading-relaxed font-medium"
          >
            A carefully structured progression from fundamentals to advanced
            topics. Every milestone brings you closer to interview mastery.
          </motion.p>
        </div>

        {/* Roadmap Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
        >
          {/* Connector Line (desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[16.67%] right-[16.67%] -translate-y-1/2 h-px z-0">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="w-full h-full bg-linear-to-r from-emerald-500/30 via-blue-500/30 to-violet-500/30 origin-left"
            />
          </div>

          {levels.map((level, levelIndex) => (
            <motion.div
              key={level.tier}
              variants={itemVariants}
              className="group relative z-10 rounded-[2.5rem] p-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-zinc-200/50 to-transparent dark:from-zinc-800/50 dark:to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
              <div
                className={cn(
                  "relative h-full rounded-[2.4rem] bg-white/80 dark:bg-zinc-900/40 backdrop-blur-2xl p-8 flex flex-col border-2 border-transparent transition-all duration-500",
                  `hover:${level.borderColor}`
                )}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={cn(
                      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                      level.badgeBg,
                      level.badgeText,
                      level.badgeBorder
                    )}
                  >
                    {levelIndex === 2 && (
                      <Trophy className="w-3 h-3 fill-current" />
                    )}
                    {level.label}
                  </div>
                  <span className="text-4xl font-black text-zinc-100 dark:text-zinc-800/60 tracking-tighter select-none">
                    {String(levelIndex + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Level Title */}
                <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-2 tracking-tight">
                  {level.tier}
                </h3>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                      Completion
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                      {level.progress}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${level.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.3 + levelIndex * 0.2 }}
                      className={cn("h-full rounded-full bg-linear-to-r", level.gradient)}
                    />
                  </div>
                </div>

                {/* Topics */}
                <div className="space-y-3 flex-1">
                  {level.topics.map((topic, topicIndex) => (
                    <motion.div
                      key={topic.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.4 + levelIndex * 0.15 + topicIndex * 0.05,
                      }}
                      className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/20 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/40 transition-colors group/topic"
                    >
                      <div className="flex items-center gap-3">
                        <topic.icon
                          className={cn(
                            "w-4 h-4 transition-transform group-hover/topic:scale-110",
                            level.iconText
                          )}
                        />
                        <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                          {topic.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-wider">
                        {topic.count} problems
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Locked indicator for advanced */}
                {levelIndex === 2 && (
                  <div className="mt-6 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-violet-500/5 border border-violet-500/10">
                    <Lock className="w-3.5 h-3.5 text-violet-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400">
                      Premium Content
                    </span>
                  </div>
                )}

                {/* Start/Continue Button */}
                <div className="mt-6">
                  <button
                    className={cn(
                      "w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 border",
                      levelIndex === 0
                        ? "bg-emerald-500 text-white border-emerald-500 hover:bg-emerald-600 shadow-xl shadow-emerald-500/20"
                        : "bg-transparent text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
                    )}
                  >
                    {levelIndex === 0
                      ? "Start Learning"
                      : levelIndex === 1
                        ? "Continue Path"
                        : "Unlock Advanced"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-3 mt-16"
        >
          <BookOpen className="w-4 h-4 text-zinc-400" />
          <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            <span className="font-black text-zinc-900 dark:text-white">246</span>{" "}
            problems across{" "}
            <span className="font-black text-zinc-900 dark:text-white">12</span>{" "}
            topic areas
          </span>
        </motion.div>
      </div>
    </section>
  );
}
