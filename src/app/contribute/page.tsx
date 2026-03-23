"use client";

import { 
  Code2, 
  Terminal, 
  ScrollText, 
  SquarePen, 
  Map, 
  BookMarked, 
  Sparkles 
} from "lucide-react";
import ContributionCard from "@/components/modules/Contribute/ContributionCard";
import ContributionForm from "@/components/modules/Contribute/ContributionForm";
import { motion } from "framer-motion";

const waysToContribute = [
  {
    title: "Add Problems",
    description: "Craft challenging coding problems to test and teach problem-solving skills.",
    icon: Code2,
  },
  {
    title: "Create Test Cases",
    description: "Design test cases to ensure the accuracy and robustness of coding problems.",
    icon: Terminal,
  },
  {
    title: "Curate Sheets",
    description: "Build curated problem sets to guide learners through specific topics.",
    icon: ScrollText,
  },
  {
    title: "Write Blogs",
    description: "Share tutorials, tips, and insights to help coders learn and grow.",
    icon: SquarePen,
  },
  {
    title: "Create Roadmaps",
    description: "Develop structured learning paths to help users master coding concepts.",
    icon: Map,
  },
  {
    title: "Add Glossary Terms",
    description: "Contribute technical terms to expand our educational glossary.",
    icon: BookMarked,
  },
  {
    title: "Other Contributions",
    description: "Propose creative ideas to enhance the CodeArena platform.",
    icon: Sparkles,
  },
];

export default function ContributePage() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-zinc-950 pt-32 pb-24 overflow-hidden">
      {/* Dashed Center Fade Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.1] dark:opacity-[0.2]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 2px,
              transparent 2px,
              transparent 6px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 2px,
              transparent 2px,
              transparent 6px
            ),
            radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 2px,
              transparent 2px,
              transparent 6px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 2px,
              transparent 2px,
              transparent 6px
            ),
            radial-gradient(ellipse 60% 60% at 50% 50%, black 30%, transparent 80%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight"
          >
            Contribute to <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">CodeArena</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            As a CodeArena contributor, you&apos;ll play a vital role in empowering learners worldwide. 
            Whether you&apos;re crafting coding problems, writing insightful blogs, or curating 
            learning paths, your work will inspire and educate thousands.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left Column: Ways to Contribute */}
          <div className="lg:w-1/2 space-y-12">
            <div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8 border-l-4 border-blue-600 pl-6">
                Ways to Contribute
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
                {waysToContribute.map((way, index) => (
                  <ContributionCard 
                    key={index}
                    title={way.title}
                    description={way.description}
                    icon={way.icon}
                    delay={0.2 + index * 0.05}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:w-1/2">
            <div className="sticky top-32">
              <ContributionForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}