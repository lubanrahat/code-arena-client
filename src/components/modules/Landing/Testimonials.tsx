"use client";

import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer at Google",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    quote:
      "CodeArena&apos;s AI feedback completely changed how I prepare for interviews. The instant code reviews helped me spot patterns I was missing. I landed my dream role at Google within 3 months of using it.",
    rating: 5,
    highlight: "Landed role at Google",
    color: "blue",
    borderHover: "hover:border-blue-500/30",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-400",
    badgeBorder: "border-blue-500/20",
  },
  {
    name: "Marcus Rodriguez",
    role: "Senior Developer at Stripe",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    quote:
      "The structured roadmaps are phenomenal. Instead of randomly grinding problems, I followed a clear path and saw measurable improvement every week. The analytics dashboard kept me accountable.",
    rating: 5,
    highlight: "3x faster improvement",
    color: "emerald",
    borderHover: "hover:border-emerald-500/30",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-400",
    badgeBorder: "border-emerald-500/20",
  },
  {
    name: "Priya Sharma",
    role: "Full-Stack Engineer at Meta",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    quote:
      "I&apos;ve tried every coding platform out there, and CodeArena is in a league of its own. The premium UI makes practice sessions enjoyable, and the AI mentor feels like having a senior engineer by your side.",
    rating: 5,
    highlight: "Best platform experience",
    color: "violet",
    borderHover: "hover:border-violet-500/30",
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-400",
    badgeBorder: "border-violet-500/20",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
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

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-32 relative overflow-hidden bg-white dark:bg-zinc-950"
    >
      {/* Background */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-blue-500/5 dark:bg-blue-500/8 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-violet-500/5 dark:bg-violet-500/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 shadow-2xl shadow-rose-500/5 backdrop-blur-md"
          >
            <Sparkles className="w-3 h-3 fill-current" />
            <span>Testimonials</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-8 tracking-[-0.04em] leading-tight"
          >
            Loved by{" "}
            <br className="hidden md:block" />
            <span className="bg-linear-to-r from-rose-500 via-pink-500 to-fuchsia-500 bg-clip-text text-transparent">
              Top Engineers
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg leading-relaxed font-medium"
          >
            Hear from developers who transformed their careers with CodeArena.
            Real stories, real results.
          </motion.p>
        </div>

        {/* Testimonial Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              className="group relative rounded-[2rem] p-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-br from-zinc-200/50 to-transparent dark:from-zinc-800/50 dark:to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
              <div
                className={cn(
                  "relative h-full rounded-[1.9rem] bg-white/80 dark:bg-zinc-900/40 backdrop-blur-2xl p-8 flex flex-col border-2 border-transparent transition-all duration-500",
                  testimonial.borderHover
                )}
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-zinc-200 dark:text-zinc-800 fill-current" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-zinc-600 dark:text-zinc-300 font-medium text-sm leading-relaxed mb-8 flex-1">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                {/* Highlight Badge */}
                <div
                  className={cn(
                    "inline-flex self-start items-center px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest mb-6 border",
                    testimonial.badgeBg,
                    testimonial.badgeText,
                    testimonial.badgeBorder
                  )}
                >
                  {testimonial.highlight}
                </div>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
                  <div className="relative">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-zinc-800 shadow-lg"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white dark:border-zinc-900" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-zinc-900 dark:text-white tracking-tight">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
