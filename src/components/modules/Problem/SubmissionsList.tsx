"use client";

import React, { useEffect, useState } from "react";
import { getSubmissionsForProblem } from "@/app/problems/_action";
import {
  Clock,
  Lightbulb,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Zap,
  Code2,
  GitBranch,
} from "lucide-react";
import { LoaderOne } from "@/components/ui/loader";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { format } from "date-fns";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { X } from "lucide-react";
import Editor from "@monaco-editor/react";
import { cn } from "@/lib/utils";

interface Submission {
  id: string;
  language: string;
  status: string;
  memory: string | null;
  time: string | null;
  createdAt: string;
  sourceCode: string;
}

interface AnalysisResult {
  approach: {
    current: string;
    suggested: string;
    keyIdea: string;
  };
  efficiency: {
    currentComplexity: string;
    suggestedComplexity: string;
    suggestions: string;
  };
  codeStyle: {
    readability: number;
    structure: number;
    suggestions: string;
  };
}

interface SubmissionsListProps {
  problemId: string;
  problemTitle: string;
}

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GMAINE_API_KEY || "",
);

function StarRating({ value }: { value: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= value ? "text-amber-400" : "text-gray-600"}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function AnalysisSection({
  icon,
  title,
  color,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className={cn("rounded-2xl border bg-white/5 overflow-hidden transition-colors", color)}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3 text-sm font-semibold text-zinc-200">
          <div className="rounded-lg bg-white/5 p-1.5 shadow-sm">
            {icon}
          </div>
          {title}
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-zinc-500" />
        ) : (
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 space-y-2 text-sm text-zinc-400">
          {children}
        </div>
      )}
    </div>
  );
}

export default function SubmissionsList({
  problemId,
  problemTitle,
}: SubmissionsListProps) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSubmission, setSelectedSubmission] =
    useState<Submission | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [analysisError, setAnalysisError] = useState<string | null>(null);

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

  const handleAnalyze = async () => {
    if (!selectedSubmission) return;
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisError(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
      const code = renderCodeSnippet(selectedSubmission.sourceCode);

      const prompt = `You are an expert code reviewer. Analyze the following ${selectedSubmission.language} code submission for the problem "${problemTitle}".
Submission result: ${selectedSubmission.status}.
Runtime: ${formatMetric(selectedSubmission.time)}, Memory: ${formatMetric(selectedSubmission.memory)}.

Code:
\`\`\`
${code}
\`\`\`

Return ONLY a valid JSON object with this exact structure (no markdown, no extra text):
{
  "approach": {
    "current": "Name of the current algorithmic approach used (e.g. Simulation, Two Pointers, etc.)",
    "suggested": "Name of a better or alternative approach if applicable, otherwise same as current",
    "keyIdea": "One sentence describing the key insight or improvement opportunity"
  },
  "efficiency": {
    "currentComplexity": "Time complexity of the current solution e.g. O(n)",
    "suggestedComplexity": "Optimal time complexity e.g. O(log n)",
    "suggestions": "One or two sentences about efficiency improvements"
  },
  "codeStyle": {
    "readability": 3,
    "structure": 4,
    "suggestions": "One or two sentences about code style, naming, or structure improvements"
  }
}

For readability and structure use integers from 1 to 5 (5 = best).`;

      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("AI returned no valid JSON.");
      const parsed: AnalysisResult = JSON.parse(jsonMatch[0]);
      setAnalysisResult(parsed);
    } catch (err) {
      console.error("Analysis error:", err);
      setAnalysisError("Failed to analyze. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-40 flex-col items-center justify-center text-gray-400 gap-3">
        <LoaderOne />
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
        <p className="text-xs text-gray-600">
          Your past submissions will appear here.
        </p>
      </div>
    );
  }

  const renderCodeSnippet = (code: string) => {
    let parsedCode = code;
    try {
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
        const numbers = arr
          .map((s) => parseFloat(String(s)))
          .filter((n) => !isNaN(n));
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

  const getMonacoLanguage = (lang: string | undefined | null) => {
    if (!lang) return "plaintext";
    const map: Record<string, string> = {
      JAVASCRIPT: "javascript",
      PYTHON: "python",
      CPP: "cpp",
      GO: "go",
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
            const isAccepted =
              sub.status && sub.status.toLowerCase().includes("accepted");
            const formattedTime = format(
              new Date(sub.createdAt),
              "yyyy-MM-dd hh:mm a",
            );

            return (
              <div
                key={sub.id}
                onClick={() => {
                  setSelectedSubmission(sub);
                  setAnalysisResult(null);
                  setAnalysisError(null);
                }}
                className="grid grid-cols-4 px-6 py-3.5 items-center text-sm hover:bg-[#2a2a2a] cursor-pointer transition-colors"
                title="Click to view details"
              >
                <div className="text-gray-300 font-medium">{formattedTime}</div>
                <div
                  className={`font-semibold ${isAccepted ? "text-emerald-500" : "text-red-500"}`}
                >
                  {sub.status || "Unknown"}
                </div>
                <div className="text-gray-300">{sub.language}</div>
                <div className="text-gray-400">{formatMetric(sub.time)}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Submission Detail Drawer */}
      <Drawer
        open={!!selectedSubmission}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedSubmission(null);
            setAnalysisResult(null);
            setAnalysisError(null);
          }
        }}
        direction="right"
      >
        <DrawerContent
          className="bg-zinc-950/95 backdrop-blur-3xl border-l border-white/5 text-zinc-100 h-screen top-0 right-0 left-auto mt-0 rounded-none flex flex-col outline-none shadow-2xl"
          style={{ width: "50vw", maxWidth: "800px", minWidth: "400px" }}
        >
          <DrawerHeader className="px-6 py-5 border-b border-white/5 bg-transparent flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 shadow-inner">
                <Lightbulb className="w-5 h-5 text-amber-500" />
              </div>
              <div className="text-left">
                <DrawerTitle className="text-lg font-bold tracking-tight text-white">
                  Submission Details
                </DrawerTitle>
                <DrawerDescription className="text-zinc-400 text-xs mt-0.5">
                  Overview for {problemTitle}
                </DrawerDescription>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Analysis Button */}
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-indigo-500/10 px-4 py-1.5 text-xs font-medium text-indigo-400 border border-indigo-500/20 transition-all hover:bg-indigo-500/20 hover:text-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? (
                  <>
                    <LoaderOne />
                    <span>Analyzing</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
                    <span>Analyze</span>
                  </>
                )}
              </button>
              <DrawerClose className="rounded-full bg-white/5 p-1.5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white">
                <X className="w-4 h-4" />
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="no-scrollbar overflow-y-auto p-6 flex flex-col gap-8 flex-1 bg-transparent">
            {/* Stats Grid */}
            {selectedSubmission && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 shadow-sm">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                    Result
                  </div>
                  <div
                    className={cn(
                      "text-sm font-bold",
                      selectedSubmission.status?.toLowerCase().includes("accepted")
                        ? "text-emerald-400"
                        : "text-rose-400"
                    )}
                  >
                    {selectedSubmission.status}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 shadow-sm">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                    Memory
                  </div>
                  <div className="text-sm font-semibold text-zinc-200">
                    {formatMetric(selectedSubmission.memory)}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 shadow-sm">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                    Runtime
                  </div>
                  <div className="text-sm font-semibold text-zinc-200">
                    {formatMetric(selectedSubmission.time)}
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/5 shadow-sm">
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1.5">
                    Language
                  </div>
                  <div className="text-sm font-semibold text-zinc-200">
                    {selectedSubmission.language}
                  </div>
                </div>
              </div>
            )}

            {/* Analysis Error */}
            {analysisError && (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
                {analysisError}
              </div>
            )}

            {/* Analysis Result Panel */}
            {analysisResult && (
              <div className="flex flex-col gap-3 shrink-0">
                <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI Analysis
                </div>

                {/* Approach */}
                <AnalysisSection
                  icon={<GitBranch className="w-4 h-4 text-blue-400" />}
                  title="Approach"
                  color="border-blue-800/40"
                >
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <span className="text-gray-500 min-w-[80px]">
                        Current:
                      </span>
                      <span className="font-medium text-gray-200">
                        {analysisResult.approach.current}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-500 min-w-[80px]">
                        Suggested:
                      </span>
                      <span className="font-medium text-blue-300">
                        {analysisResult.approach.suggested}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-500 min-w-[80px]">
                        Key Idea:
                      </span>
                      <span className="italic text-gray-300">
                        {analysisResult.approach.keyIdea}
                      </span>
                    </div>
                  </div>
                </AnalysisSection>

                {/* Efficiency */}
                <AnalysisSection
                  icon={<Zap className="w-4 h-4 text-amber-400" />}
                  title="Efficiency"
                  color="border-amber-800/40"
                >
                  <div className="space-y-1.5">
                    <div className="flex gap-2">
                      <span className="text-gray-500 min-w-[80px]">
                        Current:
                      </span>
                      <span className="font-mono font-semibold text-amber-300">
                        {analysisResult.efficiency.currentComplexity}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-500 min-w-[80px]">
                        Suggested:
                      </span>
                      <span className="font-mono font-semibold text-emerald-400">
                        {analysisResult.efficiency.suggestedComplexity}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-500 min-w-[80px]">Tips:</span>
                      <span className="text-gray-300">
                        {analysisResult.efficiency.suggestions}
                      </span>
                    </div>
                  </div>
                </AnalysisSection>

                {/* Code Style */}
                <AnalysisSection
                  icon={<Code2 className="w-4 h-4 text-emerald-400" />}
                  title="Code Style"
                  color="border-emerald-800/40"
                >
                  <div className="space-y-1.5">
                    <div className="flex gap-2 items-center">
                      <span className="text-gray-500 min-w-[80px]">
                        Readability:
                      </span>
                      <StarRating
                        value={analysisResult.codeStyle.readability}
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <span className="text-gray-500 min-w-[80px]">
                        Structure:
                      </span>
                      <StarRating value={analysisResult.codeStyle.structure} />
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-500 min-w-[80px]">Tips:</span>
                      <span className="text-gray-300">
                        {analysisResult.codeStyle.suggestions}
                      </span>
                    </div>
                  </div>
                </AnalysisSection>
              </div>
            )}

            {/* Code Block */}
            {selectedSubmission?.sourceCode && (
              <div className="bg-zinc-950/50 rounded-2xl border border-white/5 overflow-hidden flex-1 flex flex-col min-h-[400px] shadow-inner mt-2">
                <div className="flex items-center justify-between px-5 py-3.5 bg-white/5 border-b border-white/5 shrink-0">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-zinc-500" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      Submitted Code
                    </span>
                  </div>
                  <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider text-emerald-400 backdrop-blur-md">
                    {selectedSubmission.language}
                  </span>
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
                      fontSize: 13,
                      lineHeight: 22,
                      padding: { top: 20, bottom: 20 },
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
