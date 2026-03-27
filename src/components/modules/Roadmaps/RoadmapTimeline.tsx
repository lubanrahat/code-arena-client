"use client";

import { motion } from "framer-motion";
import { RoadmapStep } from "@/data/roadmap-data";
import { Circle, PlayCircle, FileText, Code2, CheckCircle2, ArrowRight } from "lucide-react";

interface RoadmapTimelineProps {
  steps: RoadmapStep[];
}

const iconMap = {
  video: PlayCircle,
  article: FileText,
  project: Code2,
  exercise: CheckCircle2,
};

export default function RoadmapTimeline({ steps }: RoadmapTimelineProps) {
  return (
    <div className="relative py-20 px-6">
      {/* Premium Vertical Line with Gradient */}
      <div className="absolute left-[34px] md:left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-linear-to-b from-transparent via-indigo-500/30 to-transparent p-0.5">
         <div className="w-full h-full bg-linear-to-b from-transparent via-indigo-500/10 to-transparent animate-pulse" />
      </div>

      <div className="space-y-32 relative z-10 max-w-6xl mx-auto">
        {steps.map((step, index) => {
          const isEven = index % 2 === 0;
          const Icon = step.type ? iconMap[step.type] : Circle;

          return (
            <div key={step.id} className="relative">
              {/* Step Number Dot (Center) */}
              <div className="absolute left-[34px] md:left-1/2 -translate-x-1/2 top-0 z-20">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  className="w-16 h-16 rounded-[1.25rem] bg-indigo-600 border-[6px] border-white dark:border-zinc-950 flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(79,70,229,0.5)]"
                >
                  <span className="text-sm font-black text-white">{index + 1}</span>
                </motion.div>
              </div>

              {/* Content Connector Line (Mobile) */}
              <div className="md:hidden absolute left-[34px] top-16 bottom-0 w-[1px] bg-indigo-500/20" />

              <motion.div
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`flex flex-col md:flex-row items-start ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } gap-12 md:gap-20 pt-2`}
              >
                {/* Content Side */}
                <div className={`flex-1 w-full pl-24 md:pl-0 ${isEven ? "md:text-right" : "md:text-left"}`}>
                  <div className="group relative inline-block w-full">
                    {/* Background Card */}
                    <div className="p-8 md:p-10 rounded-[2.5rem] bg-white dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-100 dark:border-zinc-800 transition-all duration-500 group-hover:border-indigo-500/30 group-hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.1)]">
                       <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {step.title}
                       </h3>
                       <p className="text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed mb-8 text-base">
                        {step.description}
                       </p>
                       
                       {step.link && (
                         <a
                           href={step.link}
                           target="_blank"
                           rel="noopener noreferrer"
                           className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-zinc-900 dark:bg-zinc-800 text-white text-[13px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all hover:shadow-xl hover:shadow-indigo-600/20 ${
                             isEven ? "md:flex-row-reverse" : ""
                           }`}
                         >
                           Explore Step
                           <ArrowRight className="w-4 h-4" />
                         </a>
                       )}
                    </div>
                  </div>
                </div>

                {/* Empty Side for balancing (Desktop) */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
