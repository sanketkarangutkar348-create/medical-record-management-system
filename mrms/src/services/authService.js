import api from './api';
export const registerDoctor = (d) => api.post('/auth/register/doctor', d);
export const registerPatient = (d) => api.post('/auth/register/patient', d);
export const login = (d) => api.post('/auth/login', d);
export const logout = () => api.post('/auth/logout');
export const getMe = () => api.get('/auth/me');
