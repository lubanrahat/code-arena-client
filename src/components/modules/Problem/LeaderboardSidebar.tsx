"use client";

import React from "react";
import Link from "next/link";
import { useLeaderboardTop } from "@/hooks/useLeaderboard";
import { useAuthUser } from "@/hooks/useAuth";
import { Info, Trophy, Crown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface LeaderboardUser {
  rank: number;
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  imageUrl: string | null;
  score: number;
  problemsSolvedCount: number;
}

const RANK_COLORS: Record<number, { bg: string; border: string; text: string }> = {
  1: {
    bg: "bg-gradient-to-br from-amber-400 to-yellow-600",
    border: "ring-amber-400/50",
    text: "text-amber-400",
  },
  2: {
    bg: "bg-gradient-to-br from-slate-300 to-slate-500",
    border: "ring-slate-400/50",
    text: "text-slate-300",
  },
  3: {
    bg: "bg-gradient-to-br from-orange-400 to-orange-700",
    border: "ring-orange-400/50",
    text: "text-orange-400",
  },
};

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
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function LeaderboardRow({
  user,
  isCurrentUser = false,
}: {
  user: LeaderboardUser;
  isCurrentUser?: boolean;
}) {
  const initials = getInitials(user.firstName, user.lastName);
  const avatarGradient = getAvatarColor(user.userName);
  const rankStyle = RANK_COLORS[user.rank];
  const displayName = `${user.firstName} ${user.lastName}`;
  const truncatedName =
    displayName.length > 12 ? displayName.slice(0, 12) + "..." : displayName;

  return (
    <div
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
        isCurrentUser
          ? "bg-blue-500/10 border border-blue-500/20"
          : "hover:bg-white/5",
      )}
    >
      {/* Rank */}
      <span
        className={cn(
          "w-8 text-center text-xs font-bold shrink-0",
          rankStyle ? rankStyle.text : "text-muted-foreground",
        )}
      >
        #{user.rank.toLocaleString()}
      </span>

      {/* Avatar */}
      <div
        className={cn(
          "relative w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0 bg-linear-to-br shadow-md",
          avatarGradient,
          rankStyle && "ring-2 " + rankStyle.border,
        )}
      >
        {initials}
        {user.rank === 1 && (
          <Crown className="absolute -top-2 -right-1 w-3.5 h-3.5 text-amber-400 drop-shadow-sm" />
        )}
      </div>

      {/* Name */}
      <span
        className={cn(
          "flex-1 text-sm font-medium truncate",
          isCurrentUser
            ? "text-blue-400"
            : "text-foreground/90",
        )}
        title={displayName}
      >
        {truncatedName}
      </span>

      {/* Score */}
      <span
        className={cn(
          "text-xs font-bold tabular-nums shrink-0",
          rankStyle ? rankStyle.text : "text-muted-foreground",
        )}
      >
        {user.score.toLocaleString()}
      </span>
    </div>
  );
}

export default function LeaderboardSidebar() {
  const { data, isLoading } = useLeaderboardTop();
  const { user } = useAuthUser();

  const topThree: LeaderboardUser[] = data?.data?.topThree ?? [];
  const currentUser: LeaderboardUser | null = data?.data?.currentUser ?? null;

  // Don't show current user in the separate section if they're already in top 3
  const isCurrentUserInTop3 = currentUser
    ? topThree.some((u) => u.userId === currentUser.userId)
    : false;

  if (isLoading) {
    return (
      <div className="w-full rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-4 space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    );
  }

  if (topThree.length === 0) {
    return null;
  }

  return (
    <div
      id="leaderboard-sidebar"
      className="w-full rounded-2xl border border-border/40 bg-linear-to-b from-card/80 to-card/50 backdrop-blur-xl shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          <h3 className="text-sm font-bold tracking-wide uppercase text-foreground/80">
            Leaderboard
          </h3>
        </div>
        <Info className="w-3.5 h-3.5 text-muted-foreground/60" />
      </div>

      {/* Divider */}
      <div className="mx-4 mb-1 border-b border-border/30" />

      {/* Top 3 */}
      <div className="px-1.5 py-1.5 space-y-0.5">
        {topThree.map((entry) => (
          <LeaderboardRow
            key={entry.userId}
            user={entry}
            isCurrentUser={
              !!user && currentUser?.userId === entry.userId
            }
          />
        ))}
      </div>

      {/* Current user (if not in top 3) */}
      {currentUser && !isCurrentUserInTop3 && (
        <>
          <div className="mx-4 border-b border-dashed border-border/30" />
          <div className="px-1.5 py-1.5">
            <LeaderboardRow user={currentUser} isCurrentUser />
          </div>
        </>
      )}

      {/* View Leaderboard link */}
      <div className="px-4 pb-4 pt-1">
        <Link
          href="/leaderboard"
          className="group flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-sm font-semibold text-blue-400 hover:text-blue-300 transition-all duration-200 hover:bg-blue-500/10"
        >
          View Leaderboard
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
