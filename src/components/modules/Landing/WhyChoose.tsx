"use client";

import { motion } from "framer-motion";
import {
  Bot,
  BarChart3,
  Route,
  Palette,
  ShieldCheck,
  Zap,
  Clock,
  Globe,
  Sparkles,
  Check,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const differentiators = [
  {
    icon: Bot,
    title: "AI-Powered Feedback",
    description:
      "Get instant, intelligent code reviews with complexity analysis, optimization hints, and alternative approaches — powered by CodeArenaBot.",
    color: "indigo",
    iconBg: "bg-indigo-500/10",
    iconText: "text-indigo-500",
    borderHover: "hover:border-indigo-500/30",
    glowShadow: "group-hover:shadow-indigo-500/5",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Track your progress with rich dashboards, heatmaps, skill breakdowns, and performance benchmarks against the global community.",
    color: "blue",
    iconBg: "bg-blue-500/10",
    iconText: "text-blue-500",
    borderHover: "hover:border-blue-500/30",
    glowShadow: "group-hover:shadow-blue-500/5",
  },
  {
    icon: Route,
    title: "Structured Roadmaps",
    description:
      "Follow expert-designed learning paths from beginner to advanced. No guesswork — every problem is strategically sequenced for growth.",
    color: "emerald",
    iconBg: "bg-emerald-500/10",
    iconText: "text-emerald-500",
    borderHover: "hover:border-emerald-500/30",
    glowShadow: "group-hover:shadow-emerald-500/5",
  },
  {
    icon: Palette,
    title: "Premium Experience",
    description:
      "A meticulously crafted, modern UI designed for focus. Dark mode, glassmorphism, smooth animations — coding should feel premium.",
    color: "violet",
    iconBg: "bg-violet-500/10",
    iconText: "text-violet-500",
    borderHover: "hover:border-violet-500/30",
    glowShadow: "group-hover:shadow-violet-500/5",
  },
  {
    icon: ShieldCheck,
    title: "Battle-Tested Problems",
    description:
      "Every problem is curated from real interview patterns at FAANG companies. Learn what matters for production-grade engineering.",
    color: "amber",
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-500",
    borderHover: "hover:border-amber-500/30",
    glowShadow: "group-hover:shadow-amber-500/5",
  },
  {
    icon: Zap,
    title: "Lightning-Fast Execution",
    description:
      "Sub-millisecond code evaluation across 10+ languages. Our infrastructure ensures instant feedback so you never lose momentum.",
    color: "rose",
    iconBg: "bg-rose-500/10",
    iconText: "text-rose-500",
    borderHover: "hover:border-rose-500/30",
    glowShadow: "group-hover:shadow-rose-500/5",
  },
];

const comparisonFeatures = [
  { feature: "AI Code Reviews", us: true, others: false },
  { feature: "Real-Time Analytics", us: true, others: false },
  { feature: "Structured Roadmaps", us: true, others: false },
  { feature: "Multi-Language Support", us: true, others: true },
  { feature: "Premium Dark UI", us: true, others: false },
  { feature: "Community Sheets", us: true, others: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  },
};

export default function WhyChoose() {
  return (
    <section
      id="why-choose"
      className="py-32 relative overflow-hidden bg-white dark:bg-zinc-950"
    >
      {/* Background */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <div className="absolute top-[15%] left-[5%] w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/8 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[15%] right-[5%] w-[400px] h-[400px] bg-emerald-500/5 dark:bg-emerald-500/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 shadow-2xl shadow-emerald-500/5 backdrop-blur-md"
          >
            <Sparkles className="w-3 h-3 fill-current" />
            <span>Why CodeArena</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-8 tracking-[-0.04em] leading-tight"
          >
            Built Different.{" "}
            <br className="hidden md:block" />
            <span className="bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Built Better.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg leading-relaxed font-medium"
          >
            We&apos;re not just another coding platform. CodeArena combines
            cutting-edge AI, premium design, and structured learning to give you
            an unfair advantage.
          </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
        >
          {differentiators.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className={cn(
                "group relative rounded-[2rem] p-1 overflow-hidden"
              )}
            >
              <div className="absolute inset-0 bg-linear-to-br from-zinc-200/50 to-transparent dark:from-zinc-800/50 dark:to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
              <div
                className={cn(
                  "relative h-full rounded-[1.9rem] bg-white/80 dark:bg-zinc-900/40 backdrop-blur-2xl p-8 flex flex-col border-2 border-transparent transition-all duration-500 shadow-2xl shadow-transparent",
                  item.borderHover,
                  item.glowShadow
                )}
              >
                <div
                  className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
                    item.iconBg,
                    item.iconText
                  )}
                >
                  <item.icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <div className="rounded-[2rem] p-1 overflow-hidden relative">
            <div className="absolute inset-0 bg-linear-to-br from-zinc-200/50 to-transparent dark:from-zinc-800/50 dark:to-transparent opacity-50" />
            <div className="relative rounded-[1.9rem] bg-white/80 dark:bg-zinc-900/40 backdrop-blur-2xl border-2 border-transparent overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-3 gap-4 px-8 py-5 border-b border-zinc-200 dark:border-zinc-800">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400">
                  Feature
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-linear-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                    CodeArena
                  </span>
                </div>
                <div className="text-center text-xs font-bold text-zinc-400 uppercase tracking-wider self-center">
                  Others
                </div>
              </div>

              {/* Table Rows */}
              {comparisonFeatures.map((row, index) => (
                <motion.div
                  key={row.feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "grid grid-cols-3 gap-4 px-8 py-4 transition-colors",
                    index < comparisonFeatures.length - 1 &&
                      "border-b border-zinc-100 dark:border-zinc-800/50",
                    "hover:bg-zinc-50/50 dark:hover:bg-zinc-800/20"
                  )}
                >
                  <div className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 flex items-center">
                    {row.feature}
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Check className="w-4 h-4 text-emerald-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    {row.others ? (
                      <div className="w-7 h-7 rounded-full bg-emerald-500/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-emerald-500" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                        <X className="w-4 h-4 text-zinc-400" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="flex items-center justify-center gap-10 mt-10">
            {[
              { icon: Clock, label: "Avg. Response", value: "<50ms" },
              { icon: Globe, label: "Languages", value: "10+" },
              { icon: ShieldCheck, label: "Uptime", value: "99.9%" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-2 mb-1">
                  <stat.icon className="w-4 h-4 text-zinc-400" />
                  <span className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
