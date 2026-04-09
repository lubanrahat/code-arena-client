import React from "react";
import { Play, UserPlus, Trophy, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GettingStartedPage() {
  const steps = [
    {
      step: "01",
      title: "Create Your Account",
      description: "Sign up using GitHub, Google, or with your email address to unlock your personalized dashboard.",
      icon: UserPlus,
      color: "text-indigo-500",
      bg: "bg-indigo-50 dark:bg-indigo-500/10"
    },
    {
      step: "02",
      title: "Solve Your First Problem",
      description: "Head over to the Practice arena. Start with an 'Easy' problem to get accustomed to the editor and test cases.",
      icon: Play,
      color: "text-emerald-500",
      bg: "bg-emerald-50 dark:bg-emerald-500/10"
    },
    {
      step: "03",
      title: "Climb the Leaderboard",
      description: "Earn rating points and badges by solving problems optimally. See how you stack up against top engineers.",
      icon: Trophy,
      color: "text-amber-500",
      bg: "bg-amber-50 dark:bg-amber-500/10"
    },
    {
      step: "04",
      title: "Join a Contest",
      description: "Ready for a challenge? Participate in our weekly timed contests to simulate real-world interviews.",
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-50 dark:bg-blue-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Getting Started with CodeArena
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Your journey to mastering algorithms starts here. Follow these simple steps to kickstart your progress.
          </p>
        </div>

        <div className="relative">
          {/* Vertical joining line */}
          <div className="absolute left-6 md:left-[39px] top-6 bottom-6 w-0.5 bg-zinc-200 dark:bg-zinc-800 hidden md:block"></div>
          
          <div className="space-y-12">
            {steps.map((item, idx) => (
              <div key={idx} className="relative flex flex-col md:flex-row gap-6 md:gap-12 group">
                {/* Number / Icon marker */}
                <div className="flex-shrink-0 flex items-center justify-center relative z-10 w-20 h-20">
                  <div className={`w-full h-full rounded-2xl ${item.bg} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm border border-zinc-100 dark:border-zinc-800`}>
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-colors">
                  <h3 className="text-zinc-400 dark:text-zinc-500 font-mono text-sm font-bold tracking-widest mb-2">STEP {item.step}</h3>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">{item.title}</h2>
                  <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center bg-zinc-900 dark:bg-white rounded-3xl p-12 overflow-hidden relative">
           <div className="absolute inset-0 bg-linear-to-br from-blue-600/20 to-indigo-600/20 dark:from-blue-600/10 dark:to-indigo-600/10 mix-blend-overlay"></div>
           <h2 className="text-3xl font-bold text-white dark:text-zinc-900 mb-6 relative z-10">Ready to write your first line of code?</h2>
           <Link href="/register" className="relative z-10">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 rounded-full h-14 px-8 text-lg font-semibold group">
                Create Free Account
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
           </Link>
        </div>
      </div>
    </div>
  );
}
