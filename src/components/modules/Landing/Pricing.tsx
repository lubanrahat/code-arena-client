"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Check,
  Zap,
  Crown,
  ArrowRight,
  Bot,
  BarChart3,
  Route,
  Code2,
  Layers,
  ShieldCheck,
  Infinity,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const plans = [
  {
    name: "Free",
    subtitle: "For Getting Started",
    price: "$0",
    period: "forever",
    description:
      "Perfect for exploring the platform and building a daily practice habit with core features.",
    cta: "Start Free",
    ctaHref: "/register",
    popular: false,
    color: "zinc",
    gradient: "",
    borderHover: "hover:border-zinc-400/30",
    features: [
      { text: "50+ Free Problems", icon: Code2, included: true },
      { text: "Basic Code Editor", icon: Layers, included: true },
      { text: "Community Sheets", icon: Layers, included: true },
      { text: "Leaderboard Access", icon: Star, included: true },
      { text: "AI Code Reviews", icon: Bot, included: false },
      { text: "Advanced Analytics", icon: BarChart3, included: false },
      { text: "Premium Roadmaps", icon: Route, included: false },
      { text: "Priority Support", icon: ShieldCheck, included: false },
    ],
  },
  {
    name: "Premium",
    subtitle: "Most Popular",
    price: "$12",
    period: "/month",
    description:
      "Unlock the full CodeArena experience with AI feedback, premium problems, and advanced analytics.",
    cta: "Upgrade Now",
    ctaHref: "/pricing",
    popular: true,
    color: "indigo",
    gradient: "from-blue-600 via-indigo-500 to-violet-600",
    borderHover: "hover:border-indigo-500/30",
    features: [
      { text: "200+ Premium Problems", icon: Code2, included: true },
      { text: "Advanced IDE Features", icon: Layers, included: true },
      { text: "All Curated Sheets", icon: Layers, included: true },
      { text: "AI-Powered Reviews", icon: Bot, included: true },
      { text: "Real-Time Analytics", icon: BarChart3, included: true },
      { text: "Structured Roadmaps", icon: Route, included: true },
      { text: "Unlimited Submissions", icon: Infinity, included: true },
      { text: "Priority Support", icon: ShieldCheck, included: true },
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

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="py-32 relative overflow-hidden bg-white dark:bg-zinc-950"
    >
      {/* Background */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-indigo-500/5 dark:bg-indigo-500/8 rounded-full blur-[200px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 shadow-2xl shadow-amber-500/5 backdrop-blur-md"
          >
            <Sparkles className="w-3 h-3 fill-current" />
            <span>Pricing</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-8 tracking-[-0.04em] leading-tight"
          >
            Simple,{" "}
            <br className="hidden md:block" />
            <span className="bg-linear-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              Transparent Pricing
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg leading-relaxed font-medium"
          >
            Start free, upgrade when you&apos;re ready. No hidden fees, no
            surprises. Cancel anytime.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={cn(
                "group relative rounded-[2.5rem] p-1 overflow-hidden",
                plan.popular && "md:-mt-4 md:-mb-4"
              )}
            >
              {/* Gradient border for popular */}
              {plan.popular && (
                <div className="absolute inset-0 bg-linear-to-br from-blue-500 via-indigo-500 to-violet-500 opacity-20 group-hover:opacity-40 transition-opacity" />
              )}
              <div
                className={cn(
                  "absolute inset-0 bg-linear-to-br from-zinc-200/50 to-transparent dark:from-zinc-800/50 dark:to-transparent opacity-50 transition-opacity group-hover:opacity-100",
                  plan.popular && "from-indigo-200/30 dark:from-indigo-800/30"
                )}
              />

              <div
                className={cn(
                  "relative h-full rounded-[2.4rem] bg-white/80 dark:bg-zinc-900/40 backdrop-blur-2xl p-10 flex flex-col border-2 border-transparent transition-all duration-500",
                  plan.borderHover,
                  plan.popular &&
                    "border-indigo-500/20 shadow-2xl shadow-indigo-500/10"
                )}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-px left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1.5 px-5 py-2 rounded-b-2xl bg-linear-to-r from-blue-600 via-indigo-500 to-violet-600 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/30">
                      <Crown className="w-3 h-3 fill-current" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className={cn("mb-8", plan.popular && "mt-4")}>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        plan.popular
                          ? "bg-indigo-500/10 text-indigo-500"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                      )}
                    >
                      {plan.popular ? (
                        <Zap className="w-5 h-5 fill-current" />
                      ) : (
                        <Code2 className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-black text-zinc-900 dark:text-white tracking-tight">
                        {plan.name}
                      </h3>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                        {plan.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className={cn(
                        "text-6xl font-black tracking-[-0.05em]",
                        plan.popular
                          ? "bg-linear-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent"
                          : "text-zinc-900 dark:text-white"
                      )}
                    >
                      {plan.price}
                    </span>
                    <span className="text-sm font-bold text-zinc-400">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mt-2.5 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href={plan.ctaHref}
                  className={cn(
                    "group/btn relative w-full inline-flex items-center justify-center gap-2.5 h-14 px-8 text-sm font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] mb-8",
                    plan.popular
                      ? "text-white shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40"
                      : "text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md hover:border-zinc-400 dark:hover:border-zinc-500"
                  )}
                  style={
                    plan.popular
                      ? {
                          background:
                            "linear-gradient(135deg, #2563eb, #7c3aed)",
                        }
                      : undefined
                  }
                >
                  {plan.popular && (
                    <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
                  )}
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>

                {/* Features List */}
                <div className="space-y-4 flex-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-4">
                    What&apos;s included
                  </p>
                  {plan.features.map((feature) => (
                    <div
                      key={feature.text}
                      className="flex items-center gap-3.5"
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center shrink-0",
                          feature.included
                            ? "bg-emerald-500/10"
                            : "bg-zinc-100 dark:bg-zinc-800"
                        )}
                      >
                        {feature.included ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <div className="w-1.5 h-0.5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-sm font-medium",
                          feature.included
                            ? "text-zinc-700 dark:text-zinc-300"
                            : "text-zinc-400 dark:text-zinc-600"
                        )}
                      >
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Trust */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-4 mt-16"
        >
          <div className="flex items-center gap-6 text-zinc-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-xs font-bold">SSL Secured</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4" />
              <span className="text-xs font-bold">Cancel Anytime</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-bold">Instant Access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
