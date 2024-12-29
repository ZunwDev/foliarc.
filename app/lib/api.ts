import axios, { AxiosError, AxiosResponse } from "axios";

export const API_URL = "http://localhost:3000/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
}

// Interface to represent an error response with an "error" field
interface ErrorResponse {
  error: string;
}

// Type guard to check if a value is an ErrorResponse
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isErrorResponse(data: any): data is ErrorResponse {
  return data && typeof data === "object" && "error" in data;
}

export async function handleRequest<T>(request: Promise<AxiosResponse<T>>, timeoutMs: number = 5000): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await request;
    clearTimeout(timeoutId);
    return response.data;
  } catch (error: unknown) {
    clearTimeout(timeoutId);

    if (isAxiosError<T>(error)) {
      if (error.response?.data) {
        const errorData = error.response.data;

        if (isErrorResponse(errorData)) {
          throw new Error(errorData.error);
        }
      }

      throw new Error(error.message);
    }

    if (error instanceof Error) {
      console.error("Unknown error:", error); // Log the unknown error
      throw error;
    }

    throw new Error("An unknown error occurred");
  }
}
