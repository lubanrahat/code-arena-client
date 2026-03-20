"use client";

import React, { useState } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Share2,
  Lightbulb,
  ChevronDown,
  MessageCircle,
  FileCode2,
  HelpCircle,
  Bot,
} from "lucide-react";
import SubmissionsList from "./SubmissionsList";
import AiDiscussion from "./AiDiscussion";
import { cn } from "@/lib/utils";

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags: string[];
  topic?: string;
  askedIn?: string[];
  examples: Example[];
  constraints: string;
  hints?: string[];
}

interface ProblemDescriptionProps {
  problem: Problem;
}

const TABS = [
  { id: "Description", icon: FileCode2, label: "Description" },
  { id: "Discussion", icon: MessageCircle, label: "Discussion" },
  { id: "Submissions", icon: FileCode2, label: "Submissions" },
  { id: "ai-discussion", icon: Bot, label: "CodeArenaBot" },
];


export default function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const [activeTab, setActiveTab] = useState("Description");
  const [expandedHints, setExpandedHints] = useState<number[]>([]);

  const title = problem?.title || "Loading...";
  const topic = problem?.topic || "Programming";
  const difficulty = problem?.difficulty || "EASY";
  const description = problem?.description || "No description provided.";
  const examples: Example[] = Array.isArray(problem?.examples) ? problem.examples : [];
  const tags = problem?.tags || [];
  const askedIn = problem?.askedIn || [];

  const difficultyStyles = {
    EASY: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    MEDIUM: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    HARD: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  };

  const toggleHint = (idx: number) => {
    setExpandedHints((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="flex h-full flex-col bg-background overflow-hidden text-foreground">
      {/* Tabs — pill style */}
      <div className="flex w-full items-center gap-1 border-b border-border/50 bg-background/70 px-4 py-2 backdrop-blur-sm">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
              activeTab === tab.id
                ? "bg-primary/10 text-foreground shadow-sm dark:bg-white/10 dark:text-white"
                : "text-muted-foreground hover:bg-primary/5 hover:text-foreground dark:text-zinc-500 dark:hover:bg-white/5 dark:hover:text-zinc-300"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-border/70 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent">
        {activeTab === "Description" && (
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {title}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Programming &gt; {topic}
              </p>
            </div>

            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-lg border px-3 py-1 text-xs font-semibold",
                  difficultyStyles[difficulty] ?? difficultyStyles.EASY
                )}
              >
                {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
              </span>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-border/60 bg-muted/50 px-3 py-1 text-xs font-medium text-foreground dark:bg-zinc-800/50 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}

            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 border-b border-border/50 pb-4">
              <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-emerald-500 dark:hover:text-emerald-400">
                <ThumbsUp className="h-4 w-4" />
                <span>0</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-rose-500 dark:hover:text-rose-400">
                <ThumbsDown className="h-4 w-4" />
                <span>0</span>
              </button>
              <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-amber-500 dark:hover:text-amber-400">
                <Bookmark className="h-4 w-4" />
                Bookmark
              </button>
              <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-sky-500 dark:hover:text-sky-400">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>

            {/* Asked In */}
            {askedIn.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground">Asked in</span>
                <div className="flex flex-wrap gap-2">
                  {askedIn.map((company) => (
                    <span
                      key={company}
                      className="rounded-md border border-border/60 bg-muted/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground dark:bg-zinc-800/40 dark:text-zinc-400"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div
              className="prose prose-sm dark:prose-invert max-w-none text-foreground dark:text-zinc-300 [&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-emerald-600 dark:[&_code]:bg-zinc-800/80 dark:[&_code]:text-emerald-400 [&_code]:text-xs"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {/* Examples */}
            {examples.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Examples</h3>
                {examples.map((example, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-xl border border-border/60 bg-muted/30 dark:border-zinc-700/50 dark:bg-zinc-900/40"
                  >
                    <div className="border-b border-border/60 bg-muted/40 px-4 py-2.5 dark:border-zinc-700/50 dark:bg-zinc-800/50">
                      <span className="text-xs font-semibold text-muted-foreground dark:text-zinc-400">
                        Example {idx + 1}
                      </span>
                    </div>
                    <div className="space-y-3 p-4 font-mono text-sm">
                      {example.input && (
                        <p>
                          <span className="text-muted-foreground dark:text-zinc-500">Input: </span>
                          <span className="text-emerald-400">{example.input}</span>
                        </p>
                      )}
                      {example.output && (
                        <p>
                          <span className="text-muted-foreground dark:text-zinc-500">Output: </span>
                          <span className="text-emerald-400">{example.output}</span>
                        </p>
                      )}
                      {example.explanation && (
                        <p className="mt-2 font-sans text-xs leading-relaxed text-muted-foreground dark:text-zinc-500">
                          <span className="font-medium text-muted-foreground dark:text-zinc-400">
                            Explanation:{" "}
                          </span>
                          {example.explanation}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Constraints */}
            {problem?.constraints && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground">Constraints</h3>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-4 font-mono text-sm text-foreground dark:border-zinc-700/50 dark:bg-zinc-900/40 dark:text-zinc-300">
                  <div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
                </div>
              </div>
            )}


            <div className="space-y-3">
            {problem?.hints && problem.hints.length > 0 ? (
              problem.hints.map((hint: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => toggleHint(idx)}
                  className="w-full text-left"
                >
                  <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/30 transition-colors hover:border-amber-500/30 dark:border-zinc-700/50 dark:bg-zinc-900/40">
                    <div className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-2 text-amber-400">
                        <Lightbulb className="h-4 w-4" />
                        <span className="font-medium">Hint {idx + 1}</span>
                      </div>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 text-muted-foreground transition-transform dark:text-zinc-500",
                          expandedHints.includes(idx) && "rotate-180"
                        )}
                      />
                    </div>
                    {expandedHints.includes(idx) && (
                      <div className="border-t border-border/60 px-4 py-3 text-sm text-muted-foreground dark:border-zinc-700/50 dark:text-zinc-400">
                        {hint}
                      </div>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <HelpCircle className="h-12 w-12 text-zinc-600" />
                <p className="mt-4 text-sm text-muted-foreground">No hints available</p>
              </div>
            )}
          </div>

            
          </div>
        )}

        {activeTab === "Discussion" && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <MessageCircle className="h-12 w-12 text-zinc-600 dark:text-zinc-600" />
            <p className="mt-4 text-sm text-muted-foreground">Discussions coming soon</p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Share your approach and learn from others
            </p>
          </div>
        )}

        {activeTab === "Submissions" && (
          <div className="py-2">
            <SubmissionsList problemId={problem.id} problemTitle={title} />
          </div>
        )}

        {activeTab === "ai-discussion" && (
          <div className="h-full">
            <AiDiscussion problem={problem} />
          </div>
        )}
      </div>
    </div>
  );
}
