import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080/api/v1";

if (!API_BASE_URL) {
  throw new Error("API_BASE_URL is not defined");
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const isCanceledError = (error: unknown) => {
  if (axios.isCancel(error)) return true;
  if (typeof error === "object" && error !== null) {
    const maybe = error as { code?: string; name?: string; message?: string };
    if (maybe.code === "ERR_CANCELED") return true;
    if (maybe.name === "CanceledError" || maybe.name === "AbortError") return true;
    if (typeof maybe.message === "string" && maybe.message.toLowerCase().includes("canceled")) {
      return true;
    }
  }
  return false;
};

export interface ApiResponseOptions {
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
}

const httpGet = async (endpoint: string, options?: ApiResponseOptions) => {
  try {
    const response = await axiosInstance.get(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    if (isCanceledError(error)) return null;
    if (!isCanceledError(error)) {
      console.error(`GET ${endpoint} failed:`, error);
    }
    throw error;
  }
};

const httpPost = async (
  endpoint: string,
  data: unknown,
  options?: ApiResponseOptions,
) => {
  try {
    const response = await axiosInstance.post(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    if (isCanceledError(error)) return null;
    if (!isCanceledError(error)) {
      console.error(`POST ${endpoint} failed:`, error);
    }
    throw error;
  }
};

const httpPut = async (
  endpoint: string,
  data: unknown,
  options?: ApiResponseOptions,
) => {
  try {
    const response = await axiosInstance.put(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    if (isCanceledError(error)) return null;
    if (!isCanceledError(error)) {
      console.error(`PUT ${endpoint} failed:`, error);
    }
    throw error;
  }
};

const httpPatch = async (
  endpoint: string,
  data: unknown,
  options?: ApiResponseOptions,
) => {
  try {
    const response = await axiosInstance.patch(endpoint, data, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    if (isCanceledError(error)) return null;
    if (!isCanceledError(error)) {
      console.error(`PATCH ${endpoint} failed:`, error);
    }
    throw error;
  }
};

const httpDelete = async (endpoint: string, options?: ApiResponseOptions) => {
  try {
    const response = await axiosInstance.delete(endpoint, {
      params: options?.params,
      headers: options?.headers,
    });
    return response.data;
  } catch (error) {
    if (isCanceledError(error)) return null;
    if (!isCanceledError(error)) {
      console.error(`DELETE ${endpoint} failed:`, error);
    }
    throw error;
  }
};

export const httpClient = {
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
};
