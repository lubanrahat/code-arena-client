"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { getCookie } from "@/lib/cookieUtils";

export const getAdminStatsAction = async () => {
  const token = await getCookie("token");
  const headers = token ? { Cookie: `token=${token}` } : undefined;

  return httpClient.get("/admin/stats", { headers });
};

export const getAdminUsersAction = async () => {
  const token = await getCookie("token");
  const headers = token ? { Cookie: `token=${token}` } : undefined;

  return httpClient.get("/admin/users", { headers });
};

