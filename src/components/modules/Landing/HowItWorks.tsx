"use client";

import { motion } from "framer-motion";
import { Search, Code2, Bot, TrendingUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Choose a Problem",
    description:
      "Browse curated challenges by difficulty, topic, or company tag. Pick from arrays, graphs, dynamic programming, and more.",
    icon: Search,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/10",
    borderHover: "hover:border-blue-500/30",
    iconBg: "bg-blue-500/10",
    iconText: "text-blue-500",
    tagBg: "bg-blue-500/10",
    tagText: "text-blue-400",
    tagBorder: "border-blue-500/20",
  },
  {
    number: "02",
    title: "Write Your Solution",
    description:
      "Code in our built-in IDE with syntax highlighting, auto-completion, and multi-language support. Test against edge cases instantly.",
    icon: Code2,
    color: "violet",
    gradient: "from-violet-500 to-purple-500",
    bgGlow: "bg-violet-500/10",
    borderHover: "hover:border-violet-500/30",
    iconBg: "bg-violet-500/10",
    iconText: "text-violet-500",
    tagBg: "bg-violet-500/10",
    tagText: "text-violet-400",
    tagBorder: "border-violet-500/20",
  },
  {
    number: "03",
    title: "Get AI Feedback",
    description:
      "Receive intelligent code reviews, complexity analysis, optimization suggestions, and alternative approaches from CodeArenaBot.",
    icon: Bot,
    color: "emerald",
    gradient: "from-emerald-500 to-green-500",
    bgGlow: "bg-emerald-500/10",
    borderHover: "hover:border-emerald-500/30",
    iconBg: "bg-emerald-500/10",
    iconText: "text-emerald-500",
    tagBg: "bg-emerald-500/10",
    tagText: "text-emerald-400",
    tagBorder: "border-emerald-500/20",
  },
  {
    number: "04",
    title: "Track Progress",
    description:
      "Visualize your growth with heatmaps, skill breakdowns, and streaks. See exactly where you stand and what to focus on next.",
    icon: TrendingUp,
    color: "amber",
    gradient: "from-amber-500 to-orange-500",
    bgGlow: "bg-amber-500/10",
    borderHover: "hover:border-amber-500/30",
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-500",
    tagBg: "bg-amber-500/10",
    tagText: "text-amber-400",
    tagBorder: "border-amber-500/20",
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

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-32 relative overflow-hidden bg-white dark:bg-zinc-950"
    >
      {/* Background Elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <div className="absolute top-[20%] right-[10%] w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] bg-violet-500/5 dark:bg-violet-500/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 shadow-2xl shadow-blue-500/5 backdrop-blur-md"
          >
            <Sparkles className="w-3 h-3 fill-current" />
            <span>How It Works</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-8 tracking-[-0.04em] leading-tight"
          >
            Four Steps to{" "}
            <br className="hidden md:block" />
            <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
              Mastery
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg leading-relaxed font-medium"
          >
            A streamlined workflow designed to maximize your learning efficiency
            and accelerate your journey from beginner to expert.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {/* Connector Line (desktop only) */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[12.5%] right-[12.5%] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="w-full h-full bg-linear-to-r from-blue-500/30 via-violet-500/30 to-amber-500/30 origin-left"
            />
          </div>

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              variants={itemVariants}
              className={cn(
                "group relative rounded-[2rem] p-1 overflow-hidden"
              )}
            >
              <div
                className={cn(
                  "absolute inset-0 bg-linear-to-br from-zinc-200/50 to-transparent dark:from-zinc-800/50 dark:to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100"
                )}
              />
              <div
                className={cn(
                  "relative h-full rounded-[1.9rem] bg-white/80 dark:bg-zinc-900/40 backdrop-blur-2xl p-8 flex flex-col border-2 border-transparent transition-all duration-500",
                  step.borderHover
                )}
              >
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-8">
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                      step.iconBg,
                      step.iconText
                    )}
                  >
                    <step.icon className="w-7 h-7" />
                  </div>
                  <span className="text-6xl font-black text-zinc-100 dark:text-zinc-800/60 tracking-tighter select-none group-hover:text-zinc-200 dark:group-hover:text-zinc-700/60 transition-colors">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm leading-relaxed flex-1">
                  {step.description}
                </p>

                {/* Connector Dot */}
                <div className="hidden lg:flex justify-center mt-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.15, type: "spring" }}
                    className={cn(
                      "w-3 h-3 rounded-full shadow-lg",
                      step.iconBg,
                      step.iconText
                    )}
                    style={{
                      boxShadow: `0 0 20px currentColor`,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
