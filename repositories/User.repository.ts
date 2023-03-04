import { api } from "../core/axios";

const login = async (username: string, password: string) => {
  const response = await api.post("/login", {
    username,
    password,
  });
  return response.data;
};

const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

const getUserById = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

const updateUser = async (id: number, data: any) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

module.exports = {
  login,
  getAllUsers,
  getUserById,
  updateUser,
};
