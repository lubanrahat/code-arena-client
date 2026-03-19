"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { getCookie } from "@/lib/cookieUtils";

export const allProblems = async (params = {}) => {
  try {
    const token = await getCookie("token");
    const headers = token ? { Cookie: `token=${token}` } : undefined;
    const response = await httpClient.get("/problems", { params, headers });
    return response;
  } catch (error) {
    console.error("Failed to fetch problems:", error);
    throw error;
  }
};

export const getProblemById = async (id: string) => {
  try {
    const token = await getCookie("token");
    const headers = token ? { Cookie: `token=${token}` } : undefined;
    const response = await httpClient.get(`/problems/${id}`, { headers });
    return response;
  } catch (error) {
    console.error(`Failed to fetch problem ${id}:`, error);
    throw error;
  }
};

export const runCode = async (payload: {
  sourceCode: string;
  language: string;
  stdin: string;
  expectedOutput?: string;
}) => {
  try {
    const token = await getCookie("token");
    const headers = token ? { Cookie: `token=${token}` } : undefined;
    const response = await httpClient.post("/execute-code/run", payload, {
      headers,
    });
    return response;
  } catch (error) {
    console.error("Failed to run code:", error);
    throw error;
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
    const headers = token ? { Cookie: `token=${token}` } : undefined;
    const response = await httpClient.post("/execute-code", payload, {
      headers,
    });
    return response;
  } catch (error) {
    console.error("Failed to submit code:", error);
    throw error;
  }
};

export const getSubmissionsForProblem = async (problemId: string) => {
  try {
    const token = await getCookie("token");
    const headers = token ? { Cookie: `token=${token}` } : undefined;
    const response = await httpClient.get(`/submission/get-submissions/${problemId}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch submissions for problem ${problemId}:`, error);
    throw error;
  }
};
