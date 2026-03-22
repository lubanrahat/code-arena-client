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
    } catch (error: unknown) {
      console.error("Failed to create problem:", error);
      
      let errorMessage = "Failed to create problem";
      let details: string | undefined;

      interface AxiosLike {
        response?: { data?: { message?: string; details?: unknown } };
        message?: string;
      }

      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as AxiosLike;
        errorMessage = axiosError.response?.data?.message || axiosError.message || errorMessage;
        const rawDetails = axiosError.response?.data?.details;
        if (rawDetails !== undefined) {
          details = JSON.stringify(rawDetails);
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      return { 
        success: false, 
        message: details ? `${errorMessage}: ${details}` : errorMessage 
      };
    }
  } catch (error) {
    console.error("Failed to create problem:", error);
    throw error;
  }
};
