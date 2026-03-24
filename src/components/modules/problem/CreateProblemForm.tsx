"use client";
import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import {
  Plus,
  Trash2,
  Code2,
  FileText,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  Bot,
  Sparkles,
  Wand2,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  problemCreateSchema,
  Difficulty,
  Language,
  ProblemCreateInput,
} from "@/validation/problem.validation";
import { createProblemAction } from "@/app/admin/create-problem/_action";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const CodeEditor = ({
  value,
  onChange,
  language = "javascript",
}: {
  value: string;
  onChange: (value: string | undefined) => void;
  language: string;
}) => {
  const languageMap: Record<string, string> = {
    javascript: "javascript",
    python: "python",
    cpp: "cpp",
    go: "go",
  };

  return (
    <div className="border rounded-md bg-slate-950 text-slate-50">
      <div className="px-4 py-2 bg-slate-800 border-b text-sm font-mono uppercase">
        {language}
      </div>
      <div className="h-[300px] w-full">
        <Editor
          height="300px"
          defaultLanguage={languageMap[language.toLowerCase()] || "javascript"}
          theme="vs-dark"
          value={value}
          onChange={onChange}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            wordWrap: "on",
            formatOnPaste: true,
            formatOnType: true,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
};

export default function CreateProblemForm() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [creationMethod, setCreationMethod] = useState<"manual" | "ai">("manual");
  const [aiPrompt, setAiPrompt] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_GMAINE_API_KEY || "",
  );

  const handleGenerateAiProblem = async () => {
    setIsAiGenerating(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

      const prompt = `
        You are an expert competitive programming problem setter.
        Create a new, original coding problem based on the following instructions from the admin:
        "${aiPrompt || "Create a random interesting coding problem."}"

        CRITICAL: The test cases and reference solutions MUST be compatible with an online judge (Judge0).
        This means:
        1. Test case "input" must be raw stdin content (e.g., "5\\n1 2 3 4 5" for n=5 followed by an array).
        2. Test case "output" must be the raw stdout content the program should print (e.g., "15\\n").
        3. Reference solutions MUST be complete, self-contained programs that:
           - Read input from stdin (using standard input reading for each language)
           - Solve the problem
           - Print the answer to stdout (with a trailing newline)
           - They must NOT be just function definitions — they must be full runnable programs.

        Example of CORRECT referenceSolution for JAVASCRIPT (reads from stdin, prints to stdout):
        "const lines = require('fs').readFileSync('/dev/stdin','utf8').trim().split('\\n'); const n = parseInt(lines[0]); const arr = lines[1].split(' ').map(Number); console.log(arr.reduce((a,b)=>a+b,0));"

        Example of CORRECT referenceSolution for PYTHON:
        "from typing import List, Dict, Tuple, Set, Optional, Any\\nimport sys\\ndef solve():\\n    data = sys.stdin.read().split()\\n    n = int(data[0])\\n    arr = list(map(int, data[1:n+1]))\\n    print(sum(arr))\\nsolve()"

        Example of CORRECT referenceSolution for CPP:
        "#include<bits/stdc++.h>\\nusing namespace std;\\nint main(){int n; cin>>n; int s=0; for(int i=0;i<n;i++){int x; cin>>x; s+=x;} cout<<s<<endl;}"

        Example of CORRECT referenceSolution for GO:
        "package main\\nimport(\"bufio\"\\\"fmt\"\\\"os\")\\nfunc main(){reader:=bufio.NewReader(os.Stdin);var n int;fmt.Fscan(reader,&n);s:=0;for i:=0;i<n;i++{var x int;fmt.Fscan(reader,&x);s+=x};fmt.Println(s)}"

        The response MUST be a valid JSON object strictly following this structure:
        {
          "title": "Problem Title",
          "description": "Clear and concise problem description with objective and context.",
          "difficulty": "EASY | MEDIUM | HARD",
          "topic": "Main Topic (e.g. Dynamic Programming, Arrays, etc.)",
          "tags": ["tag1", "tag2"],
          "askedIn": ["Company1", "Company2"],
          "constraints": "Clear constraints for input size and values.",
          "examples": [
            { "input": "raw stdin for example", "output": "raw stdout for example", "explanation": "..." }
          ],
          "testCases": [
            { "input": "raw stdin line(s)", "output": "expected stdout output", "isHidden": false },
            { "input": "raw stdin line(s)", "output": "expected stdout output", "isHidden": true }
          ],
          "hints": ["Hint 1", "Hint 2"],
          "editorial": "Explanation of the optimal approach.",
          "codeSnippets": {
            "JAVASCRIPT": { "code": "// starter code with {{USER_CODE}}", "boilerplate": "complete program template with {{USER_CODE}} placeholder", "language": "javascript" },
            "PYTHON": { "code": "from typing import List, Dict, Tuple, Set, Optional, Any\\n\\n# starter code with {{USER_CODE}}", "boilerplate": "complete program template with {{USER_CODE}} placeholder", "language": "python" },
            "CPP": { "code": "// starter code with {{USER_CODE}}", "boilerplate": "complete program template with {{USER_CODE}} placeholder", "language": "cpp" },
            "GO": { "code": "// starter code with {{USER_CODE}}", "boilerplate": "complete program template with {{USER_CODE}} placeholder", "language": "go" }
          },
          "referenceSolutions": {
            "JAVASCRIPT": "COMPLETE PROGRAM that reads stdin and prints to stdout",
            "PYTHON": "COMPLETE PROGRAM that reads stdin and prints to stdout",
            "CPP": "COMPLETE PROGRAM that reads stdin and prints to stdout",
            "GO": "COMPLETE PROGRAM that reads stdin and prints to stdout"
          }
        }

        Requirements:
        - The "difficulty" must be exactly one of: "EASY", "MEDIUM", or "HARD".
        - For codeSnippets:
          - "code": ONLY contain the solution class or function (the part the user sees and edits). e.g., "class Solution { ... };"
          - "boilerplate": Contain the FULL, runnable program (including all #includes, namespaces, helper functions, and the int main() that reads from stdin and prints to stdout). You MUST use "{{USER_CODE}}" as a placeholder within the boilerplate where the "code" snippet will be injected. 
          - Example (C++):
            - code: "class Solution {\npublic:\n    int sum(int a, int b) {\n        return a + b;\n    }\n};"
            - boilerplate: "#include <iostream>\nusing namespace std;\n{{USER_CODE}}\nint main() {\n    int a, b; cin >> a >> b;\n    Solution sol;\n    cout << sol.sum(a, b) << endl;\n    return 0;\n}"
        - referenceSolutions MUST be complete runnable programs (not just functions) that read from stdin and write to stdout.
        - testCases input/output must match what the referenceSolutions read/print (they are verified by running the reference solution with that stdin and checking stdout).
        - Ensure testCases are sufficient (at least 4) and include hidden ones.
        - CRITICAL for Python: You MUST include "from typing import List, Dict, Tuple, Set, Optional, Any" in all Python code (both snippets and referenceSolutions). You MUST use them for type hinting (e.g., "List[int]" instead of "list[int]"). The execution environment uses Python 3.8 which does NOT support lowercase generic syntax, so lowercased lists/dicts will fail.
        - For the "description", "editorial", "explanation", "constraints", and "hints" fields, you MUST use HTML tags for formatting (e.g., <p>, <strong>, <code>, <ul>, <li>) because they will be rendered directly in the browser via dangerouslySetInnerHTML.
        - DO NOT use LaTeX inline math formatting like $k$ or $O(N)$. Use standard HTML code tags like <code>k</code> or <code>O(N)</code> for variable names and time complexities.
        - The response must ONLY contain the JSON object. Do not include any markdown formatting like \`\`\`json.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      console.log("AI Response Raw Text:", text);

      // More robust JSON extraction
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("The AI response did not contain a valid JSON object.");
      }

      const jsonStr = jsonMatch[0];

      // AI-generated code snippets often contain raw escape sequences that break JSON.parse.
      // We fix invalid escape sequences by parsing string values carefully.
      let generatedProblem: Record<string, unknown>;
      try {
        generatedProblem = JSON.parse(jsonStr);
      } catch {
        // Fix common AI JSON issues: invalid escape sequences inside string values
        // Replace any backslash not followed by a valid JSON escape char with \\\\
        const sanitized = jsonStr.replace(
          /"((?:[^"\\]|\\[\s\S])*)"/g,
          (_match: string, inner: string) => {
            // Re-escape any invalid escape sequences inside string values
            const fixed = inner
              .replace(/\\(?!["\\/bfnrtu])/g, "\\\\"); // fix bad escapes
            return `"${fixed}"`;
          }
        );
        try {
          generatedProblem = JSON.parse(sanitized);
        } catch (sanitizeError) {
          throw new Error(`Failed to parse AI response as JSON. The AI may have returned malformed output. Raw error: ${sanitizeError instanceof Error ? sanitizeError.message : String(sanitizeError)}`);
        }
      }

      console.log("Parsed AI Problem:", generatedProblem);

      // Populate form fields individually to ensure re-renders are triggered correctly
      if (generatedProblem.title) form.setFieldValue("title", generatedProblem.title as string);
      if (generatedProblem.description) form.setFieldValue("description", generatedProblem.description as string);
      if (generatedProblem.difficulty) form.setFieldValue("difficulty", generatedProblem.difficulty as Difficulty);
      if (generatedProblem.topic) form.setFieldValue("topic", generatedProblem.topic as string);
      if (generatedProblem.tags) form.setFieldValue("tags", generatedProblem.tags as string[]);
      if (generatedProblem.askedIn) form.setFieldValue("askedIn", generatedProblem.askedIn as string[]);
      if (generatedProblem.constraints) form.setFieldValue("constraints", generatedProblem.constraints as string);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (generatedProblem.examples) form.setFieldValue("examples", generatedProblem.examples as any);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (generatedProblem.testCases) form.setFieldValue("testCases", generatedProblem.testCases as any);
      if (generatedProblem.hints) form.setFieldValue("hints", generatedProblem.hints as string[]);
      if (generatedProblem.editorial) form.setFieldValue("editorial", generatedProblem.editorial as string);
      if (generatedProblem.videoUrl) form.setFieldValue("videoUrl", generatedProblem.videoUrl as string);

      if (generatedProblem.codeSnippets) {
        form.setFieldValue("codeSnippets", {
          ...form.state.values.codeSnippets,
          ...generatedProblem.codeSnippets
        });
      }

      if (generatedProblem.referenceSolutions) {
        form.setFieldValue("referenceSolutions", {
          ...form.state.values.referenceSolutions,
          ...generatedProblem.referenceSolutions
        });
      }

      toast.success("AI has successfully generated the problem!");
    } catch (error: unknown) {
      console.error("AI Generation Error:", error);
      let errorMessage = error instanceof Error ? error.message : "Please try again.";
      if (errorMessage.includes("429") || errorMessage.includes("Quota exceeded")) {
        errorMessage = "AI generation quota limit reached. Please wait a minute and try again.";
      }
      toast.error(`Failed to generate: ${errorMessage}`);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const { mutateAsync } = useMutation({
    mutationFn: (payload: ProblemCreateInput) => createProblemAction(payload),
  });

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      difficulty: Difficulty.EASY,
      tags: [""],
      topic: "",
      askedIn: [""],
      examples: [{ input: "", output: "", explanation: "" }],
      constraints: "",
      hints: [""],
      editorial: "",
      videoUrl: "",
      testCases: [{ input: "", output: "", isHidden: false }],

      codeSnippets: {
        JAVASCRIPT: {
          code: "function solution() {\n  // Write your code here\n}",
          boilerplate: "// Write your boilerplate here, use {{USER_CODE}} as placeholder\n{{USER_CODE}}",
          language: "javascript",
        },
        PYTHON: {
          code: "def solution():\n    # Write your code here\n    pass",
          boilerplate: "# Write your boilerplate here, use {{USER_CODE}} as placeholder\n{{USER_CODE}}",
          language: "python",
        },
        CPP: {
          code: "class Solution {\npublic:\n    void solve() {\n        // Write your code here\n    }\n};",
          boilerplate: "#include <iostream>\nusing namespace std;\n\n{{USER_CODE}}\n\nint main() {\n    Solution sol;\n    sol.solve();\n    return 0;\n}",
          language: "cpp",
        },
        GO: {
          code: "func solve() {\n    // Write your code here\n}",
          boilerplate: "package main\n\nimport \"fmt\"\n\n{{USER_CODE}}\n\nfunc main() {\n    solve()\n}",
          language: "go",
        },
      },
      referenceSolutions: {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        CPP: "// Add your reference solution here",
        GO: "// Add your reference solution here",
      },
    },
    validatorAdapter: zodValidator(),
    validators: {
      // @ts-expect-error: z.preprocess makes the input type unknown, conflicting with exact form type inference
      onChange: problemCreateSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setIsLoading(true);

        const response = await mutateAsync(value);

        if (response.success) {
          toast.success("Problem created successfully");
          router.push("/admin/problems");
        } else {
          toast.error(response.message);
        }
        queryClient.invalidateQueries({ queryKey: ["problems"] });
        queryClient.invalidateQueries({ queryKey: ["admin-problems"] });
      } catch (error: Error | unknown) {
        console.error("Error creating problem:", error);
        toast.error((error as Error).message || "Failed to create problem");
      } finally {
        setIsLoading(false);
      }
    },
  });


  return (
    <div className="container mx-auto py-10 max-w-5xl">
      <Card className="shadow-xl border-t-4 border-t-indigo-500">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl font-bold flex items-center gap-3">
                <Plus className="w-8 h-8 text-indigo-500" />
                Create New Problem
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                Set up a new coding challenge for the community
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  if (confirm("Are you sure you want to reset the form? All progress will be lost.")) {
                    form.reset();
                  }
                }}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4 text-red-500" /> Reset Form
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-muted/30 p-4 rounded-xl border border-muted-foreground/10">
            <div className="flex flex-col gap-1">
              <h4 className="font-semibold flex items-center gap-2">
                <Wand2 className="w-4 h-4 text-indigo-500" />
                Creation Method
              </h4>
              <p className="text-xs text-muted-foreground">Choose how you want to build this problem</p>
            </div>

            <Tabs
              value={creationMethod}
              onValueChange={(val) => setCreationMethod(val as "manual" | "ai")}
              className="w-full md:w-auto"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual" className="gap-2">
                  <FileText className="w-4 h-4" /> Manual
                </TabsTrigger>
                <TabsTrigger value="ai" className="gap-2">
                  <Bot className="w-4 h-4" /> AI Generate
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {creationMethod === "ai" && (
            <div
              className="mt-4 p-6 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200 dark:border-indigo-900 shadow-inner"
            >
              <div className="space-y-4">
                <div className="flex flex-col gap-3">
                  <Label className="text-sm font-semibold flex items-center gap-2">
                    <Wand2 className="w-4 h-4 text-indigo-600" />
                    What kind of problem should AI generate?
                  </Label>
                  <Textarea
                    placeholder="Ex: Generate an EASY problem about Palindromes, or a HARD problem involving Dijkstra spanning across multiple cities..."
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    className="bg-background border-indigo-200 min-h-[80px] py-3 resize-y shadow-sm focus:ring-indigo-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-indigo-100 dark:border-indigo-900/50">
                  <p className="text-[11px] text-muted-foreground italic max-w-md">
                    Describe the difficulty and topic above. AI will handle descriptions, examples, solutions, and test cases.
                  </p>

                  <Button
                    type="button"
                    onClick={handleGenerateAiProblem}
                    disabled={isAiGenerating}
                    className="w-full md:w-auto min-w-44 h-11 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 gap-2 font-semibold transition-all hover:scale-[1.02]"
                  >
                    {isAiGenerating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Generating Your Problem...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        Generate with AI
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent className="pt-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="space-y-8"
          >
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <form.Field name="title">
                  {(field) => (
                    <div>
                      <Label
                        htmlFor={field.name}
                        className="text-lg font-semibold"
                      >
                        Title
                      </Label>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="Enter problem title"
                        className="mt-2 text-lg"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-sm text-red-500 mt-1">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {field.state.meta.errors.map((error: any) => typeof error === 'string' ? error : error?.message || JSON.stringify(error)).join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>

              <div className="md:col-span-2">
                <form.Field name="description">
                  {(field) => (
                    <div>
                      <Label
                        htmlFor={field.name}
                        className="text-lg font-semibold"
                      >
                        Description
                      </Label>
                      <Textarea
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="Enter problem description"
                        className="mt-2 min-h-32 text-base resize-y"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-sm text-red-500 mt-1">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {field.state.meta.errors.map((error: any) => typeof error === 'string' ? error : error?.message || JSON.stringify(error)).join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>

              <div>
                <form.Field name="difficulty">
                  {(field) => (
                    <div>
                      <Label
                        htmlFor={field.name}
                        className="text-lg font-semibold"
                      >
                        Difficulty
                      </Label>
                      <Select
                        onValueChange={(val: string) => {
                          // @ts-expect-error: tanstack form type inference issue
                          field.handleChange(val);
                        }}
                        value={field.state.value}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={Difficulty.EASY}>
                            <Badge
                              variant="secondary"
                              className="bg-green-100 text-green-800"
                            >
                              Easy
                            </Badge>
                          </SelectItem>
                          <SelectItem value={Difficulty.MEDIUM}>
                            <Badge
                              variant="secondary"
                              className="bg-amber-100 text-amber-800"
                            >
                              Medium
                            </Badge>
                          </SelectItem>
                          <SelectItem value={Difficulty.HARD}>
                            <Badge
                              variant="secondary"
                              className="bg-red-100 text-red-800"
                            >
                              Hard
                            </Badge>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-sm text-red-500 mt-1">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {field.state.meta.errors.map((error: any) => typeof error === 'string' ? error : error?.message || JSON.stringify(error)).join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>

              <div>
                <form.Field name="topic">
                  {(field) => (
                    <div>
                      <Label
                        htmlFor={field.name}
                        className="text-lg font-semibold"
                      >
                        Topic (Optional)
                      </Label>
                      <Input
                        id={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        placeholder="Ex: Array, Strings, Dynamic Programming"
                        className="mt-2"
                      />
                      {field.state.meta.errors.length > 0 && (
                        <p className="text-sm text-red-500 mt-1">
                          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                          {field.state.meta.errors.map((error: any) => typeof error === 'string' ? error : error?.message || JSON.stringify(error)).join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </form.Field>
              </div>
            </div>

            {/* Asked In */}
            <form.Field name="askedIn" mode="array">
              {(field) => (
                <Card className="bg-indigo-50 dark:bg-indigo-950/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                        Asked In (Optional)
                      </CardTitle>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => field.pushValue("")}
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" /> Add Company
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {field.state.value.map((_, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <form.Field name={`askedIn[${index}]`}>
                            {(subField) => (
                              <Input
                                value={subField.state.value}
                                onChange={(e) =>
                                  subField.handleChange(e.target.value)
                                }
                                onBlur={subField.handleBlur}
                                placeholder="Enter company name"
                                className="flex-1"
                              />
                            )}
                          </form.Field>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => field.removeValue(index)}
                            disabled={field.state.value.length === 1}
                            className="p-2"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-red-500 mt-2">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {field.state.meta.errors.map((error: any) => typeof error === 'string' ? error : error?.message || JSON.stringify(error)).join(", ")}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </form.Field>

            {/* Tags */}
            <form.Field name="tags" mode="array">
              {(field) => (
                <Card className="bg-amber-50 dark:bg-amber-950/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-amber-600" />
                        Tags
                      </CardTitle>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => field.pushValue("")}
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" /> Add Tag
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {field.state.value.map((_, index) => (
                        <div key={index} className="flex gap-2 items-center">
                          <form.Field name={`tags[${index}]`}>
                            {(subField) => (
                              <Input
                                value={subField.state.value}
                                onChange={(e) =>
                                  subField.handleChange(e.target.value)
                                }
                                onBlur={subField.handleBlur}
                                placeholder="Enter tag"
                                className="flex-1"
                              />
                            )}
                          </form.Field>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => field.removeValue(index)}
                            disabled={field.state.value.length === 1}
                            className="p-2"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-red-500 mt-2">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {field.state.meta.errors.map((error: any) => typeof error === 'string' ? error : error?.message || JSON.stringify(error)).join(", ")}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </form.Field>

            {/* Examples */}
            <form.Field name="examples" mode="array">
              {(field) => (
                <Card className="bg-blue-50 dark:bg-blue-950/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-blue-600" />
                        Examples
                      </CardTitle>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() =>
                          field.pushValue({
                            input: "",
                            output: "",
                            explanation: "",
                          })
                        }
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" /> Add Example
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {field.state.value.map((_, index) => (
                      <Card key={index} className="bg-background">
                        <CardHeader className="pb-4">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">
                              Example #{index + 1}
                            </CardTitle>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => field.removeValue(index)}
                              disabled={field.state.value.length === 1}
                              className="text-red-500 gap-2"
                            >
                              <Trash2 className="w-4 h-4" /> Remove
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label className="font-medium">Input</Label>
                              <form.Field name={`examples[${index}].input`}>
                                {(subField) => (
                                  <>
                                    <Textarea
                                      value={subField.state.value}
                                      onChange={(e) =>
                                        subField.handleChange(e.target.value)
                                      }
                                      onBlur={subField.handleBlur}
                                      placeholder="Ex: input = 'racecar'"
                                      className="mt-2 min-h-24 resize-y font-mono"
                                    />
                                    {subField.state.meta.errors.length > 0 && (
                                      <p className="text-sm text-red-500 mt-1">
                                        {subField.state.meta.errors.join(", ")}
                                      </p>
                                    )}
                                  </>
                                )}
                              </form.Field>
                            </div>
                            <div>
                              <Label className="font-medium">Output</Label>
                              <form.Field name={`examples[${index}].output`}>
                                {(subField) => (
                                  <>
                                    <Textarea
                                      value={subField.state.value}
                                      onChange={(e) =>
                                        subField.handleChange(e.target.value)
                                      }
                                      onBlur={subField.handleBlur}
                                      placeholder="Ex: output = 'YES'"
                                      className="mt-2 min-h-24 resize-y font-mono"
                                    />
                                    {subField.state.meta.errors.length > 0 && (
                                      <p className="text-sm text-red-500 mt-1">
                                        {subField.state.meta.errors.join(", ")}
                                      </p>
                                    )}
                                  </>
                                )}
                              </form.Field>
                            </div>
                            <div className="md:col-span-2">
                              <Label className="font-medium">
                                Explanation (Optional)
                              </Label>
                              <form.Field
                                name={`examples[${index}].explanation`}
                              >
                                {(subField) => (
                                  <Textarea
                                    value={subField.state.value || ""}
                                    onChange={(e) =>
                                      subField.handleChange(e.target.value)
                                    }
                                    onBlur={subField.handleBlur}
                                    placeholder="Explain why this is the output..."
                                    className="mt-2 min-h-24 resize-y text-base"
                                  />
                                )}
                              </form.Field>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-red-500 mt-2">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {field.state.meta.errors.map((error: any) => typeof error === 'string' ? error : error?.message || JSON.stringify(error)).join(", ")}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </form.Field>

            {/* Test Cases */}
            <form.Field name="testCases" mode="array">
              {(field) => (
                <Card className="bg-green-50 dark:bg-green-950/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Test Cases
                      </CardTitle>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() =>
                          field.pushValue({
                            input: "",
                            output: "",
                            isHidden: false,
                          })
                        }
                        className="gap-2"
                      >
                        <Plus className="w-4 h-4" /> Add Test Case
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {field.state.value.map((_, index) => (
                      <Card key={index} className="bg-background">
                        <CardHeader className="pb-4">
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-lg">
                              Test Case #{index + 1}
                            </CardTitle>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => field.removeValue(index)}
                              disabled={field.state.value.length === 1}
                              className="text-red-500 gap-2"
                            >
                              <Trash2 className="w-4 h-4" /> Remove
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <Label className="font-medium">Input</Label>
                              <form.Field name={`testCases[${index}].input`}>
                                {(subField) => (
                                  <>
                                    <Textarea
                                      value={subField.state.value}
                                      onChange={(e) =>
                                        subField.handleChange(e.target.value)
                                      }
                                      onBlur={subField.handleBlur}
                                      placeholder="Enter test case input"
                                      className="mt-2 min-h-24 resize-y font-mono"
                                    />
                                    {subField.state.meta.errors.length > 0 && (
                                      <p className="text-sm text-red-500 mt-1">
                                        {subField.state.meta.errors.join(", ")}
                                      </p>
                                    )}
                                  </>
                                )}
                              </form.Field>
                            </div>
                            <div>
                              <Label className="font-medium">
                                Expected Output
                              </Label>
                              <form.Field name={`testCases[${index}].output`}>
                                {(subField) => (
                                  <>
                                    <Textarea
                                      value={subField.state.value}
                                      onChange={(e) =>
                                        subField.handleChange(e.target.value)
                                      }
                                      onBlur={subField.handleBlur}
                                      placeholder="Enter expected output"
                                      className="mt-2 min-h-24 resize-y font-mono"
                                    />
                                    {subField.state.meta.errors.length > 0 && (
                                      <p className="text-sm text-red-500 mt-1">
                                        {subField.state.meta.errors.join(", ")}
                                      </p>
                                    )}
                                  </>
                                )}
                              </form.Field>
                            </div>
                            <div className="md:col-span-2">
                              <form.Field name={`testCases[${index}].isHidden`}>
                                {(subField) => (
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id={`hidden-${index}`}
                                      checked={subField.state.value}
                                      onCheckedChange={(checked) =>
                                        subField.handleChange(!!checked)
                                      }
                                      onBlur={subField.handleBlur}
                                    />
                                    <Label
                                      htmlFor={`hidden-${index}`}
                                      className="text-sm font-medium"
                                    >
                                      Hidden Test Case (Don&apos;t show to users
                                      during initial testing)
                                    </Label>
                                  </div>
                                )}
                              </form.Field>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {field.state.meta.errors.length > 0 && (
                      <p className="text-sm text-red-500 mt-2">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {field.state.meta.errors.map((error: any) => typeof error === 'string' ? error : error?.message || JSON.stringify(error)).join(", ")}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )}
            </form.Field>

            {/* Code Editor Sections */}
            {Object.values(Language).map((language) => (
              <Card key={language} className="bg-slate-50 dark:bg-slate-950/20">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-slate-600" />
                    {language}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Starter Code */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Starter Code Template
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form.Field name={`codeSnippets.${language}.code`}>
                        {(field) => (
                          <>
                            <CodeEditor
                              value={field.state.value || ""}
                              onChange={(val: string | undefined) => {
                                field.handleChange(val || "");
                              }}
                              language={language}
                            />
                            {field.state.meta.errors.length > 0 && (
                              <p className="text-sm text-red-500 mt-2">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {field.state.meta.errors.map((error: any) => typeof error === 'string' ? error : error?.message || JSON.stringify(error)).join(", ")}
                              </p>
                            )}
                          </>
                        )}
                      </form.Field>
                    </CardContent>
                  </Card>

                  {/* Hidden Boilerplate */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center gap-2">
                          <Trash2 className="w-5 h-5 text-slate-400" />
                          Hidden Boilerplate
                        </CardTitle>
                        <Badge variant="outline" className="text-[10px] uppercase">
                          Hidden from users
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3">
                        Use <code className="bg-muted px-1 rounded">{"{{USER_CODE}}"}</code> as a placeholder where the user&apos;s starter code will be injected.
                      </p>
                      <form.Field name={`codeSnippets.${language}.boilerplate`}>
                        {(field) => (
                          <>
                            <CodeEditor
                              value={field.state.value || ""}
                              onChange={(val: string | undefined) => {
                                field.handleChange(val || "");
                              }}
                              language={language}
                            />
                            {field.state.meta.errors.length > 0 && (
                              <p className="text-sm text-red-500 mt-2">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {field.state.meta.errors.map((error: any) => typeof error === 'string' ? error : error?.message || JSON.stringify(error)).join(", ")}
                              </p>
                            )}
                          </>
                        )}
                      </form.Field>
                    </CardContent>
                  </Card>

                  {/* Reference Solution */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        Reference Solution
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form.Field name={`referenceSolutions.${language}`}>
                        {(field) => (
                          <>
                            <CodeEditor
                              value={field.state.value || ""}
                              onChange={(val: string | undefined) => {
                                field.handleChange(val || "");
                              }}
                              language={language}
                            />
                            {field.state.meta.errors.length > 0 && (
                              <p className="text-sm text-red-500 mt-2">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {field.state.meta.errors.map((error: any) => typeof error === 'string' ? error : error?.message || JSON.stringify(error)).join(", ")}
                              </p>
                            )}
                          </>
                        )}
                      </form.Field>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            ))}

            {/* Additional Information */}
            <Card className="bg-amber-50 dark:bg-amber-950/20">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <form.Field name="constraints">
                    {(field) => (
                      <>
                        <Label htmlFor={field.name} className="font-medium">
                          Constraints
                        </Label>
                        <Textarea
                          id={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="Enter problem constraints"
                          className="mt-2 min-h-24 resize-y font-mono"
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-red-500 mt-1">
                            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                            {field.state.meta.errors.map((error: any) => typeof error === 'string' ? error : error?.message || JSON.stringify(error)).join(", ")}
                          </p>
                        )}
                      </>
                    )}
                  </form.Field>
                </div>
                <div>
                  <form.Field name="hints" mode="array">
                    {(field) => (
                      <Card className="shadow-none border border-amber-200 mt-2">
                        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
                          <Label className="font-medium m-0">
                            Hints (Optional)
                          </Label>
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() => field.pushValue("")}
                          >
                            <Plus className="w-4 h-4 mr-2" /> Add Hint
                          </Button>
                        </CardHeader>
                        <CardContent className="px-4 pb-4 space-y-3">
                          {field.state.value &&
                            field.state.value.map((_, index) => (
                              <div key={index} className="flex gap-2">
                                <form.Field name={`hints[${index}]`}>
                                  {(subField) => (
                                    <Input
                                      value={subField.state.value}
                                      onChange={(e) =>
                                        subField.handleChange(e.target.value)
                                      }
                                      onBlur={subField.handleBlur}
                                      placeholder="Enter a helpful hint..."
                                      className="flex-1"
                                    />
                                  )}
                                </form.Field>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => field.removeValue(index)}
                                  className="p-2 text-red-500"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                        </CardContent>
                      </Card>
                    )}
                  </form.Field>
                </div>
                <div>
                  <form.Field name="editorial">
                    {(field) => (
                      <>
                        <Label htmlFor={field.name} className="font-medium">
                          Editorial (Optional, Solution Explanation)
                        </Label>
                        <Textarea
                          id={field.name}
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="Enter problem editorial/solution explanation (Supports HTML/Markdown)"
                          className="mt-2 min-h-32 resize-y"
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-red-500 mt-1">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                      </>
                    )}
                  </form.Field>
                </div>
                <div>
                  <form.Field name="videoUrl">
                    {(field) => (
                      <>
                        <Label htmlFor={field.name} className="font-medium">
                          Video Tutorial URL (Optional)
                        </Label>
                        <Input
                          id={field.name}
                          value={field.state.value || ""}
                          onChange={(e) => field.handleChange(e.target.value)}
                          onBlur={field.handleBlur}
                          placeholder="Ex: https://www.youtube.com/watch?v=..."
                          className="mt-2"
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-red-500 mt-1">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                      </>
                    )}
                  </form.Field>
                </div>

              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end mt-6">
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
              >
                {([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    size="lg"
                    disabled={!canSubmit || isSubmitting || isLoading}
                    className="gap-2 cursor-pointer"
                  >
                    {isSubmitting || isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="w-5 h-5" />
                        Create Problem
                      </>
                    )}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
