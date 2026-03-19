"use client";

import React, { useEffect, useState } from "react";
import { getSubmissionsForProblem } from "@/app/problems/_action";
import { Clock, Loader2, Lightbulb } from "lucide-react";
import { format } from "date-fns";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { X } from "lucide-react";
import Editor from "@monaco-editor/react";

interface Submission {
  id: string;
  language: string;
  status: string;
  memory: string | null;
  time: string | null;
  createdAt: string;
  sourceCode: string; // From backend
}

interface SubmissionsListProps {
  problemId: string;
  problemTitle: string;
}

export default function SubmissionsList({ problemId, problemTitle }: SubmissionsListProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const res = await getSubmissionsForProblem(problemId);
        const data = res?.data || res;
        setSubmissions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load submissions:", err);
        setError("Could not load submissions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [problemId]);

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center text-gray-400">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span className="text-sm">Loading submissions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-40 items-center justify-center text-red-400 text-sm">
        {error}
      </div>
    );
  }

  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500 space-y-3">
        <div className="bg-[#2a2a2a] p-3 rounded-full">
          <Clock className="w-6 h-6 text-gray-400" />
        </div>
        <p className="text-sm">No submissions yet.</p>
        <p className="text-xs text-gray-600">Your past sumbissions will appear here.</p>
      </div>
    );
  }

  const renderCodeSnippet = (code: string) => {
    let parsedCode = code;
    try {
      // In case sourceCode was saved as JSON string
      const parsed = JSON.parse(code);
      if (typeof parsed === "string") parsedCode = parsed;
      else if (parsed && parsed.code) parsedCode = parsed.code;
    } catch {
      // Already a plain string
    }
    return parsedCode;
  };

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
      // Not a JSON array, return clean string
    }
    return valStr.replace(/["[\]]/g, "");
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

  return (
    <>
      <div className="bg-[#252525] rounded-xl border border-[#333] overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-4 px-6 py-3 border-b border-[#333] text-xs font-semibold text-gray-400 capitalize bg-[#2a2a2a]/50">
          <div>Time (IST)</div>
          <div>Result</div>
          <div>Language</div>
          <div>Runtime</div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-[#333]">
          {submissions.map((sub) => {
            const isAccepted = sub.status && sub.status.toLowerCase().includes("accepted");
            const formattedTime = format(new Date(sub.createdAt), "yyyy-MM-dd hh:mm a");

            return (
              <div
                key={sub.id}
                onClick={() => setSelectedSubmission(sub)}
                className="grid grid-cols-4 px-6 py-3.5 items-center text-sm hover:bg-[#2a2a2a] cursor-pointer transition-colors"
                title="Click to view details"
              >
                {/* Time */}
                <div className="text-gray-300 font-medium">
                  {formattedTime}
                </div>

                {/* Result */}
                <div className={`font-semibold ${isAccepted ? "text-emerald-500" : "text-red-500"}`}>
                  {sub.status || "Unknown"}
                </div>
                
                {/* Language */}
                <div className="text-gray-300">
                  {sub.language}
                </div>
                
                {/* Runtime */}
                <div className="text-gray-400">
                  {formatMetric(sub.time)}
                </div>
              </div>
            );
          })}
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
                  Overview for {problemTitle}
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
                  <span className="text-xs font-mono text-emerald-500/70">{selectedSubmission.language}</span>
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
    </>
  );
}
