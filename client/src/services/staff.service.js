import api from "./api.js";

export const staffService = {
  getAll: () => api.get("/staff"),
  getById: (id) => api.get(`/staff/${id}`),
  create: (data) => api.post("/staff", data),
  update: (id, data) => api.put(`/staff/${id}`, data),
  delete: (id) => api.delete(`/staff/${id}`),
};
