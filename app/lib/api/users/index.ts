import { axiosInstance, handleRequest } from "@/lib/api";
import { User } from "./types";

/**
  /users?search=keyword&field=column-in-table
*/

/** Omit = not required fields */
export async function searchUsers(search: string, field: keyof User = "id"): Promise<User[]> {
  const query = new URLSearchParams({ search, field }).toString();
  return handleRequest<User[]>(axiosInstance.get(`/users?${query}`));
}

export async function createUser(data: Omit<User, "created_at" | "location" | "interactions">): Promise<User> {
  return handleRequest<User>(axiosInstance.post("/users", data));
}

export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  return handleRequest<User>(axiosInstance.put(`/users/${id}`, data));
}

export async function deleteUser(id: string): Promise<User> {
  return handleRequest<User>(axiosInstance.put(`/users/${id}`));
}
