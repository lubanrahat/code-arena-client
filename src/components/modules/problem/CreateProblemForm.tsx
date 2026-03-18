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
  Download,
} from "lucide-react";
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

// Sample Data from User Request
const sampleData: ProblemCreateInput = {
  title: "Palindrome Check",
  description:
    'Given a single word (a string with no spaces), print "YES" if it is a palindrome (reads the same forwards and backwards), or "NO" otherwise.',
  difficulty: Difficulty.EASY,
  tags: ["strings", "basic", "multi-language"],
  topic: "Strings",
  askedIn: ["Google", "Amazon", "Meta"],
  examples: [
    {
      input: "racecar",
      output: "YES",
    },
  ],
  constraints:
    "The input string consists of lowercase English letters only. Length is between 1 and 100.",
  hints: [
    "Compare the string to its reverse",
    "Alternatively, use two pointers — one starting from the front and one from the back — and check if they always match",
  ],
  editorial:
    "The simplest approach is to reverse the string and check if it equals the original. A two-pointer approach works equally well: compare characters at positions i and n-1-i for i from 0 to n/2. A single-character string is always a palindrome.",
  testCases: [
    { input: "racecar", output: "YES", isHidden: false },
    { input: "hello", output: "NO", isHidden: true },
    { input: "a", output: "YES", isHidden: false },
    { input: "abba", output: "YES", isHidden: true },
    { input: "abcba", output: "YES", isHidden: true },
    { input: "abcd", output: "NO", isHidden: true },
  ],
  referenceSolutions: {
    PYTHON:
      "import sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    if not input_data:\n        return\n    print('YES' if input_data == input_data[::-1] else 'NO')\n\nif __name__ == '__main__':\n    main()",
    JAVASCRIPT:
      "const input = require('fs').readFileSync(0, 'utf-8').trim();\nif (input) {\n  const reversed = input.split('').reverse().join('');\n  console.log(input === reversed ? 'YES' : 'NO');\n}",
    CPP: '#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    string r = s;\n    reverse(r.begin(), r.end());\n    cout << (s == r ? "YES" : "NO") << endl;\n    return 0;\n}',
    GO: 'package main\n\nimport (\n    "bufio"\n    "fmt"\n    "os"\n)\n\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    if scanner.Scan() {\n        s := scanner.Text()\n        runes := []rune(s)\n        isPalin := true\n        for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {\n            if runes[i] != runes[j] {\n                isPalin = false\n                break\n            }\n        }\n        if isPalin {\n            fmt.Println("YES")\n        } else {\n            fmt.Println("NO")\n        }\n    }\n}',
  },
  codeSnippets: {
    PYTHON: {
      code: '# Read a string and print YES if it is a palindrome, NO otherwise\n# Example input: "racecar"\n# Example output: "YES"\n\nimport sys\n\ndef main():\n    input_data = sys.stdin.read().strip()\n    # Your code here\n    pass\n\nif __name__ == \'__main__\':\n    main()',
      language: "python",
    },
    JAVASCRIPT: {
      code: "// Read a string and print YES if it is a palindrome, NO otherwise\n// Example input: \"racecar\"\n// Example output: \"YES\"\n\nconst input = require('fs').readFileSync(0, 'utf-8').trim();\n// Your code here",
      language: "javascript",
    },
    CPP: {
      code: '// Read a string and print YES if it is a palindrome, NO otherwise\n// Example input: "racecar"\n// Example output: "YES"\n\n#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    // Your code here\n    return 0;\n}',
      language: "cpp",
    },
    GO: {
      code: '// Read a string and print YES if it is a palindrome, NO otherwise\n// Example input: "racecar"\n// Example output: "YES"\n\npackage main\n\nimport (\n    "bufio"\n    "fmt"\n    "os"\n)\n\nfunc main() {\n    scanner := bufio.NewScanner(os.Stdin)\n    if scanner.Scan() {\n        s := scanner.Text()\n        // Your code here\n        _ = s\n        fmt.Println()\n    }\n}',
      language: "go",
    },
  },
};

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

  const { mutateAsync, isPending } = useMutation({
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
      testCases: [{ input: "", output: "", isHidden: false }],
      codeSnippets: {
        JAVASCRIPT: {
          code: "function solution() {\n  // Write your code here\n}",
          language: "javascript",
        },
        PYTHON: {
          code: "def solution():\n    # Write your code here\n    pass",
          language: "python",
        },
        CPP: {
          code: "int main() {\n  // Write your code here\n  return 0;\n}",
          language: "cpp",
        },
        GO: {
          code: "package main\n\nfunc main() {\n    // Write your code here\n}",
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
          router.push("/problems");
        } else {
          toast.error(response.message);
        }
        queryClient.invalidateQueries({ queryKey: ["problems"] });
      } catch (error: Error | unknown) {
        console.error("Error creating problem:", error);
        toast.error((error as Error).message || "Failed to create problem");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const loadSampleData = () => {
    // Map sample data to guarantee string types for optional array fields like explanation/hints
    // exactly matching the strict types inferred from `defaultValues`
    // @ts-expect-error: form.reset strict inference slightly misaligns with sampleData record types
    form.reset({
      ...sampleData,
      examples: sampleData.examples.map((ex) => ({
        ...ex,
        explanation: ex.explanation ?? "",
      })),
      hints: sampleData.hints ?? [],
      askedIn: sampleData.askedIn ?? [],
      topic: sampleData.topic ?? "",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      <Card className="shadow-xl">
        <CardHeader className="pb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <CardTitle className="text-3xl flex items-center gap-3">
              <FileText className="w-8 h-8 text-amber-600" />
              Create Problem
            </CardTitle>
            <div className="flex flex-col md:flex-row gap-3">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={loadSampleData}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Load Sample Payload
              </Button>
            </div>
          </div>
          <Separator />
        </CardHeader>

        <CardContent className="p-6">
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
                          {field.state.meta.errors.join(", ")}
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
                          {field.state.meta.errors.join(", ")}
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
                          {field.state.meta.errors.join(", ")}
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
                          {field.state.meta.errors.join(", ")}
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
                        {field.state.meta.errors.join(", ")}
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
                        {field.state.meta.errors.join(", ")}
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
                        {field.state.meta.errors.join(", ")}
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
                        {field.state.meta.errors.join(", ")}
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
                                {field.state.meta.errors.join(", ")}
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
                                {field.state.meta.errors.join(", ")}
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
                            {field.state.meta.errors.join(", ")}
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
                          placeholder="Enter problem editorial/solution explanation"
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
