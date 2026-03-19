"use client";

import React, { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
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
  const [theme, setTheme] = useState("vs-dark");

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
    <div className="flex h-full flex-col bg-[#18181b]">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-[#1c1c1f]/80 px-4 py-2.5 text-xs backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-zinc-500">
            <Clock className="h-4 w-4" />
            <span className="font-mono text-sm">{formatTime(timePassed)}</span>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-lg border border-zinc-600/50 bg-zinc-800/50 px-3 py-1.5 text-sm text-zinc-200 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
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
            className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200"
            title="Reset code"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <Popover>
            <PopoverTrigger asChild>
              <button className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200" title="Settings">
                <Settings2 className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-64 border-zinc-700/50 bg-zinc-900 text-zinc-200">
              <div className="space-y-4 p-3">
                <h4 className="border-b border-zinc-700/50 pb-2 text-sm font-medium">Editor Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <Label className="text-zinc-400">Font size</Label>
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
                  <Label className="text-sm text-zinc-400">Theme</Label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full rounded-lg border border-zinc-600/50 bg-zinc-800/50 px-3 py-2 text-sm text-zinc-200 focus:border-emerald-500/50 focus:outline-none"
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

          <button className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-200" title="Fullscreen">
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 relative overflow-hidden">
        <Editor
          height="100%"
          language={currentLang.monacoId}
          theme={theme}
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
      <div className="flex items-center justify-end gap-3 border-t border-white/5 bg-[#1c1c1f]/80 px-4 py-3 backdrop-blur-sm">
        <button
          onClick={handleRun}
          disabled={isRunning || isSubmitting}
          className="flex items-center gap-2 rounded-xl border border-zinc-600/50 bg-zinc-800/50 px-5 py-2.5 text-sm font-medium text-zinc-200 transition-all hover:bg-zinc-700/50 disabled:cursor-not-allowed disabled:opacity-50"
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
