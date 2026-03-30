"use server";

import axios from "axios";
import { httpClient } from "@/lib/axios/httpClient";
import { getCookie } from "@/lib/cookieUtils";

const isCanceledError = (error: unknown) => {
  if (axios.isCancel(error)) return true;
  if (typeof error === "object" && error !== null) {
    const maybe = error as { code?: string; name?: string; message?: string };
    if (maybe.code === "ERR_CANCELED") return true;
    if (maybe.name === "CanceledError" || maybe.name === "AbortError") return true;
    if (typeof maybe.message === "string" && maybe.message.toLowerCase().includes("canceled")) {
      return true;
    }
  }
  return false;
};

export const allProblems = async (params = {}) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.get("/problems", { params, headers });
    return response;
  } catch (error) {
    if (isCanceledError(error)) {
      return { data: [], meta: { pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } } };
    }
    console.error("Failed to fetch problems:", error);
    return { data: [], meta: { pagination: { page: 1, limit: 10, total: 0, totalPages: 0 } } };
  }
};

export const getProblemById = async (id: string) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.get(`/problems/${id}`, { headers });
    return response;
  } catch (error: unknown) {
    if (isCanceledError(error)) {
      return null;
    }
    // Extract status code before it gets lost during server-action serialization
    let status = 500;
    let message = "Failed to load problem";
    if (axios.isAxiosError(error)) {
      status = error.response?.status || 500;
      message = error.response?.data?.error?.message || error.message || message;
    }
    console.error(`Failed to fetch problem ${id}:`, { status, message });
    // Return a structured error object instead of throwing,
    // because thrown errors lose their type info when crossing the server-action boundary
    return { error: true, status, message };
  }
};

export const runCode = async (payload: {
  sourceCode: string;
  language: string;
  stdin: string;
  expectedOutput?: string;
  problemId?: string;
}) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.post("/execute-code/run", payload, {
      headers,
    });
    return response;
  } catch (error) {
    if (isCanceledError(error)) {
      return null;
    }
    console.error("Failed to run code:", error);
    return null;
  }
};

export const submitCode = async (payload: {
  problemId: string;
  sourceCode: string;
  language: string;
  stdin: string[];
  expected_outputs: string[];
}) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.post("/execute-code", payload, {
      headers,
    });
    return response;
  } catch (error) {
    if (isCanceledError(error)) {
      return null;
    }
    console.error("Failed to submit code:", error);
    return null;
  }
};

export const getSubmissionsForProblem = async (problemId: string) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.get(`/submission/get-submissions/${problemId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    if (isCanceledError(error)) {
      return [];
    }
    console.error(`Failed to fetch submissions for problem ${problemId}:`, error);
    return [];
  }
};
export const getAllSubmissions = async (username?: string) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.get("/submission/get-all-submissions", {
      params: username ? { username } : {},
      headers,
    });
    return response.data;
  } catch (error) {
    if (isCanceledError(error)) {
      return [];
    }
    console.error("Failed to fetch all submissions:", error);
    return [];
  }
};

export const toggleBookmark = async (problemId: string) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["Cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.post(`/problems/${problemId}/bookmark`, {}, { headers });
    return response.data;
  } catch (error) {
    if (isCanceledError(error)) {
      return null;
    }
    console.error("Failed to toggle bookmark:", error);
    return null;
  }
};

export const getUserProblemStatus = async () => {
  try {
    const token = await getCookie("token");
    if (!token) {
      // No token available — user is not logged in, skip the request entirely
      return { data: { solvedProblemIds: [], attemptedProblemIds: [], bookmarkedProblemIds: [] } };
    }
    const headers: Record<string, string> = {
      cookie: `token=${token}`,
      Authorization: `Bearer ${token}`,
    };
    const response = await httpClient.get("/problems/user/status", { headers });
    return response;
  } catch (error) {
    if (isCanceledError(error)) {
      return { data: { solvedProblemIds: [], attemptedProblemIds: [], bookmarkedProblemIds: [] } };
    }
    console.error("Failed to fetch user problem status:", error);
    return { data: { solvedProblemIds: [], attemptedProblemIds: [], bookmarkedProblemIds: [] } };
  }
};

// ─── Solution Actions ────────────────────────────────────────────────

export const createSolution = async (payload: {
  problemId: string;
  title: string;
  description?: string;
  sourceCode: string;
  language: string;
}) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.post("/solution", payload, { headers });
    return response;
  } catch (error) {
    if (isCanceledError(error)) return null;
    console.error("Failed to create solution:", error);
    throw error;
  }
};

export const getSolutionsForProblem = async (
  problemId: string,
  page: number = 1,
  sortBy: string = "recent",
) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.get(`/solution/problem/${problemId}`, {
      params: { page, limit: 10, sortBy },
      headers,
    });
    return response;
  } catch (error) {
    if (isCanceledError(error)) return { data: [], meta: {} };
    console.error("Failed to fetch solutions:", error);
    return { data: [], meta: {} };
  }
};

export const getSolutionById = async (id: string) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.get(`/solution/${id}`, { headers });
    return response;
  } catch (error) {
    if (isCanceledError(error)) return null;
    console.error("Failed to fetch solution:", error);
    return null;
  }
};

export const voteSolution = async (solutionId: string, type: "LIKE" | "DISLIKE") => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.post(`/solution/${solutionId}/vote`, { type }, { headers });
    return response;
  } catch (error) {
    if (isCanceledError(error)) return null;
    console.error("Failed to vote solution:", error);
    return null;
  }
};

export const addSolutionComment = async (solutionId: string, content: string) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.post(
      `/solution/${solutionId}/comments`,
      { content },
      { headers },
    );
    return response;
  } catch (error) {
    if (isCanceledError(error)) return null;
    console.error("Failed to add comment:", error);
    throw error;
  }
};

export const getSolutionComments = async (solutionId: string, page: number = 1) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.get(`/solution/${solutionId}/comments`, {
      params: { page, limit: 20 },
      headers,
    });
    return response;
  } catch (error) {
    if (isCanceledError(error)) return { data: [], meta: {} };
    console.error("Failed to fetch comments:", error);
    return { data: [], meta: {} };
  }
};

export const deleteSolution = async (id: string) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.delete(`/solution/${id}`, { headers });
    return response;
  } catch (error) {
    if (isCanceledError(error)) return null;
    console.error("Failed to delete solution:", error);
    throw error;
  }
};

export const deleteSolutionComment = async (commentId: string) => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.delete(`/solution/comments/${commentId}`, { headers });
    return response;
  } catch (error) {
    if (isCanceledError(error)) return null;
    console.error("Failed to delete comment:", error);
    throw error;
  }
};

