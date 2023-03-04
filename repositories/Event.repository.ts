import { api } from "../core/axios";

const getAllEvents = async () => {
  const response = await api.get("/events");
  return response.data;
};

const getEventById = async (id: number) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

const createEvent = async (data: any) => {
  const response = await api.post("/events", data);
  return response.data;
};

const updateEvent = async (id: number, data: any) => {
  const response = await api.put(`/events/${id}`, data);
  return response.data;
};

const deleteEvent = async (id: number) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
