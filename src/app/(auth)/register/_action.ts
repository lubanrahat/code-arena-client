"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { RegisterInput, registerSchema } from "@/validation/auth.validation";
import { redirect } from "next/navigation";

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
    return {
      success: false,
      message: `Register failed. ${error instanceof Error ? error.message : "Something went wrong"}`,
    };
  }

  redirect("/login");
};
