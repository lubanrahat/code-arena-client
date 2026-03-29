"use client";

import { CourseCard } from "@/components/modules/Courses/CourseCard";
import { Sparkles, Trophy, Star, ArrowRight, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const courses = [
  {
    title: "CS Fundamentals With Phitron: Spring 2026",
    description:
      "This course is designed to provide a strong foundation in computer science and programming. It covers fundamental concepts of computer science, including data structures, algorithms, and programming paradigms. The course is taught by experienced instructors and provides hands-on coding challenges to help students master the concepts.",
    rating: 4.9,
    image: "/courses/phitron.webp",
    tag: "CSE",
    batch: "Batch 9",
    url: "https://phitron.io/course-details/batch9",
  },
  {
    title: "Interview Preparation with JavaScript",
    description:
      "Master JavaScript for coding interviews with expert-led lessons, hands-on coding challenges, and real-world problem-solving techniques to ace technical interviews.",
    rating: 4.8,
    image: "/courses/js.png",
    tag: "JS",
    batch: "Batch 2",
    url: "https://youtube.com/playlist?list=PLTjRvDozrdlxEIuOBZkMAK5uiqp8rHUax&si=aAwYwfry-np3rlp2",
  },
  {
    title: "AI-Driven Full-Stack Developer",
    description:
      "Learn to automate your development workflow, manage cloud infrastructure, and implement CI/CD pipelines using industry-standard tools like Docker, Kubernetes, and AWS",
    rating: 4.9,
    image: "/courses/phl2.png",
    tag: "PHL2",
    url: "https://next.programming-hero.com",
  },
  {
    title: "Become an  AI/ML Expert  with Phitron",
    description:
      "Master end-to-end data science, from data collection and analysis to building and deploying machine learning models, with hands-on projects and expert guidance.",
    rating: 4.9,
    image: "/courses/aiml.jpg",
    tag: "AI/ML",
    batch: "Batch 2",
    url: "https://phitron.io/course-details/ai-ml-batch2",
  },
  {
    title: "DevOps for Developers",
    description:
      "Learn to automate your development workflow, manage cloud infrastructure, and implement CI/CD pipelines using industry-standard tools like Docker, Kubernetes, and AWS.",
    rating: 4.7,
    url: "https://youtu.be/H5FAxTBuNM8",
    image: "/courses/devops.png",
    tag: "Cloud",
    batch: "Batch 6",
  },
  {
    title: "GenAI with Python",
    description:
      "Explore the cutting-edge world of Generative AI. Learn to build and deploy LLM-powered applications using Python, LangChain, and OpenAI APIs.",
    rating: 4.9,
    image: "/courses/genai.png",
    tag: "AI",
    batch: "Batch 6",
    url: "https://web.programming-hero.com/course-details",
  },
];

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black pt-14 pb-20 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full sm:block hidden" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full sm:block hidden" />
        <div
          className="absolute inset-0 opacity-[0.15] dark:opacity-[0.25]"
          style={{
            backgroundImage: `radial-gradient(#2563eb 0.5px, transparent 0.5px), radial-gradient(#2563eb 0.5px, transparent 0.5px)`,
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px",
          }}
        />
      </div>

      {/* Branded Beta Banner */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-linear-to-r from-blue-700 via-indigo-700 to-blue-800 py-3.5 px-4 shadow-2xl relative z-30"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-center">
          <div className="flex bg-white/20 px-3 py-1 rounded-full gap-2 items-center">
            <Sparkles className="h-3.5 w-3.5 text-white animate-pulse" />
            <span className="text-[10px] font-black uppercase text-white tracking-widest leading-none">
              Special Offer
            </span>
          </div>
          <p className="text-white text-xs sm:text-sm font-bold tracking-tight uppercase leading-none">
            CodeArena Beta Launch! Use code{" "}
            <span className="bg-white text-blue-800 px-3 py-1 rounded-lg mx-1 select-all hover:scale-105 transition-all inline-block cursor-pointer font-black shadow-lg">
              LUBANRAHAT007
            </span>{" "}
            for 10% instant discount!
          </p>
        </div>
      </motion.div>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 mt-20 sm:mt-32 relative z-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 mb-24">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-blue-600/10 dark:bg-blue-400/5 border border-blue-600/20 text-blue-600 dark:text-blue-400 text-[11px] font-black uppercase tracking-[0.3em]"
            >
              <Trophy className="h-4 w-4" />
              World-Class Content
            </motion.div>

            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter text-neutral-950 dark:text-white leading-[0.85]">
              Mastery Starts
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Right Here
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed max-w-2xl">
              Unlock your potential with premium coding courses curated by{" "}
              <span className="text-neutral-950 dark:text-white font-black underline decoration-blue-600 decoration-4 underline-offset-8">
                Programming Hero
              </span>
              . Accelerate your career with industry-proven courses.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-12 pt-6">
              <div className="flex flex-col">
                <span className="text-4xl font-black dark:text-white leading-none">
                  10k+
                </span>
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-2">
                  Active Students
                </span>
              </div>
              <div className="h-12 w-px bg-neutral-200 dark:bg-neutral-800" />
              <div className="flex flex-col">
                <span className="text-4xl font-black dark:text-white leading-none">
                  50+
                </span>
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-2">
                  Expert Guides
                </span>
              </div>
              <div className="h-12 w-px bg-neutral-200 dark:bg-neutral-800" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 leading-none">
                  <span className="text-4xl font-black dark:text-white">
                    4.9
                  </span>
                  <Star className="h-6 w-6 fill-amber-500 text-amber-500" />
                </div>
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-2">
                  Verified Rating
                </span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-96 space-y-4">
            <div className="p-8 rounded-[2.5rem] bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Users className="h-24 w-24" />
              </div>
              <p className="text-neutral-700 dark:text-neutral-300 font-medium italic mb-6 relative z-10">
                &quot;The curriculum is exceptionally well-structured. I went
                from basics to building professional apps in months.&quot;
              </p>
              <div className="flex items-center gap-4 relative z-10">
                <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black shadow-xl">
                  RP
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-black dark:text-white leading-tight">
                    Rahat P.
                  </span>
                  <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                    Web Developer
                  </span>
                </div>
              </div>
            </div>
            <Button className="w-full bg-linear-to-r from-blue-700 to-indigo-700 h-16 rounded-[2rem] font-black text-xs uppercase tracking-widest text-white shadow-2xl hover:scale-[1.02] transition-all active:scale-95 group overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Join CodeArena For Free{" "}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </div>
        </div>

        {/* Course Grid */}
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 xl:gap-16",
          )}
        >
          {courses.map((course, index) => (
            <CourseCard
              key={index}
              {...course}
              style={{ transitionDelay: `${index * 150}ms` }}
            />
          ))}
        </div>
      </main>

      {/* Bottom Glow */}
      <div className="absolute bottom-[-10%] left-[50%] translate-x-[-50%] w-[80%] h-[30%] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}
