import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Ajusta esto según la URL de tu backend
});

// Configuración para incluir el token en las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
