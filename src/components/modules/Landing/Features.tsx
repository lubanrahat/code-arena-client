"use client";

import { motion } from "framer-motion";
import { Code2, BookOpen, Trophy, Users, BarChart3, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Interactive Editor",
    description: "Multi-language support, custom themes, and real-time execution with our high-performance Monaco-powered editor.",
    icon: Code2,
    color: "bg-blue-500",
  },
  {
    title: "Expert Editorials",
    description: "Unlock detailed text solutions and high-quality video tutorials curated by industry-leading algorithm experts.",
    icon: BookOpen,
    color: "bg-emerald-500",
  },
  {
    title: "Skill Assessment",
    description: "Track your progress with comprehensive statistics, heatmaps, and difficulty-based performance analysis.",
    icon: BarChart3,
    color: "bg-indigo-500",
  },
  {
    title: "Competition Ready",
    description: "Prepare for top-tier tech interviews with curated problem sets from Google, Meta, and Amazon.",
    icon: Trophy,
    color: "bg-amber-500",
  },
  {
    title: "Community Discussion",
    description: "Learn and share insights with a global community of developers through our dedicated discussion forums.",
    icon: Users,
    color: "bg-purple-500",
  },
  {
    title: "Secure Environment",
    description: "Your code is executed in isolated, secure sandboxes to ensure private and safe practice every time.",
    icon: ShieldCheck,
    color: "bg-teal-500",
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-transparent">

      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4"
          >
            Everything you need <br />
            <span className="text-blue-600">to excel in coding.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-zinc-600 dark:text-zinc-400"
          >
            Features designed to take your algorithmic skills from beginner to expert level.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6 shadow-lg shadow-${feature.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
