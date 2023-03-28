import { api } from "../core/axios";

export const login = async (username: string, password: string) => {
  const response = await api.post("/login", {
    username,
    password,
  });
  return response.data;
};

export const addUser = async ({
  username,
  committee_ids,
  role_ids,
}: {
  username: string;
  committee_ids: number[];
  role_ids: number[];
}) => {
  const response = await api.post(`/users`, {
    username,
    committee_ids,
    role_ids,
  });
  return response.data;
};

export const getAllUsers = async (params: any) => {
  const response = await api.get("/users", {
    params,
  });
  return response.data;
};

export const getUserById = async (id: number, params: any) => {
  const response = await api.get(`/users/${id}`, { params });
  return response.data;
};

export const updateUser = async ({ id, data }: { id: number; data: any }) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
