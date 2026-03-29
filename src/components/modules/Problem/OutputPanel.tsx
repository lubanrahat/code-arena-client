"use client";

import React from "react";
import { CheckCircle2, XCircle, Terminal } from "lucide-react";
import { LoaderOne } from "@/components/ui/loader";


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
    <div className="flex h-full flex-col overflow-hidden bg-background">
      {/* Tab Bar */}
      <div className="flex items-center gap-1 border-b border-border/50 bg-background/70 px-4 py-2 backdrop-blur-sm">
        <button
          onClick={() => onTabChange("run")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all cursor-pointer ${
            activeTab === "run"
              ? "bg-primary/10 text-foreground dark:bg-white/10 dark:text-white"
              : "text-muted-foreground hover:bg-primary/5 hover:text-foreground dark:text-zinc-500 dark:hover:bg-white/5 dark:hover:text-zinc-300 cursor-pointer"
          }`}
        >
          <Terminal className="h-4 w-4" />
          Run Result
        </button>
        <button
          onClick={() => onTabChange("submit")}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
            activeTab === "submit"
              ? "bg-primary/10 text-foreground dark:bg-white/10 dark:text-white cursor-pointer"
              : "text-muted-foreground hover:bg-primary/5 hover:text-foreground dark:text-zinc-500 dark:hover:bg-white/5 dark:hover:text-zinc-300 cursor-pointer"
          }`}
        >
          Submission Result
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <LoaderOne />
            <p className="text-zinc-500 text-sm font-medium animate-pulse">Running code...</p>
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
                          : "text-foreground dark:text-zinc-300"
                    }`}
                  >
                    {runResult.status}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground dark:text-zinc-500">
                    {runResult.time && <span>⏱ {runResult.time}</span>}
                    {runResult.memory && <span>💾 {runResult.memory}</span>}
                  </div>
                </div>

                {/* Stdout */}
                {runResult.stdout && (
                  <div>
                    <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground dark:text-zinc-500">
                      Output
                    </label>
                    <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded-xl border border-border/60 bg-muted/30 p-3 font-mono text-sm text-foreground dark:border-zinc-700/50 dark:bg-zinc-900/40 dark:text-zinc-300">
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
              <div className="flex h-full flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
                <Terminal className="h-10 w-10 text-zinc-600 dark:text-zinc-600" />
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
                          <span className="text-sm font-medium text-foreground dark:text-zinc-300">
                            Test Case {tc.testCase}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-zinc-500">
                          {tc.time && <span>{tc.time}</span>}
                          {tc.memory && <span>{tc.memory}</span>}
                        </div>
                      </div>

                      {!tc.passed && (
                        <div className="mt-2 space-y-1.5 font-mono text-sm">
                          <div>
                            <span className="text-muted-foreground dark:text-zinc-500">
                              Expected:{" "}
                            </span>
                            <span className="text-emerald-400">{tc.expected}</span>
                          </div>
                          {tc.stdout && (
                            <div>
                              <span className="text-muted-foreground dark:text-zinc-500">
                                Got:{" "}
                              </span>
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
              <div className="flex h-full flex-col items-center justify-center gap-2 text-sm text-muted-foreground dark:text-zinc-500">
                <Terminal className="h-10 w-10 text-zinc-600 dark:text-zinc-600" />
                <p>Click &quot;Submit&quot; to test against all test cases</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
