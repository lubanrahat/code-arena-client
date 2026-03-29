"use client";

import Hero from "@/components/modules/Landing/Hero";
import Features from "@/components/modules/Landing/Features";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-zinc-950 relative overflow-x-hidden transition-colors duration-500">
      <main className="relative z-10">
        <Hero />
        <Features />

        {/* Modern Premium CTA Section */}
        <section className="py-32 relative overflow-hidden bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900">
          {/* Ambient Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[11px] font-bold uppercase tracking-[0.25em] mb-10 shadow-2xl shadow-indigo-500/5 backdrop-blur-md"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Join the Elite</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-8 tracking-[-0.04em] leading-tight"
              >
                Ready to level up <br className="hidden md:block" />
                <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
                  your coding?
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
              >
                Join thousands of developers and experts who are already shipping high-quality code. Start your journey today and master algorithms with CodeArena.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link
                  href="/register"
                  className="group relative inline-flex items-center gap-2.5 h-14 px-10 text-base font-bold text-white rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
                >
                  {/* shimmer overlay */}
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  Create Free Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}


