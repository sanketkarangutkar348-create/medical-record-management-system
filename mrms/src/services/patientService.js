import api from './api';
export const getPatients = (params) => api.get('/patients', { params });
export const getPatient = (id) => api.get(`/patients/${id}`);
export const getAdminStats = () => api.get('/admin/stats');
