import api from "./api";

export const addExpense = (data) => api.post('/expense', data);
export const getExpense = () => api.get('/expense');
export const deleteExpense = (id) => api.delete(`/expense/${id}`);