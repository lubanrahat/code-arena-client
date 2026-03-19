"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { allProblems } from "@/app/problems/_action";
import Link from "next/link";
import {
  List,
  Bookmark,
  CheckSquare,
  CheckCircle2,
  Search,
  Zap,
  Clock,
  TrendingUp,
  Building2,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const STATUS_TABS = [
  { icon: List, label: "All Questions", value: "" },
  { icon: Bookmark, label: "Bookmarks", value: "SAVED" },
  { icon: CheckSquare, label: "Attempted", value: "ATTEMPTED" },
  { icon: CheckCircle2, label: "Solved", value: "SOLVED" },
];

const DIFFICULTY_OPTIONS = [
  { value: "", label: "All" },
  { value: "EASY", label: "Easy", color: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30" },
  { value: "MEDIUM", label: "Medium", color: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30" },
  { value: "HARD", label: "Hard", color: "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30" },
];

const TOPIC_OPTIONS = [
  { value: "", label: "All Topics" },
  { value: "Array", label: "Array" },
  { value: "String", label: "String" },
  { value: "Dynamic Programming", label: "DP" },
  { value: "Greedy", label: "Greedy" },
  { value: "Math", label: "Math" },
];

function getMockData(id: string) {
  const num = id.split("-").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return {
    avgTime: (num % 45) + 15,
    askedCount: (num % 5) + 1,
  };
}

export default function ProblemList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("");
  const [topic, setTopic] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(search), 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: ["problems", { search: debouncedSearch, difficulty, status, topic }],
    queryFn: () =>
      allProblems({
        search: debouncedSearch || undefined,
        difficulty: difficulty || undefined,
        status: status || undefined,
        topic: topic || undefined,
      }),
  });

  const problems = (data?.data ?? data) ?? [];
  const problemList = Array.isArray(problems) ? problems : [];

  const handlePickRandom = () => {
    if (problemList.length > 0) {
      const randomProblem = problemList[Math.floor(Math.random() * problemList.length)];
      router.push(`/problems/${randomProblem.id}`);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setDifficulty("");
    setStatus("");
    setTopic("");
  };

  const hasActiveFilters = search || difficulty || status || topic;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
        <div className="mb-8 flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-full" />
          ))}
        </div>
        <div className="mb-6 flex flex-wrap gap-3">
          <Skeleton className="h-11 flex-1 min-w-[240px] max-w-md rounded-xl" />
          <Skeleton className="h-11 w-24 rounded-xl" />
          <Skeleton className="h-11 w-36 rounded-xl" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
      {/* Tabs */}
      <div className="mb-8 flex flex-wrap gap-1 rounded-2xl bg-muted/50 p-1.5 ring-1 ring-border/50">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setStatus(tab.value)}
            className={cn(
              "flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200",
              status === tab.value
                ? "bg-background text-foreground shadow-sm ring-1 ring-border/80"
                : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search + Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search problems or keywords..."
              className="h-11 rounded-xl border-border/80 bg-background pl-10 pr-4 shadow-sm transition-shadow focus-visible:ring-2 focus-visible:ring-primary/20"
            />
          </div>
          <Button
            onClick={handlePickRandom}
            disabled={problemList.length === 0}
            className="h-11 gap-2 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 px-5 font-medium text-white shadow-md shadow-violet-500/25 transition-all hover:from-violet-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-violet-500/30 disabled:opacity-50"
          >
            <Zap className="h-4 w-4" />
            Pick Random
          </Button>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-muted-foreground">Difficulty:</span>
          {DIFFICULTY_OPTIONS.map((opt) => (
            <button
              key={opt.value || "all"}
              onClick={() => setDifficulty(opt.value)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                difficulty === opt.value
                  ? opt.color || "bg-primary/10 text-primary border-primary/30"
                  : "border-border bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
          <span className="mx-2 h-4 w-px bg-border" />
          <span className="text-xs font-medium text-muted-foreground">Topic:</span>
          {TOPIC_OPTIONS.map((opt) => (
            <button
              key={opt.value || "all"}
              onClick={() => setTopic(opt.value)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all",
                topic === opt.value
                  ? "bg-primary/10 text-primary border-primary/30"
                  : "border-border bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              )}
            >
              {opt.label}
            </button>
          ))}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="ml-2 h-7 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {/* Table headers (desktop) */}
      <div className="mb-2 hidden grid-cols-[1fr_140px_100px_90px_100px_120px] gap-4 px-4 text-xs font-medium uppercase tracking-wider text-muted-foreground md:grid">
        <div>Problem</div>
        <div className="text-center">Topic</div>
        <div className="text-center">Difficulty</div>
        <div className="text-center">Avg time</div>
        <div className="text-center">Submissions</div>
        <div className="text-right">Asked in</div>
      </div>

      {/* Problem list */}
      <div className="space-y-2">
        {problemList.length > 0 ? (
          problemList.map((problem: Record<string, unknown>, idx: number) => {
            const mock = getMockData(String(problem.id));
            const difficultyKey = String(problem.difficulty || "EASY");
            const difficultyStyles: Record<string, string> = {
              EASY: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
              MEDIUM: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
              HARD: "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30",
            };
            return (
              <Card
                key={String(problem.id)}
                className={cn(
                  "group overflow-hidden transition-all duration-200 hover:shadow-md hover:ring-1 hover:ring-primary/10",
                  idx === 0 && "ring-1 ring-primary/20"
                )}
              >
                <CardContent className="p-0">
                  <Link
                    href={`/problems/${problem.id}`}
                    className="grid grid-cols-1 gap-4 p-4 md:grid-cols-[1fr_140px_100px_90px_100px_120px] md:items-center md:gap-4"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted/60">
                        {Array.isArray(problem.solvedBy) && problem.solvedBy.length > 0 ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <span className="text-xs font-semibold text-muted-foreground">{idx + 1}</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground transition-colors group-hover:text-primary">
                          {String(problem.title)}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground md:hidden">
                          {String(problem.topic || "General")} · {(problem._count as { submissions?: number })?.submissions ?? 0} submissions
                        </p>
                      </div>
                      <ChevronRight className="ml-auto h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 md:ml-0" />
                    </div>

                    <div className="hidden justify-center md:flex">
                      <Badge variant="outline" className="rounded-lg border-border/80 bg-muted/30 font-normal">
                        {String(problem.topic || "General")}
                      </Badge>
                    </div>

                    <div className="hidden justify-center md:flex">
                      <span
                        className={cn(
                          "rounded-lg border px-2.5 py-1 text-xs font-semibold",
                          difficultyStyles[difficultyKey] ?? difficultyStyles.EASY
                        )}
                      >
                        {String(problem.difficulty || "Easy").charAt(0).toUpperCase() +
                          String(problem.difficulty || "easy").slice(1).toLowerCase()}
                      </span>
                    </div>

                    <div className="hidden items-center justify-center gap-1.5 text-sm text-muted-foreground md:flex">
                      <Clock className="h-3.5 w-3.5" />
                      {mock.avgTime} min
                    </div>

                    <div className="hidden items-center justify-center gap-1.5 text-sm text-muted-foreground md:flex">
                      <TrendingUp className="h-3.5 w-3.5" />
                      {(problem._count as { submissions?: number })?.submissions?.toLocaleString() ?? 0}
                    </div>

                    <div className="hidden items-center justify-end gap-2 text-xs text-muted-foreground md:flex">
                      <Building2 className="h-3.5 w-3.5" />
                      <span className="flex -space-x-1.5">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold ring-2 ring-background">
                          G
                        </span>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold ring-2 ring-background">
                          A
                        </span>
                      </span>
                      <span className="font-medium text-primary">+{mock.askedCount}</span>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Card className="overflow-hidden border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted/60">
                <Sparkles className="h-7 w-7 text-muted-foreground" />
              </div>
              <p className="text-base font-medium text-foreground">No problems found</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Try adjusting your search or filters to find what you&apos;re looking for.
              </p>
              <Button
                variant="outline"
                onClick={clearFilters}
                className="mt-5 rounded-xl"
              >
                Clear all filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
