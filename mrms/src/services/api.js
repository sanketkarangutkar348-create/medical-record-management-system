import axios from 'axios';
// withCredentials lets the browser send the backend's HTTP-only cookie.
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', withCredentials: true });
export const errMsg = (e) => e.response?.data?.message || (e.request ? 'Cannot reach the server. Is the backend running?' : 'Something went wrong.');
export default api;
