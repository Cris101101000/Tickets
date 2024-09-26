import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import SuperAdminDashboard from './SuperAdminDashboard';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const AppContent = ({ user, setUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(response => {
        setUser(response.data);
      }).catch(() => {
        navigate('/login');
      });
    } else {
      navigate('/login');
    }
  }, [navigate, setUser]);

  return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/super-admin-dashboard" element={user?.role === 'super admin' ? <SuperAdminDashboard user={user} /> : <Navigate to="/login" />} />
      <Route path="/admin-dashboard" element={user?.role === 'admin' ? <AdminDashboard user={user} /> : <Navigate to="/login" />} />
      <Route path="/user-dashboard" element={user?.role === 'usuario' ? <UserDashboard user={user} /> : <Navigate to="/login" />} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppContent;
