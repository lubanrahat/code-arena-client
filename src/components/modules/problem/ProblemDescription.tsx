"use client";

import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, Bookmark, Share2, Lightbulb, ChevronDown } from "lucide-react";
import SubmissionsList from "./SubmissionsList";

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

export default function ProblemDescription({ problem }: ProblemDescriptionProps) {
  const [activeTab, setActiveTab] = useState("Description");
  const [expandedHints, setExpandedHints] = useState<number[]>([]);

  const tabs = ["Description", "Discussion", "Submissions", "Hints"];

  const title = problem?.title || "Loading...";
  const topic = problem?.topic || "Programming";
  const difficulty = problem?.difficulty || "EASY";
  const description = problem?.description || "No description provided.";
  const examples: Example[] = Array.isArray(problem?.examples) ? problem.examples : [];
  const tags = problem?.tags || [];
  const askedIn = problem?.askedIn || [];

  const difficultyColor =
    difficulty === "EASY"
      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
      : difficulty === "MEDIUM"
        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
        : "bg-red-500/10 text-red-400 border border-red-500/20";

  const toggleHint = (idx: number) => {
    setExpandedHints((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="flex h-full flex-col bg-[#1E1E1E] overflow-hidden">
      {/* Tabs */}
      <div className="flex w-full items-center border-b border-[#333] bg-[#252525] px-1 gap-0">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-medium transition-all relative ${
              activeTab === tab
                ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-teal-500"
                : "text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-5 scrollbar-thin scrollbar-thumb-[#333]">
        {activeTab === "Description" && (
          <div className="space-y-5">
            {/* Header */}
            <div>
              <h1 className="text-xl font-bold text-white">{title}</h1>
              <p className="mt-1 text-xs text-gray-500">
                Programming &gt; {topic}
              </p>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${difficultyColor}`}>
                {difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase()}
              </span>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-[#333] text-gray-400 text-xs border border-[#444]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Interaction Bar */}
            <div className="flex items-center gap-5 text-gray-500 text-xs font-medium border-b border-[#333] pb-4">
              <button className="flex items-center gap-1.5 hover:text-teal-400 transition-colors">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>183</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
                <ThumbsDown className="w-3.5 h-3.5" />
                <span>12</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-amber-400 transition-colors">
                <Bookmark className="w-3.5 h-3.5" />
                <span>Bookmark</span>
              </button>
              <button className="flex items-center gap-1.5 hover:text-sky-400 transition-colors">
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>

            {/* Asked In */}
            {askedIn.length > 0 && (
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="font-medium text-gray-400">Asked In:</span>
                <div className="flex gap-1.5">
                  {askedIn.map((company) => (
                    <span
                      key={company}
                      className="px-2 py-0.5 rounded bg-[#2a2a2a] text-gray-400 border border-[#3a3a3a] text-[10px] uppercase tracking-wider font-semibold"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div
              className="prose prose-sm prose-invert max-w-none text-gray-300 text-sm leading-relaxed [&_code]:bg-[#2a2a2a] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-teal-300 [&_code]:text-xs"
              dangerouslySetInnerHTML={{ __html: description }}
            />

            {/* Examples */}
            {examples.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-white text-sm">Examples</h3>
                {examples.map((example, idx) => (
                  <div
                    key={idx}
                    className="bg-[#252525] rounded-lg border border-[#333] overflow-hidden"
                  >
                    <div className="px-4 py-2 bg-[#2a2a2a] border-b border-[#333]">
                      <span className="text-xs font-semibold text-gray-400">
                        Example {idx + 1}
                      </span>
                    </div>
                    <div className="p-4 space-y-2 text-sm font-mono">
                      {example.input && (
                        <p className="text-gray-300">
                          <span className="font-semibold text-gray-400">Input: </span>
                          <span className="text-teal-300">{example.input}</span>
                        </p>
                      )}
                      {example.output && (
                        <p className="text-gray-300">
                          <span className="font-semibold text-gray-400">Output: </span>
                          <span className="text-teal-300">{example.output}</span>
                        </p>
                      )}
                      {example.explanation && (
                        <p className="text-gray-400 font-sans text-xs mt-2 leading-relaxed">
                          <span className="font-semibold text-gray-400">Explanation: </span>
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
              <div>
                <h3 className="font-semibold text-white text-sm mb-2">Constraints</h3>
                <div className="bg-[#252525] rounded-lg p-4 border border-[#333] text-sm font-mono text-gray-300">
                  <div dangerouslySetInnerHTML={{ __html: problem.constraints }} />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "Discussion" && (
          <div className="text-gray-500 text-center py-16 text-sm">
            Discussions coming soon...
          </div>
        )}
        {activeTab === "Submissions" && (
          <div className="py-2">
            <SubmissionsList problemId={problem.id} problemTitle={title} />
          </div>
        )}
        {activeTab === "Hints" && (
          <div className="space-y-3">
            {problem?.hints && problem.hints.length > 0 ? (
              problem.hints.map((hint: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => toggleHint(idx)}
                  className="w-full text-left"
                >
                  <div className="bg-[#252525] border border-[#333] rounded-lg overflow-hidden transition-colors hover:border-amber-500/30">
                    <div className="flex items-center justify-between px-4 py-3">
                      <div className="flex items-center gap-2 text-sm text-amber-400">
                        <Lightbulb className="w-4 h-4" />
                        <span className="font-medium">Hint {idx + 1}</span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-500 transition-transform ${
                          expandedHints.includes(idx) ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    {expandedHints.includes(idx) && (
                      <div className="px-4 pb-3 text-sm text-gray-400 border-t border-[#333] pt-3">
                        {hint}
                      </div>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="text-gray-500 text-center py-16 text-sm">
                No hints available for this problem.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
