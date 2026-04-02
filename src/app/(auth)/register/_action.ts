"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { RegisterInput, registerSchema } from "@/validation/auth.validation";
import { redirect } from "next/navigation";

import { isAxiosError } from "axios";

export const registerAction = async (payload: RegisterInput) => {
  const parsedPayload = registerSchema.safeParse(payload);
  if (!parsedPayload.success) {
    const firstError =
      parsedPayload.error.issues[0].message || "Invalid payload";
    return { success: false, message: firstError };
  }
  try {
    await httpClient.post("/auth/register", parsedPayload.data);
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

  redirect("/login");
};
