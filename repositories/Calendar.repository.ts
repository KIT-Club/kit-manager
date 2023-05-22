import { api } from "../core/axios";

export const loginCalendar = async (username: string, password: string) => {
  const data = new FormData();

  if (username) {
    data.append("username", username);
  }

  if (password) {
    data.append("password", password);
  }

  const response = await api.post("/calendar-login", data);
  return response;
};

export const tokenCalendar = async (request: string) => {
  const data = new FormData();

  if (request) {
    data.append("token", JSON.stringify(request));
  }

  const response = await api.post("/calendar-token", data);
  return response;
};
