import React from "react";
import { ArrowRight, Coffee, Laptop, Zap, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CareersPage() {
  const roles = [
    {
      title: "Senior Go Backend Engineer",
      department: "Engineering",
      location: "Remote (Global)",
      type: "Full-time",
    },
    {
      title: "Frontend Engineer - React / Next.js",
      department: "Engineering",
      location: "San Francisco, CA or Remote",
      type: "Full-time",
    },
    {
      title: "Technical Product Manager",
      department: "Product",
      location: "Remote (US/EU)",
      type: "Full-time",
    },
    {
      title: "Community Manager (Developer Relations)",
      department: "Marketing",
      location: "Remote",
      type: "Part-time",
    }
  ];

  const perks = [
    { title: "Remote-First", icon: Laptop, desc: "Work from anywhere in the world. We value output, not office hours." },
    { title: "Great Compensation", icon: Zap, desc: "Competitive global salary bands plus early-stage equity." },
    { title: "Health & Wellness", icon: Heart, desc: "Comprehensive health insurance and a monthly wellness stipend." },
    { title: "Home Office Stipend", icon: Coffee, desc: "We'll set you up with a top-tier MacBook, monitor, and desk gear." }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pb-24">
      {/* Hero */}
      <div className="pt-32 pb-24 px-6 relative overflow-hidden flex flex-col items-center border-b border-zinc-200 dark:border-zinc-800">
        <Badge variant="outline" className="mb-6 bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20">
          We&apos;re Hiring
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight text-center mb-6 max-w-4xl">
          Help us build the next generation of competitive programming.
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl text-center mb-10">
          Join a passionate team of engineers, designers, and algorithmic problem solvers. Let&apos;s build something great together.
        </p>
        <div className="flex items-center gap-4">
          <Button size="lg" className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100 rounded-full h-12 px-8" asChild>
            <a href="#open-roles">View Open Roles</a>
          </Button>
        </div>
      </div>

      {/* Perks */}
      <div className="bg-zinc-50 dark:bg-zinc-900/50 py-24 px-6 border-b border-zinc-200 dark:border-zinc-800">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Perks & Benefits</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shadow-sm">
                  <perk.icon className="w-6 h-6 text-zinc-900 dark:text-white" />
                </div>
                <h3 className="font-bold text-zinc-900 dark:text-white">{perk.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Roles */}
      <div id="open-roles" className="container mx-auto px-6 max-w-4xl mt-24">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Open Roles</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-2">Don&apos;t see a perfect fit? Send your resume to careers@codearena.com anyway.</p>
        </div>

        <div className="space-y-4">
          {roles.map((role, idx) => (
            <Link href="#" key={idx} className="block group">
              <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300">
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{role.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <Badge variant="secondary" className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">{role.department}</Badge>
                    <span className="text-zinc-500">{role.location}</span>
                    <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
                    <span className="text-zinc-500">{role.type}</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Button variant="ghost" className="rounded-full w-12 h-12 p-0 bg-zinc-50 dark:bg-zinc-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    <ArrowRight className="w-5 h-5 group-hover:-rotate-45 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
