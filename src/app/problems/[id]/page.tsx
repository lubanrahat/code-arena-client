"use client";

import React, { useState, use } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProblemById } from "@/app/problems/_action";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ProblemDescription from "@/components/modules/Problem/ProblemDescription";
import CodeEditorPanel from "@/components/modules/Problem/CodeEditorPanel";
import OutputPanel from "@/components/modules/Problem/OutputPanel";

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

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProblemDetailsPage({ params }: PageProps) {
  const { id } = use(params);

  const [runResult, setRunResult] = useState<RunResult | null>(null);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [outputTab, setOutputTab] = useState<"run" | "submit">("run");

  const {
    data,
    isLoading: isFetchingProblem,
    error,
  } = useQuery({
    queryKey: ["problem", id],
    queryFn: () => getProblemById(id),
  });

  if (isFetchingProblem) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1E1E1E]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-500 border-t-transparent" />
          <span className="text-xs text-gray-500">Loading problem...</span>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#1E1E1E]">
        <div className="text-center">
          <p className="text-gray-400 font-medium text-sm">
            Failed to load problem
          </p>
          <p className="text-gray-600 text-xs mt-1">Please try again later.</p>
        </div>
      </div>
    );
  }

  const problem = data?.data || data;

  return (
    <div className="h-screen w-full overflow-hidden bg-[#1E1E1E]">
      <ResizablePanelGroup
        orientation="horizontal"
        className="h-full w-full"
      >
        {/* Left Panel — Problem Description */}
        <ResizablePanel defaultSize={40} minSize={25}>
          <ProblemDescription problem={problem} />
        </ResizablePanel>

        <ResizableHandle
          withHandle
          className="bg-[#333] data-[resize-handle-state=hover]:bg-teal-600 data-[resize-handle-state=drag]:bg-teal-500 w-[3px] transition-colors"
        />

        {/* Right Panel — Editor + Output */}
        <ResizablePanel defaultSize={60} minSize={30}>
          <ResizablePanelGroup orientation="vertical" className="flex-col">
            {/* Code Editor */}
            <ResizablePanel defaultSize={65} minSize={30}>
              <CodeEditorPanel
                problem={problem}
                onRunResult={setRunResult}
                onSubmitResult={setSubmitResult}
                onLoadingChange={setIsLoading}
                onActiveTabChange={setOutputTab}
              />
            </ResizablePanel>

            <ResizableHandle
              withHandle
              className="bg-[#333] data-[resize-handle-state=hover]:bg-teal-600 data-[resize-handle-state=drag]:bg-teal-500 h-[3px] transition-colors"
            />

            {/* Output Panel */}
            <ResizablePanel defaultSize={35} minSize={15}>
              <OutputPanel
                activeTab={outputTab}
                onTabChange={setOutputTab}
                runResult={runResult}
                submitResult={submitResult}
                isLoading={isLoading}
              />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
