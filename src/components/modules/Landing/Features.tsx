"use client";

import { motion } from "framer-motion";
import { 
  BarChart3, 
  Bot, 
  ArrowUpRight, 
  Library,
  Layers,
  Sparkles,
  Monitor,
  Trophy
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
    },
  },
};

export default function Features() {
  return (
    <section className="py-32 relative overflow-hidden bg-white dark:bg-zinc-950">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
      <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[160px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-[10%] right-[5%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[160px] animate-pulse delay-1000 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Modern Header */}
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 shadow-2xl shadow-amber-500/5 backdrop-blur-md"
          >
            <Sparkles className="w-3 h-3 fill-current" />
            <span>Premium Infrastructure</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-8 tracking-[-0.04em] leading-tight"
          >
            Precision <br className="hidden md:block" />
            <span className="bg-linear-to-r from-zinc-500 to-zinc-800 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
               Tools for Masters
            </span>
          </motion.h2>
          
          <motion.p
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.1 }}
             className="text-zinc-500 dark:text-zinc-400 max-w-2xl text-lg leading-relaxed font-medium"
          >
            Meticulously crafted features that accelerate your learning curve and simplify your path to engineering excellence.
          </motion.p>
        </div>

        {/* Rebalanced Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          {/* 1. The Library - 7 Cols */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-7 group relative rounded-[2.5rem] p-1 overflow-hidden"
          >
             <div className="absolute inset-0 bg-linear-to-br from-zinc-200 to-transparent dark:from-zinc-800 dark:to-transparent opacity-50" />
             <div className="relative h-full rounded-[2.4rem] bg-white/80 dark:bg-zinc-900/40 backdrop-blur-2xl p-10 flex border-2 border-transparent hover:border-orange-500/20 transition-all duration-500">
                <div className="flex-1 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-8 shadow-xl shadow-orange-500/5">
                    <Library className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">Sheet Vault</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium text-lg leading-relaxed max-w-sm">
                    Access curated collections from industry veterans. Community-driven, expert-reviewed patterns for every algorithm domain.
                  </p>
                  
                  <div className="mt-12 flex gap-4">
                     <div className="px-4 py-2 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 text-[10px] font-black uppercase tracking-widest border border-orange-500/20">50+ Domain Collections</div>
                     <div className="px-4 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 text-[10px] font-black uppercase tracking-widest border border-zinc-200 dark:border-zinc-700">Expert Curated</div>
                  </div>
                </div>

                {/* Stacked Cards Visual - Enhanced */}
                <div className="hidden lg:flex flex-1 relative h-64 items-center justify-center">
                    {[0, 1, 2].map((i) => (
                      <motion.div 
                        key={i}
                        initial={false}
                        animate={{ 
                          x: i * 30,
                          y: i * 20, 
                          rotate: (i - 1) * 8,
                          scale: 1 - i * 0.05,
                          zIndex: 10 - i 
                        }}
                        className={cn(
                          "absolute w-44 h-56 rounded-3xl border shadow-2xl p-6 flex flex-col justify-between transition-transform duration-700 group-hover:-translate-y-8 group-hover:rotate-0",
                          i === 0 
                            ? "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700" 
                            : "bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                        )}
                      >
                         <div className="flex justify-between items-start">
                            <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                               <Layers className="w-5 h-5" />
                            </div>
                            <div className="h-2 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                         </div>
                         <div className="space-y-3">
                            <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-700 opacity-50" />
                            <div className="h-2 w-3/4 rounded-full bg-zinc-200 dark:bg-zinc-700 opacity-30" />
                            <div className="h-2 w-1/2 rounded-full bg-zinc-200 dark:bg-zinc-700 opacity-20" />
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-xs font-black text-orange-500 italic">Vault #{42 - i}</span>
                            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/40">
                               <ArrowUpRight className="w-4 h-4" />
                            </div>
                         </div>
                      </motion.div>
                    ))}
                </div>
             </div>
          </motion.div>

          {/* 2. Performance Tracking - 5 Cols */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-5 group relative rounded-[2.5rem] p-1 overflow-hidden"
          >
             <div className="absolute inset-0 bg-linear-to-br from-zinc-200 to-transparent dark:from-zinc-800 dark:to-transparent opacity-50" />
             <div className="relative h-full rounded-[2.4rem] bg-white/80 dark:bg-zinc-900/40 backdrop-blur-2xl p-10 flex flex-col justify-between border-2 border-transparent hover:border-zinc-400/20 dark:hover:border-white/10 transition-all duration-500">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-black shadow-xl">
                    <Monitor className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold dark:text-white tracking-tight">Mastery Progress</h3>
                </div>

                <div className="space-y-8">
                   <div className="flex items-center gap-8">
                      <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" className="text-zinc-100 dark:text-zinc-800" />
                          <motion.circle 
                            initial={{ strokeDasharray: "0, 283" }}
                            whileInView={{ strokeDasharray: "210, 283" }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" className="text-zinc-900 dark:text-white"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <span className="text-2xl font-black dark:text-white">75%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">Global Standing</p>
                        <p className="text-2xl font-black dark:text-white tracking-tighter">Gold Tier</p>
                      </div>
                   </div>

                   <div className="space-y-5">
                      {[
                        { l: "Algorithms", v: 85, c: "bg-blue-500" },
                        { l: "Data Structures", v: 60, c: "bg-amber-500" },
                        { l: "System Design", v: 40, c: "bg-emerald-500" },
                      ].map(item => (
                        <div key={item.l} className="space-y-2">
                           <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                              <span>{item.l}</span>
                              <span>{item.v}%</span>
                           </div>
                           <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${item.v}%` }}
                                transition={{ duration: 1.5, delay: 0.5 }}
                                className={cn("h-full rounded-full shadow-lg", item.c)}
                              />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </motion.div>

          {/* Stat 1: 200+ - 4 Cols */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 rounded-[2.5rem] bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 p-10 flex flex-col items-center justify-center text-center group hover:border-amber-500/30 transition-all duration-500 shadow-2xl shadow-transparent hover:shadow-amber-500/5"
          >
             <div className="w-16 h-16 rounded-[1.5rem] bg-amber-500/10 flex items-center justify-center text-amber-500 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <Trophy className="w-8 h-8" />
             </div>
             <div className="text-6xl font-black text-zinc-900 dark:text-white tracking-[-0.05em] mb-3">200<span className="text-amber-500">+</span></div>
             <p className="text-xs font-black uppercase tracking-[0.3em] text-zinc-400 leading-relaxed">Elite Solutions <br /> Implemented</p>
          </motion.div>

          {/* AI Discussions - 8 Cols */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-8 group relative rounded-[2.5rem] p-1 overflow-hidden"
          >
             <div className="absolute inset-0 bg-linear-to-br from-indigo-500/10 to-transparent opacity-50" />
             <div className="relative h-full rounded-[2.4rem] bg-white/80 dark:bg-zinc-900/40 backdrop-blur-2xl p-10 flex flex-col md:flex-row gap-12 border-2 border-transparent hover:border-indigo-500/20 transition-all duration-500">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 shadow-xl shadow-indigo-500/5">
                      <Bot className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-black dark:text-white tracking-tight">CodeArenaBot</h3> 
                      <Badge className="bg-indigo-500 hover:bg-indigo-600 text-[8px] tracking-[0.2em] px-3 py-0.5 rounded-full">Intelligent Pairing</Badge>
                    </div>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium text-lg leading-relaxed mb-10">
                    Your personal algorithmic mentor. Get instant code reviews, complexity analysis, and edge-case detection while you build.
                  </p>
                  
                  <div className="flex items-center gap-6">
                     <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-zinc-900 bg-zinc-200 dark:bg-zinc-800 overflow-hidden shadow-lg">
                             <div className="w-full h-full bg-linear-to-br from-indigo-300 to-indigo-600" />
                          </div>
                        ))}
                     </div>
                     <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">340+ Online Now</span>
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div className="flex justify-end">
                    <div className="max-w-[85%] rounded-[1.5rem] rounded-tr-none bg-zinc-100 dark:bg-zinc-800 p-5 text-sm font-medium text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 shadow-sm transition-transform group-hover:-translate-x-2">
                      Analyze the space complexity?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-[1.5rem] rounded-tl-none bg-indigo-500 p-5 text-sm font-bold text-white shadow-2xl shadow-indigo-500/30 transition-transform group-hover:translate-x-2">
                      The current O(N) space can be reduced to O(1) by using two variables instead of a full DP array.
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="w-10 h-1 rounded-full bg-indigo-500/20 animate-pulse" />
                  </div>
                </div>
             </div>
          </motion.div>

          {/* Performance Analytics - 12 Cols Full Width */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-12 group relative rounded-[3rem] p-1 overflow-hidden"
          >
             <div className="absolute inset-0 bg-linear-to-br from-blue-500/10 to-emerald-500/10 opacity-50" />
             <div className="relative h-full rounded-[2.9rem] bg-white/80 dark:bg-zinc-900/40 backdrop-blur-3xl p-12 flex flex-col md:flex-row items-center gap-16 border-2 border-transparent hover:border-blue-500/10 transition-all duration-700">
                <div className="flex-1">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-xl shadow-blue-500/5">
                      <BarChart3 className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-4xl font-black dark:text-white tracking-tighter">Performance Hub</h3>
                      <p className="text-emerald-500 text-xs font-black uppercase tracking-[0.4em] mt-1">Live Analytics Engine</p>
                    </div>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 font-medium text-xl leading-relaxed mb-12 max-w-xl">
                    Dynamic visualizations that map your progress across every problem category. Monitor your daily velocity and long-term skill evolution with surgical precision.
                  </p>
                  
                  <div className="flex gap-12">
                     <div>
                        <p className="text-3xl font-black dark:text-white tracking-tighter mb-1">+24%</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Monthly Growth</p>
                     </div>
                     <div className="h-full w-px bg-zinc-200 dark:bg-zinc-800" />
                     <div>
                        <p className="text-3xl font-black dark:text-white tracking-tighter mb-1">10.4k</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Submissions</p>
                     </div>
                  </div>
                </div>

                {/* Elaborate Chart Visual */}
                <div className="flex-1 w-full bg-zinc-50/50 dark:bg-zinc-950/40 rounded-[2.5rem] border border-zinc-200/50 dark:border-white/5 p-10 relative overflow-hidden group/chart">
                    <div className="flex justify-between items-center mb-12 relative z-10">
                       <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">Skill Evolution</span>
                       <div className="flex gap-4">
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-blue-500" />
                             <span className="text-[10px] font-bold text-zinc-500">Velocity</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-emerald-500" />
                             <span className="text-[10px] font-bold text-zinc-500">Success</span>
                          </div>
                       </div>
                    </div>

                    <div className="relative h-48 w-full group-hover/chart:scale-[1.02] transition-transform duration-1000">
                       {/* Line Chart */}
                       <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible absolute inset-0">
                          <defs>
                             <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                             </linearGradient>
                          </defs>
                          <motion.path 
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                            d="M0 35 Q 15 35, 25 20 T 45 25 T 75 10 T 100 5" 
                            fill="none" 
                            stroke="#3b82f6" 
                            strokeWidth="4" 
                            className="drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
                          />
                          <motion.path 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                            d="M0 35 Q 15 35, 25 20 T 45 25 T 75 10 T 100 5 V 40 H 0 Z" 
                            fill="url(#chartGradient)"
                          />
                          
                          {/* Second Line */}
                          <motion.path 
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                            d="M0 38 Q 20 38, 30 25 T 50 30 T 80 15 T 100 8" 
                            fill="none" 
                            stroke="#10b981" 
                            strokeWidth="3" 
                            opacity="0.5"
                            className="drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]" 
                          />
                       </svg>

                       {/* Data Points */}
                       <div className="absolute top-[10%] left-[75%] group-hover/chart:scale-125 transition-transform duration-500">
                          <div className="w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-zinc-900 shadow-xl" />
                          <div className="absolute top-0 left-0 w-4 h-4 rounded-full bg-blue-500 animate-ping opacity-20" />
                       </div>
                    </div>
                </div>
             </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
