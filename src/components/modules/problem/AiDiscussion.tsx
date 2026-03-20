"use client";

import React, { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, Bot, Loader2, RefreshCcw, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { cn } from "@/lib/utils";
import {
  getAiDiscussion,
  syncAiDiscussion,
} from "@/services/ai-discussion.service";
import { toast } from "sonner";

interface Message {
  role: "user" | "model";
  content: string;
}

interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  constraints: string;
}

interface AiDiscussionProps {
  problem: Problem;
}

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GMAINE_API_KEY || "",
);

export default function AiDiscussion({ problem }: AiDiscussionProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getAiDiscussion(problem.id);
        if (response?.messages) {
          setMessages(response.messages);
        }
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      }
    };
    fetchHistory();
  }, [problem.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

      const systemPrompt = `You are a helpful coding assistant on CodeArena. 
      The user is working on the problem: "${problem.title}".
      Difficulty: ${problem.difficulty}.
      Description: ${problem.description}.
      Constraints: ${problem.constraints}.
      
      Your goal is to guide the user without giving away the full solution immediately unless they ask for it. 
      Provide hints, explain time complexity, and help debug their logic.
      Always format your responses with markdown, using headers, bullet points, and code blocks where appropriate.
      Be encouraging and concise.`;

      const chat = model.startChat({
        history: messages.map((m) => ({
          role: m.role,
          parts: [{ text: m.content }],
        })),
        generationConfig: {
          maxOutputTokens: 2000,
        },
      });

      const result = await chat.sendMessage([
        { text: systemPrompt },
        { text: input },
      ]);
      const response = await result.response;
      const text = response.text();

      const newMessages: Message[] = [
        ...updatedMessages,
        { role: "model", content: text },
      ];
      setMessages(newMessages);

      await syncAiDiscussion(problem.id, newMessages);
    } catch (error) {
      console.error("Gemini Error:", error);
      toast.error("AI is currently unavailable. Please try again later.");
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearHistory = async () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages([]);
      await syncAiDiscussion(problem.id, []);
    }
  };

  return (
    <div className="flex h-[calc(100vh-200px)] flex-col gap-4 rounded-2xl border border-white/5 bg-zinc-900/50 p-4 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">
              CodeArenaBot
            </h3>
          </div>
        </div>
        <button
          onClick={clearHistory}
          className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-white/5 hover:text-zinc-300"
          title="Clear History"
        >
          <RefreshCcw size={16} />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
      >
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center opacity-50">
            <Bot size={40} className="mb-2 text-zinc-600" />
            <p className="text-sm text-zinc-500">
              Ask me anything about this problem!
            </p>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex max-w-[95%] flex-col gap-1",
                msg.role === "user" ? "ml-auto items-end" : "items-start",
              )}
            >
              <div
                className={cn(
                  "rounded-2xl px-4 py-2 text-sm leading-relaxed",
                  msg.role === "user"
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/10"
                    : "bg-zinc-800/60 text-zinc-200 border border-white/5 w-full",
                )}
              >
                {msg.role === "user" ? (
                  msg.content
                ) : (
                  <div className="prose prose-invert prose-sm max-w-none prose-pre:bg-transparent prose-pre:p-0">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
                        code({
                          node,
                          inline,
                          className,
                          children,
                          ...props
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        }: any) {
                          const match = /language-(\w+)/.exec(className || "");
                          return !inline && match ? (
                            <div className="relative group my-4">
                              <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() =>
                                    copyToClipboard(
                                      String(children).replace(/\n$/, ""),
                                      `code-${i}`,
                                    )
                                  }
                                  className="p-1.5 rounded-md bg-zinc-700/50 hover:bg-zinc-600/50 text-zinc-300 transition-all"
                                >
                                  {copiedId === `code-${i}` ? (
                                    <Check size={14} />
                                  ) : (
                                    <Copy size={14} />
                                  )}
                                </button>
                              </div>
                              <SyntaxHighlighter
                                style={atomDark}
                                language={match[1]}
                                PreTag="div"
                                className="rounded-xl bg-zinc-950/50! p-4! border border-white/5"
                                {...props}
                              >
                                {String(children).replace(/\n$/, "")}
                              </SyntaxHighlighter>
                            </div>
                          ) : (
                            <code
                              className={cn(
                                "bg-zinc-700/50 px-1.5 py-0.5 rounded text-emerald-400 font-mono text-xs",
                                className,
                              )}
                              {...props}
                            >
                              {children}
                            </code>
                          );
                        },
                        h1: ({ children }) => (
                          <h1 className="text-base font-bold text-zinc-100 mb-2 mt-4">
                            {children}
                          </h1>
                        ),
                        h2: ({ children }) => (
                          <h2 className="text-sm font-bold text-zinc-100 mb-1 mt-3">
                            {children}
                          </h2>
                        ),
                        h3: ({ children }) => (
                          <h3 className="text-xs font-bold text-zinc-200 mb-1 mt-2">
                            {children}
                          </h3>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc pl-4 space-y-1 mb-2">
                            {children}
                          </ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal pl-4 space-y-1 mb-2">
                            {children}
                          </ol>
                        ),
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0">{children}</p>
                        ),
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              <span className="text-[10px] text-zinc-600 px-1">
                {msg.role === "user" ? "You" : "CodeArenaBot"}
              </span>

            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-zinc-500"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
              <Bot size={16} />
            </div>
            <Loader2 size={16} className="animate-spin" />
            <span className="text-xs italic">CodeArenaBot is thinking...</span>
          </motion.div>
        )}
      </div>

      <div className="relative mt-auto">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Ask a question..."
          className="w-full resize-none rounded-xl border border-white/5 bg-zinc-800/50 p-3 pr-12 text-sm text-zinc-200 outline-none transition-all focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className="absolute right-2 top-1.5 rounded-lg bg-emerald-600 p-2 text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-500 disabled:opacity-50 disabled:shadow-none"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}
