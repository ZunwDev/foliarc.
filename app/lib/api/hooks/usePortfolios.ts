import { createPortfolio, deletePortfolio, searchPortfolios, updatePortfolio } from "@/lib/api/portfolios";
import { Portfolio } from "@/lib/api/portfolios/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UUID } from "crypto";

type NonNullPortfolio = Exclude<Portfolio, null>;

type ApiError = {
  code: string;
  details: string | null;
  hint: string | null;
  message: string;
};

export function useFetchPortfolios(search: string, field: keyof NonNullPortfolio = "pid") {
  return useQuery<NonNullPortfolio[], ApiError>({
    queryKey: ["portfolios", { search, field }],
    queryFn: async () => {
      if (!search) throw new Error("Search query is required");
      const portfolios = await searchPortfolios(search, field);
      if (!portfolios.length) throw new Error("Portfolio not found");
      return portfolios;
    },
    enabled: !!search,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function useCreatePortfolio() {
  const queryClient = useQueryClient();

  return useMutation<NonNullPortfolio, ApiError, Omit<NonNullPortfolio, "created_at" | "likeCount" | "tags" | "replies">>({
    mutationFn: async (portfolioData) => {
      const portfolio = await createPortfolio(portfolioData);
      if (!portfolio) throw new Error("Failed to create portfolio");
      return portfolio;
    },
    onSuccess: (newPortfolio) => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      queryClient.setQueryData(["portfolio", { search: newPortfolio.pid, field: "pid" }], [newPortfolio]);
    },
    onError: (error) => {
      console.error("Error creating portfolio:", error);
      throw error;
    },
  });
}

export function useUpdatePortfolio() {
  const queryClient = useQueryClient();

  return useMutation<NonNullPortfolio, ApiError, { pid: UUID; data: Partial<NonNullPortfolio> }>({
    mutationFn: async ({ pid, data }) => {
      const updatedPortfolio = await updatePortfolio(pid, data);
      if (!updatedPortfolio) throw new Error("Failed to update portfolio");
      return updatedPortfolio;
    },
    onSuccess: (updatedPortfolio, { pid }) => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
      queryClient.setQueryData(["portfolio", { search: pid, field: "pid" }], [updatedPortfolio]);
    },
    onError: (error, variables) => {
      console.error(`Error updating portfolio ${variables.pid}:`, error);
      throw error;
    },
  });
}

export function useDeletePortfolio() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, UUID>({
    mutationFn: async (pid) => {
      if (!pid) throw new Error("Portfolio ID is required");
      await deletePortfolio(pid);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_, pid) => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
    onError: (error, pid) => {
      console.error(`Error deleting portfolio ${pid}:`, error);
      throw error;
    },
  });
}
