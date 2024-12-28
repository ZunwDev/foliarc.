import { createUser, fetchUserById, updateUser } from "@/lib/api/users";
import { User } from "@/lib/api/users/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type NonNullUser = Exclude<User, null>;

type ApiError = {
  message: string;
  statusCode?: number;
};

export function useFetchUserById(userId?: string) {
  return useQuery<NonNullUser, ApiError>({
    queryKey: ["user", userId],
    queryFn: async () => {
      if (!userId) throw new Error("User ID is required");
      const user = await fetchUserById(userId);
      if (!user) throw new Error("User not found");
      return user;
    },
    enabled: !!userId,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation<NonNullUser, ApiError, Omit<NonNullUser, "id">>({
    mutationFn: async (userData) => {
      const user = await createUser(userData);
      if (!user) throw new Error("Failed to create user");
      return user;
    },
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.setQueryData(["user", newUser.id], newUser);
    },
    onError: (error) => {
      console.error("Error creating user:", error);
      throw error;
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation<NonNullUser, ApiError, { id: string; data: Partial<NonNullUser> }>({
    mutationFn: async ({ id, data }) => {
      const updatedUser = await updateUser(id, data);
      if (!updatedUser) throw new Error("Failed to update user");
      return updatedUser;
    },
    onSuccess: (updatedUser, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["user", id] });
      queryClient.setQueryData(["user", id], updatedUser);
    },
    onError: (error, variables) => {
      console.error(`Error updating user ${variables.id}:`, error);
      throw error;
    },
  });
}
