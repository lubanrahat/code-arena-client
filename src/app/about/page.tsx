import React from "react";
import { Terminal, Shield, Zap, Globe, Target, Cpu } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      title: "Excellence in Engineering",
      description: "We believe in writing performant, clean, and scalable code. Our platform is a reflection of the standards we expect from our community.",
      icon: Cpu,
    },
    {
      title: "Fair Competition",
      description: "Our Elo rating system and contest formats are designed for ultimate fairness. No gimmicks, just pure algorithmic skill.",
      icon: Shield,
    },
    {
      title: "Blazing Fast Feedback",
      description: "We optimize our execution engine down to the millisecond so you spend more time thinking and less time waiting.",
      icon: Zap,
    },
    {
      title: "Global Community",
      description: "From students to senior engineers, CodeArena is a place where developers across the globe connect over shared challenges.",
      icon: Globe,
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pb-24">
      {/* Hero Section */}
      <div className="pt-32 pb-20 px-6 relative">
        <div className="absolute inset-0 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 transform skew-y-[-2deg] origin-top-left -z-10"></div>
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="flex flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-indigo-600 shadow-2xl shadow-blue-500/30 mb-8">
              <Terminal className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white tracking-tight mb-6">
              Our Mission
            </h1>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed">
              To build the ultimate proving ground for software engineers. We aim to identify and elevate top technical talent through rigorous, fair, and high-performance competitive programming.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="container mx-auto px-6 max-w-5xl mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm font-semibold text-zinc-900 dark:text-zinc-300">
              <Target className="w-4 h-4 text-blue-500" />
              The Genesis
            </div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Built by engineers, for engineers.</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              CodeArena started as a week-end hackathon project. We were frustrated by existing competitive platforms that were either too slow, plagued with legacy UI, or lacked fair matchmaking systems.
            </p>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Today, CodeArena serves thousands of daily submissions with an architecture that can evaluate complex algorithms in isolated secure environments within milliseconds.
            </p>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-linear-to-tr from-blue-500 to-indigo-500 rounded-3xl blur-3xl opacity-20 dark:opacity-30"></div>
             <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 relative z-10">
               <pre className="text-sm font-mono text-zinc-800 dark:text-zinc-300 overflow-x-auto">
                 <code>
{`// CodeArena Execution Engine
func evaluate(submission SourceCode) Result {
  env := sandbox.Create()
  defer env.Destroy()
  
  compiled := env.Compile(submission)
  if compiled.HasErrors() {
    return Result{Status: CompileError}
  }

  return env.RunTests(compiled)
}`}
                 </code>
               </pre>
             </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="container mx-auto px-6 max-w-6xl mt-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, idx) => (
            <div key={idx} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <value.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{value.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
