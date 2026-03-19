"use client";

import React from "react";
import { CheckCircle2, XCircle, Loader2, Terminal } from "lucide-react";

interface RunResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: string;
  memory: string | null;
  time: string | null;
}

interface TestCaseResult {
  testCase: number;
  passed: boolean;
  stdout: string | null;
  expected: string;
  stderr: string | null;
  compileOutput: string | null;
  status: string;
  memory: string | null;
  time: string | null;
}

interface SubmitResult {
  id: string;
  status: string;
  testCases: TestCaseResult[];
}

interface OutputPanelProps {
  activeTab: "run" | "submit";
  onTabChange: (tab: "run" | "submit") => void;
  runResult: RunResult | null;
  submitResult: SubmitResult | null;
  isLoading: boolean;
}

export default function OutputPanel({
  activeTab,
  onTabChange,
  runResult,
  submitResult,
  isLoading,
}: OutputPanelProps) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#18181b]">
      {/* Tab Bar */}
      <div className="flex items-center gap-1 border-b border-white/5 bg-[#1c1c1f]/80 px-4 py-2 backdrop-blur-sm">
        <button
          onClick={() => onTabChange("run")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            activeTab === "run"
              ? "bg-white/10 text-white"
              : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
          }`}
        >
          <Terminal className="h-4 w-4" />
          Run Result
        </button>
        <button
          onClick={() => onTabChange("submit")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            activeTab === "submit"
              ? "bg-white/10 text-white"
              : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
          }`}
        >
          Submission Result
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading && (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-zinc-500">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-500" />
            <span className="text-sm">
              {activeTab === "run" ? "Running your code..." : "Submitting..."}
            </span>
          </div>
        )}

        {!isLoading && activeTab === "run" && (
          <>
            {runResult ? (
              <div className="space-y-3">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-semibold ${
                      runResult.status === "Accepted"
                        ? "text-emerald-400"
                        : runResult.status === "Error" || runResult.status === "Wrong Answer" || runResult.stderr
                          ? "text-rose-400"
                          : "text-zinc-300"
                    }`}
                  >
                    {runResult.status}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-zinc-500">
                    {runResult.time && <span>⏱ {runResult.time}</span>}
                    {runResult.memory && <span>💾 {runResult.memory}</span>}
                  </div>
                </div>

                {/* Stdout */}
                {runResult.stdout && (
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                      Output
                    </label>
                    <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-xl border border-zinc-700/50 bg-zinc-900/40 p-3 font-mono text-sm text-zinc-300">
                      {runResult.stdout}
                    </pre>
                  </div>
                )}

                {/* Stderr */}
                {runResult.stderr && (
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-rose-400">
                      Error
                    </label>
                    <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 font-mono text-sm text-rose-300">
                      {runResult.stderr}
                    </pre>
                  </div>
                )}

                {/* Compile Output */}
                {runResult.compile_output && (
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-amber-400">
                      Compilation
                    </label>
                    <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 font-mono text-sm text-amber-300">
                      {runResult.compile_output}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-sm text-zinc-500">
                <Terminal className="h-10 w-10 text-zinc-600" />
                <p>Click &quot;Run&quot; to execute your code</p>
              </div>
            )}
          </>
        )}

        {!isLoading && activeTab === "submit" && (
          <>
            {submitResult ? (
              <div className="space-y-3">
                {/* Overall Status */}
                <div className="flex items-center gap-2">
                  {submitResult.status === "Accepted" ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <span
                    className={`text-sm font-bold ${
                      submitResult.status === "Accepted"
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {submitResult.status}
                  </span>
                </div>

                {/* Test Case Results */}
                <div className="space-y-2">
                  {submitResult.testCases?.map((tc) => (
                    <div
                      key={tc.testCase}
                      className={`rounded-xl border p-3 ${
                        tc.passed
                          ? "border-emerald-500/20 bg-emerald-500/5"
                          : "border-rose-500/20 bg-rose-500/5"
                      }`}
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {tc.passed ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          ) : (
                            <XCircle className="h-4 w-4 text-rose-400" />
                          )}
                          <span className="text-sm font-medium text-zinc-300">
                            Test Case {tc.testCase}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          {tc.time && <span>{tc.time}</span>}
                          {tc.memory && <span>{tc.memory}</span>}
                        </div>
                      </div>

                      {!tc.passed && (
                        <div className="mt-2 space-y-1.5 font-mono text-sm">
                          <div>
                            <span className="text-zinc-500">Expected: </span>
                            <span className="text-emerald-400">{tc.expected}</span>
                          </div>
                          {tc.stdout && (
                            <div>
                              <span className="text-zinc-500">Got: </span>
                              <span className="text-rose-400">{tc.stdout}</span>
                            </div>
                          )}
                          {tc.stderr && (
                            <pre className="mt-1 whitespace-pre-wrap text-rose-400">
                              {tc.stderr}
                            </pre>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-sm text-zinc-500">
                <Terminal className="h-10 w-10 text-zinc-600" />
                <p>Click &quot;Submit&quot; to test against all test cases</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
