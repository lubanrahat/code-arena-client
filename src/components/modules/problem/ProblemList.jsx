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
  ChevronDown,
  Zap,
} from "lucide-react";

export default function ProblemList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [status, setStatus] = useState("");
  const [topic, setTopic] = useState("");
  const router = useRouter();

  // Update debounced search after 500ms of inactivity
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
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

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  const problems = data?.data || [];

  // Helper to generate stable mocked data based on problem id
  const getMockData = (id) => {
    const num = id.split("-").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      avgTime: (num % 45) + 15,
      submissions: (num % 80000) + 20000,
      askedCount: (num % 5) + 1,
    };
  };

  const handlePickRandom = () => {
    if (problems && problems.length > 0) {
      const randomIndex = Math.floor(Math.random() * problems.length);
      const randomProblem = problems[randomIndex];
      router.push(`/problems/${randomProblem.id}`);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4 md:p-6">
      {/* Tabs */}
      <div className="mb-6 flex space-x-8 border-b border-gray-100 pb-0">
        {[
          { icon: <List className="h-4 w-4" />, label: "All Questions", value: "" },
          { icon: <Bookmark className="h-4 w-4" />, label: "Bookmarks", value: "SAVED" },
          { icon: <CheckSquare className="h-4 w-4" />, label: "Attempted", value: "ATTEMPTED" },
          { icon: <CheckCircle2 className="h-4 w-4" />, label: "Solved", value: "SOLVED" },
        ].map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setStatus(tab.value)}
            className={`flex items-center space-x-2 pb-3 text-sm font-medium transition-colors ${
              status === tab.value
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for problems or keywords"
            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Difficulty Dropdown */}
        <div className="relative">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="appearance-none flex items-center space-x-1 rounded-lg border border-gray-200 bg-white pl-3 pr-8 py-2 text-sm text-gray-600 hover:bg-gray-50 focus:outline-none transition-colors"
          >
            <option value="">Difficulty</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none opacity-50" />
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="appearance-none flex items-center space-x-1 rounded-lg border border-gray-200 bg-white pl-3 pr-8 py-2 text-sm text-gray-600 hover:bg-gray-50 focus:outline-none transition-colors"
          >
            <option value="">Status</option>
            <option value="SOLVED">Solved</option>
            <option value="ATTEMPTED">Attempted</option>
            <option value="UNSOLVED">Unsolved</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none opacity-50" />
        </div>

        {/* Topic Dropdown (Mocked options for now) */}
        <div className="relative">
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="appearance-none flex items-center space-x-1 rounded-lg border border-gray-200 bg-white pl-3 pr-8 py-2 text-sm text-gray-600 hover:bg-gray-50 focus:outline-none transition-colors"
          >
            <option value="">Topics</option>
            <option value="Array">Array</option>
            <option value="String">String</option>
            <option value="Dynamic Programming">Dynamic Programming</option>
            <option value="Greedy">Greedy</option>
            <option value="Math">Math</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none opacity-50" />
        </div>

        {/* Pick Random */}
        <button 
          onClick={handlePickRandom}
          className="flex items-center space-x-2 rounded-lg bg-[#9e3de3] px-4 py-2 text-sm font-medium text-white hover:bg-[#9d1fec] transition-colors cursor-pointer"
        >
          <Zap className="h-4 w-4" />
          <span>Pick Random</span>
        </button>
      </div>

      {/* Table Headers */}
      <div className="mb-4 grid grid-cols-[1fr_150px_120px_100px_120px_150px] px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">
        <div>Title</div>
        <div className="text-center">Topic</div>
        <div className="text-center">Difficulty</div>
        <div className="text-center">Avg Time</div>
        <div className="text-center">Submissions</div>
        <div className="text-right">Asked In</div>
      </div>

      {/* Problem Rows */}
      <div className="space-y-3">
        {problems.length > 0 ? (
          problems.map((problem, idx) => {
            const mock = getMockData(problem.id);
            return (
              <div
                key={problem.id}
                className={`group relative grid grid-cols-[1fr_150px_120px_100px_120px_150px] items-center rounded-xl border border-gray-100 bg-white p-5 transition-all hover:shadow-md ${
                  idx === 1 ? "border-l-4 border-l-[#26C6DA]" : "border-l-4 border-l-transparent"
                }`}
              >
                {/* Title */}
                <div className="flex items-center space-x-2">
                  {problem.solvedBy?.length > 0 && (
                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                  )}
                  <Link
                    href={`/problems/${problem.id}`}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors truncate"
                  >
                    {problem.title}
                  </Link>
                </div>

                {/* Topic */}
                <div className="flex justify-center">
                  <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">
                    {problem.topic || "General"}
                  </span>
                </div>

                {/* Difficulty */}
                <div className="flex justify-center">
                  <span
                    className={`rounded-md px-3 py-1 text-[11px] font-semibold uppercase tracking-tight ${
                      problem.difficulty === "EASY"
                        ? "bg-[#C6F6D5] text-[#22543D]"
                        : problem.difficulty === "MEDIUM"
                        ? "bg-[#FEEBC8] text-[#7B341E]"
                        : "bg-[#FED7D7] text-[#822727]"
                    }`}
                  >
                    {problem.difficulty.toLowerCase().charAt(0).toUpperCase() +
                      problem.difficulty.toLowerCase().slice(1)}
                  </span>
                </div>

                {/* Avg Time (Mocked) */}
                <div className="text-center text-sm text-gray-600">
                  {mock.avgTime} Mins
                </div>

                {/* Submissions (Mocked -> Real) */}
                <div className="text-center text-sm text-gray-600">
                  {problem._count?.submissions.toLocaleString() || 0}
                </div>

                {/* Asked In */}
                <div className="flex items-center justify-end space-x-2 text-xs text-gray-500">
                  <span className="opacity-70">Asked in</span>
                  <div className="flex -space-x-1.5 overflow-hidden">
                    <div className="h-5 w-5 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                      G
                    </div>
                    <div className="h-5 w-5 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">
                      A
                    </div>
                  </div>
                  <span className="text-[#3182CE] font-medium">
                    +{mock.askedCount}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center h-64 bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-500 font-medium">No problems found matching your criteria.</p>
            <button 
              onClick={() => {setSearch(""); setDifficulty(""); setStatus(""); setTopic("");}}
              className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-semibold underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}