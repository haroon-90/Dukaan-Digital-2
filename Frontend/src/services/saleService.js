import api from "./api";

export const getsales = (data) => api.post('/sales/all', data)
export const getsinglesale = (type, id) => api.get(`/sales/${type}/${id}`)
export const createsale = (data) => api.post('/sales', data)
export const deletesale = (id) => api.delete(`/sales/${id}`);