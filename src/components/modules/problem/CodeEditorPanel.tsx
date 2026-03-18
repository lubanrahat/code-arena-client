"use client";

import React, { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import {
  Play,
  Send,
  Settings,
  Maximize2,
  RotateCcw,
  Clock,
} from "lucide-react";

interface CodeSnippet {
  code: string;
  language: string;
}

interface TestCase {
  input: string;
  output: string;
  isHidden?: boolean;
}

interface Problem {
  id: string;
  codeSnippets: Record<string, CodeSnippet>;
  testCases: TestCase[];
}

interface RunResult {
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  status: string;
  memory: string | null;
  time: string | null;
}

interface SubmitResult {
  id: string;
  status: string;
  testCases: {
    testCase: number;
    passed: boolean;
    stdout: string | null;
    expected: string;
    stderr: string | null;
    compileOutput: string | null;
    status: string;
    memory: string | null;
    time: string | null;
  }[];
}

interface CodeEditorPanelProps {
  problem: Problem;
  onRunResult: (result: RunResult | null) => void;
  onSubmitResult: (result: SubmitResult | null) => void;
  onLoadingChange: (loading: boolean) => void;
  onActiveTabChange: (tab: "run" | "submit") => void;
}

const LANGUAGES = [
  { id: "JAVASCRIPT", name: "JavaScript", monacoId: "javascript" },
  { id: "PYTHON", name: "Python", monacoId: "python" },
  { id: "CPP", name: "C++", monacoId: "cpp" },
  { id: "GO", name: "Go", monacoId: "go" },
];

export default function CodeEditorPanel({
  problem,
  onRunResult,
  onSubmitResult,
  onLoadingChange,
  onActiveTabChange,
}: CodeEditorPanelProps) {
  const [language, setLanguage] = useState(LANGUAGES[0].id);
  const [code, setCode] = useState("");
  const [timePassed, setTimePassed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentLang = LANGUAGES.find((l) => l.id === language) || LANGUAGES[0];

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimePassed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Set initial code from problem's code snippets when language changes
  useEffect(() => {
    const snippets = problem?.codeSnippets;
    if (snippets && typeof snippets === "object") {
      const snippet = snippets[language];
      if (snippet && typeof snippet === "object" && snippet.code) {
        setCode(snippet.code);
      } else {
        setCode(`// Write your ${currentLang.name} code here\n`);
      }
    } else {
      setCode(`// Write your ${currentLang.name} code here\n`);
    }
  }, [language, problem, currentLang.name]);

  const handleReset = () => {
    const snippets = problem?.codeSnippets;
    if (snippets && snippets[language]?.code) {
      setCode(snippets[language].code);
    } else {
      setCode(`// Write your ${currentLang.name} code here\n`);
    }
  };

  const handleRun = useCallback(async () => {
    if (isRunning || isSubmitting) return;
    setIsRunning(true);
    onLoadingChange(true);
    onActiveTabChange("run");
    onRunResult(null);

    try {
      const { runCode } = await import("@/app/problems/_acion");
      const testCases = problem?.testCases || [];
      const stdin = testCases.length > 0 ? testCases[0].input : "";

      const response = await runCode({
        sourceCode: code,
        language,
        stdin,
      });

      const result = response?.data || response;
      onRunResult(result);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Unknown error";
      onRunResult({
        stdout: null,
        stderr: errMsg,
        compile_output: null,
        status: "Error",
        memory: null,
        time: null,
      });
    } finally {
      setIsRunning(false);
      onLoadingChange(false);
    }
  }, [code, language, problem, isRunning, isSubmitting, onRunResult, onLoadingChange, onActiveTabChange]);

  const handleSubmit = useCallback(async () => {
    if (isRunning || isSubmitting) return;
    setIsSubmitting(true);
    onLoadingChange(true);
    onActiveTabChange("submit");
    onSubmitResult(null);

    try {
      const { submitCode } = await import("@/app/problems/_acion");
      const testCases = problem?.testCases || [];

      const response = await submitCode({
        problemId: problem.id,
        sourceCode: code,
        language,
        stdin: testCases.map((tc) => tc.input),
        expected_outputs: testCases.map((tc) => tc.output),
      });

      const result = response?.data || response;
      onSubmitResult(result);
    } catch (error: unknown) {
      const errMsg = error instanceof Error ? error.message : "Submission failed";
      onSubmitResult({
        id: "",
        status: "Error",
        testCases: [
          {
            testCase: 1,
            passed: false,
            stdout: null,
            expected: "",
            stderr: errMsg,
            compileOutput: null,
            status: "Error",
            memory: null,
            time: null,
          },
        ],
      });
    } finally {
      setIsSubmitting(false);
      onLoadingChange(false);
    }
  }, [code, language, problem, isRunning, isSubmitting, onSubmitResult, onLoadingChange, onActiveTabChange]);

  return (
    <div className="flex h-full flex-col bg-[#1E1E1E]">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#252525] text-gray-400 text-xs border-b border-[#333]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-mono text-[11px]">{formatTime(timePassed)}</span>
          </div>
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-[#1E1E1E] border border-[#3D3D3D] text-gray-300 text-xs rounded px-2.5 py-1 focus:outline-none focus:border-teal-500 appearance-none pr-7 cursor-pointer"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-1.5 hover:text-white hover:bg-[#333] rounded transition-colors"
            title="Reset code"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 hover:text-white hover:bg-[#333] rounded transition-colors" title="Settings">
            <Settings className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 hover:text-white hover:bg-[#333] rounded transition-colors" title="Fullscreen">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 relative overflow-hidden">
        <Editor
          height="100%"
          language={currentLang.monacoId}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineHeight: 22,
            padding: { top: 12 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            formatOnPaste: true,
            renderLineHighlight: "all",
            lineNumbersMinChars: 3,
            glyphMargin: false,
            folding: true,
            wordWrap: "on",
          }}
        />
      </div>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-end px-3 py-2 bg-[#252525] border-t border-[#333] gap-2">
        <button
          onClick={handleRun}
          disabled={isRunning || isSubmitting}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-[#333] text-gray-200 hover:bg-[#444] disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs font-medium"
        >
          <Play className="w-3.5 h-3.5" />
          <span>{isRunning ? "Running..." : "Run"}</span>
        </button>
        <button
          onClick={handleSubmit}
          disabled={isRunning || isSubmitting}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-teal-600 text-white hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs font-semibold"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
        </button>
      </div>
    </div>
  );
}
