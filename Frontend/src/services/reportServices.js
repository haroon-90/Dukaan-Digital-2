import api from "./api";

export const getReport = (data) => api.post('/report', data)
export const getPreviousReports = (data) => api.get('/report/previous', data)
export const getPreviousOneReport = (id) => api.get('/report/previous/' + id)