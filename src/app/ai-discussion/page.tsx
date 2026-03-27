"use client";

import { motion } from "framer-motion";
import AiHero from "@/components/modules/AiDiscussion/AiHero";
import AiCompanion from "@/components/modules/AiDiscussion/AiCompanion";
import AiFeatures from "@/components/modules/AiDiscussion/AiFeatures";

export default function AiDiscussionPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950">

      <AiHero />

      {/* Separator Gradient */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />

      <AiCompanion />

      {/* Another Separator */}
      <div className="h-[200px] w-full bg-linear-to-b from-transparent via-indigo-500/5 to-transparent" />

      <AiFeatures />

      {/* Bottom CTA for Beta */}
      <section className="py-32 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden bg-zinc-900 border border-zinc-800 p-16 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_70%)]" />

          <h3 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-[-0.03em] relative z-10">
            Shape the Future <br />
            of <span className="text-indigo-500">Coding Education</span>
          </h3>

          <p className="text-lg text-zinc-400 mb-12 max-w-2xl mx-auto relative z-10">
            Be among the first to experience the power of AI in your coding journey. Join our beta program today.
          </p>

          <button className="relative z-10 px-12 py-5 bg-white text-zinc-900 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-white/10 hover:bg-indigo-50">
            Join the Beta Program
          </button>
        </motion.div>
      </section>

      {/* Background Ornaments */}
      <div className="fixed inset-0 -z-10 pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[150px]" />
      </div>
    </main>
  );
}