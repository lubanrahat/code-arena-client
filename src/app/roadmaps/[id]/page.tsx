"use client";

import { use } from "react";
import { roadmaps } from "@/data/roadmap-data";
import RoadmapTimeline from "@/components/modules/Roadmaps/RoadmapTimeline";
import { notFound } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Share2, Bookmark, CheckCircle, Clock, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function RoadmapDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const roadmap = roadmaps.find((r) => r.id === id);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!roadmap) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 selection:bg-indigo-500/30">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-indigo-600 z-50 origin-[0%]"
        style={{ scaleX }}
      />

      <main>
        {/* Header Section - Inspired by Landing Page Hero */}
        <section className="relative pt-32 pb-40 overflow-hidden">
           {/* Background Branding */}
           <div className="absolute inset-0 bg-linear-to-b from-indigo-50/50 via-white to-white dark:from-indigo-500/5 dark:via-zinc-950 dark:to-zinc-950 -z-10" />
           <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
           <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-500/10 rounded-full blur-[100px] pointer-events-none" />

           <div className="container mx-auto px-6">
              {/* Breadcrumb Navigation */}
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3 mb-12 text-sm font-bold"
              >
                <Link href="/roadmaps" className="text-zinc-400 hover:text-indigo-600 transition-colors">Roadmaps</Link>
                <ChevronRight className="w-4 h-4 text-zinc-300" />
                <span className="text-indigo-600 dark:text-indigo-400">{roadmap.title}</span>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                <div className="lg:col-span-7">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[11px] font-black uppercase tracking-[0.2em] mb-8">
                       <CheckCircle className="w-3.5 h-3.5" />
                       <span>Learning Path Level: {roadmap.difficulty}</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-8 tracking-[-0.04em] leading-tight">
                      Master <br />
                      <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-violet-600 bg-clip-text text-transparent">
                        {roadmap.title.split(' Roadmap')[0]}
                      </span>
                    </h1>
                    
                    <p className="text-xl text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-12 max-w-2xl">
                      {roadmap.description}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-16">
                       <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 font-black text-zinc-950 dark:text-white text-lg">
                             <BookOpen className="w-5 h-5 text-indigo-500" />
                             <span>{roadmap.steps.length} Chapters</span>
                          </div>
                          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Modules</p>
                       </div>
                       <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 font-black text-zinc-950 dark:text-white text-lg">
                             <Clock className="w-5 h-5 text-indigo-500" />
                             <span>~42 Hours</span>
                          </div>
                          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Time to Complete</p>
                       </div>
                       <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
                          <div className="flex items-center gap-2 font-black text-zinc-950 dark:text-white text-lg">
                             <Share2 className="w-5 h-5 text-indigo-500" />
                             <span>Industry-Level</span>
                          </div>
                          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Certified Path</p>
                       </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-5">
                      <button className="h-16 px-12 rounded-[1.25rem] bg-indigo-600 text-white font-black uppercase tracking-widest text-sm hover:bg-indigo-700 shadow-[0_20px_40px_-10px_rgba(79,70,229,0.4)] transition-all hover:scale-[1.02] active:scale-95 group">
                        <span className="flex items-center gap-2">
                          Enroll for Free
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                      <button className="h-16 w-16 rounded-[1.25rem] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-rose-500 transition-colors">
                        <Bookmark className="w-6 h-6" />
                      </button>
                    </div>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="lg:col-span-5 relative"
                >
                   <div className="relative aspect-square rounded-[4rem] overflow-hidden bg-white dark:bg-zinc-900 border-[12px] border-zinc-100 dark:border-zinc-800 shadow-[0_60px_100px_-20px_rgba(0,0,0,0.1)] flex items-center justify-center p-16 group">
                      <motion.img 
                        src={roadmap.image} 
                        alt={roadmap.title}
                        className="w-full h-full object-contain relative z-10 drop-shadow-2xl group-hover:scale-105 transition-transform duration-[2s]"
                      />
                      <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/10 to-transparent pointer-events-none" />
                   </div>
                   {/* Decorative elements */}
                   <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-[80px] animate-pulse" />
                   <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px] animate-pulse delay-700" />
                </motion.div>
              </div>
           </div>
        </section>

        {/* Timeline Section Title */}
        <section className="container mx-auto px-6 pt-32 pb-20">
           <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <p className="text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Step-by-Step Guide</p>
                <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-8 tracking-tight">The Curriculum</h2>
                <div className="w-24 h-1.5 bg-indigo-500 rounded-full mx-auto" />
              </motion.div>
           </div>
        </section>
        
        <RoadmapTimeline steps={roadmap.steps} />

        {/* Final High-Impact CTA */}
        <section className="container mx-auto px-6 pt-60">
           <div className="relative p-16 md:p-32 rounded-[5rem] bg-indigo-600 dark:bg-indigo-600 overflow-hidden text-center text-white border-[1px] border-white/20">
              {/* Animated Glows inside CTA */}
              <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
              <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-white/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
              
              <div className="relative z-10">
                <h2 className="text-5xl md:text-8xl font-black mb-12 leading-tight tracking-[-0.04em]">
                  Start Your <br />
                  Success Story.
                </h2>
                <p className="text-xl md:text-2xl text-indigo-100 mb-16 max-w-2xl mx-auto font-medium opacity-80 leading-relaxed">
                  Join 10,000+ developers learning on CodeArena. Your journey to senior engineer starts here.
                </p>
                <button className="h-20 px-16 rounded-[2rem] bg-white text-indigo-600 font-black uppercase tracking-widest text-lg hover:scale-[1.05] hover:shadow-[0_40px_80px_-10px_rgba(255,255,255,0.4)] transition-all active:scale-95 group">
                  <span className="flex items-center gap-3">
                    Enroll Now
                    <ArrowLeft className="w-6 h-6 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
}