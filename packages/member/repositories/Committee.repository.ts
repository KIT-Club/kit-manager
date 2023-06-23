import { api } from "../core/axios";

export const getAllCommittees = async (params: any) => {
  const response = await api.get("/committees", { params });
  return response.data;
};

export const getCommitteeById = async (id: number, params: any) => {
  const response = await api.get(`/committees/${id}`, { params });
  return response.data;
};

export const createCommittee = async (committee: any) => {
  const response = await api.post("/committees", committee);
  return response.data;
};

export const updateCommittee = async ({
  id,
  data,
}: {
  id: number;
  data: any;
}) => {
  const response = await api.put(`/committees/${id}`, data);
  return response.data;
};

export const deleteCommittee = async (id: number) => {
  const response = await api.delete(`/committees/${id}`);
  return response.data;
};
