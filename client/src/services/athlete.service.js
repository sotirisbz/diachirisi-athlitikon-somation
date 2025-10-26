import api from "./api.js";

export const athleteService = {
  getAll: () => api.get("/athletes"),
  getById: (id) => api.get(`/athletes/${id}`),
  create: (data) => api.post("/athletes", data),
  update: (id, data) => api.put(`/athletes/${id}`, data),
  delete: (id) => api.delete(`/athletes/${id}`),
};
