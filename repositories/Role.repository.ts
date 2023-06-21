import { api } from "../core/axios";

export const getAllRoles = async (params: any) => {
  const response = await api.get("/roles", params);
  return response.data;
};

export const getRoleById = async (id: number, params: any) => {
  const response = await api.get(`/roles/${id}`, { params });
  return response.data;
};

export const createRole = async (data: any) => {
  const response = await api.post("/roles", data);
  return response.data;
};

export const updateRole = async ({ id, data }: { id: number; data: any }) => {
  const response = await api.put(`/roles/${id}`, data);
  return response.data;
};

export const deleteRole = async (id: number) => {
  const response = await api.delete(`/roles/${id}`);
  return response.data;
};
