"use client";

import React, { useEffect, useState } from "react";
import { getAllSubmissions } from "@/app/problems/_action";
import { Clock, ExternalLink, CheckCircle2, XCircle, Lightbulb, X } from "lucide-react";
import { LoaderOne } from "@/components/ui/loader";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import Editor from "@monaco-editor/react";

interface Submission {
  id: string;
  problemId: string;
  language: string;
  status: string;
  createdAt: string;
  memory: string | null;
  time: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sourceCode: any;
  problem: {
    title: string;
    difficulty: string;
  };
}

export default function UserSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const res = await getAllSubmissions();
        const data = res?.data || res;
        setSubmissions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load user submissions:", err);
        setError("Could not load submissions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  const formatMetric = (valStr: string | null) => {
    if (!valStr) return "N/A";
    try {
      const arr = JSON.parse(valStr);
      if (Array.isArray(arr)) {
        const numbers = arr.map((s) => parseFloat(String(s))).filter((n) => !isNaN(n));
        if (numbers.length > 0) {
          const max = Math.max(...numbers);
          const unitMatch = String(arr[0]).match(/[A-Za-z]+/);
          const unit = unitMatch ? unitMatch[0] : "";
          return `${max} ${unit}`.trim();
        }
      }
    } catch {
      // Not a JSON array
    }
    return valStr.replace(/["[\]]/g, "");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderCodeSnippet = (code: any) => {
    if (!code) return "";
    if (typeof code === "string") {
      try {
        const parsed = JSON.parse(code);
        if (typeof parsed === "string") return parsed;
        if (parsed && parsed.code) return parsed.code;
      } catch {
        return code;
      }
    }
    if (typeof code === "object" && code.code) return code.code;
    return String(code);
  };

  const getMonacoLanguage = (lang: string | undefined | null) => {
    if (!lang) return "plaintext";
    const map: Record<string, string> = {
      "JAVASCRIPT": "javascript",
      "PYTHON": "python",
      "CPP": "cpp",
      "GO": "go"
    };
    return map[lang.toUpperCase()] || "plaintext";
  };

  if (loading) {
    return (
      <div className="bg-zinc-100 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-white/5 p-8 flex flex-col items-center justify-center min-h-[300px]">
        <LoaderOne />
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-4">Fetching your coding history...</p>
      </div>
    );

  }

  if (error) {
    return (
      <div className="bg-rose-50 dark:bg-rose-950/10 rounded-2xl border border-rose-100 dark:border-rose-900/20 p-8 text-center">
        <p className="text-rose-600 dark:text-rose-400 text-sm">{error}</p>
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-white/5 p-12 text-center flex flex-col items-center gap-4">
        <Clock className="w-12 h-12 text-zinc-300 dark:text-zinc-700" />
        <div>
          <h3 className="text-zinc-900 dark:text-zinc-200 font-semibold">No submissions yet</h3>
          <p className="text-zinc-500 dark:text-zinc-500 text-sm mt-1">Start solving problems to see your history here.</p>
        </div>
        <Link 
          href="/problems"
          className="mt-2 text-sm text-emerald-600 dark:text-emerald-500 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium transition-colors"
        >
          Browse Problems &rarr;
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
          Recent Submissions
          <span className="text-xs font-normal text-zinc-500 bg-zinc-100 dark:bg-zinc-800/50 px-2 py-0.5 rounded-full">
            {submissions.length}
          </span>
        </h2>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-white/5 bg-white dark:bg-zinc-900/50 shadow-sm dark:shadow-xl backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-white/5 text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Problem</th>
                <th className="px-6 py-4">Language</th>
                <th className="px-6 py-4">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-white/5">
              {submissions.map((sub) => {
                const isAccepted = sub.status?.toLowerCase().includes("accepted");
                const date = format(new Date(sub.createdAt), "MMM d, yyyy");
                const time = format(new Date(sub.createdAt), "HH:mm");

                return (
                  <tr 
                    key={sub.id} 
                    onClick={() => setSelectedSubmission(sub)}
                    className="group hover:bg-zinc-50 dark:hover:bg-white/2 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {isAccepted ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-500" />
                        )}
                        <span className={cn(
                          "text-sm font-semibold",
                          isAccepted ? "text-emerald-600 dark:text-emerald-500" : "text-rose-600 dark:text-rose-500"
                        )}>
                          {sub.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-0.5">
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1">
                          {sub.problem.title}
                          <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className={cn(
                          "text-[10px] font-bold uppercase tracking-tight",
                          sub.problem.difficulty === "EASY" ? "text-emerald-600/70 dark:text-emerald-500/70" :
                          sub.problem.difficulty === "MEDIUM" ? "text-amber-600/70 dark:text-amber-500/70" : "text-rose-600/70 dark:text-rose-500/70"
                        )}>
                          {sub.problem.difficulty}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="outline" className="bg-zinc-100 dark:bg-zinc-800/30 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-white/5 text-[10px] px-1.5 py-0">
                        {sub.language}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col text-[11px] text-zinc-500">
                        <span className="text-zinc-700 dark:text-zinc-400">{date}</span>
                        <span>{time}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>


      {/* Submission Detail Drawer */}
      <Drawer open={!!selectedSubmission} onOpenChange={(open) => !open && setSelectedSubmission(null)} direction="right">
        <DrawerContent 
          className="bg-[#1e1e1e] border-l border-[#333] text-white h-screen top-0 right-0 left-auto mt-0 rounded-none flex flex-col outline-none shadow-2xl"
          style={{ width: '50vw', maxWidth: '50vw' }}
        >
          <DrawerHeader className="px-6 py-5 border-b border-[#333] bg-[#252525] flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <div className="text-left">
                <DrawerTitle className="text-lg font-semibold text-gray-100">
                  Submission Details
                </DrawerTitle>
                <DrawerDescription className="text-gray-400 text-xs mt-0.5">
                  Overview for {selectedSubmission?.problem.title}
                </DrawerDescription>
              </div>
            </div>
            <DrawerClose className="text-gray-400 hover:text-white transition-colors bg-[#333] hover:bg-[#444] p-1.5 rounded-md">
              <X className="w-4 h-4" />
            </DrawerClose>
          </DrawerHeader>
          
          <div className="no-scrollbar overflow-y-auto p-6 flex flex-col gap-6 flex-1 bg-[#1e1e1e]">
            {/* Stats Grid */}
            {selectedSubmission && (
              <div className="bg-[#252525] rounded-xl border border-[#333] grid grid-cols-2 sm:grid-cols-4 text-center divide-y sm:divide-y-0 sm:divide-x divide-[#333] shrink-0">
                <div className="p-4 space-y-1">
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Result</div>
                  <div className={`font-semibold ${selectedSubmission.status?.toLowerCase().includes("accepted") ? "text-emerald-500" : "text-red-500"}`}>
                    {selectedSubmission.status}
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Memory Usage</div>
                  <div className="font-semibold text-gray-200">
                    {formatMetric(selectedSubmission.memory)}
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">RunTime</div>
                  <div className="font-semibold text-gray-200">
                    {formatMetric(selectedSubmission.time)}
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Language</div>
                  <div className="font-semibold text-gray-200">
                    {selectedSubmission.language}
                  </div>
                </div>
              </div>
            )}

            {/* Code Block */}
            {selectedSubmission?.sourceCode && (
              <div className="bg-[#1a1a1a] rounded-xl border border-[#333] overflow-hidden flex-1 flex flex-col min-h-[400px]">
                <div className="flex items-center justify-between px-4 py-3 bg-[#252525] border-b border-[#333] shrink-0">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Submitted Code</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-emerald-500/70">{selectedSubmission.language}</span>
                    <Link 
                      href={`/problems/${selectedSubmission.problemId}`}
                      className="text-[10px] text-zinc-500 hover:text-emerald-500 transition-colors bg-zinc-800/50 px-2 py-0.5 rounded border border-white/5"
                    >
                      View Problem
                    </Link>
                  </div>
                </div>
                <div className="flex-1 relative">
                  <Editor
                    height="100%"
                    language={getMonacoLanguage(selectedSubmission.language)}
                    theme="vs-dark"
                    value={renderCodeSnippet(selectedSubmission.sourceCode)}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineHeight: 22,
                      padding: { top: 16, bottom: 16 },
                      scrollBeyondLastLine: false,
                      smoothScrolling: true,
                      renderLineHighlight: "none",
                      lineNumbersMinChars: 3,
                      folding: true,
                      wordWrap: "on",
                      domReadOnly: true,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
