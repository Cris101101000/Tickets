import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import SuperAdminDashboard from './SuperAdminDashboard';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const PrivateRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const { data } = await axios.get('http://localhost:5000/api/auth/me', config);
          console.log('User data:', data); // Agrega este console.log
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/login';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  console.log('User role:', user.role); // Agrega este console.log

  return (
    <Routes>
      {user.role === 'superadmin' && (
        <Route path="/dashboard" element={<SuperAdminDashboard user={user} handleLogout={handleLogout} />} />
      )}
      {user.role === 'admin' && (
        <Route path="/dashboard" element={<AdminDashboard user={user} handleLogout={handleLogout} />} />
      )}
      {(user.role === 'user' || !user.role) && (
        <Route path="/dashboard" element={<UserDashboard user={user} handleLogout={handleLogout} />} />
      )}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default PrivateRoute;
