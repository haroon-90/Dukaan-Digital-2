import api from "./api";

export const getsales = (data) => api.post('/sales/all', data)
export const createsale = (data) => api.post('/sales', data)
export const deletesale = (id) => api.delete(`/sales/${id}`);