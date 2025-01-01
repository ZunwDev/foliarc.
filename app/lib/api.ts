import axios, { AxiosError, AxiosResponse } from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
const DEFAULT_TIMEOUT = 5000;

export interface ApiErrorResponse {
  error: {
    details: string;
    hint?: string;
    message: string;
    type: string;
  };
}

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isApiErrorResponse(data: any): data is ApiErrorResponse {
  return data && typeof data === "object" && "error" in data && typeof data.error === "object" && "details" in data.error;
}

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function handleRequest<T>(request: Promise<AxiosResponse<T>>, timeoutMs: number = DEFAULT_TIMEOUT): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await request;
    clearTimeout(timeoutId);
    return response.data;
  } catch (error) {
    clearTimeout(timeoutId);

    if (isAxiosError<ApiErrorResponse>(error)) {
      if (isApiErrorResponse(error.response?.data)) {
        throw new Error(error.response.data.error.details);
      }
      throw new Error(error.message);
    }

    if (error instanceof Error) {
      throw error;
    }

    throw new Error("An unknown error occurred");
  }
}
