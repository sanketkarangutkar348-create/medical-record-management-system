import api from './api';
export const getAppointments = () => api.get('/appointments');
export const bookAppointment = (d) => api.post('/appointments', d);
export const updateAppointment = (id, d) => api.put(`/appointments/${id}`, d);
