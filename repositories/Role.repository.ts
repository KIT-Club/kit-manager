import { api } from "../core/axios";

const getAllRoles = async () => {
  const response = await api.get("/roles");
  return response.data;
};

const getRoleById = async (id: number) => {
  const response = await api.get(`/roles/${id}`);
  return response.data;
};

const createRole = async (data: any) => {
  const response = await api.post("/roles", data);
  return response.data;
};

const updateRole = async (id: number, data: any) => {
  const response = await api.put(`/roles/${id}`, data);
  return response.data;
};

const deleteRole = async (id: number) => {
  const response = await api.delete(`/roles/${id}`);
  return response.data;
};

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
