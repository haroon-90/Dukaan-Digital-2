import api from "./api";

export const getReport = (data) => api.post('/report', data)