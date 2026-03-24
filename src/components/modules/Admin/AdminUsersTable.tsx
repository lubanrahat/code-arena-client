"use client";

import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import {
  Search,
  Users as UsersIcon,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAdminUsersAction } from "@/app/admin/_action";
import { toast } from "sonner";

type AdminUserRow = {
  id: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: "ADMIN" | "USER" | string;
  createdAt: string | Date;
};

const roleColors: Record<string, string> = {
  ADMIN: "#6366f1",
  USER: "#22c55e",
};

function roleBadge(role: string) {
  const isAdmin = role === "ADMIN";
  return (
    <Badge
      variant="outline"
      className={
        isAdmin
          ? "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20"
          : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
      }
    >
      {role}
    </Badge>
  );
}

function initials(firstName: string, lastName: string) {
  const a = firstName?.[0] ?? "";
  const b = lastName?.[0] ?? "";
  return (a + b).toUpperCase();
}

export default function AdminUsersTable() {
  const ALL_ROLES = "ALL" as const;
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<typeof ALL_ROLES | "ADMIN" | "USER">(ALL_ROLES);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-users", { search, role }],
    queryFn: getAdminUsersAction,
    staleTime: 30_000,
  });

  const users: AdminUserRow[] = useMemo(() => {
    const raw = (data?.data ?? []) as unknown;
    return Array.isArray(raw) ? (raw as AdminUserRow[]) : [];
  }, [data]);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => {
      if (role !== ALL_ROLES && u.role !== role) return false;
      if (!q) return true;
      return (
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.userName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    });
  }, [users, search, role]);

  const roleCounts = useMemo(() => {
    const counts: Record<string, number> = { ADMIN: 0, USER: 0 };
    for (const u of filteredUsers) counts[u.role] = (counts[u.role] ?? 0) + 1;
    return counts;
  }, [filteredUsers]);

  const chartData = useMemo(() => {
    const items = [
      { name: "ADMIN", value: roleCounts.ADMIN ?? 0 },
      { name: "USER", value: roleCounts.USER ?? 0 },
    ].filter((x) => x.value > 0);

    if (items.length === 0) return [{ name: "No data", value: 1 }];
    return items;
  }, [roleCounts]);

  const total = filteredUsers.length;

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold flex items-center gap-2">
              Users
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              View user accounts and role distribution.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-muted/50">
              Total: {total.toLocaleString()}
            </Badge>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search users (name, username, email)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
            <Select value={role} onValueChange={(v) => setRole(v as typeof role)}>
              <SelectTrigger>
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_ROLES}>All</SelectItem>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
                <SelectItem value="USER">USER</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="hidden md:flex md:justify-end">
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setRole(ALL_ROLES);
              }}
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
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-[260px] w-full" />
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-1 shadow-none border border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                  Role Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[260px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Tooltip
                        contentStyle={{
                          borderRadius: 10,
                          border: "1px solid rgba(148,163,184,0.25)",
                          background: "rgba(17,24,39,0.9)",
                        }}
                        formatter={(value: unknown, name: unknown) => {
                          const safeValue = String(value);
                          const safeName = String(name);
                          return [
                            safeValue,
                            safeName === "No data" ? "—" : safeName,
                          ];
                        }}
                      />
                      <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius="60%"
                        outerRadius="85%"
                        paddingAngle={3}
                      >
                        {chartData.map((entry, index) => {
                          const fill =
                            entry.name === "ADMIN"
                              ? roleColors.ADMIN
                              : entry.name === "USER"
                                ? roleColors.USER
                                : "#e5e7eb";
                          return <Cell key={index} fill={fill} stroke="transparent" />;
                        })}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">ADMIN</span>
                    <span className="font-medium">{roleCounts.ADMIN}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">USER</span>
                    <span className="font-medium">{roleCounts.USER}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="lg:col-span-2">
              <div className="rounded-xl border border-border/50 overflow-hidden">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead style={{ width: 280 }}>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead style={{ width: 120 }}>Role</TableHead>
                      <TableHead style={{ width: 170 }}>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-10">
                          No matching users.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center text-xs font-bold text-muted-foreground">
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
                              className="hover:text-blue-500 transition-colors"
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
                          <TableCell>{roleBadge(u.role)}</TableCell>
                          <TableCell className="text-muted-foreground">
                            {u.createdAt
                              ? new Date(u.createdAt).toLocaleDateString("en-US", {
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
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

