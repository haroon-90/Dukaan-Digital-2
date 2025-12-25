import api from "./api";

export const getAdminDashboard = () => api.get("/admin");
export const editUserStatus = (id) => api.post(`/admin/status/${id}`, {});
export const deleteUserProfile = (id) => api.delete(`/admin/${id}`);
export const editUserProfile = (id, data) => api.put(`/admin/${id}`, data);