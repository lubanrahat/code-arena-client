"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { getCookie } from "@/lib/cookieUtils";

export const getProfileInfo = async () => {
  const token = await getCookie("token");
  const headers: Record<string, string> = {};
  if (token) {
    headers["cookie"] = `token=${token}`;
    headers["Authorization"] = `Bearer ${token}`;
  }
  const { data } = await httpClient.get("/user/profile", { headers });
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProfileInfo = async (payload: any) => {
  const token = await getCookie("token");
  const headers: Record<string, string> = {};
  if (token) {
    headers["cookie"] = `token=${token}`;
    headers["Authorization"] = `Bearer ${token}`;
  }
  const { data } = await httpClient.put("/user/profile", payload, { headers });
  return data;
};