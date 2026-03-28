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
      return { data: [], meta: { page: 1, limit: 10, total: 0 } };
    }
    console.error("Failed to fetch problems:", error);
    return { data: [], meta: { page: 1, limit: 10, total: 0 } };
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
  } catch (error) {
    if (isCanceledError(error)) {
      return null;
    }
    console.error(`Failed to fetch problem ${id}:`, error);
    throw error;
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
export const getAllSubmissions = async () => {
  try {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
    const response = await httpClient.get("/submission/get-all-submissions", {
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
    const headers: Record<string, string> = {};
    if (token) {
      headers["Cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
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
