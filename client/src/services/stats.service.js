import api from "./api.js";

export const statsService = {
  getDashboardStats: () => api.get("/stats"),
};
