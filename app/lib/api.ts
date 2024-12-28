import axios, { AxiosError, AxiosResponse } from "axios";

export const API_URL = "http://localhost:3000/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return typeof error === "object" && error !== null && "isAxiosError" in error;
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
      if (error.response?.data && typeof error.response.data === "object") {
        const message = (error.response.data as { message?: string }).message || error.message;
        throw new Error(message);
      }
      throw new Error(error.message);
    }
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred");
  }
}
