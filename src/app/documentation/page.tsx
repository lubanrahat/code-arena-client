import React from "react";
import { Book, Code, Terminal, Zap, Puzzle, Layout } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocumentationPage() {
  const categories = [
    {
      title: "Core Concepts",
      description: "Learn the fundamentals of CodeArena's architecture and competitive platform.",
      icon: Book,
      link: "#"
    },
    {
      title: "Algorithms API",
      description: "Integrate with our algorithm execution engine programmatically.",
      icon: Code,
      link: "#"
    },
    {
      title: "CLI Tools",
      description: "Use CodeArena straight from your terminal.",
      icon: Terminal,
      link: "#"
    },
    {
      title: "Performance Tuning",
      description: "Tips on writing optimal and high-performance solutions.",
      icon: Zap,
      link: "#"
    },
    {
      title: "Integrations",
      description: "Connect CodeArena with GitHub, GitLab, and other CI/CD pipelines.",
      icon: Puzzle,
      link: "#"
    },
    {
      title: "UI Components",
      description: "Design guidelines and components used across CodeArena.",
      icon: Layout,
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pb-24">
      {/* Hero Section */}
      <div className="bg-zinc-900 dark:bg-black pt-32 pb-20 px-6 border-b border-zinc-800 relative overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
        <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl" />
        
        <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">
            Documentation
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Everything you need to know about building, competing, and excelling on CodeArena.
          </p>
          
          <div className="mt-10 w-full max-w-xl">
             <div className="relative flex items-center">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input 
                  type="text" 
                  className="block w-full pl-12 pr-4 py-4 md:py-5 border-zinc-700 bg-zinc-800/50 text-white rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-zinc-500 backdrop-blur-xl transition-all" 
                  placeholder="Search documentation..."
                />
             </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-6xl mt-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight">Explore Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, idx) => (
            <Link href={category.link} key={idx} className="block group">
              <Card className="h-full bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <category.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-zinc-900 dark:text-white">{category.title}</CardTitle>
                  <CardDescription className="text-zinc-600 dark:text-zinc-400 mt-2">
                    {category.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
