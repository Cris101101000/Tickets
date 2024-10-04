import React, { useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register'; // Asegúrate de importar el componente Register
import Dashboard from './Dashboard';

const AppContent = ({ user, setUser, isAuthenticated, setIsAuthenticated }) => {
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            'x-auth-token': token
          }
        });
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error en /api/auth/me:', error.response?.data || error.message);
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
      }
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Routes>
      <Route path="/login" element={!isAuthenticated ? <Login setUser={setUser} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!isAuthenticated ? <Register setUser={setUser} setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard user={user} /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
    </Routes>
  );
};

export default AppContent;
