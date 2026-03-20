"use client";

import React, { useState, use } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getProblemById,
  getSubmissionsForProblem,
} from "@/app/problems/_action";

import { motion } from "framer-motion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ProblemDescription from "@/components/modules/Problem/ProblemDescription";
import CodeEditorPanel from "@/components/modules/Problem/CodeEditorPanel";
import OutputPanel from "@/components/modules/Problem/OutputPanel";
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

  const { data: submissionsData } = useQuery({
    queryKey: ["submissions", id],
    queryFn: () => getSubmissionsForProblem(id),
  });

  const submissions = submissionsData?.data || submissionsData || [];

  if (isFetchingProblem) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <LoaderOne />
          <span className="text-xs font-medium text-muted-foreground animate-pulse">
            Loading challenge...
          </span>
        </motion.div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-sm font-medium text-muted-foreground">
            Failed to load problem
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            Please try again later.
          </p>
        </div>
      </div>
    );
  }

  const problem = data?.data || data;

  return (
    <div className="h-screen w-full overflow-hidden bg-background">
      <ResizablePanelGroup orientation="horizontal" className="h-full w-full">
        <ResizablePanel defaultSize={40} minSize={25}>
          <ProblemDescription problem={problem} />
        </ResizablePanel>

        <ResizableHandle
          withHandle
          className="w-1 bg-border/40 transition-colors data-[resize-handle-state=hover]:bg-emerald-500/50 data-[resize-handle-state=drag]:bg-emerald-500"
        />

        {/* Right Panel — Editor + Output */}
        <ResizablePanel defaultSize={60} minSize={30}>
          <ResizablePanelGroup orientation="vertical" className="flex-col">
            {/* Code Editor */}
            <ResizablePanel defaultSize={65} minSize={30}>
              <CodeEditorPanel
                problem={problem}
                submissions={submissions}
                onRunResult={setRunResult}
                onSubmitResult={setSubmitResult}
                onLoadingChange={setIsLoading}
                onActiveTabChange={setOutputTab}
              />
            </ResizablePanel>

            <ResizableHandle
              withHandle
              className="h-1 bg-border/40 transition-colors data-[resize-handle-state=hover]:bg-emerald-500/50 data-[resize-handle-state=drag]:bg-emerald-500"
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
