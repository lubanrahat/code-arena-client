"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { getCookie } from "@/lib/cookieUtils";

export const updateProblemAction = async (
  id: string,
  payload: Record<string, unknown>,
) => {
  const token = await getCookie("token");
  const headers = token ? { Cookie: `token=${token}` } : undefined;

  return httpClient.patch(`/problems/${id}`, payload, { headers });
};

export const deleteProblemAction = async (id: string) => {
  const token = await getCookie("token");
  const headers = token ? { Cookie: `token=${token}` } : undefined;

  return httpClient.delete(`/problems/${id}`, { headers });
};

