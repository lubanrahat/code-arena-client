"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { getCookie } from "@/lib/cookieUtils";

export const getAiDiscussion = async (problemId: string) => {
  const token = await getCookie("token");
  const headers: Record<string, string> = {};
  if (token) {
    headers["cookie"] = `token=${token}`;
    headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await httpClient.get(`/ai-discussion/${problemId}`, { headers });
  // httpClient already unwraps response.data from axios, so response is the data payload!
  // Wait, if httpClient.get returns `response.data`, then `response?.data` here would be reading `.data` from the API's payload itself. Let's preserve original behaviour.
  return response?.data || response;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const syncAiDiscussion = async (problemId: string, messages: any[]) => {
    const token = await getCookie("token");
    const headers: Record<string, string> = {};
    if (token) {
      headers["cookie"] = `token=${token}`;
      headers["Authorization"] = `Bearer ${token}`;
    }
  const response = await httpClient.post("/ai-discussion/sync", {
    problemId,
    messages,
  }, { headers });
  return response?.data || response;
};
