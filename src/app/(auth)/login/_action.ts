"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { setCookie } from "@/lib/cookieUtils";
import { LoginInput, loginSchema } from "@/validation/auth.validation";

export const loginAction = async (payload: LoginInput) => {
  const parsedPayload = loginSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError =
      parsedPayload.error.issues[0].message || "Invalid payload";
    return { success: false, message: firstError };
  }
  try {
    const response = await httpClient.post("/auth/login", parsedPayload.data);

    // Safer token retrieval: handle common API response structures
    const token = response?.data?.token || response?.token || response?.data;

    if (!token || typeof token !== "string") {
      return {
        success: false,
        message: "Login failed. Auth token not found in response.",
      };
    }

    await setCookie("token", token, 60 * 60 * 24 * 7);

    await setCookie("role", response.data.user.role, 60 * 60 * 24 * 7);


    return { success: true, user: response.data.user };
  } catch (error: unknown) {
    return {
      success: false,
      message: `Login failed. ${error instanceof Error ? error.message : "Something went wrong"}`,
    };
  }
};
