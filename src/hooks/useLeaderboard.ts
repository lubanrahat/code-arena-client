import { useQuery } from "@tanstack/react-query";
import { getLeaderboard, getLeaderboardTop } from "@/app/leaderboard/_action";

export const useLeaderboardTop = () => {
  return useQuery({
    queryKey: ["leaderboard-top"],
    queryFn: getLeaderboardTop,
    staleTime: 60_000, // 1-minute cache
  });
};

export const useLeaderboard = (page: number = 1, limit: number = 20) => {
  return useQuery({
    queryKey: ["leaderboard", { page, limit }],
    queryFn: () => getLeaderboard(page, limit),
    staleTime: 30_000,
  });
};
