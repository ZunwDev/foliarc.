import { createUser, deleteUser, searchUsers, updateUser } from "@/lib/api/users";
import { User } from "@/lib/api/users/types";
import { ApiError } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type NonNullUser = Exclude<User, null>;

export function useFetchUser(search: string, field: keyof NonNullUser = "id") {
  return useQuery<NonNullUser[], ApiError>({
    queryKey: ["user", { search, field }],
    queryFn: async () => {
      if (!search) throw new Error("Search query is required");
      const users = await searchUsers(search, field);
      if (!users.length) throw new Error("User not found");
      return users;
    },
    enabled: !!search,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation<NonNullUser, ApiError, Omit<NonNullUser, "created_at" | "location" | "interactions">>({
    mutationFn: async (userData) => {
      const user = await createUser(userData);
      if (!user) throw new Error("Failed to create user");
      return user;
    },
    onSuccess: (newUser) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.setQueryData(["user", { search: newUser.id, field: "id" }], [newUser]);
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
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.setQueryData(["user", { search: id, field: "id" }], [updatedUser]);
    },
    onError: (error, variables) => {
      console.error(`Error updating user ${variables.id}:`, error);
      throw error;
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: async (userId) => {
      if (!userId) throw new Error("User ID is required");
      await deleteUser(userId);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_, userId) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error, userId) => {
      console.error(`Error deleting user ${userId}:`, error);
      throw error;
    },
  });
}
