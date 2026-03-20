import { httpClient } from "@/lib/axios/httpClient";

export const getAiDiscussion = async (problemId: string) => {
  const response = await httpClient.get(`/ai-discussion/${problemId}`);
  return response?.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const syncAiDiscussion = async (problemId: string, messages: any[]) => {
  const response = await httpClient.post("/ai-discussion/sync", {
    problemId,
    messages,
  });
  return response?.data;
};
