"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { useAuthUser } from "@/hooks/useAuth";
import {
  Trophy,
  Crown,
  Medal,
  ChevronLeft,
  ChevronRight,
  Users,
  TrendingUp,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface LeaderboardUser {
  rank: number;
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  imageUrl: string | null;
  institution: string | null;
  score: number;
  problemsSolvedCount: number;
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName?.charAt(0) ?? ""}${lastName?.charAt(0) ?? ""}`.toUpperCase();
}

function getAvatarColor(name: string) {
  const colors = [
    "from-violet-500 to-purple-600",
    "from-blue-500 to-cyan-600",
    "from-emerald-500 to-teal-600",
    "from-rose-500 to-pink-600",
    "from-amber-500 to-orange-600",
    "from-indigo-500 to-blue-600",
    "from-fuchsia-500 to-pink-600",
    "from-teal-500 to-green-600",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

/* ─── Medal SVG for top 3 ─────────────────────────────────────────── */
function RankMedal({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-amber-300 via-yellow-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
          <Crown className="w-5 h-5 text-amber-900" />
        </div>
      </div>
    );
  }
  if (rank === 2) {
    return (
      <div className="w-9 h-9 rounded-full bg-linear-to-br from-slate-200 via-slate-300 to-slate-500 flex items-center justify-center shadow-lg shadow-slate-400/30">
        <Medal className="w-4.5 h-4.5 text-slate-700" />
      </div>
    );
  }
  if (rank === 3) {
    return (
      <div className="w-9 h-9 rounded-full bg-linear-to-br from-orange-300 via-orange-400 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-500/30">
        <Medal className="w-4.5 h-4.5 text-orange-900" />
      </div>
    );
  }
  return null;
}

/* ─── Podium card for top 3 ───────────────────────────────────────── */
function PodiumCard({
  user,
  position,
}: {
  user: LeaderboardUser;
  position: 1 | 2 | 3;
}) {
  const initials = getInitials(user.firstName, user.lastName);
  const avatarGradient = getAvatarColor(user.userName);
  const displayName = `${user.firstName} ${user.lastName}`;

  const config = {
    1: {
      cardClass:
        "order-2 z-10 scale-105 border-amber-500/40 bg-linear-to-b from-amber-500/10 via-card/80 to-card/60 shadow-2xl shadow-amber-500/10",
      avatarRing: "ring-4 ring-amber-400/60",
      nameColor: "text-amber-200",
      scoreLabel: "text-amber-400",
      height: "min-h-[260px]",
    },
    2: {
      cardClass:
        "order-1 border-slate-400/30 bg-linear-to-b from-slate-400/10 via-card/80 to-card/60 shadow-xl",
      avatarRing: "ring-3 ring-slate-400/50",
      nameColor: "text-slate-200",
      scoreLabel: "text-slate-300",
      height: "min-h-[230px] mt-6",
    },
    3: {
      cardClass:
        "order-3 border-orange-400/30 bg-linear-to-b from-orange-400/10 via-card/80 to-card/60 shadow-xl",
      avatarRing: "ring-3 ring-orange-400/50",
      nameColor: "text-orange-200",
      scoreLabel: "text-orange-300",
      height: "min-h-[230px] mt-6",
    },
  }[position];

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center rounded-2xl border backdrop-blur-xl px-6 py-8 transition-all duration-300 hover:scale-[1.02]",
        config.cardClass,
        config.height,
        "w-full max-w-[260px]",
      )}
    >
      {/* Medal */}
      <div className="mb-3">
        <RankMedal rank={position} />
      </div>

      {/* Avatar */}
      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white bg-linear-to-br shadow-lg mb-3",
          avatarGradient,
          config.avatarRing,
        )}
      >
        {initials}
      </div>

      {/* Name */}
      <h3
        className={cn(
          "text-base font-bold text-center truncate max-w-full",
          config.nameColor,
        )}
      >
        {displayName}
      </h3>
      <p className="text-xs text-muted-foreground mb-4">@{user.userName}</p>

      {/* Score */}
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium mb-0.5">
          Score
        </p>
        <p className={cn("text-2xl font-black tabular-nums", config.scoreLabel)}>
          {user.score.toLocaleString()}
        </p>
      </div>

      {/* Rank badge */}
      <div className="absolute top-3 right-3">
        <span className="text-xs font-bold text-muted-foreground/60">
          #{position}
        </span>
      </div>
    </div>
  );
}

/* ─── Table row for ranked user ───────────────────────────────────── */
function RankRow({
  user,
  isCurrentUser,
}: {
  user: LeaderboardUser;
  isCurrentUser: boolean;
}) {
  const initials = getInitials(user.firstName, user.lastName);
  const avatarGradient = getAvatarColor(user.userName);
  const displayName = `${user.firstName} ${user.lastName}`;

  return (
    <tr
      className={cn(
        "border-b border-border/30 transition-colors duration-150",
        isCurrentUser
          ? "bg-blue-500/10 hover:bg-blue-500/15"
          : "hover:bg-muted/30",
      )}
    >
      {/* User */}
      <td className="py-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white bg-linear-to-br shrink-0 shadow-md",
              avatarGradient,
            )}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <p
              className={cn(
                "text-sm font-semibold truncate",
                isCurrentUser ? "text-blue-400" : "text-foreground",
              )}
            >
              {displayName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              @{user.userName}
            </p>
          </div>
        </div>
      </td>

      {/* Institution */}
      <td className="py-4 px-4 hidden md:table-cell">
        <span className="text-sm text-muted-foreground truncate block max-w-[200px]">
          {user.institution || "—"}
        </span>
      </td>

      {/* Rank */}
      <td className="py-4 px-4 text-center">
        {user.rank <= 3 ? (
          <div className="flex justify-center">
            <RankMedal rank={user.rank} />
          </div>
        ) : (
          <span className="text-sm font-bold text-muted-foreground">
            #{user.rank.toLocaleString()}
          </span>
        )}
      </td>

      {/* Score */}
      <td className="py-4 px-4 sm:px-6 text-right">
        <span
          className={cn(
            "text-sm font-bold tabular-nums",
            user.rank === 1
              ? "text-amber-400"
              : user.rank === 2
                ? "text-slate-300"
                : user.rank === 3
                  ? "text-orange-400"
                  : "text-foreground",
          )}
        >
          {user.score.toLocaleString()}
        </span>
      </td>
    </tr>
  );
}

/* ─── Main Page ───────────────────────────────────────────────────── */
export default function LeaderboardPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useLeaderboard(page, 20);
  const { user } = useAuthUser();

  const entries: LeaderboardUser[] = data?.data?.entries ?? [];
  const currentUser: LeaderboardUser | null = data?.data?.currentUser ?? null;
  const pagination = data?.data?.pagination ?? {
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  };

  // Extract top 3 from first page
  const topThree = page === 1 ? entries.slice(0, 3) : [];
  const tableEntries = page === 1 ? entries : entries;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background mt-18">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <Skeleton className="h-10 w-64 mb-8" />
          <div className="flex justify-center gap-6 mb-12">
            <Skeleton className="h-[230px] w-[220px] rounded-2xl" />
            <Skeleton className="h-[260px] w-[260px] rounded-2xl" />
            <Skeleton className="h-[230px] w-[220px] rounded-2xl" />
          </div>
          <Skeleton className="h-8 w-48 mb-4" />
          {[1, 2, 3, 4, 5].map((i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg mb-2" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground mt-18">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
        {/* ── Back + Title ──────────────────────────────────────────── */}
        <div className="mb-8">
          <Link
            href="/problems"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Problems
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Leaderboard
              </h1>
              <p className="text-sm text-muted-foreground">
                See how you rank against other coders
              </p>
            </div>
          </div>
        </div>

        {/* ── Stats strip ───────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
          <div className="rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-400 shrink-0" />
            <div>
              <p className="text-lg font-bold">
                {pagination.total.toLocaleString()}
              </p>
              <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                Total Users
              </p>
            </div>
          </div>
          {currentUser && (
            <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 shrink-0" />
              <div>
                <p className="text-lg font-bold text-blue-400">
                  #{currentUser.rank.toLocaleString()}
                </p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                  Your Rank
                </p>
              </div>
            </div>
          )}
          {currentUser && (
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
              <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-lg font-bold text-amber-400">
                  {currentUser.score.toLocaleString()}
                </p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-wider">
                  Your Score
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── Podium (top 3) - only on page 1 ───────────────────────── */}
        {page === 1 && topThree.length >= 3 && (
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row items-end justify-center gap-4 sm:gap-6">
              {/* #2 — Silver */}
              {topThree[1] && (
                <PodiumCard user={topThree[1]} position={2} />
              )}
              {/* #1 — Gold */}
              {topThree[0] && (
                <PodiumCard user={topThree[0]} position={1} />
              )}
              {/* #3 — Bronze */}
              {topThree[2] && (
                <PodiumCard user={topThree[2]} position={3} />
              )}
            </div>
          </div>
        )}

        {/* ── Rankings Table ─────────────────────────────────────────── */}
        <div className="rounded-2xl border border-border/40 bg-card/50 backdrop-blur-xl shadow-xl overflow-hidden">
          {/* Table header section */}
          <div className="px-6 py-5 border-b border-border/30">
            <h2 className="text-lg font-bold">
              Global Ranking{" "}
              <span className="text-sm font-medium text-muted-foreground">
                (Cumulative)
              </span>
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Ranks coders based on their CodeArena Score — a balanced measure
              of problems solved and development activity.
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40 bg-muted/20">
                  <th className="text-left text-[11px] font-bold uppercase tracking-widest text-muted-foreground py-3 px-4 sm:px-6">
                    User Name
                  </th>
                  <th className="text-left text-[11px] font-bold uppercase tracking-widest text-muted-foreground py-3 px-4 hidden md:table-cell">
                    Institution
                  </th>
                  <th className="text-center text-[11px] font-bold uppercase tracking-widest text-muted-foreground py-3 px-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      Rank
                    </span>
                  </th>
                  <th className="text-right text-[11px] font-bold uppercase tracking-widest text-muted-foreground py-3 px-4 sm:px-6">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableEntries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-16 text-muted-foreground"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <Trophy className="w-10 h-10 text-muted-foreground/30" />
                        <p className="text-sm font-medium">No rankings yet</p>
                        <p className="text-xs">
                          Start solving problems to appear on the leaderboard!
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  tableEntries.map((entry) => (
                    <RankRow
                      key={entry.userId}
                      user={entry}
                      isCurrentUser={
                        !!user &&
                        currentUser?.userId === entry.userId
                      }
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-border/30 bg-muted/5">
              <p className="text-xs text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {(page - 1) * 20 + 1}–
                  {Math.min(page * 20, pagination.total)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {pagination.total.toLocaleString()}
                </span>{" "}
                users
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex h-8 items-center rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                  Previous
                </button>

                {Array.from(
                  { length: Math.min(pagination.totalPages, 5) },
                  (_, i) => {
                    let pageNum: number;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium transition-colors cursor-pointer",
                          page === pageNum
                            ? "bg-blue-600 text-white shadow-sm"
                            : "border border-border bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                      >
                        {pageNum}
                      </button>
                    );
                  },
                )}

                <button
                  onClick={() =>
                    setPage((p) => Math.min(pagination.totalPages, p + 1))
                  }
                  disabled={page === pagination.totalPages}
                  className="flex h-8 items-center rounded-md border border-border bg-background px-3 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}