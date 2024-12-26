import { axiosInstance, handleRequest } from "@/lib/api";
import { User } from "./types";

// 1. GET request to fetch a user by ID
export async function fetchUserById(id: string): Promise<User> {
  return handleRequest<User>(axiosInstance.get(`/users/${id}`));
}

// 2. POST request to create a new user
export async function createUser(data: Omit<User, "id">): Promise<User> {
  return handleRequest<User>(axiosInstance.post("/users", data));
}

// 3. PUT request to update an existing user by ID
export async function updateUser(id: string, data: Partial<User>): Promise<User> {
  return handleRequest<User>(axiosInstance.put(`/users/${id}`, data));
}
