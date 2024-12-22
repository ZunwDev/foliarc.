import axios, { AxiosError, AxiosResponse } from "axios";
export const API_URL = "http://localhost:3000/api";

export function newAbortSignal() {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), 5000);
  return abortController.signal;
}

const createAxiosInstance = () => {
  return axios.create({
    baseURL: API_URL,
    signal: newAbortSignal(),
  });
};

function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return typeof error === "object" && error !== null && "isAxiosError" in error && (error as AxiosError).isAxiosError === true;
}

async function handleRequest<T extends { message?: string }>(request: Promise<AxiosResponse<T>>): Promise<T> {
  try {
    const response = await request;
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError<T>(error)) {
      console.error("Error:", error.response?.data?.message || error.message);
    } else if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("An unknown error occurred.");
    }
    throw error;
  }
}

//Example
/*
export async function fetchProductDataById(id) {
  const axiosInstance = createAxiosInstance();
  return handleRequest(axiosInstance.get(`/products/${id}`));
}
 */
