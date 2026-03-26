"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { getCookie } from "@/lib/cookieUtils";

export const subscribeToPlan = async (plan: "monthly" | "yearly") => {
  try {
    const token = await getCookie("token");
    const headers = token ? { Cookie: `token=${token}` } : undefined;
    const response = await httpClient.post("/payment/subscribe", { plan }, { headers });
    return response.data;
  } catch (error) {
    console.error("Failed to subscribe:");
    if (error && typeof error === "object" && "response" in error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.error((error as any).response?.data);
    } else {
      console.error(error);
    }
    throw error;
  }
};
