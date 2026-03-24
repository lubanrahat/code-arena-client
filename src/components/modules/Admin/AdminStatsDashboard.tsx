"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  BarChart3,
  CheckCircle2,
  Users,
  Activity,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { getAdminStatsAction } from "@/app/admin/_action";

type DifficultyDistributionItem = {
  difficulty: "EASY" | "MEDIUM" | "HARD" | string;
  count: number;
};

type ActivityPoint = {
  date: string; // YYYY-MM-DD
  count: number;
};

type AdminStatsPayload = {
  overview: {
    totalUsers: number;
    totalProblems: number;
    totalSubmissions: number;
  };
  difficultyDistribution: DifficultyDistributionItem[];
  activityData: ActivityPoint[];
};

const difficultyColor: Record<string, string> = {
  EASY: "#22c55e",
  MEDIUM: "#f59e0b",
  HARD: "#ef4444",
};

function formatDateLabel(dateStr: string) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default function AdminStatsDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStatsAction,
  });

  const payload = (data?.data ?? null) as AdminStatsPayload | null;

  const overview = payload?.overview;
  const difficultyDistribution = payload?.difficultyDistribution ?? [];
  const activityData = payload?.activityData ?? [];

  const lastDay = activityData[activityData.length - 1]?.count ?? 0;
  const prevDay =
    activityData[activityData.length - 2]?.count ?? activityData[0]?.count ?? 0;
  const delta = prevDay === 0 ? 0 : ((lastDay - prevDay) / prevDay) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground text-sm">
          Monitor problems, submissions, and difficulty mix at a glance.
        </p>
      </div>

      {error ? (
        <Card className="border-rose-500/20 bg-rose-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-500" />
              Failed to load stats
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Refresh the page or check server availability.
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-t-4 border-t-indigo-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {isLoading ? <Skeleton className="h-8 w-24" /> : <div className="text-3xl font-bold">{overview?.totalUsers?.toLocaleString() ?? 0}</div>}
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-sky-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Total Problems
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {isLoading ? <Skeleton className="h-8 w-24" /> : <div className="text-3xl font-bold">{overview?.totalProblems?.toLocaleString() ?? 0}</div>}
              </CardContent>
            </Card>

            <Card className="border-t-4 border-t-emerald-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Total Submissions
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 flex flex-col gap-2">
                {isLoading ? (
                  <>
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-5 w-32" />
                  </>
                ) : (
                  <>
                    <div className="text-3xl font-bold">
                      {overview?.totalSubmissions?.toLocaleString() ?? 0}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20"
                      >
                        Last day: {lastDay.toLocaleString()}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className={
                          delta === 0
                            ? "bg-muted text-muted-foreground"
                            : delta > 0
                              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20"
                              : "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-500/20"
                        }
                      >
                        {delta === 0 ? "No change" : `${delta > 0 ? "+" : ""}${delta.toFixed(1)}%`}
                      </Badge>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Difficulty Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-[260px] w-full" />
                ) : (
                  <div className="h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={difficultyDistribution} margin={{ left: 0, right: 16 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
                        <XAxis dataKey="difficulty" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: 10,
                            border: "1px solid rgba(148,163,184,0.25)",
                            background: "rgba(17,24,39,0.9)",
                          }}
                          labelStyle={{ color: "white" }}
                          formatter={(value) => [`${value}`, "Problems"]}
                        />
                        <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                          {difficultyDistribution.map((entry) => (
                            <Cell
                              key={entry.difficulty}
                              fill={difficultyColor[entry.difficulty] ?? "#6366f1"}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  Activity (Last 7 Days)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-[260px] w-full" />
                ) : (
                  <div className="h-[260px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={activityData} margin={{ left: 0, right: 16 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.25)" />
                        <XAxis
                          dataKey="date"
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={formatDateLabel}
                        />
                        <YAxis tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            borderRadius: 10,
                            border: "1px solid rgba(148,163,184,0.25)",
                            background: "rgba(17,24,39,0.9)",
                          }}
                          labelFormatter={(label) => `Date: ${formatDateLabel(String(label))}`}
                          formatter={(value) => [`${value}`, "Submissions"]}
                        />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="#6366f1"
                          strokeWidth={3}
                          dot={{ r: 3, fill: "#6366f1", strokeWidth: 0 }}
                          activeDot={{ r: 5 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Last 7 Days Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-24 w-full" />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
                  {activityData.map((d) => {
                    const isLast = d === activityData[activityData.length - 1];
                    return (
                      <div
                        key={d.date}
                        className={
                          "rounded-xl border border-border/60 p-3 flex flex-col gap-2 " +
                          (isLast
                            ? "bg-indigo-500/10 border-indigo-500/30"
                            : "bg-muted/10")
                        }
                      >
                        <div className="text-xs text-muted-foreground">
                          {formatDateLabel(d.date)}
                        </div>
                        <div className="text-xl font-bold">{d.count.toLocaleString()}</div>
                        <div className="text-[11px] text-muted-foreground">Submissions</div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

