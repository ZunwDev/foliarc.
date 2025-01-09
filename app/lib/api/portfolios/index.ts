import { axiosInstance, handleRequest } from "@/lib/api";
import { Portfolio } from "./types";
import { UUID } from "crypto";

/**
  /users?search=keyword&field=column-in-table,
  Omit = not required fields 
*/
export async function searchPortfolios(search: string, field: keyof Portfolio = "pid"): Promise<Portfolio[]> {
  const query = new URLSearchParams({ search, field }).toString();
  return handleRequest<Portfolio[]>(axiosInstance.get(`/portfolio?${query}`));
}

export async function createPortfolio(data: Omit<Portfolio, "created_at" | "likeCount" | "tags" | "replies">): Promise<Portfolio> {
  return handleRequest<Portfolio>(axiosInstance.post("/portfolio", data));
}

export async function updatePortfolio(pid: UUID, data: Partial<Portfolio>): Promise<Portfolio> {
  return handleRequest<Portfolio>(axiosInstance.put(`/portfolios/${pid}`, data));
}

export async function deletePortfolio(pid: UUID): Promise<Portfolio> {
  return handleRequest<Portfolio>(axiosInstance.put(`/portfolios/${pid}`));
}
