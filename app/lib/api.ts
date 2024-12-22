import axios, { AxiosError, AxiosResponse } from "axios";

export const API_URL = "http://localhost:3000/api";

function newAbortSignal() {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), 5000);
  return abortController.signal;
}

const axiosInstance = axios.create({
  baseURL: API_URL,
  signal: newAbortSignal(),
});

function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return typeof error === "object" && error !== null && "isAxiosError" in error && (error as AxiosError).isAxiosError === true;
}

async function handleRequest<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const response = await request;
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError<T>(error)) {
      if (error.response?.data && typeof error.response?.data === "object") {
        const message = (error.response.data as { message?: string }).message || error.message;
        console.error("Axios Error:", message);
      } else {
        console.error("Axios Error without message:", error.message);
      }
    } else if (error instanceof Error) {
      console.error("General Error:", error.message);
    } else {
      console.error("An unknown error occurred.");
    }
    throw error;
  }
}

export { axiosInstance, handleRequest, isAxiosError, newAbortSignal };
