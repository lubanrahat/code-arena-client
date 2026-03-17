"use server";
import { httpClient } from "@/lib/axios/httpClient";
import { getCookie } from "@/lib/cookieUtils";
import {
  ProblemCreateInput,
  problemCreateSchema,
} from "@/validation/problem.validation";

export const createProblemAction = async (problem: ProblemCreateInput) => {
  try {
    const parsedPayload = problemCreateSchema.safeParse(problem);
    console.log(parsedPayload.data);
    if (!parsedPayload.success) {
      const firstError =
        parsedPayload.error.issues[0].message || "Invalid payload";
      return { success: false, message: firstError };
    }
    try {
      const token = await getCookie("token");
      const headers = token ? { Cookie: `token=${token}` } : undefined;

      const response = await httpClient.post("/problems", parsedPayload.data, {
        headers,
      });
      console.log(response.data);
      return { success: true, message: "Problem created successfully" };
    } catch (error) {
      console.error("Failed to create problem:", error);
      return { success: false, message: "Failed to create problem" };
    }
  } catch (error) {
    console.error("Failed to create problem:", error);
    throw error;
  }
};
