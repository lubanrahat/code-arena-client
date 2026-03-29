"use client";

import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import {
  PencilLine,
  Plus,
  Search,
  Trash2,
  AlertCircle,
  Filter,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";

import { allProblems } from "@/app/problems/_action";
import { deleteProblemAction, updateProblemAction } from "@/app/admin/problems/_action";

type AdminProblemRow = {
  id: string;
  title: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD" | string;
  topic?: string | null;
  tags: string[];
  askedIn?: string[] | null;
  constraints: string;
  editorial?: string | null;
  videoUrl?: string | null;
  createdAt?: string | Date;
  _count?: { submissions?: number };
};

function normalizeTagsInput(value: string) {
  return value
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 10);
}

function formatDifficulty(difficulty: string) {
  const map: Record<string, { label: string; className: string }> = {
    EASY: { label: "Easy", className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20" },
    MEDIUM: { label: "Medium", className: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20" },
    HARD: { label: "Hard", className: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20" },
  };
  return map[difficulty] ?? { label: difficulty, className: "bg-muted/40 text-muted-foreground" };
}

function toInputString(val: unknown) {
  if (val === null || val === undefined) return "";
  return String(val);
}

export default function AdminProblemsTable() {
  const queryClient = useQueryClient();
  const ALL_DIFFICULTIES = "ALL" as const;

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<typeof ALL_DIFFICULTIES | "EASY" | "MEDIUM" | "HARD">(ALL_DIFFICULTIES);

  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<AdminProblemRow | null>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editTopic, setEditTopic] = useState("");
  const [editTags, setEditTags] = useState("");
  const [editDifficulty, setEditDifficulty] = useState<AdminProblemRow["difficulty"]>("EASY");
  const [editConstraints, setEditConstraints] = useState("");
  const [editEditorial, setEditEditorial] = useState("");
  const [editVideoUrl, setEditVideoUrl] = useState("");
  const [editAskedIn, setEditAskedIn] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-problems", { page, limit, search, difficulty }],
    queryFn: () =>
      allProblems({
        search: search || undefined,
        difficulty: difficulty === ALL_DIFFICULTIES ? undefined : difficulty,
        page,
        limit,
        sortBy: "createdAt",
        sortOrder: "desc",
      }),
  });

  const problems: AdminProblemRow[] = useMemo(() => {
    const raw = (data?.data ?? []) as unknown;
    return Array.isArray(raw) ? (raw as AdminProblemRow[]) : [];
  }, [data]);

  const totalPages = Number(
    data?.meta?.pagination?.totalPages ?? data?.meta?.pagination?.totalPages ?? 1,
  );

  const refetchAfterMutation = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-problems"] });
  };

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Record<string, unknown>;
    }) => updateProblemAction(id, payload),
    onSuccess: () => {
      toast.success("Problem updated successfully");
      setEditOpen(false);
      setEditing(null);
      refetchAfterMutation();
    },
    onError: (err: unknown) => {
      const typed = err as {
        response?: { data?: { error?: { message?: string } } };
        message?: string;
      };
      toast.error(
        typed.response?.data?.error?.message ?? typed.message ?? "Update failed",
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProblemAction(id),
    onSuccess: () => {
      toast.success("Problem deleted successfully");
      refetchAfterMutation();
    },
    onError: (err: unknown) => {
      const typed = err as {
        response?: { data?: { error?: { message?: string } } };
        message?: string;
      };
      toast.error(
        typed.response?.data?.error?.message ?? typed.message ?? "Delete failed",
      );
    },
  });

  const openEditDialog = (row: AdminProblemRow) => {
    setEditing(row);
    setEditTitle(row.title ?? "");
    setEditDescription(row.description ?? "");
    setEditTopic(toInputString(row.topic));
    setEditTags((row.tags ?? []).join(", "));
    setEditDifficulty(row.difficulty);
    setEditConstraints(row.constraints ?? "");
    setEditEditorial(toInputString(row.editorial));
    setEditVideoUrl(toInputString(row.videoUrl));
    setEditAskedIn((row.askedIn ?? []).join(", "));
    setEditOpen(true);
  };

  const submitEdit = () => {
    if (!editing) return;

    const tags = normalizeTagsInput(editTags);
    if (tags.length < 1) {
      toast.error("At least one tag is required");
      return;
    }

    const askedInArr = normalizeTagsInput(editAskedIn); // same parsing rules

    const payload: Record<string, unknown> = {
      title: editTitle.trim(),
      description: editDescription.trim(),
      difficulty: editDifficulty,
      topic: editTopic.trim() || "",
      tags,
      askedIn: askedInArr,
      constraints: editConstraints.trim(),
    };

    if (editEditorial.trim()) payload.editorial = editEditorial.trim();
    if (editVideoUrl.trim()) payload.videoUrl = editVideoUrl.trim();

    updateMutation.mutate({ id: editing.id, payload });
  };

  const difficultyBadge = (d: string) => {
    const cfg = formatDifficulty(d);
    return (
      <Badge variant="outline" className={cfg.className}>
        {cfg.label}
      </Badge>
    );
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              Problems
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage problems, update metadata, and delete content.
            </p>
          </div>

          <div className="flex gap-2">
            <Button asChild className="gap-2">
              <Link href="/admin/create-problem">
                <Plus className="h-4 w-4" />
                Create
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search by title/keywords"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={difficulty}
              onValueChange={(v) => {
                setPage(1);
                setDifficulty(v as typeof difficulty);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_DIFFICULTIES}>All</SelectItem>
                <SelectItem value="EASY">Easy</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HARD">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {error ? (
          <div className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
            <AlertCircle className="h-5 w-5 text-rose-500 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold">Failed to load problems</div>
              <div className="text-sm text-muted-foreground">Try refreshing the page.</div>
            </div>
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-14 w-full" />
                ))}
              </div>
            ) : problems.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground">
                No problems found. Adjust search/filters and try again.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-xl border border-border/50 overflow-hidden">
                  <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead style={{ width: "34%" }}>Title</TableHead>
                      <TableHead style={{ width: 120 }}>Difficulty</TableHead>
                      <TableHead style={{ width: 140 }} className="text-right">
                        Submissions
                      </TableHead>
                      <TableHead style={{ width: "18%" }}>Topic</TableHead>
                      <TableHead style={{ width: "18%" }}>Created</TableHead>
                      <TableHead style={{ width: 170 }} className="text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {problems.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">
                              <Link
                                href={`/problems/${p.id}`}
                                className="hover:text-blue-500 transition-colors"
                              >
                                {p.title}
                              </Link>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {(p.tags ?? []).slice(0, 3).map((t) => (
                                <Badge key={t} variant="secondary" className="bg-muted/50">
                                  {t}
                                </Badge>
                              ))}
                              {(p.tags?.length ?? 0) > 3 ? (
                                <Badge variant="outline" className="text-muted-foreground">
                                  +{(p.tags?.length ?? 0) - 3}
                                </Badge>
                              ) : null}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{difficultyBadge(String(p.difficulty))}</TableCell>
                        <TableCell className="text-right font-medium">
                          {(p._count?.submissions ?? 0).toLocaleString()}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {p.topic ? p.topic : <span className="text-muted-foreground">—</span>}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {p.createdAt
                            ? new Date(p.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "—"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditDialog(p)}
                            >
                              <PencilLine className="h-4 w-4 mr-2" />
                              Edit
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  disabled={deleteMutation.isPending}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete problem?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This will permanently remove the problem and its data. This action can’t be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteMutation.mutate(p.id)}
                                    disabled={deleteMutation.isPending}
                                  >
                                    {deleteMutation.isPending ? "Deleting..." : "Delete"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {totalPages > 0 && (
                <div className="mt-6 flex items-center justify-between px-2">
                  <div className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </div>
                  <Pagination className="mx-0 w-auto">
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page > 1) setPage((p) => p - 1);
                          }}
                          className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                        />
                      </PaginationItem>

                      {Array.from({ length: totalPages }).map((_, i) => {
                        const p = i + 1;
                        if (
                          p === 1 ||
                          p === totalPages ||
                          (p >= page - 1 && p <= page + 1)
                        ) {
                          return (
                            <PaginationItem key={p}>
                              <PaginationLink
                                href="#"
                                isActive={page === p}
                                onClick={(e) => {
                                  e.preventDefault();
                                  setPage(p);
                                }}
                              >
                                {p}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        }
                        if (p === page - 2 || p === page + 2) {
                          return (
                            <PaginationItem key={p}>
                              <PaginationEllipsis />
                            </PaginationItem>
                          );
                        }
                        return null;
                      })}

                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            if (page < totalPages) setPage((p) => p + 1);
                          }}
                          className={
                            page >= totalPages ? "pointer-events-none opacity-50" : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
              </div>
            )}
          </>
        )}
      </CardContent>

      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="sm:max-w-[900px]">
          <DialogHeader>
            <DialogTitle>Edit Problem</DialogTitle>
            <DialogDescription>
              Update metadata (title, difficulty, tags, constraints, and description). Advanced fields stay unchanged.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto px-1 py-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Title</div>
                  <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Difficulty</div>
                  <Select
                    value={String(editDifficulty)}
                    onValueChange={(v) => setEditDifficulty(v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EASY">Easy</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="HARD">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Topic (optional)</div>
                  <Input value={editTopic} onChange={(e) => setEditTopic(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Tags (comma separated)</div>
                  <Input value={editTags} onChange={(e) => setEditTags(e.target.value)} />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Asked In (comma separated)</div>
                  <Input value={editAskedIn} onChange={(e) => setEditAskedIn(e.target.value)} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Description</div>
                  <Textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Constraints</div>
                  <Textarea
                    value={editConstraints}
                    onChange={(e) => setEditConstraints(e.target.value)}
                    className="min-h-[110px] font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Editorial (optional)</div>
                  <Textarea
                    value={editEditorial}
                    onChange={(e) => setEditEditorial(e.target.value)}
                    className="min-h-[90px]"
                  />
                </div>
                <div className="space-y-1">
                  <div className="text-sm font-medium text-muted-foreground">Video URL (optional)</div>
                  <Input value={editVideoUrl} onChange={(e) => setEditVideoUrl(e.target.value)} placeholder="https://..." />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={submitEdit}
              disabled={updateMutation.isPending}
              className="gap-2"
            >
              {updateMutation.isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}

