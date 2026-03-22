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
  ArrowLeft,
  Code,
  Presentation,
  Video,
  CheckCircle2,
} from "lucide-react";

import { HeroVideoDialog } from "@/components/ui/hero-video-dialog";

import SubmissionsList from "./SubmissionsList";
import AiDiscussion from "./AiDiscussion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface CodeSnippet {
  code: string;
  language: string;
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
  editorial?: string;
  videoUrl?: string;
  codeSnippets?: Record<string, CodeSnippet>;
}

interface ProblemDescriptionProps {
  problem: Problem;
  isSolved?: boolean;
}

const TABS = [
  { id: "Description", icon: FileCode2, label: "Description" },
  { id: "Editorial", icon: Code, label: "Editorial" },
  { id: "Submissions", icon: FileCode2, label: "Submissions" },
  { id: "ai-discussion", icon: Bot, label: "AI Discussion" },
  { id: "Solution", icon: CheckCircle2, label: "Solution" },
];

export default function ProblemDescription({
  problem,
  isSolved = true, // Temporarily forced for verification
}: ProblemDescriptionProps) {
  const [activeTab, setActiveTab] = useState("Description");
  const [expandedHints, setExpandedHints] = useState<number[]>([]);
  const [isTopicsExpanded, setIsTopicsExpanded] = useState(false);
  const [isCompaniesExpanded, setIsCompaniesExpanded] = useState(false);

  const title = problem?.title || "Loading...";
  const difficulty = problem?.difficulty || "EASY";
  const description = problem?.description || "No description provided.";
  const examples: Example[] = Array.isArray(problem?.examples)
    ? problem.examples
    : [];
  const tags = problem?.tags || [];
  const askedIn = problem?.askedIn || [];

  const difficultyStyles = {
    EASY: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    MEDIUM: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    HARD: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  };

  const toggleHint = (idx: number) => {
    setExpandedHints((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx],
    );
  };

  const getYoutubeId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="flex h-full flex-col bg-background overflow-hidden text-foreground">
      {/* Tabs — pill style */}
      <div className="flex w-full items-center gap-1 border-b border-border/50 bg-background/70 px-4 py-2 backdrop-blur-sm">
        <Link href="/problems" className="mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>

        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
              activeTab === tab.id
                ? "bg-primary/10 text-foreground shadow-sm dark:bg-white/10 dark:text-white"
                : "text-muted-foreground hover:bg-primary/5 hover:text-foreground dark:text-zinc-500 dark:hover:bg-white/5 dark:hover:text-zinc-300",
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
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {title}
              </h1>
              {isSolved && (
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-sm font-medium text-muted-foreground/90">
                    Solved
                  </span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </div>
              )}
            </div>

            {/* Badges row */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "rounded-lg border px-3 py-1 text-xs font-semibold",
                  difficultyStyles[difficulty] ?? difficultyStyles.EASY,
                )}
              >
                {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
              </span>
              <Badge variant="outline">Topics</Badge>
              <Badge variant="outline">Companies</Badge>
              <Badge variant="outline">Hint</Badge>
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

            {/* Description */}
            <div
              className="prose prose-sm dark:prose-invert max-w-none text-foreground dark:text-zinc-300 [&_code]:rounded-md [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-emerald-600 dark:[&_code]:bg-zinc-800/80 dark:[&_code]:text-emerald-400 [&_code]:text-xs"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {/* Examples */}
            {examples.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">
                  Examples
                </h3>
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
                          <span className="text-muted-foreground dark:text-zinc-500">
                            Input:{" "}
                          </span>
                          <span className="text-emerald-400">
                            {example.input}
                          </span>
                        </p>
                      )}
                      {example.output && (
                        <p>
                          <span className="text-muted-foreground dark:text-zinc-500">
                            Output:{" "}
                          </span>
                          <span className="text-emerald-400">
                            {example.output}
                          </span>
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
                <h3 className="text-sm font-semibold text-foreground">
                  Constraints
                </h3>
                <div className="rounded-xl border border-border/60 bg-muted/30 p-4 font-mono text-sm text-foreground dark:border-zinc-700/50 dark:bg-zinc-900/40 dark:text-zinc-300">
                  <div
                    dangerouslySetInnerHTML={{ __html: problem.constraints }}
                  />
                </div>
              </div>
            )}

            {/* topic */}
            <div className="space-y-3">
              <button
                onClick={() => setIsTopicsExpanded(!isTopicsExpanded)}
                className="w-full text-left"
              >
                <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/30 transition-colors hover:border-emerald-500/30 dark:border-zinc-700/50 dark:bg-zinc-900/40">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <FileCode2 className="h-4 w-4" />
                      <span className="font-medium text-foreground">
                        Topics
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform dark:text-zinc-500",
                        isTopicsExpanded && "rotate-180",
                      )}
                    />
                  </div>
                  {isTopicsExpanded && (
                    <div className="flex flex-wrap gap-2 border-t border-border/60 px-4 py-4 dark:border-zinc-700/50">
                      {tags.length > 0 ? (
                        tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                          >
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          No topics available
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            </div>

            {/* company */}
            <div className="space-y-3">
              <button
                onClick={() => setIsCompaniesExpanded(!isCompaniesExpanded)}
                className="w-full text-left"
              >
                <div className="overflow-hidden rounded-xl border border-border/60 bg-muted/30 transition-colors hover:border-primary/30 dark:border-zinc-700/50 dark:bg-zinc-900/40">
                  <div className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2 text-primary">
                      <Bookmark className="h-4 w-4" />
                      <span className="font-medium text-foreground">
                        Companies
                      </span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform dark:text-zinc-500",
                        isCompaniesExpanded && "rotate-180",
                      )}
                    />
                  </div>
                  {isCompaniesExpanded && (
                    <div className="flex flex-wrap gap-2 border-t border-border/60 px-4 py-4 dark:border-zinc-700/50">
                      {askedIn.length > 0 ? (
                        askedIn.map((company) => (
                          <Badge
                            key={company}
                            variant="secondary"
                            className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                          >
                            {company}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          No company information available
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </button>
            </div>

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
                            expandedHints.includes(idx) && "rotate-180",
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
                  <p className="mt-4 text-sm text-muted-foreground">
                    No hints available
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "Editorial" && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
            {/* Text Editorial Section */}
            {problem.editorial ? (
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-emerald-500/20 to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative space-y-6 rounded-3xl border border-border/50 bg-background/50 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center justify-between border-b border-border/40 pb-4">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20">
                        <Presentation className="h-5 w-5" />
                      </div>
                      Solution Approach
                    </h3>
                  </div>

                  <div
                    className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-foreground/90 dark:text-zinc-300 
                    [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-6
                    [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-4
                    [&_p]:leading-relaxed [&_p]:mb-4
                    [&_code]:rounded-md [&_code]:bg-zinc-100/80 [&_code]:px-1.5 [&_code]:py-0.5 
                    [&_code]:text-emerald-700 dark:[&_code]:bg-zinc-800/80 dark:[&_code]:text-emerald-300 [&_code]:text-[0.85em] [&_code]:font-medium
                    [&_pre]:bg-zinc-950/90 [&_pre]:p-5 [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-white/5 [&_pre]:shadow-2xl [&_pre]:my-6
                    [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2
                    [&_blockquote]:border-l-4 [&_blockquote]:border-emerald-500/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:bg-emerald-500/5 [&_blockquote]:py-2 [&_blockquote]:rounded-r-lg"
                    dangerouslySetInnerHTML={{ __html: problem.editorial }}
                  />
                </div>
              </div>
            ) : (
              !problem.videoUrl && (
                <div className="flex flex-col items-center justify-center py-24 text-center rounded-3xl border border-dashed border-border/60 bg-muted/20">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-emerald-500/10 rounded-full blur-2xl"></div>
                    <Code className="relative h-16 w-16 text-zinc-400 dark:text-zinc-600 animate-pulse" />
                  </div>
                  <h4 className="mt-6 text-lg font-semibold text-foreground">
                    Editorial coming soon
                  </h4>
                  <p className="mt-2 text-sm text-muted-foreground max-w-[300px] leading-relaxed">
                    Our algorithm experts are curating a comprehensive guide and
                    optimized code for this problem.
                  </p>
                  <div className="mt-8 flex gap-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/40"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 animate-bounce"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/40"></div>
                  </div>
                </div>
              )
            )}

            {/* Video Tutorial Section */}
            {problem.videoUrl && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative space-y-6 rounded-3xl border border-border/50 bg-background/50 p-6 md:p-8 backdrop-blur-xl shadow-2xl">
                  <div className="flex items-center justify-between border-b border-border/40 pb-4">
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500 dark:bg-blue-500/20">
                        <Video className="h-5 w-5" />
                      </div>
                      Video Deep Dive
                    </h3>
                    <Badge
                      variant="outline"
                      className="bg-blue-500/5 border-blue-500/20 text-blue-500 px-3 py-1"
                    >
                      YouTube Tutorial
                    </Badge>
                  </div>

                  <div className="relative w-full overflow-hidden rounded-2xl border border-border/40 shadow-inner group/video">
                    {getYoutubeId(problem.videoUrl) ? (
                      <HeroVideoDialog
                        animationStyle="from-center"
                        videoSrc={`https://www.youtube.com/embed/${getYoutubeId(problem.videoUrl)}`}
                        thumbnailSrc={`https://img.youtube.com/vi/${getYoutubeId(problem.videoUrl)}/maxresdefault.jpg`}
                        thumbnailAlt="Expert Video Walkthrough"
                        className="w-full transform transition duration-500 group-hover/video:scale-[1.01]"
                      />
                    ) : (
                      <div className="aspect-video w-full flex flex-col items-center justify-center bg-muted/30 text-muted-foreground gap-3">
                        <Video className="h-10 w-10 opacity-20" />
                        <span className="text-sm font-medium">
                          Invalid or missing video tutorial
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "Submissions" && (
          <div className="py-2">
            <SubmissionsList problemId={problem.id} problemTitle={title} />
          </div>
        )}

        {activeTab === "ai-discussion" && (
          <div className="h-full">
            <AiDiscussion problem={problem} codeSnippets={problem?.codeSnippets} />
          </div>
        )}

        {activeTab === "Solution" && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <MessageCircle className="h-12 w-12 text-zinc-600 dark:text-zinc-600" />
            <p className="mt-4 text-sm text-muted-foreground">
              Solutions coming soon
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Share your approach and learn from others
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
