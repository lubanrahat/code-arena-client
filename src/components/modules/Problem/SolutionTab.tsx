"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Plus,
  ArrowLeft,
  Send,
  Trash2,
  Clock,
  Code2,
  Sparkles,
  TrendingUp,
  X,
  Eye,
  Share2,
} from "lucide-react";
import Editor from "@monaco-editor/react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { LoaderOne } from "@/components/ui/loader";
import {
  createSolution,
  getSolutionsForProblem as fetchSolutions,
  voteSolution,
  addSolutionComment,
  getSolutionComments,
  deleteSolution,
  deleteSolutionComment,
} from "@/app/problems/_action";


interface SolutionUser {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  imageUrl?: string | null;
}

interface Solution {
  id: string;
  title: string;
  description?: string | null;
  sourceCode: string;
  language: string;
  likeCount: number;
  dislikeCount: number;
  userVote: "LIKE" | "DISLIKE" | null;
  commentCount: number;
  createdAt: string;
  user: SolutionUser;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: SolutionUser;
}

interface SolutionTabProps {
  problemId: string;
  problemTitle: string;
}


function timeAgo(dateString: string): string {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(dateString).getTime()) / 1000,
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

const LANGUAGES = [
  { value: "JAVASCRIPT", label: "JavaScript" },
  { value: "PYTHON", label: "Python" },
  { value: "CPP", label: "C++" },
  { value: "GO", label: "Go" },
];

const MONACO_LANG_MAP: Record<string, string> = {
  JAVASCRIPT: "javascript",
  PYTHON: "python",
  CPP: "cpp",
  GO: "go",
};


function AvatarBubble({ user, size = "sm" }: { user: SolutionUser; size?: "sm" | "md" }) {
  const dim = size === "md" ? "h-10 w-10 text-sm" : "h-7 w-7 text-[10px]";
  if (user.imageUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={user.imageUrl}
        alt={user.userName}
        className={cn(dim, "rounded-full object-cover ring-2 ring-white/10")}
      />
    );
  }
  const initials = `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase();
  return (
    <div
      className={cn(
        dim,
        "flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 font-bold text-emerald-300 ring-2 ring-white/10",
      )}
    >
      {initials}
    </div>
  );
}

function LanguageBadge({ language }: { language: string }) {
  const label = LANGUAGES.find((l) => l.value === language)?.label || language;
  const colors: Record<string, string> = {
    JAVASCRIPT: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    PYTHON: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    CPP: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    GO: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  };
  return (
    <span
      className={cn(
        "rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        colors[language] || "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
      )}
    >
      {label}
    </span>
  );
}

/** Renders Markdown description beautifully */
function MarkdownDescription({ content }: { content: string }) {
  return (
    <div className="solution-markdown-body">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-lg font-bold text-zinc-100 mt-5 mb-3 pb-2 border-b border-white/5">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-bold text-zinc-200 mt-4 mb-2.5 flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-emerald-500/60 inline-block" />
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-sm font-semibold text-zinc-300 mt-3 mb-2">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="text-[13px] leading-[1.75] text-zinc-400 mb-3">
              {children}
            </p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-zinc-200">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="text-zinc-300 not-italic font-medium">{children}</em>
          ),
          ul: ({ children }) => (
            <ul className="space-y-1.5 mb-3 ml-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="space-y-2 mb-3 ml-1 counter-reset-list">{children}</ol>
          ),
          li: ({ children, ...props }) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const isOrdered = (props as any).ordered;
            return (
              <li className="flex items-start gap-2.5 text-[13px] leading-[1.7] text-zinc-400">
                {isOrdered ? (
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-500/10 text-[10px] font-bold text-emerald-400 mt-0.5">
                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                    {(props as any).index + 1}
                  </span>
                ) : (
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500/50" />
                )}
                <span className="flex-1">{children}</span>
              </li>
            );
          },
          code: ({ children, className }) => {
            const isBlock = className?.includes("language-");
            if (isBlock) {
              return (
                <div className="my-3 rounded-xl border border-white/5 bg-zinc-950/50 overflow-hidden">
                  <pre className="p-4 text-xs leading-relaxed overflow-x-auto">
                    <code className="text-emerald-300 font-mono">{children}</code>
                  </pre>
                </div>
              );
            }
            return (
              <code className="rounded-md bg-zinc-800/80 px-1.5 py-0.5 text-[12px] font-mono font-medium text-emerald-400">
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="my-3 border-l-2 border-emerald-500/30 bg-emerald-500/5 py-2 pl-4 pr-3 rounded-r-lg text-[13px] text-zinc-400 italic">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="my-4 border-white/5" />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────

export default function SolutionTab({
  problemId,
  problemTitle,
}: SolutionTabProps) {
  // View states
  const [view, setView] = useState<"list" | "create" | "detail">("list");
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"recent" | "likes">("recent");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Create form
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLanguage, setFormLanguage] = useState("JAVASCRIPT");
  const [formCode, setFormCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Detail view
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [votingId, setVotingId] = useState<string | null>(null);

  // ─── Fetch Solutions ─────────────────────────────────────────────

  const loadSolutions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetchSolutions(problemId, page, sortBy);
      const data = res?.data || [];
      setSolutions(Array.isArray(data) ? data : []);
      const pagination = res?.meta?.pagination;
      setTotalPages(pagination?.totalPages || 1);
    } catch {
      setSolutions([]);
    } finally {
      setLoading(false);
    }
  }, [problemId, page, sortBy]);

  useEffect(() => {
    loadSolutions();
  }, [loadSolutions]);

  // ─── Fetch Comments ──────────────────────────────────────────────

  const loadComments = useCallback(async (solutionId: string) => {
    setCommentsLoading(true);
    try {
      const res = await getSolutionComments(solutionId);
      const data = res?.data || [];
      setComments(Array.isArray(data) ? data : []);
    } catch {
      setComments([]);
    } finally {
      setCommentsLoading(false);
    }
  }, []);

  // ─── Handlers ────────────────────────────────────────────────────

  const handleOpenDetail = (solution: Solution) => {
    setSelectedSolution(solution);
    setView("detail");
    setCommentText("");
    loadComments(solution.id);
  };

  const handleVote = async (solutionId: string, type: "LIKE" | "DISLIKE") => {
    if (votingId) return;
    setVotingId(solutionId);
    try {
      await voteSolution(solutionId, type);
      const updateVote = (s: Solution): Solution => {
        if (s.id !== solutionId) return s;
        let { likeCount, dislikeCount, userVote } = s;
        if (userVote === type) {
          if (type === "LIKE") likeCount--;
          else dislikeCount--;
          userVote = null;
        } else {
          if (userVote === "LIKE") likeCount--;
          if (userVote === "DISLIKE") dislikeCount--;
          if (type === "LIKE") likeCount++;
          else dislikeCount++;
          userVote = type;
        }
        return { ...s, likeCount, dislikeCount, userVote };
      };
      setSolutions((prev) => prev.map(updateVote));
      if (selectedSolution?.id === solutionId) {
        setSelectedSolution((prev) => (prev ? updateVote(prev) : prev));
      }
    } finally {
      setVotingId(null);
    }
  };

  const handleCreateSolution = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!formTitle.trim()) { setFormError("Title is required"); return; }
    if (!formCode.trim()) { setFormError("Source code is required"); return; }

    setIsSubmitting(true);
    try {
      await createSolution({
        problemId,
        title: formTitle.trim(),
        description: formDescription.trim() || undefined,
        sourceCode: formCode,
        language: formLanguage,
      });
      setFormTitle("");
      setFormDescription("");
      setFormCode("");
      setFormLanguage("JAVASCRIPT");
      setView("list");
      setPage(1);
      loadSolutions();
    } catch {
      setFormError("Failed to share solution. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim() || !selectedSolution) return;
    setCommentSubmitting(true);
    try {
      const res = await addSolutionComment(selectedSolution.id, commentText.trim());
      if (res?.data) {
        setComments((prev) => [res.data, ...prev]);
        setCommentText("");
        setSolutions((prev) =>
          prev.map((s) =>
            s.id === selectedSolution.id ? { ...s, commentCount: s.commentCount + 1 } : s,
          ),
        );
        setSelectedSolution((prev) =>
          prev ? { ...prev, commentCount: prev.commentCount + 1 } : prev,
        );
      }
    } catch { /* silent */ } finally {
      setCommentSubmitting(false);
    }
  };

  const handleDeleteSolution = async (id: string) => {
    if (!confirm("Are you sure you want to delete this solution?")) return;
    try {
      await deleteSolution(id);
      setSolutions((prev) => prev.filter((s) => s.id !== id));
      if (selectedSolution?.id === id) {
        setView("list");
        setSelectedSolution(null);
      }
    } catch { /* silent */ }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteSolutionComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      if (selectedSolution) {
        setSolutions((prev) =>
          prev.map((s) =>
            s.id === selectedSolution.id
              ? { ...s, commentCount: Math.max(0, s.commentCount - 1) }
              : s,
          ),
        );
        setSelectedSolution((prev) =>
          prev ? { ...prev, commentCount: Math.max(0, prev.commentCount - 1) } : prev,
        );
      }
    } catch { /* silent */ }
  };

  // ─── CREATE VIEW ─────────────────────────────────────────────────

  if (view === "create") {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-400 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView("list")}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h3 className="text-sm font-bold text-white">Share Your Solution</h3>
            <p className="text-[11px] text-zinc-500">
              Help others learn from your approach to &ldquo;{problemTitle}&rdquo;
            </p>
          </div>
        </div>

        <form onSubmit={handleCreateSolution} className="space-y-4">
          {/* Title */}
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Title *
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g. Two Pointer Approach — O(n) Time"
              maxLength={100}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none transition-colors focus:border-emerald-500/50 focus:bg-white/[0.07]"
            />
            <span className="mt-1 block text-right text-[10px] text-zinc-600">
              {formTitle.length}/100
            </span>
          </div>

          {/* Description with Markdown */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                Description (supports Markdown)
              </label>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className={cn(
                  "flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-medium transition-all cursor-pointer",
                  showPreview
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-white/5 text-zinc-500 hover:text-zinc-300",
                )}
              >
                <Eye className="h-3 w-3" />
                {showPreview ? "Editor" : "Preview"}
              </button>
            </div>

            {showPreview ? (
              <div className="min-h-[120px] rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
                {formDescription.trim() ? (
                  <MarkdownDescription content={formDescription} />
                ) : (
                  <p className="text-xs text-zinc-600 italic">Nothing to preview yet...</p>
                )}
              </div>
            ) : (
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder={`## Approach: Reversal Algorithm\n\nTo rotate an array by **k** steps to the right:\n\n1. **Reverse the entire array** — moves elements to the front\n2. **Reverse the first k elements** — restores order\n3. **Reverse the remaining** — restores the rest\n\n### Complexity\n- **Time:** O(n)\n- **Space:** O(1)`}
                maxLength={2000}
                rows={6}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-600/60 outline-none transition-colors focus:border-emerald-500/50 focus:bg-white/[0.07] font-mono text-[12px] leading-relaxed"
              />
            )}
            <p className="mt-1 text-[10px] text-zinc-600">
              Tip: Use **bold**, # headings, 1. numbered lists, - bullet points, `code`
            </p>
          </div>

          {/* Language */}
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Language *
            </label>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.value}
                  type="button"
                  onClick={() => setFormLanguage(lang.value)}
                  className={cn(
                    "rounded-lg border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer",
                    formLanguage === lang.value
                      ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-400 shadow-sm shadow-emerald-500/10"
                      : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-300",
                  )}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Code Editor */}
          <div>
            <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
              Source Code *
            </label>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <Editor
                height="280px"
                language={MONACO_LANG_MAP[formLanguage] || "javascript"}
                theme="vs-dark"
                value={formCode}
                onChange={(value) => setFormCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineHeight: 22,
                  padding: { top: 16, bottom: 16 },
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                  lineNumbersMinChars: 3,
                  wordWrap: "on",
                }}
              />
            </div>
          </div>

          {formError && (
            <div className="rounded-lg border border-rose-500/20 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-400">
              {formError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-emerald-600 to-cyan-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <div className="absolute inset-0 bg-linear-to-r from-emerald-400/0 via-white/10 to-emerald-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            {isSubmitting ? (
              <>
                <LoaderOne />
                <span>Sharing...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                <span>Share Solution</span>
              </>
            )}
          </button>
        </form>
      </div>
    );
  }

  // ─── DETAIL VIEW ─────────────────────────────────────────────────

  if (view === "detail" && selectedSolution) {
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-400 space-y-0">
        {/* Back + Title Header */}
        <div className="flex items-center gap-3 pb-4">
          <button
            onClick={() => {
              setView("list");
              setSelectedSolution(null);
            }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h3 className="text-base font-bold text-white leading-snug truncate flex-1">
            {selectedSolution.title}
          </h3>
          <button
            onClick={() => handleDeleteSolution(selectedSolution.id)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-zinc-600 transition-colors hover:bg-rose-500/10 hover:text-rose-400 cursor-pointer"
            title="Delete solution"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Author Card */}
        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 mb-4">
          <AvatarBubble user={selectedSolution.user} size="md" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-zinc-200 truncate">
              {selectedSolution.user.firstName} {selectedSolution.user.lastName}
            </p>
            <p className="text-[11px] text-zinc-500">
              @{selectedSolution.user.userName} · {timeAgo(selectedSolution.createdAt)}
            </p>
          </div>
          <LanguageBadge language={selectedSolution.language} />
        </div>

        {/* Vote Actions */}
        <div className="flex items-center gap-2 mb-5">
          <button
            onClick={() => handleVote(selectedSolution.id, "LIKE")}
            disabled={votingId === selectedSolution.id}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer",
              selectedSolution.userVote === "LIKE"
                ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-400 shadow-sm shadow-emerald-500/10"
                : "border-white/10 bg-white/5 text-zinc-400 hover:border-emerald-500/30 hover:text-emerald-400",
            )}
          >
            <ThumbsUp className="h-3.5 w-3.5" />
            <span>{selectedSolution.likeCount}</span>
          </button>
          <button
            onClick={() => handleVote(selectedSolution.id, "DISLIKE")}
            disabled={votingId === selectedSolution.id}
            className={cn(
              "flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer",
              selectedSolution.userVote === "DISLIKE"
                ? "border-rose-500/40 bg-rose-500/15 text-rose-400 shadow-sm shadow-rose-500/10"
                : "border-white/10 bg-white/5 text-zinc-400 hover:border-rose-500/30 hover:text-rose-400",
            )}
          >
            <ThumbsDown className="h-3.5 w-3.5" />
            <span>{selectedSolution.dislikeCount}</span>
          </button>
          <div className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 text-xs text-zinc-500">
            <MessageCircle className="h-3.5 w-3.5" />
            <span>{selectedSolution.commentCount}</span>
          </div>
        </div>

        {/* Description — beautifully formatted with Markdown */}
        {selectedSolution.description && (
          <div className="mb-5 rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
            <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-5 py-2.5">
              <Share2 className="h-3.5 w-3.5 text-zinc-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Approach
              </span>
            </div>
            <div className="px-5 py-4">
              <MarkdownDescription content={selectedSolution.description} />
            </div>
          </div>
        )}

        {/* Code — in a card */}
        <div className="mb-5 overflow-hidden rounded-2xl border border-white/5 bg-zinc-950/30">
          <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-5 py-2.5">
            <div className="flex items-center gap-2">
              <Code2 className="h-3.5 w-3.5 text-zinc-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Solution Code
              </span>
            </div>
            <LanguageBadge language={selectedSolution.language} />
          </div>
          <Editor
            height="300px"
            language={MONACO_LANG_MAP[selectedSolution.language] || "javascript"}
            theme="vs-dark"
            value={selectedSolution.sourceCode}
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 13,
              lineHeight: 22,
              padding: { top: 16, bottom: 16 },
              scrollBeyondLastLine: false,
              smoothScrolling: true,
              renderLineHighlight: "none",
              lineNumbersMinChars: 3,
              wordWrap: "on",
              domReadOnly: true,
            }}
          />
        </div>

        {/* Comments Section */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.03] px-5 py-2.5">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-3.5 w-3.5 text-zinc-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                Comments ({selectedSolution.commentCount})
              </span>
            </div>
          </div>

          {/* Comment Input */}
          <div className="flex gap-2 border-b border-white/5 p-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddComment();
                }
              }}
              placeholder="Add a comment..."
              maxLength={2000}
              className="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-600 outline-none transition-colors focus:border-emerald-500/50"
            />
            <button
              onClick={handleAddComment}
              disabled={commentSubmitting || !commentText.trim()}
              className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white transition-all hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              {commentSubmitting ? <LoaderOne /> : <Send className="h-4 w-4" />}
            </button>
          </div>

          {/* Comments List */}
          <div className="max-h-[300px] overflow-y-auto">
            {commentsLoading ? (
              <div className="flex items-center justify-center py-8">
                <LoaderOne />
              </div>
            ) : comments.length === 0 ? (
              <div className="py-8 text-center text-xs text-zinc-600">
                No comments yet. Be the first to share your thoughts!
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="group px-4 py-3 transition-colors hover:bg-white/2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <AvatarBubble user={comment.user} />
                        <div>
                          <span className="text-xs font-semibold text-zinc-300">
                            {comment.user.firstName} {comment.user.lastName}
                          </span>
                          <span className="ml-2 text-[10px] text-zinc-600">
                            {timeAgo(comment.createdAt)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-600 hover:text-rose-400 cursor-pointer"
                        title="Delete comment"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                    <p className="mt-1.5 pl-[34px] text-[13px] leading-relaxed text-zinc-400">
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── LIST VIEW (default) ─────────────────────────────────────────

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-400 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            Community Solutions
          </h3>
          <p className="mt-0.5 text-[11px] text-zinc-500">
            Share your approach and learn from others
          </p>
        </div>
        <button
          onClick={() => setView("create")}
          className="group relative flex items-center gap-1.5 overflow-hidden rounded-lg bg-linear-to-r from-emerald-600 to-cyan-600 px-3.5 py-2 text-xs font-semibold text-white shadow-lg shadow-emerald-500/20 transition-all hover:shadow-emerald-500/30 hover:brightness-110 cursor-pointer"
        >
          <div className="absolute inset-0 bg-linear-to-r from-emerald-400/0 via-white/10 to-emerald-400/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <Plus className="h-3.5 w-3.5" />
          Share Solution
        </button>
      </div>

      {/* Sort */}
      <div className="flex items-center gap-1.5 rounded-lg bg-white/[0.03] p-1 w-fit">
        <button
          onClick={() => { setSortBy("recent"); setPage(1); }}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all cursor-pointer",
            sortBy === "recent"
              ? "bg-white/10 text-white shadow-sm"
              : "text-zinc-500 hover:text-zinc-300",
          )}
        >
          <Clock className="h-3 w-3" />
          Recent
        </button>
        <button
          onClick={() => { setSortBy("likes"); setPage(1); }}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all cursor-pointer",
            sortBy === "likes"
              ? "bg-white/10 text-white shadow-sm"
              : "text-zinc-500 hover:text-zinc-300",
          )}
        >
          <TrendingUp className="h-3 w-3" />
          Most Liked
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <LoaderOne />
          <span className="text-xs text-zinc-500 animate-pulse">Loading solutions...</span>
        </div>
      ) : solutions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="relative mb-6">
            <div className="absolute -inset-6 rounded-full bg-emerald-500/5 blur-2xl" />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.03]">
              <Code2 className="h-7 w-7 text-zinc-600" />
            </div>
          </div>
          <h4 className="text-sm font-semibold text-zinc-300">No solutions yet</h4>
          <p className="mt-1.5 max-w-[280px] text-xs leading-relaxed text-zinc-600">
            Be the first to share your approach! Help others learn from your solution.
          </p>
          <button
            onClick={() => setView("create")}
            className="mt-5 flex items-center gap-1.5 rounded-lg bg-emerald-600/20 px-4 py-2 text-xs font-semibold text-emerald-400 transition-all hover:bg-emerald-600/30 cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            Share First Solution
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {solutions.map((solution) => (
            <div
              key={solution.id}
              onClick={() => handleOpenDetail(solution)}
              className="group cursor-pointer rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-emerald-500/20 hover:bg-white/[0.04] hover:shadow-lg hover:shadow-emerald-500/5"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors truncate">
                    {solution.title}
                  </h4>
                  {solution.description && (
                    <p className="mt-1 text-[12px] text-zinc-500 line-clamp-2 leading-relaxed">
                      {solution.description.replace(/[#*`_~>]/g, '').substring(0, 150)}
                      {solution.description.length > 150 ? '...' : ''}
                    </p>
                  )}
                </div>
                <LanguageBadge language={solution.language} />
              </div>

              {/* Bottom row */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <AvatarBubble user={solution.user} />
                  <span className="text-[11px] text-zinc-500">
                    {solution.user.firstName} {solution.user.lastName}
                  </span>
                  <span className="text-[10px] text-zinc-700">·</span>
                  <span className="text-[10px] text-zinc-600">
                    {timeAgo(solution.createdAt)}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[11px]">
                  <span
                    className={cn(
                      "flex items-center gap-1",
                      solution.userVote === "LIKE" ? "text-emerald-400" : "text-zinc-600",
                    )}
                  >
                    <ThumbsUp className="h-3 w-3" />
                    {solution.likeCount}
                  </span>
                  <span
                    className={cn(
                      "flex items-center gap-1",
                      solution.userVote === "DISLIKE" ? "text-rose-400" : "text-zinc-600",
                    )}
                  >
                    <ThumbsDown className="h-3 w-3" />
                    {solution.dislikeCount}
                  </span>
                  <span className="flex items-center gap-1 text-zinc-600">
                    <MessageCircle className="h-3 w-3" />
                    {solution.commentCount}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-3">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                Previous
              </button>
              <span className="text-xs text-zinc-500">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
