import { httpClient } from "@/lib/axios/httpClient";
import { deleteCookie } from "@/lib/cookieUtils";

const allProblems = async () => {
  try {
    const problem = (await httpClient.get("/problems")) as string;
    return problem;
  } catch (error) {
    console.error("Failed to fetch problem:", error);
    throw error;
  }
};
