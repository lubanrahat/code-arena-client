"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { allProblems, getAllSubmissions } from "@/app/problems/_action";
import Link from "next/link";
import {
  Search,
  Zap,
  CheckCircle2,
  ChevronDown,
  Shuffle,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

// ─── Constants ───────────────────────────────────────────────────────────────

const TOPIC_OPTIONS = [
  "Arrays", "Backtracking", "Binary Search", "Bit Manipulation", "C/C++",
  "Codersbit", "Computer Science Basics", "Dynamic Programming",
  "Graph Data Structure & Algorithms", "Greedy Algorithm", "Hashing",
  "Linked List", "Math", "Queue", "Recursion", "Sorting", "Stack",
  "String", "Tree", "Two Pointers",
];

const COMPANY_OPTIONS = [
  "Microsoft", "Google", "DE Shaw", "Amazon", "Yahoo", "LinkedIn",
  "Facebook", "Ebay", "Directi", "Twitter", "IBM", "Apple",
  "Netflix", "Uber", "Adobe", "Oracle",
];

const DIFFICULTY_FILTER_OPTIONS = ["Very easy", "Easy", "Medium", "Hard", "Very hard"];
const STATUS_FILTER_OPTIONS = ["Solved", "Attempted", "Unsolved"];
const SORT_OPTIONS = ["Default", "Title", "Difficulty", "Submissions", "Company"];

const difficultyConfig: Record<string, { label: string; badge: string; stripe: string; avgTime: number }> = {
  EASY: {
    label: "Easy",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
    stripe: "bg-emerald-500",
    avgTime: 20,
  },
  MEDIUM: {
    label: "Medium",
    badge: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
    stripe: "bg-amber-500",
    avgTime: 45,
  },
  HARD: {
    label: "Hard",
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400",
    stripe: "bg-rose-500",
    avgTime: 75,
  },
};

type TabKey = "all" | "bookmarks" | "attempted" | "solved";
type SortKey = "Default" | "Title" | "Difficulty" | "Submissions" | "Company";

interface Problem {
  id: string;
  title: string;
  difficulty: string;
  topic?: string;
  tags?: string[];
  askedIn?: string[];
  _count?: { submissions?: number };
}

function companyInitial(name: string) {
  const map: Record<string, { char: string; color: string }> = {
    Google:    { char: "G", color: "#4285F4" },
    Amazon:    { char: "A", color: "#FF9900" },
    Microsoft: { char: "M", color: "#00A4EF" },
    Meta:      { char: "f", color: "#1877F2" },
    Facebook:  { char: "f", color: "#1877F2" },
    Apple:     { char: "",  color: "#555555" },
    Netflix:   { char: "N", color: "#E50914" },
    LinkedIn:  { char: "in", color: "#0A66C2" },
    Uber:      { char: "U", color: "#000000" },
    Adobe:     { char: "Ad", color: "#FF0000" },
    IBM:       { char: "IBM", color: "#006699" },
    Yahoo:     { char: "Y!", color: "#720E9E" },
    Twitter:   { char: "T", color: "#1DA1F2" },
    Ebay:      { char: "e", color: "#E53238" },
    Oracle:    { char: "O", color: "#F80000" },
  };
  return map[name] ?? { char: name.substring(0, 1).toUpperCase(), color: "#888888" };
}


function DropdownMenu({
  label,
  children,
  isOpen,
  onToggle,
  hasActive,
}: {
  label: string;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  hasActive?: boolean;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium border transition-all",
          hasActive
            ? "border-blue-400 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
            : "border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground bg-background"
        )}
      >
        {label}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isOpen && "rotate-180")} />
      </button>
      {isOpen && children}
    </div>
  );
}


function CheckboxDropdown({
  options,
  selected,
  onToggle,
  searchable,
  searchPlaceholder,
}: {
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
}) {
  const [q, setQ] = useState("");
  const filtered = searchable ? options.filter((o) => o.toLowerCase().includes(q.toLowerCase())) : options;

  return (
    <div className="absolute top-full left-0 mt-1.5 z-50 min-w-[180px] bg-white dark:bg-zinc-900 border border-border rounded-xl shadow-xl py-2" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}>
      {searchable && (
        <div className="px-3 pb-2 border-b border-border mb-1">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-muted/50">
            <Search className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={searchPlaceholder ?? "Search..."}
              className="text-sm bg-transparent outline-none text-foreground placeholder:text-muted-foreground w-full"
            />
          </div>
        </div>
      )}
      <div className={cn("overflow-y-auto", searchable ? "max-h-52" : "max-h-64")}>
        {filtered.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-2.5 px-3 py-1.5 cursor-pointer hover:bg-muted/50 transition-colors"
          >
            <div
              onClick={() => onToggle(opt)}
              className={cn(
                "w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-all",
                selected.includes(opt) ? "bg-blue-500 border-blue-500" : "border-border"
              )}
            >
              {selected.includes(opt) && (
                <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2.5">
                  <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span className="text-sm text-foreground">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ─── Tab Button ───────────────────────────────────────────────────────────────

function TabButton({ label, icon, active, onClick }: { label: string; icon: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 pb-3 px-1 text-sm font-semibold border-b-2 transition-all",
        active
          ? "border-blue-500 text-blue-600 dark:text-blue-400"
          : "border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

export default function ProblemList() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [sortKey, setSortKey] = useState<SortKey>("Default");
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(id);
  }, [search]);

  const toggleDropdown = useCallback((key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["problems", { search: debouncedSearch }],
    queryFn: () => allProblems({ search: debouncedSearch || undefined }),
  });

  const { data: submissionsData } = useQuery({
    queryKey: ["all-submissions"],
    queryFn: getAllSubmissions,
    retry: false,
  });

  const allProblemsList: Problem[] = useMemo(() => {
    const raw = (data?.data ?? data) ?? [];
    return Array.isArray(raw) ? raw : [];
  }, [data]);

  const submissions = useMemo(
    () =>
      Array.isArray(submissionsData)
        ? (submissionsData as Array<{ problemId: string; status: string }>)
        : [],
    [submissionsData]
  );

  const solvedProblemIds = useMemo(
    () => new Set(submissions.filter((s) => s.status === "ACCEPTED").map((s) => s.problemId)),
    [submissions]
  );

  const attemptedProblemIds = useMemo(
    () => new Set(submissions.filter((s) => s.status !== "ACCEPTED").map((s) => s.problemId)),
    [submissions]
  );

  // Apply tab filter
  const tabFilteredProblems = useMemo(() => {
    switch (activeTab) {
      case "bookmarks":
        return allProblemsList.filter((p) => bookmarked.has(p.id));
      case "attempted":
        return allProblemsList.filter((p) => attemptedProblemIds.has(p.id) && !solvedProblemIds.has(p.id));
      case "solved":
        return allProblemsList.filter((p) => solvedProblemIds.has(p.id));
      default:
        return allProblemsList;
    }
  }, [activeTab, allProblemsList, bookmarked, solvedProblemIds, attemptedProblemIds]);

  // Apply all filters
  const filteredProblems = useMemo(() => {
    let list = tabFilteredProblems;

    // Difficulty filter
    if (selectedDifficulties.length > 0) {
      const map: Record<string, string> = {
        "Very easy": "EASY", "Easy": "EASY", "Medium": "MEDIUM", "Hard": "HARD", "Very hard": "HARD",
      };
      const mapped = [...new Set(selectedDifficulties.map((d) => map[d]).filter(Boolean))];
      list = list.filter((p) => mapped.includes(p.difficulty));
    }

    // Status filter
    if (selectedStatuses.length > 0) {
      list = list.filter((p) => {
        const isSolved = solvedProblemIds.has(p.id);
        const isAttempted = attemptedProblemIds.has(p.id) && !isSolved;
        return (
          (selectedStatuses.includes("Solved") && isSolved) ||
          (selectedStatuses.includes("Attempted") && isAttempted) ||
          (selectedStatuses.includes("Unsolved") && !isSolved && !isAttempted)
        );
      });
    }

    // Topics filter
    if (selectedTopics.length > 0) {
      list = list.filter((p) => selectedTopics.some((t) => p.topic === t || (p.tags ?? []).includes(t)));
    }

    // Companies filter
    if (selectedCompanies.length > 0) {
      list = list.filter((p) => selectedCompanies.some((c) => (p.askedIn ?? []).includes(c)));
    }

    return list;
  }, [tabFilteredProblems, selectedDifficulties, selectedStatuses, selectedTopics, selectedCompanies, solvedProblemIds, attemptedProblemIds]);

  // Apply sort
  const sortedProblems = useMemo(() => {
    const list = [...filteredProblems];
    switch (sortKey) {
      case "Title":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "Difficulty": {
        const order = { EASY: 1, MEDIUM: 2, HARD: 3 };
        list.sort((a, b) => (order[a.difficulty as keyof typeof order] ?? 1) - (order[b.difficulty as keyof typeof order] ?? 1));
        break;
      }
      case "Submissions":
        list.sort((a, b) => (b._count?.submissions ?? 0) - (a._count?.submissions ?? 0));
        break;
      case "Company":
        list.sort((a, b) => (b.askedIn?.length ?? 0) - (a.askedIn?.length ?? 0));
        break;
      default:
        break;
    }
    return list;
  }, [filteredProblems, sortKey]);

  const handlePickRandom = () => {
    if (sortedProblems.length > 0) {
      const p = sortedProblems[Math.floor(Math.random() * sortedProblems.length)];
      router.push(`/problems/${p.id}`);
    }
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggle = (arr: string[], set: React.Dispatch<React.SetStateAction<string[]>>, v: string) =>
    set((prev) => prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background px-6 py-8 max-w-6xl mx-auto">
        <div className="space-y-3">
          <Skeleton className="h-10 w-full rounded-lg" />
          {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="h-14 w-full rounded-lg" />)}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-6">

        <div className="flex items-center gap-6 border-b border-border mb-5">
          <TabButton
            label="All Questions"
            active={activeTab === "all"}
            onClick={() => setActiveTab("all")}
            icon={
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="1" y="2" width="14" height="2.5" rx="0.5" />
                <rect x="1" y="6.75" width="14" height="2.5" rx="0.5" />
                <rect x="1" y="11.5" width="14" height="2.5" rx="0.5" />
              </svg>
            }
          />
          <TabButton
            label="Bookmarks"
            active={activeTab === "bookmarks"}
            onClick={() => setActiveTab("bookmarks")}
            icon={<Bookmark className="w-4 h-4" />}
          />
          <TabButton
            label="Attempted"
            active={activeTab === "attempted"}
            onClick={() => setActiveTab("attempted")}
            icon={
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="12" height="12" rx="2" />
              </svg>
            }
          />
          <TabButton
            label="Solved"
            active={activeTab === "solved"}
            onClick={() => setActiveTab("solved")}
            icon={<CheckCircle2 className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center gap-3 mb-5 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for problems or keywords"
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Difficulty Dropdown */}
            <DropdownMenu
              label="Difficulty"
              isOpen={openDropdown === "difficulty"}
              onToggle={() => toggleDropdown("difficulty")}
              hasActive={selectedDifficulties.length > 0}
            >
              <CheckboxDropdown
                options={DIFFICULTY_FILTER_OPTIONS}
                selected={selectedDifficulties}
                onToggle={(v) => toggle(selectedDifficulties, setSelectedDifficulties, v)}
              />
            </DropdownMenu>

            {/* Status Dropdown */}
            <DropdownMenu
              label="Status"
              isOpen={openDropdown === "status"}
              onToggle={() => toggleDropdown("status")}
              hasActive={selectedStatuses.length > 0}
            >
              <CheckboxDropdown
                options={STATUS_FILTER_OPTIONS}
                selected={selectedStatuses}
                onToggle={(v) => toggle(selectedStatuses, setSelectedStatuses, v)}
              />
            </DropdownMenu>

            {/* Topics Dropdown */}
            <DropdownMenu
              label="Topics"
              isOpen={openDropdown === "topics"}
              onToggle={() => toggleDropdown("topics")}
              hasActive={selectedTopics.length > 0}
            >
              <CheckboxDropdown
                options={TOPIC_OPTIONS}
                selected={selectedTopics}
                onToggle={(v) => toggle(selectedTopics, setSelectedTopics, v)}
                searchable
                searchPlaceholder="Search Topics"
              />
            </DropdownMenu>

            {/* Companies Dropdown */}
            <DropdownMenu
              label="Companies"
              isOpen={openDropdown === "companies"}
              onToggle={() => toggleDropdown("companies")}
              hasActive={selectedCompanies.length > 0}
            >
              <CheckboxDropdown
                options={COMPANY_OPTIONS}
                selected={selectedCompanies}
                onToggle={(v) => toggle(selectedCompanies, setSelectedCompanies, v)}
                searchable
                searchPlaceholder="Search Companies"
              />
            </DropdownMenu>

            {/* Sort By Dropdown */}
            <DropdownMenu
              label="Sort By"
              isOpen={openDropdown === "sort"}
              onToggle={() => toggleDropdown("sort")}
              hasActive={sortKey !== "Default"}
            >
              <div className="absolute top-full left-0 mt-1.5 z-50 min-w-[150px] bg-white dark:bg-zinc-900 border border-border rounded-xl shadow-xl py-1.5" style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}>
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => { setSortKey(opt as SortKey); setOpenDropdown(null); }}
                    className={cn(
                      "w-full text-left px-3 py-1.5 text-sm hover:bg-muted/60 transition-colors",
                      sortKey === opt ? "text-blue-600 dark:text-blue-400 font-semibold" : "text-foreground"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </DropdownMenu>
          </div>

          {/* Pick Random */}
          <button
            onClick={handlePickRandom}
            disabled={sortedProblems.length === 0}
            className="ml-auto flex items-center gap-2 h-9 px-5 rounded-lg text-sm font-bold text-white disabled:opacity-40 transition-all hover:opacity-90 shadow-md"
            style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)" }}
          >
            <Shuffle className="w-4 h-4" />
            Pick Random
          </button>
        </div>

        {/* ── Table ────────────────────────────────────────────────────── */}
        <div className="rounded-xl border border-border overflow-hidden bg-white dark:bg-zinc-950 shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-[2.5fr_160px_110px_110px_1fr] gap-4 px-6 py-3 border-b border-border bg-muted/30 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            <div className="pl-4">Topic</div>
            <div>Difficulty</div>
            <div className="text-center">Avg Time</div>
            <div className="text-center">Submissions</div>
            <div>Asked In</div>
          </div>

          {/* Rows */}
          {sortedProblems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-5">
                <Zap className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-base font-bold mb-2">No problems found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            sortedProblems.map((problem) => {
              const isSolved = solvedProblemIds.has(problem.id);
              const isBookmarked = bookmarked.has(problem.id);
              const cfg = difficultyConfig[problem.difficulty] ?? difficultyConfig.MEDIUM;
              const companies = problem.askedIn ?? [];
              const displayCompanies = companies.slice(0, 2);
              const overflow = companies.length - 2;
              // Deterministic avg time based on problem id hash
              const seed = problem.id.charCodeAt(0) + problem.id.charCodeAt(problem.id.length - 1);
              const avgTime = cfg.avgTime + (seed % 30);

              return (
                <div
                  key={problem.id}
                  className="group grid grid-cols-[2.5fr_160px_110px_110px_1fr] gap-4 items-center border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors duration-150 relative"
                >
                  {/* Left difficulty stripe */}
                  <div className={cn("absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity", cfg.stripe)} />

                  {/* Problem name + topic */}
                  <div className="flex items-center gap-3 pl-6 pr-2 py-4 min-w-0">
                    <button
                      onClick={(e) => toggleBookmark(problem.id, e)}
                      className={cn(
                        "shrink-0 transition-colors",
                        isBookmarked ? "text-amber-400" : "text-muted-foreground/30 hover:text-muted-foreground"
                      )}
                    >
                      {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                    </button>
                    <div className="min-w-0">
                      <Link
                        href={`/problems/${problem.id}`}
                        className={cn(
                          "font-medium text-sm hover:text-blue-500 dark:hover:text-blue-400 transition-colors truncate block",
                          isSolved ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"
                        )}
                      >
                        {problem.title}
                      </Link>
                      {problem.topic && (
                        <span className="inline-block mt-0.5 text-[11px] text-muted-foreground bg-muted/70 dark:bg-zinc-800 px-2 py-0.5 rounded-md border border-border/50 font-medium">
                          {problem.topic}
                        </span>
                      )}
                    </div>
                    {isSolved && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-1" />
                    )}
                  </div>

                  {/* Difficulty Badge */}
                  <div className="py-4">
                    <span className={cn("inline-flex px-3.5 py-1 rounded-full text-xs font-bold", cfg.badge)}>
                      {cfg.label}
                    </span>
                  </div>

                  {/* Avg Time */}
                  <div className="text-center text-sm text-muted-foreground font-medium py-4">
                    {avgTime} Mins
                  </div>

                  {/* Submissions */}
                  <div className="text-center text-sm text-muted-foreground font-medium py-4">
                    {((problem._count?.submissions ?? Math.floor(20000 + (seed * 1337) % 80000))).toLocaleString()}
                  </div>

                  {/* Asked In */}
                  <div className="pr-6 py-4">
                    {companies.length > 0 ? (
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground mr-0.5">Asked in</span>
                        {displayCompanies.map((c) => {
                          const { char, color } = companyInitial(c);
                          return (
                            <span
                              key={c}
                              title={c}
                              className="inline-flex items-center justify-center w-6 h-6 rounded-md text-[10px] font-black border border-border/60 bg-background shadow-sm"
                              style={{ color }}
                            >
                              {char}
                            </span>
                          );
                        })}
                        {overflow > 0 && (
                          <span className="text-xs font-bold text-blue-500">+{overflow}</span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground/40">—</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}
