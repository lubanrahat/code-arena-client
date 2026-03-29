"use client";

import { motion } from "framer-motion";
import AiHero from "@/components/modules/AiDiscussion/AiHero";
import AiCompanion from "@/components/modules/AiDiscussion/AiCompanion";
import AiFeatures from "@/components/modules/AiDiscussion/AiFeatures";

export default function AiDiscussionPage() {
  return (
    <main className="min-h-screen bg-background">

      <AiHero />

      {/* Separator Gradient */}
      <div className="h-px w-full bg-linear-to-r from-transparent via-border to-transparent" />

      <AiCompanion />

      {/* Another Separator */}
      <div className="h-[200px] w-full bg-linear-to-b from-transparent via-border/50 to-transparent" />

      <AiFeatures />

      {/* Bottom CTA for Beta */}
      <section className="py-32 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative rounded-[3rem] overflow-hidden bg-card border border-border shadow-xl p-16 text-center"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.05),transparent_70%)]" />

          <h3 className="text-4xl md:text-6xl font-black text-card-foreground mb-8 tracking-[-0.03em] relative z-10">
            Shape the Future <br />
            of <span className="text-blue-500">Coding Education</span>
          </h3>

          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto relative z-10">
            Be among the first to experience the power of AI in your coding journey. Join our beta program today.
          </p>

          <button className="relative z-10 px-12 py-5 bg-primary text-primary-foreground rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-sm hover:bg-primary/90">
            Join the Beta Program
          </button>
        </motion.div>
      </section>
    </main>
  );
}