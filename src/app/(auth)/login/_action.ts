"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { deleteCookie, setCookie } from "@/lib/cookieUtils";
import { LoginInput, loginSchema } from "@/validation/auth.validation";

import { isAxiosError } from "axios";

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

    return { success: true, user: response.data.user, token };
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (isAxiosError(error)) {
      errorMessage = error.response?.data?.error?.message || error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
      
    return {
      success: false,
      message: errorMessage,
    };
  }
};


export const logoutUser = async () => {
  try {
    await httpClient.post("/auth/logout", {});
  } catch (error) {
    console.error("Backend logout failed:", error);
  } finally {
    await deleteCookie("token");
    await deleteCookie("role");
  }
};
