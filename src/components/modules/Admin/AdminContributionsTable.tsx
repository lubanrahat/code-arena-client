"use client";

import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  Mail,
  Eye,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";
import { ContributeService } from "@/services/ContributeService";

type ContributionRow = {
  id: string;
  name: string;
  email: string;
  countryCode: string;
  contactNumber?: string;
  contributionType: string;
  experience: string;
  portfolioLink?: string;
  message?: string;
  status: "PENDING" | "REVIEWED" | "ACCEPTED" | "REJECTED";
  createdAt: string;
  user?: {
    firstName: string;
    lastName: string;
    imageUrl?: string;
  };
};

function formatStatus(status: string) {
  const map: Record<string, { label: string; className: string; icon: React.ElementType }> = {
    PENDING: { label: "Pending", className: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20", icon: Clock },
    REVIEWED: { label: "Reviewed", className: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20", icon: Eye },
    ACCEPTED: { label: "Accepted", className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20", icon: CheckCircle },
    REJECTED: { label: "Rejected", className: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20", icon: XCircle },
  };
  return map[status] ?? { label: status, className: "bg-muted/40 text-muted-foreground", icon: Clock };
}

export default function AdminContributionsTable() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("ALL");

  const { data, isLoading } = useQuery({
    queryKey: ["admin-contributions", { page, limit, search, status }],
    queryFn: () =>
      ContributeService.getAllContributions({
        search: search || undefined,
        status: status === "ALL" ? undefined : status,
        page,
        limit,
      }),
  });

  const contributions: ContributionRow[] = useMemo(() => {
    return (data?.data ?? []) as ContributionRow[];
  }, [data]);

  const totalPages = data?.meta?.pagination?.totalPages ?? data?.meta?.totalPages ?? 1;

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      ContributeService.updateStatus(id, status),
    onSuccess: () => {
      toast.success("Status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["admin-contributions"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update status");
    },
  });

  const renderStatusBadge = (s: string) => {
    const cfg = formatStatus(s);
    const Icon = cfg.icon;
    return (
      <Badge variant="outline" className={`gap-1 ${cfg.className}`}>
        <Icon className="h-3 w-3" />
        {cfg.label}
      </Badge>
    );
  };

  return (
    <Card className="border-0 shadow-sm bg-white dark:bg-neutral-900">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold">Contributions</CardTitle>
            <p className="text-sm text-muted-foreground">
              Review and manage community contribution applications.
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search by name/email"
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
              value={status}
              onValueChange={(v) => {
                setPage(1);
                setStatus(v);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="REVIEWED">Reviewed</SelectItem>
                <SelectItem value="ACCEPTED">Accepted</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : contributions.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            No contributions found.
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-xl border border-border/50 overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead>Applicant</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contributions.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-foreground">{c.name}</span>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {c.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="capitalize">
                          {c.contributionType}
                        </Badge>
                      </TableCell>
                      <TableCell>{renderStatusBadge(c.status)}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Contribution Details</DialogTitle>
                              <DialogDescription>
                                Submitted by {c.name} on {new Date(c.createdAt).toLocaleString()}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-6 py-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                  <span className="text-xs font-bold uppercase text-muted-foreground">Type</span>
                                  <p className="font-medium capitalize">{c.contributionType}</p>
                                </div>
                                <div className="space-y-1">
                                  <span className="text-xs font-bold uppercase text-muted-foreground">Contact</span>
                                  <p className="font-medium">{c.countryCode} {c.contactNumber || "N/A"}</p>
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <span className="text-xs font-bold uppercase text-muted-foreground">Experience</span>
                                <p className="text-sm bg-muted/30 p-4 rounded-xl whitespace-pre-wrap border border-border/50">
                                  {c.experience}
                                </p>
                              </div>

                              {c.portfolioLink && (
                                <div className="space-y-1">
                                  <span className="text-xs font-bold uppercase text-muted-foreground">Portfolio/GitHub</span>
                                  <a 
                                    href={c.portfolioLink} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                                  >
                                    {c.portfolioLink} <ExternalLink className="h-3 w-3" />
                                  </a>
                                </div>
                              )}

                              {c.message && (
                                <div className="space-y-1">
                                  <span className="text-xs font-bold uppercase text-muted-foreground">Message</span>
                                  <p className="text-sm text-muted-foreground italic">
                                    &quot;{c.message}&quot;
                                  </p>
                                </div>
                              )}

                              <div className="pt-4 border-t border-border flex items-center justify-between">
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-blue-500 border-blue-500/20 hover:bg-blue-500/10"
                                    onClick={() => statusMutation.mutate({ id: c.id, status: "REVIEWED" })}
                                    disabled={statusMutation.isPending || c.status === "REVIEWED"}
                                  >
                                    Mark as Reviewed
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/10"
                                    onClick={() => statusMutation.mutate({ id: c.id, status: "ACCEPTED" })}
                                    disabled={statusMutation.isPending || c.status === "ACCEPTED"}
                                  >
                                    Accept
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline" 
                                    className="text-rose-500 border-rose-500/20 hover:bg-rose-500/10"
                                    onClick={() => statusMutation.mutate({ id: c.id, status: "REJECTED" })}
                                    disabled={statusMutation.isPending || c.status === "REJECTED"}
                                  >
                                    Reject
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (page > 1) setPage(p => p - 1);
                        }}
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          if (page < totalPages) setPage(p => p + 1);
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
