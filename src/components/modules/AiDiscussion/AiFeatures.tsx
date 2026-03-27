"use client";

import { motion } from "framer-motion";
import { Compass, Zap, BrainCircuit } from "lucide-react";

const features = [
  {
    title: "Personalized Roadmaps",
    description: "AI-crafted coding roadmaps tailored to your goals and skill level.",
    icon: Compass,
    color: "from-blue-600 to-indigo-600",
  },
  {
    title: "Adaptive Learning Paths",
    description: "Dynamic learning paths that evolve with your progress.",
    icon: BrainCircuit,
    color: "from-indigo-600 to-violet-600",
  },
  {
    title: "Advanced AI Integrations",
    description: "Next-gen AI tools to boost your coding and learning efficiency.",
    icon: Zap,
    color: "from-violet-600 to-purple-600",
  },
];

export default function AiFeatures() {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-8 tracking-[-0.04em]"
        >
          AI-Powered Features <br />
          <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
            Coming Soon
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-20 font-medium max-w-2xl mx-auto"
        >
          Discover the next generation of AI tools designed to elevate your coding journey.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-full"
            >
              {/* Card Background with Glow */}
              <div className="absolute -inset-0.5 bg-linear-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

              <div className="relative h-full p-10 bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-3xl flex flex-col items-center text-center transition-all duration-300 group-hover:translate-y-[-8px] group-hover:border-indigo-500/30">
                {/* Icon Circle */}
                <div className={`w-16 h-16 rounded-2xl bg-linear-to-tr ${feature.color} p-4 mb-8 shadow-2xl transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <feature.icon className="w-full h-full text-white" />
                </div>

                <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
                  {feature.title}
                </h3>

                <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative dots */}
                <div className="mt-8 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
