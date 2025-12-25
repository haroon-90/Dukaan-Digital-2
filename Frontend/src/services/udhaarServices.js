import api from "./api";

export const addUdhaar = (data) => api.post("/udhaar", data);
export const getUdhaarlist = () => api.get("/udhaar");
export const getUdhaarById = (id) => api.get(`/udhaar/${id}`);
export const updateUdhaar = (id, data) => api.put(`/udhaar/${id}`, data);
export const deleteUdhaar = (id) => api.delete(`/udhaar/${id}`);