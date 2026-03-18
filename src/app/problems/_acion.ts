import { httpClient } from "@/lib/axios/httpClient";

export const allProblems = async (params = {}) => {
  try {
    const response = await httpClient.get("/problems", { params });
    return response;
  } catch (error) {
    console.error("Failed to fetch problems:", error);
    throw error;
  }
};

export const getProblemById = async (id: string) => {
  try {
    const response = await httpClient.get(`/problems/${id}`);
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
}) => {
  try {
    const response = await httpClient.post("/execute-code/run", payload);
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
    const response = await httpClient.post("/execute-code", payload);
    return response;
  } catch (error) {
    console.error("Failed to submit code:", error);
    throw error;
  }
};
