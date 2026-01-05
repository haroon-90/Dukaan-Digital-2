import api from "./api";

export const getInvoice = (type, id) => api.get(`/invoice/${type}/${id}`);