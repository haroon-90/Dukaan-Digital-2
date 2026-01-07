import api from "./api";

export const addExpense = (data) => api.post('/expense', data);
export const getExpense = (data) => api.post('/expense/all', data);
export const deleteExpense = (id) => api.delete(`/expense/${id}`);