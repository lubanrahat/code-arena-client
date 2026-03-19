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
    <div className="flex h-full flex-col bg-[#1E1E1E] overflow-hidden">
      {/* Tab Bar */}
      <div className="flex items-center border-b border-[#333] bg-[#252525] px-1">
        <button
          onClick={() => onTabChange("run")}
          className={`px-4 py-2 text-xs font-medium transition-all relative ${
            activeTab === "run"
              ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-teal-500"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          <span className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            Run Result
          </span>
        </button>
        <button
          onClick={() => onTabChange("submit")}
          className={`px-4 py-2 text-xs font-medium transition-all relative ${
            activeTab === "submit"
              ? "text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-teal-500"
              : "text-gray-500 hover:text-gray-300"
          }`}
        >
          Submission Result
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin text-teal-500" />
            <span className="text-xs">
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
                          ? "text-red-400"
                          : "text-gray-300"
                    }`}
                  >
                    {runResult.status}
                  </span>
                  <div className="flex items-center gap-3 text-[11px] text-gray-500">
                    {runResult.time && <span>⏱ {runResult.time}</span>}
                    {runResult.memory && <span>💾 {runResult.memory}</span>}
                  </div>
                </div>

                {/* Stdout */}
                {runResult.stdout && (
                  <div>
                    <label className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
                      Output
                    </label>
                    <pre className="mt-1 bg-[#252525] rounded-lg p-3 text-xs text-gray-300 font-mono border border-[#333] whitespace-pre-wrap overflow-x-auto">
                      {runResult.stdout}
                    </pre>
                  </div>
                )}

                {/* Stderr */}
                {runResult.stderr && (
                  <div>
                    <label className="text-[11px] font-medium text-red-400 uppercase tracking-wider">
                      Error
                    </label>
                    <pre className="mt-1 bg-red-500/5 rounded-lg p-3 text-xs text-red-300 font-mono border border-red-500/20 whitespace-pre-wrap overflow-x-auto">
                      {runResult.stderr}
                    </pre>
                  </div>
                )}

                {/* Compile Output */}
                {runResult.compile_output && (
                  <div>
                    <label className="text-[11px] font-medium text-amber-400 uppercase tracking-wider">
                      Compilation
                    </label>
                    <pre className="mt-1 bg-amber-500/5 rounded-lg p-3 text-xs text-amber-300 font-mono border border-amber-500/20 whitespace-pre-wrap overflow-x-auto">
                      {runResult.compile_output}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 text-xs gap-2">
                <Terminal className="w-8 h-8 text-gray-600" />
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
                      className={`rounded-lg border p-3 ${
                        tc.passed
                          ? "bg-emerald-500/5 border-emerald-500/20"
                          : "bg-red-500/5 border-red-500/20"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {tc.passed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5 text-red-400" />
                          )}
                          <span className="text-xs font-medium text-gray-300">
                            Test Case {tc.testCase}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[10px] text-gray-500">
                          {tc.time && <span>{tc.time}</span>}
                          {tc.memory && <span>{tc.memory}</span>}
                        </div>
                      </div>

                      {!tc.passed && (
                        <div className="space-y-1.5 text-xs font-mono">
                          <div>
                            <span className="text-gray-500">Expected: </span>
                            <span className="text-teal-300">{tc.expected}</span>
                          </div>
                          {tc.stdout && (
                            <div>
                              <span className="text-gray-500">Got: </span>
                              <span className="text-red-300">{tc.stdout}</span>
                            </div>
                          )}
                          {tc.stderr && (
                            <pre className="text-red-300 whitespace-pre-wrap mt-1">
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
              <div className="flex flex-col items-center justify-center h-full text-gray-500 text-xs gap-2">
                <Terminal className="w-8 h-8 text-gray-600" />
                <p>Click &quot;Submit&quot; to test against all test cases</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
