"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Users, Code2, Activity, Trophy, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (val) => {
    if (target >= 1000) {
      return `${prefix}${(val / 1000).toFixed(1)}K${suffix}`;
    }
    return `${prefix}${Math.floor(val)}${suffix}`;
  });
  const [displayValue, setDisplayValue] = useState(`${prefix}0${suffix}`);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, target, {
        duration,
        ease: "easeOut",
      });

      const unsubscribe = rounded.on("change", (v) => {
        setDisplayValue(v);
      });

      return () => {
        controls.stop();
        unsubscribe();
      };
    }
  }, [isInView, target, count, rounded, duration]);

  return <span ref={ref}>{displayValue}</span>;
}

const metrics = [
  {
    icon: Code2,
    value: 50000,
    suffix: "+",
    label: "Problems Solved",
    description: "Solutions submitted across all difficulty levels",
    color: "blue",
    iconBg: "bg-blue-500/10",
    iconText: "text-blue-500",
    glowColor: "rgba(59, 130, 246, 0.15)",
    borderHover: "hover:border-blue-500/30",
  },
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Active Developers",
    description: "Engineers sharpening their skills every day",
    color: "emerald",
    iconBg: "bg-emerald-500/10",
    iconText: "text-emerald-500",
    glowColor: "rgba(16, 185, 129, 0.15)",
    borderHover: "hover:border-emerald-500/30",
  },
  {
    icon: Activity,
    value: 120,
    suffix: "/min",
    label: "Submissions",
    description: "Real-time code submissions every minute",
    color: "violet",
    iconBg: "bg-violet-500/10",
    iconText: "text-violet-500",
    glowColor: "rgba(139, 92, 246, 0.15)",
    borderHover: "hover:border-violet-500/30",
  },
  {
    icon: Trophy,
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    description: "Developers who improved their interview skills",
    color: "amber",
    iconBg: "bg-amber-500/10",
    iconText: "text-amber-500",
    glowColor: "rgba(245, 158, 11, 0.15)",
    borderHover: "hover:border-amber-500/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  },
};

export default function PlatformMetrics() {
  return (
    <section
      id="platform-metrics"
      className="py-32 relative overflow-hidden bg-white dark:bg-zinc-950"
    >
      {/* Background */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 shadow-2xl shadow-violet-500/5 backdrop-blur-md"
          >
            <Sparkles className="w-3 h-3 fill-current" />
            <span>Live Metrics</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-8 tracking-[-0.04em] leading-tight"
          >
            The Numbers{" "}
            <br className="hidden md:block" />
            <span className="bg-linear-to-r from-violet-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              Speak Volumes
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg leading-relaxed font-medium"
          >
            Join a thriving community of developers pushing the boundaries of
            their craft. See what our platform has achieved so far.
          </motion.p>
        </div>

        {/* Metrics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              variants={itemVariants}
              className="group relative rounded-[2rem] p-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-zinc-200/50 to-transparent dark:from-zinc-800/50 dark:to-transparent opacity-50 transition-opacity group-hover:opacity-100" />

              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2rem]"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${metric.glowColor}, transparent 70%)`,
                }}
              />

              <div
                className={cn(
                  "relative h-full rounded-[1.9rem] bg-white/80 dark:bg-zinc-900/40 backdrop-blur-2xl p-8 flex flex-col items-center text-center border-2 border-transparent transition-all duration-500",
                  metric.borderHover
                )}
              >
                <div
                  className={cn(
                    "w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-6 shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6",
                    metric.iconBg,
                    metric.iconText
                  )}
                >
                  <metric.icon className="w-8 h-8" />
                </div>

                <div className="text-5xl font-black text-zinc-900 dark:text-white tracking-[-0.05em] mb-3">
                  <AnimatedCounter
                    target={metric.value}
                    suffix={metric.suffix}
                  />
                </div>

                <h3 className="text-sm font-black uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-400 mb-2">
                  {metric.label}
                </h3>

                <p className="text-xs text-zinc-400 dark:text-zinc-500 font-medium leading-relaxed">
                  {metric.description}
                </p>

                {/* Pulse dot */}
                <div className="mt-5 flex items-center gap-2">
                  <div
                    className={cn(
                      "w-1.5 h-1.5 rounded-full animate-pulse",
                      metric.iconBg.replace("/10", "")
                    )}
                    style={{
                      backgroundColor:
                        metric.color === "blue"
                          ? "#3b82f6"
                          : metric.color === "emerald"
                            ? "#10b981"
                            : metric.color === "violet"
                              ? "#8b5cf6"
                              : "#f59e0b",
                    }}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                    Live
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
