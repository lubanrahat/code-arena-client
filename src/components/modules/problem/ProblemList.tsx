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

const companyLogo: Record<string, string> = {
  "Microsoft": "<svg viewBox=\"0 0 40 40\" width=\"52\" height=\"52\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2\" y=\"2\" width=\"17\" height=\"17\" fill=\"#F25022\"/><rect x=\"21\" y=\"2\" width=\"17\" height=\"17\" fill=\"#7FBA00\"/><rect x=\"2\" y=\"21\" width=\"17\" height=\"17\" fill=\"#00A4EF\"/><rect x=\"21\" y=\"21\" width=\"17\" height=\"17\" fill=\"#FFB900\"/></svg>",
  "Google": "<svg viewBox=\"0 0 48 48\" width=\"52\" height=\"52\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M44.5 20H24v8h11.7C34.1 33.1 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.8 6.5 29.2 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.2-2.7-.5-4z\" fill=\"#4285F4\"/><path d=\"M6.3 14.7l6.6 4.8C14.5 16 18.9 13 24 13c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.8 6.5 29.2 4 24 4c-7.5 0-14 4.1-17.7 10.7z\" fill=\"#EA4335\"/><path d=\"M24 44c5.2 0 9.9-1.8 13.5-4.8l-6.2-5.2C29.4 35.6 26.8 36 24 36c-5.5 0-10.1-2.9-11.7-8.1l-6.6 5.1C9.8 39.7 16.4 44 24 44z\" fill=\"#34A853\"/><path d=\"M44.5 20H24v8h11.7c-.7 2.4-2.2 4.4-4.4 5.8l6.2 5.2C41.6 35.3 44.5 30.2 44.5 24c0-1.3-.2-2.7-.5-4z\" fill=\"#FBBC05\"/></svg>",
  "DE Shaw": "<svg viewBox=\"0 0 52 52\" width=\"52\" height=\"52\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"4\" y=\"4\" width=\"44\" height=\"44\" rx=\"4\" fill=\"#003366\"/><text x=\"26\" y=\"22\" text-anchor=\"middle\" font-family=\"serif\" font-weight=\"700\" font-size=\"11\" fill=\"#FFFFFF\">D.E.</text><text x=\"26\" y=\"36\" text-anchor=\"middle\" font-family=\"serif\" font-weight=\"700\" font-size=\"11\" fill=\"#FFFFFF\">SHAW</text><line x1=\"10\" y1=\"26\" x2=\"42\" y2=\"26\" stroke=\"#7EB3D8\" stroke-width=\"1\"/></svg>",
  "Amazon": "<svg viewBox=\"0 0 52 52\" width=\"52\" height=\"52\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"26\" y=\"30\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-weight=\"700\" font-size=\"16\" fill=\"#FFFFFF\">amazon</text><path d=\"M10 36 Q26 44 42 36\" stroke=\"#FF9900\" stroke-width=\"2.5\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M38 33 L42 36 L38 38\" fill=\"#FF9900\"/></svg>",
  "Yahoo": "<svg viewBox=\"0 0 52 52\" width=\"52\" height=\"52\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"26\" y=\"24\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-weight=\"900\" font-size=\"18\" fill=\"#6001D2\">Yahoo</text><text x=\"44\" y=\"20\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-weight=\"900\" font-size=\"10\" fill=\"#6001D2\">!</text></svg>",
  "LinkedIn": "<svg viewBox=\"0 0 52 52\" width=\"52\" height=\"52\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"2\" y=\"2\" width=\"48\" height=\"48\" rx=\"8\" fill=\"#0A66C2\"/><rect x=\"11\" y=\"20\" width=\"7\" height=\"22\" fill=\"#fff\"/><circle cx=\"14.5\" cy=\"14.5\" r=\"4\" fill=\"#fff\"/><path d=\"M24 20h7v3.5s2-3.5 7-3.5c6 0 8 4 8 10v12h-7V32c0-3-1-5-4-5s-4 2.5-4 5v10h-7V20z\" fill=\"#fff\"/></svg>",
  "Facebook": "<svg viewBox=\"0 0 52 52\" width=\"52\" height=\"52\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"0\" y=\"0\" width=\"52\" height=\"52\" rx=\"10\" fill=\"#1877F2\"/><path d=\"M32 10h-4c-4 0-7 3-7 7v4h-4v6h4v14h6V27h4l1-6h-5v-3c0-1.5.7-2 2-2h3V10z\" fill=\"#fff\"/></svg>",
  "eBay": "<svg viewBox=\"0 0 64 32\" width=\"80\" height=\"40\" xmlns=\"http://www.w3.org/2000/svg\"><text x=\"0\" y=\"26\" font-family=\"Arial,sans-serif\" font-weight=\"900\" font-size=\"26\" fill=\"#E53238\">e</text><text x=\"15\" y=\"26\" font-family=\"Arial,sans-serif\" font-weight=\"900\" font-size=\"26\" fill=\"#0064D2\">b</text><text x=\"28\" y=\"26\" font-family=\"Arial,sans-serif\" font-weight=\"900\" font-size=\"26\" fill=\"#F5AF02\">a</text><text x=\"41\" y=\"26\" font-family=\"Arial,sans-serif\" font-weight=\"900\" font-size=\"26\" fill=\"#86B817\">y</text></svg>",
  "Directi": "<svg viewBox=\"0 0 52 52\" width=\"52\" height=\"52\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"26\" cy=\"26\" r=\"24\" fill=\"#E8231A\"/><text x=\"26\" y=\"32\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-weight=\"700\" font-size=\"11\" fill=\"#FFFFFF\">DIRECTI</text></svg>",
  "Twitter": "<svg viewBox=\"0 0 52 52\" width=\"52\" height=\"52\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"52\" height=\"52\" rx=\"12\" fill=\"#000\"/><path d=\"M10 10h9l8 10.5 9-10.5h4L28 23l14 19H33L24 30l-10 12H10l13-16L10 10zm5 2 20 26h3L18 12h-3z\" fill=\"#fff\"/></svg>",
  "IBM": "<svg viewBox=\"0 0 64 32\" width=\"80\" height=\"40\" xmlns=\"http://www.w3.org/2000/svg\">\n    <g fill=\"#1F70C1\">\n      <rect x=\"1\" y=\"3\" width=\"12\" height=\"2.5\"/><rect x=\"1\" y=\"8.5\" width=\"12\" height=\"2.5\"/><rect x=\"1\" y=\"14\" width=\"12\" height=\"2.5\"/><rect x=\"1\" y=\"19.5\" width=\"12\" height=\"2.5\"/><rect x=\"1\" y=\"25\" width=\"12\" height=\"2.5\"/>\n      <rect x=\"17\" y=\"3\" width=\"13\" height=\"2.5\"/><rect x=\"17\" y=\"25\" width=\"13\" height=\"2.5\"/><rect x=\"17\" y=\"8.5\" width=\"13\" height=\"2.5\"/><rect x=\"17\" y=\"19.5\" width=\"13\" height=\"2.5\"/><rect x=\"17\" y=\"13\" width=\"10\" height=\"2.5\"/><rect x=\"17\" y=\"8.5\" width=\"3\" height=\"16\" rx=\"1.5\"/>\n      <rect x=\"34\" y=\"3\" width=\"4\" height=\"24.5\"/><rect x=\"50\" y=\"3\" width=\"4\" height=\"24.5\"/><rect x=\"34\" y=\"3\" width=\"20\" height=\"3\"/><rect x=\"34\" y=\"14\" width=\"20\" height=\"3\"/><rect x=\"34\" y=\"24.5\" width=\"20\" height=\"3\"/>\n    </g>\n  </svg>",
  "Apple": "<svg viewBox=\"0 0 44 52\" width=\"44\" height=\"52\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M36 18c-2-2.5-5-4-8-3.8 0 0-.5-4.5 4-7.2 0 0-4.5-1-8 3.5-3.5 4.5-3 10-3 10C14 21.5 10 27 10 33c0 8 6 16 11 16 2 0 4-1.5 6-1.5s4 1.5 6 1.5c5 0 11-8 11-16 0-5-3.5-10.5-8-15zm-8-10c1-2 3-3.5 5-3.5-0.5 2-1.5 4-3 5s-3 1.5-4.5 1c.5-1 1.5-2.5 2.5-2.5z\" fill=\"#555\"/></svg>",
  "Netflix": "<svg viewBox=\"0 0 52 52\" width=\"52\" height=\"52\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"52\" height=\"52\" fill=\"#141414\"/><path d=\"M14 8v36l7-18 7 18V8h-7v18L14 8z\" fill=\"#E50914\"/><path d=\"M28 8v36h7V27l-7-19z\" fill=\"#B81D24\"/></svg>",
  "Uber": "<svg viewBox=\"0 0 52 52\" width=\"52\" height=\"52\" xmlns=\"http://www.w3.org/2000/svg\"><rect width=\"52\" height=\"52\" fill=\"#000\"/><text x=\"26\" y=\"32\" text-anchor=\"middle\" font-family=\"Arial,sans-serif\" font-weight=\"700\" font-size=\"15\" letter-spacing=\"1\" fill=\"#fff\">UBER</text></svg>",
  "Adobe": "<svg viewBox=\"0 0 52 52\" width=\"52\" height=\"52\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"26,4 48,48 4,48\" fill=\"#FF0000\"/><polygon points=\"26,18 38,44 14,44\" fill=\"#FF0000\" opacity=\"0.3\"/><path d=\"M20 36 L26 20 L32 36\" stroke=\"#fff\" stroke-width=\"1.5\" fill=\"none\" stroke-linecap=\"round\"/><line x1=\"22\" y1=\"31\" x2=\"30\" y2=\"31\" stroke=\"#fff\" stroke-width=\"1.5\"/></svg>",
  "Oracle": "<svg viewBox=\"0 0 80 32\" width=\"90\" height=\"36\" xmlns=\"http://www.w3.org/2000/svg\"><ellipse cx=\"22\" cy=\"16\" rx=\"18\" ry=\"11\" fill=\"none\" stroke=\"#C74634\" stroke-width=\"5.5\"/><text x=\"44\" y=\"21\" font-family=\"Arial,sans-serif\" font-weight=\"700\" font-size=\"16\" fill=\"#C74634\">ORACLE</text></svg>"
};

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


function TabButton({ label, icon, active, onClick }: { label: string; icon: React.ReactNode; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex shrink-0 items-center gap-2 border-b-2 px-1 pb-3 text-xs font-semibold transition-all sm:text-sm",
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
      <div className="min-h-screen max-w-6xl bg-background px-4 py-6 sm:px-6 sm:py-8 mx-auto">
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

        <div className="mb-5 flex items-center gap-4 overflow-x-auto border-b border-border">
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

        <div className="mb-5 flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Search */}
          <div className="relative w-full min-w-0 sm:flex-1 sm:min-w-[220px] sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for problems or keywords"
              className="w-full h-9 pl-9 pr-4 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/20 transition-all"
            />
          </div>

          <div className="flex w-full items-center gap-2 overflow-x-auto pb-1 sm:w-auto sm:flex-wrap sm:overflow-visible sm:pb-0">
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
            className="flex h-9 w-full items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-40 sm:ml-auto sm:w-auto shadow-md"
            style={{ background: "linear-gradient(135deg, #06b6d4, #0891b2)" }}
          >
            <Shuffle className="w-4 h-4" />
            Pick Random
          </button>
        </div>

        {/* ── Table ────────────────────────────────────────────────────── */}
        <div className="rounded-xl border border-border overflow-hidden bg-white dark:bg-zinc-950 shadow-sm">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[2.5fr_160px_110px_110px_1fr] gap-4 px-6 py-3 border-b border-border bg-muted/30 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
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
                  className="group relative border-b border-border/50 last:border-0 transition-colors duration-150 hover:bg-muted/20 md:grid md:grid-cols-[2.5fr_160px_110px_110px_1fr] md:gap-4 md:items-center"
                >
                  {/* Left difficulty stripe */}
                  <div className={cn("absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-r-full opacity-0 transition-opacity group-hover:opacity-100", cfg.stripe)} />

                  {/* Mobile row card */}
                  <div className="space-y-3 px-4 py-3 md:hidden">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Link
                          href={`/problems/${problem.id}`}
                          className={cn(
                            "block truncate text-sm font-medium transition-colors hover:text-blue-500 dark:hover:text-blue-400",
                            isSolved ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400",
                          )}
                        >
                          {problem.title}
                        </Link>
                        {problem.topic && (
                          <span className="mt-1 inline-block rounded-md border border-border/50 bg-muted/70 px-2 py-0.5 text-[11px] font-medium text-muted-foreground dark:bg-zinc-800">
                            {problem.topic}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => toggleBookmark(problem.id, e)}
                        className={cn(
                          "shrink-0 transition-colors",
                          isBookmarked ? "text-amber-400" : "text-muted-foreground/40 hover:text-muted-foreground",
                        )}
                      >
                        {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-bold", cfg.badge)}>
                        {cfg.label}
                      </span>
                      {isSolved && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div>Avg: <span className="font-medium">{avgTime} mins</span></div>
                      <div>Subs: <span className="font-medium">{((problem._count?.submissions ?? Math.floor(20000 + (seed * 1337) % 80000))).toLocaleString()}</span></div>
                    </div>
                  </div>

                  {/* Desktop row */}
                  <div className="hidden md:contents">
                    <div className="flex min-w-0 items-center gap-3 py-4 pl-6 pr-2">
                      <button
                        onClick={(e) => toggleBookmark(problem.id, e)}
                        className={cn(
                          "shrink-0 transition-colors",
                          isBookmarked ? "text-amber-400" : "text-muted-foreground/30 hover:text-muted-foreground",
                        )}
                      >
                        {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                      </button>
                      <div className="min-w-0">
                        <Link
                          href={`/problems/${problem.id}`}
                          className={cn(
                            "block truncate text-sm font-medium transition-colors hover:text-blue-500 dark:hover:text-blue-400",
                            isSolved ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400",
                          )}
                        >
                          {problem.title}
                        </Link>
                        {problem.topic && (
                          <span className="mt-0.5 inline-block rounded-md border border-border/50 bg-muted/70 px-2 py-0.5 text-[11px] font-medium text-muted-foreground dark:bg-zinc-800">
                            {problem.topic}
                          </span>
                        )}
                      </div>
                      {isSolved && <CheckCircle2 className="ml-1 h-4 w-4 shrink-0 text-emerald-500" />}
                    </div>

                    <div className="py-4">
                      <span className={cn("inline-flex rounded-full px-3.5 py-1 text-xs font-bold", cfg.badge)}>
                        {cfg.label}
                      </span>
                    </div>

                    <div className="py-4 text-center text-sm font-medium text-muted-foreground">
                      {avgTime} Mins
                    </div>

                    <div className="py-4 text-center text-sm font-medium text-muted-foreground">
                      {((problem._count?.submissions ?? Math.floor(20000 + (seed * 1337) % 80000))).toLocaleString()}
                    </div>

                    <div className="py-4 pr-6">
                      {companies.length > 0 ? (
                        <div className="flex items-center gap-1.5">
                          <span className="mr-0.5 text-xs text-muted-foreground">Asked in</span>
                          {displayCompanies.map((c) => {
                            const svgStr = companyLogo[c as keyof typeof companyLogo];
                            if (svgStr) {
                              return (
                                <span
                                  key={c}
                                  title={c}
                                  className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center overflow-hidden rounded bg-white/5 [&>svg]:h-[18px] [&>svg]:w-[18px]"
                                  dangerouslySetInnerHTML={{ __html: svgStr }}
                                />
                              );
                            }

                            const { char, color } = companyInitial(c);
                            return (
                              <span
                                key={c}
                                title={c}
                                className="inline-flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded border border-border/60 bg-background text-[9px] font-black shadow-sm"
                                style={{ color }}
                              >
                                {char}
                              </span>
                            );
                          })}
                          {overflow > 0 && (
                            <span className="ml-1 text-xs font-bold text-blue-500">+{overflow}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-muted-foreground/40">—</span>
                      )}
                    </div>
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
