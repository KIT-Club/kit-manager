import { api } from "../core/axios";

const getAllCommittees = async () => {
  const response = await api.get("/committees");
  return response.data;
};

const getCommitteeById = async (id: number) => {
  const response = await api.get(`/committees/${id}`);
  return response.data;
};

const createCommittee = async (committee: any) => {
  const response = await api.post("/committees", committee);
  return response.data;
};

const updateCommittee = async (id: number, committee: any) => {
  const response = await api.put(`/committees/${id}`, committee);
  return response.data;
};

const deleteCommittee = async (id: number) => {
  const response = await api.delete(`/committees/${id}`);
  return response.data;
};

module.exports = {
  getAllCommittees,
  getCommitteeById,
  createCommittee,
  updateCommittee,
  deleteCommittee,
};
