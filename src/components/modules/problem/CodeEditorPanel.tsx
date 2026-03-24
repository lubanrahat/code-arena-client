"use client";

import { useState, useEffect, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

import {
  Play,
  Send,
  Maximize2,
  RotateCcw,
  Settings2,

  ChevronDown,
  Terminal,
  Settings,
} from "lucide-react";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import ThemeDropdown from "@/components/ui/theme-dropdown";
import UserMenu from "@/components/layout/UserMenu";


import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submissions?: any[];
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
  submissions = [],
  onRunResult,
  onSubmitResult,
  onLoadingChange,
  onActiveTabChange,
}: CodeEditorPanelProps) {

  const [language, setLanguage] = useState(LANGUAGES[0].id);
  const [code, setCode] = useState("");
  const [timePassed, setTimePassed] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
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
    let timer: NodeJS.Timeout;
    if (isTimerActive) {
      timer = setInterval(() => {
        setTimePassed((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimerActive]);


  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Set initial code from submissions or problem's code snippets when language changes
  useEffect(() => {
    // Helper to parse sourceCode which might be a JSON string or object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parseSourceCode = (sourceCode: any) => {
      if (!sourceCode) return null;
      try {
        const parsed = typeof sourceCode === "string" ? JSON.parse(sourceCode) : sourceCode;
        return parsed?.code || (typeof parsed === "string" ? parsed : null);
      } catch {
        return typeof sourceCode === "string" ? sourceCode : null;
      }
    };

    // 1. Try to find the latest submission for this language
    const latestSubmission = [...submissions]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .find((s) => s.language?.toUpperCase() === language?.toUpperCase());

    if (latestSubmission) {
      const savedCode = parseSourceCode(latestSubmission.sourceCode);
      if (savedCode) {
        setCode(savedCode);
        return;
      }
    }

    // 2. Fallback to problem snippets
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
  }, [language, problem, submissions, currentLang.name]);


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
        problemId: problem.id,
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

      // Trigger confetti if all test cases passed
      if (result && result.status === "Accepted") {
        const end = Date.now() + 3 * 1000; // 3 seconds
        const colors = ["#a786ff", "#fd8bbc", "#eca18", "#f8deb1"];

        const frame = () => {
          if (Date.now() > end) return;

          confetti({
            particleCount: 2,
            angle: 60,
            spread: 55,
            startVelocity: 60,
            origin: { x: 0, y: 0.5 },
            colors: colors,
            zIndex: 9999,
          });
          confetti({
            particleCount: 2,
            angle: 120,
            spread: 55,
            startVelocity: 60,
            origin: { x: 1, y: 0.5 },
            colors: colors,
            zIndex: 9999,
          });

          requestAnimationFrame(frame);
        };

        frame();
      }
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
          "relative flex items-center justify-between gap-2 border-b bg-opacity-80 px-2 py-2 text-xs backdrop-blur-sm sm:px-4 sm:py-2.5",
          isDark
            ? "border-white/5 bg-[#1c1c1f]/80"
            : "border-neutral-200/70 bg-white/70"
        )}
      >
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm transition-all hover:bg-zinc-100/10 active:scale-95",
                  isDark
                    ? "border-zinc-700/50 bg-zinc-800/40 text-zinc-200"
                    : "border-neutral-200 bg-white/50 text-neutral-900"
                )}
              >
                <div className="flex h-4 w-4 items-center justify-center rounded-sm bg-emerald-500/20 text-emerald-500">
                  <Terminal className="h-3 w-3" />
                </div>
                <span className="font-medium">{currentLang.name}</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuRadioGroup
                value={language}
                onValueChange={(val) => setLanguage(val)}
              >
                {LANGUAGES.map((lang) => (
                  <DropdownMenuRadioItem
                    key={lang.id}
                    value={lang.id}
                    className="cursor-pointer"
                  >
                    {lang.name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Centered Modern Timer */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center md:flex">
          <div
            className={cn(
              "flex items-center gap-1.5 rounded-full px-2 py-1.5 shadow-sm backdrop-blur-md transition-all duration-300",
              isDark
                ? "bg-zinc-800/40 ring-1 ring-white/5"
                : "bg-white/80 ring-1 ring-neutral-200"
            )}
          >
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsTimerActive(!isTimerActive)}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full transition-all hover:scale-110 active:scale-95",
                isTimerActive
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-zinc-500/10 text-zinc-500 hover:text-emerald-500"
              )}
              title={isTimerActive ? "Pause timer" : "Start timer"}
            >
              <AnimatePresence mode="wait">
                {isTimerActive ? (
                  <motion.div
                    key="pause"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="flex gap-0.5"
                  >
                    <div className="h-2.5 w-0.5 bg-current rounded-full" />
                    <div className="h-2.5 w-0.5 bg-current rounded-full" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="play"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <Play size={12} className="fill-current" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Time Display */}
            <div
              className={cn(
                "min-w-[64px] text-center font-mono text-xs font-medium tracking-tight px-1 transition-colors",
                isTimerActive ? "text-emerald-400" : "text-zinc-500"
              )}
            >
              {formatTime(timePassed)}
            </div>

            {/* Reset Button */}
            <button
              onClick={() => {
                setTimePassed(0);
                setIsTimerActive(false);
              }}
              className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 transition-all hover:bg-zinc-500/10 hover:text-rose-500 hover:scale-110 active:scale-95"
              title="Reset timer"
            >
              <RotateCcw size={12} />
            </button>
          </div>
        </div>


        <div className="flex items-center gap-1">
          <div className="mr-1 hidden items-center gap-1.5 rounded-full bg-zinc-500/10 px-2 py-1 sm:mr-2 sm:flex">
             <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Ready</span>
          </div>
          
          <button
            onClick={handleReset}
            className={cn(
              "rounded-lg p-2 transition-all hover:scale-105 active:scale-95",
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
                  "rounded-lg p-2 transition-all hover:scale-105 active:scale-95",
                  isDark
                    ? "text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                )}
                title="Settings"
              >
                <Settings className="h-4 w-4" />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="end"
              className={cn(
                "w-72 border-none p-0 shadow-2xl ring-1",
                isDark ? "bg-[#1c1c1f] ring-white/10" : "bg-white ring-black/5"
              )}
            >
              <div className="p-4">
                <div className="flex items-center gap-2 border-b pb-3 mb-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                    <Settings2 className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Editor Settings</h4>
                    <p className="text-[10px] text-muted-foreground">Customize your coding environment</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs font-medium text-muted-foreground">Font Size</Label>
                      <span className="rounded-md bg-emerald-500/10 px-2 py-0.5 font-mono text-xs font-bold text-emerald-500">
                        {fontSize}px
                      </span>
                    </div>
                    <Slider
                      value={[fontSize]}
                      min={12}
                      max={20}
                      step={1}
                      onValueChange={(val) => setFontSize(val[0])}
                      className="cursor-pointer"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-xs font-medium text-muted-foreground">Color Theme</Label>
                    <div className="grid grid-cols-1 gap-2">
                       <select
                        value={editorTheme}
                        onChange={(e) => {
                          const next = e.target.value;
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
                          setAutoTheme(false);
                          setEditorTheme(next);
                        }}
                        className={cn(
                          "w-full rounded-lg border px-3 py-2 text-sm transition-all focus:outline-hidden focus:ring-1 focus:ring-emerald-500/50",
                          isDark
                            ? "border-zinc-700/50 bg-zinc-800/50 text-zinc-200"
                            : "border-neutral-200 bg-zinc-50 text-neutral-900"
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
                </div>
              </div>
              <div className={cn("border-t p-3 text-center", isDark ? "border-white/5" : "border-neutral-100")}>
                 <p className="text-[10px] text-muted-foreground italic">Settings are saved locally</p>
              </div>
            </PopoverContent>
          </Popover>

          <button
            className={cn(
              "rounded-lg p-2 transition-all hover:scale-105 active:scale-95",
              isDark
                ? "text-zinc-500 hover:bg-white/5 hover:text-zinc-200"
                : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
            )}
            title="Fullscreen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
          
          <div className="ml-1 flex items-center gap-1 border-l border-zinc-500/20 pl-1 sm:ml-2 sm:gap-1.5 sm:pl-2">
            <ThemeDropdown />
            <div className="hidden sm:block">
              <UserMenu />
            </div>
          </div>
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
          "flex flex-wrap items-center justify-end gap-2 border-t bg-opacity-80 px-2 py-2 backdrop-blur-sm sm:gap-3 sm:px-4 sm:py-3",
          isDark
            ? "border-white/5 bg-[#1c1c1f]/80"
            : "border-neutral-200/70 bg-white/70"
        )}
      >
        <button
          onClick={handleRun}
          disabled={isRunning || isSubmitting}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-5",
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
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:px-5"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
