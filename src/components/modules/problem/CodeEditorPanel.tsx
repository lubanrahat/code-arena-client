"use client";

import React, { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import {
  Play,
  Send,
  Maximize2,
  RotateCcw,
  Clock,
  Settings2,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

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
  
  // Editor Settings
  const [fontSize, setFontSize] = useState(14);
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [autoTheme, setAutoTheme] = useState(true);

  const { resolvedTheme, setTheme: setAppTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const THEMES = [
    { id: "vs-dark", name: "Dark" },
    { id: "light", name: "Light" },
    { id: "monokai", name: "Monokai" },
    { id: "night-owl", name: "Night Owl" },
    { id: "hc-black", name: "High Contrast" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditorWillMount = (monaco: any) => {
    monaco.editor.defineTheme("monokai", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "75715e", fontStyle: "italic" },
        { token: "keyword", foreground: "f92672" },
        { token: "variable", foreground: "f8f8f2" },
        { token: "string", foreground: "e6db74" },
        { token: "number", foreground: "ae81ff" },
        { token: "type", foreground: "66d9ef" },
      ],
      colors: {
        "editor.background": "#272822",
        "editor.foreground": "#f8f8f2",
        "editorCursor.foreground": "#f8f8f0",
        "editor.lineHighlightBackground": "#3e3d32",
        "editorLineNumber.foreground": "#90908a",
        "editor.selectionBackground": "#49483e",
      },
    });

    monaco.editor.defineTheme("night-owl", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "637777", fontStyle: "italic" },
        { token: "keyword", foreground: "c792ea" },
        { token: "variable", foreground: "addb67" },
        { token: "string", foreground: "ecc48d" },
        { token: "number", foreground: "f78c6c" },
        { token: "type", foreground: "82aaff" },
        { token: "function", foreground: "82aaff" },
      ],
      colors: {
        "editor.background": "#011627",
        "editor.foreground": "#d6deeb",
        "editorCursor.foreground": "#80a4c2",
        "editor.lineHighlightBackground": "#010e17",
        "editorLineNumber.foreground": "#4b6479",
        "editor.selectionBackground": "#1d3b53",
      },
    });
  };

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

  // Keep Monaco theme in sync with the app theme unless user picks a custom one.
  useEffect(() => {
    if (!autoTheme) return;
    setEditorTheme(isDark ? "vs-dark" : "light");
  }, [autoTheme, isDark]);

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
      const { runCode } = await import("@/app/problems/_action");
      const testCases = problem?.testCases || [];
      const stdin = testCases.length > 0 ? testCases[0].input : "";
      const expectedOutput = testCases.length > 0 ? testCases[0].output : undefined;

      const response = await runCode({
        sourceCode: code,
        language,
        stdin,
        expectedOutput,
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
      const { submitCode } = await import("@/app/problems/_action");
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
    <div
      className={cn(
        "flex h-full flex-col",
        isDark ? "bg-[#18181b]" : "bg-white"
      )}
    >
      {/* Editor Toolbar */}
      <div
        className={cn(
          "flex items-center justify-between border-b bg-opacity-80 px-4 py-2.5 text-xs backdrop-blur-sm",
          isDark
            ? "border-white/5 bg-[#1c1c1f]/80"
            : "border-neutral-200/70 bg-white/70"
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "flex items-center gap-2",
              isDark ? "text-zinc-500" : "text-neutral-600"
            )}
          >
            <Clock className="h-4 w-4" />
            <span className="font-mono text-sm">{formatTime(timePassed)}</span>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30",
              isDark
                ? "border-zinc-600/50 bg-zinc-800/50 text-zinc-200"
                : "border-neutral-200 bg-white/80 text-neutral-900"
            )}
          >
              {LANGUAGES.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleReset}
            className={cn(
              "rounded-lg p-2 transition-colors",
              isDark
                ? "text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            )}
            title="Reset code"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <Popover>
            <PopoverTrigger asChild>
              <button
                className={cn(
                  "rounded-lg p-2 transition-colors",
                  isDark
                    ? "text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                )}
                title="Settings"
              >
                <Settings2 className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              className={cn(
                "w-64 border bg-opacity-95 backdrop-blur",
                isDark
                  ? "border-zinc-700/50 bg-zinc-900 text-zinc-200"
                  : "border-neutral-200 bg-white text-neutral-900"
              )}
            >
              <div className="space-y-4 p-3">
                <h4
                  className={cn(
                    "border-b pb-2 text-sm font-medium",
                    isDark ? "border-zinc-700/50" : "border-neutral-200"
                  )}
                >
                  Editor Settings
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <Label
                      className={cn(
                        isDark ? "text-zinc-400" : "text-neutral-600"
                      )}
                    >
                      Font size
                    </Label>
                    <span className="font-mono text-emerald-400">{fontSize}px</span>
                  </div>
                  <Slider
                    value={[fontSize]}
                    min={10}
                    max={24}
                    step={1}
                    onValueChange={(val) => setFontSize(val[0])}
                    className="py-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label className={cn("text-sm", isDark ? "text-zinc-400" : "text-neutral-600")}>Theme</Label>
                  <select
                    value={editorTheme}
                    onChange={(e) => {
                      const next = e.target.value;

                      // If user picks standard Light/Dark, apply it to the whole app.
                      if (next === "light") {
                        setAutoTheme(true);
                        setAppTheme("light");
                        setEditorTheme("light");
                        return;
                      }
                      if (next === "vs-dark") {
                        setAutoTheme(true);
                        setAppTheme("dark");
                        setEditorTheme("vs-dark");
                        return;
                      }

                      // Otherwise, treat it as a custom editor-only override.
                      setAutoTheme(false);
                      setEditorTheme(next);
                    }}
                    className={cn(
                      "w-full rounded-lg border px-3 py-2 text-sm focus:border-emerald-500/50 focus:outline-none",
                      isDark
                        ? "border-zinc-600/50 bg-zinc-800/50 text-zinc-200"
                        : "border-neutral-200 bg-white text-neutral-900"
                    )}
                  >
                    {THEMES.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <button
            className={cn(
              "rounded-lg p-2 transition-colors",
              isDark
                ? "text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            )}
            title="Fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 relative overflow-hidden">
        <Editor
          height="100%"
          language={currentLang.monacoId}
          theme={editorTheme}
          beforeMount={handleEditorWillMount}
          value={code}
          onChange={(value) => setCode(value || "")}
          options={{
            minimap: { enabled: false },
            fontSize: fontSize,
            lineHeight: Math.round(fontSize * 1.5),
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
      <div
        className={cn(
          "flex items-center justify-end gap-3 border-t bg-opacity-80 px-4 py-3 backdrop-blur-sm",
          isDark
            ? "border-white/5 bg-[#1c1c1f]/80"
            : "border-neutral-200/70 bg-white/70"
        )}
      >
        <button
          onClick={handleRun}
          disabled={isRunning || isSubmitting}
          className={cn(
            "flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50",
            isDark
              ? "border-zinc-600/50 bg-zinc-800/50 text-zinc-200 hover:bg-zinc-700/50"
              : "border-neutral-200 bg-white/80 text-neutral-900 hover:bg-neutral-100/70"
          )}
        >
          <Play className="h-4 w-4" />
          {isRunning ? "Running..." : "Run"}
        </button>
        <button
          onClick={handleSubmit}
          disabled={isRunning || isSubmitting}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
