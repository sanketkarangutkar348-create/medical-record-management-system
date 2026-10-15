import api from './api';
export const getRecords = (params) => api.get('/medical-records', { params });
export const createRecord = (d) => api.post('/medical-records', d);
export const updateRecord = (id, d) => api.put(`/medical-records/${id}`, d);
