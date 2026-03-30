"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { getCookie } from "@/lib/cookieUtils";

const getAuthHeaders = async () => {
  const token = await getCookie("token");
  const headers: Record<string, string> = {};
  if (token) {
    headers["cookie"] = `token=${token}`;
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

export const getLeaderboard = async (page: number = 1, limit: number = 20) => {
  try {
    const headers = await getAuthHeaders();
    const response = await httpClient.get("/leaderboard", {
      params: { page, limit },
      headers,
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
    return {
      data: {
        entries: [],
        currentUser: null,
        pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
      },
    };
  }
};

export const getLeaderboardTop = async () => {
  try {
    const headers = await getAuthHeaders();
    const response = await httpClient.get("/leaderboard/top", { headers });
    return response;
  } catch (error) {
    console.error("Failed to fetch top leaderboard:", error);
    return {
      data: {
        topThree: [],
        currentUser: null,
        totalUsers: 0,
      },
    };
  }
};
