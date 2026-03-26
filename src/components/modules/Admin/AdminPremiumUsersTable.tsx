"use client";

import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Search,
  Crown,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminUsersAction } from "@/app/admin/_action";
import { toast } from "sonner";

type AdminUserRow = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  isPremium: boolean;
  subscriptionPlan: string | null;
  subscriptionStatus: string | null;
  currentPeriodEnd: string | null;
};

function planBadge(plan: string | null) {
  if (!plan) return <span className="text-muted-foreground">—</span>;
  const isYearly = plan.toLowerCase() === "yearly";
  return (
    <Badge
      variant="outline"
      className={
        isYearly
          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
          : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
      }
    >
      {plan.toUpperCase()}
    </Badge>
  );
}

function statusBadge(status: string | null) {
  if (!status) return <span className="text-muted-foreground">—</span>;
  const isActive = status === "active";
  return (
    <Badge
      variant="outline"
      className={
        isActive
          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
          : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
      }
    >
      {status.toUpperCase()}
    </Badge>
  );
}

function initials(firstName: string, lastName: string) {
  const a = firstName?.[0] ?? "";
  const b = lastName?.[0] ?? "";
  return (a + b).toUpperCase();
}

export default function AdminPremiumUsersTable() {
  const [search, setSearch] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users"],
    queryFn: getAdminUsersAction,
    staleTime: 30_000,
  });

  const premiumUsers: AdminUserRow[] = useMemo(() => {
    const raw = (data?.data ?? []) as unknown;
    const allUsers = Array.isArray(raw) ? (raw as AdminUserRow[]) : [];
    return allUsers.filter((u) => u.isPremium);
  }, [data]);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return premiumUsers;
    return premiumUsers.filter((u) => {
      return (
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.userName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    });
  }, [premiumUsers, search]);

  const total = filteredUsers.length;

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" />
              Premium Users
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage subscribers and view payment status.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-amber-500/20">
              Active Subscribers: {total.toLocaleString()}
            </Badge>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search premium users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="hidden md:flex md:justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setSearch("")}
            >
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {error ? (
          <div className="flex items-start gap-3 rounded-xl border border-rose-500/20 bg-rose-500/5 p-4">
            <AlertCircle className="h-5 w-5 text-rose-500 mt-0.5" />
            <div className="space-y-1">
              <div className="font-semibold">Failed to load users</div>
              <div className="text-sm text-muted-foreground">Try refreshing the page.</div>
            </div>
          </div>
        ) : isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-14 w-full" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border/50 overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead style={{ width: 280 }}>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead style={{ width: 120 }}>Plan</TableHead>
                  <TableHead style={{ width: 120 }}>Status</TableHead>
                  <TableHead style={{ width: 170 }}>Period Ends</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-10">
                      No premium users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xs font-bold text-amber-600">
                            {initials(u.firstName, u.lastName)}
                          </div>
                          <div className="space-y-0.5">
                            <div className="font-medium">
                              {u.firstName} {u.lastName}
                            </div>
                            <div className="text-xs text-muted-foreground">@{u.userName}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        <button
                          className="hover:text-amber-500 transition-colors"
                          onClick={async () => {
                            try {
                              await navigator.clipboard.writeText(u.email);
                              toast.success("Email copied");
                            } catch {
                              toast.error("Copy failed");
                            }
                          }}
                          title="Click to copy email"
                        >
                          {u.email}
                        </button>
                      </TableCell>
                      <TableCell>{planBadge(u.subscriptionPlan)}</TableCell>
                      <TableCell>{statusBadge(u.subscriptionStatus)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {u.currentPeriodEnd
                          ? new Date(u.currentPeriodEnd).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                          : "—"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
