import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
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
          console.log('User data:', data);
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

  console.log('Rendering dashboard for role:', user.role);

  if (user.role === 'superadmin') {
    return <SuperAdminDashboard user={user} handleLogout={handleLogout} />;
  } else if (user.role === 'admin') {
    return <AdminDashboard user={user} handleLogout={handleLogout} />;
  } else {
    return <UserDashboard user={user} handleLogout={handleLogout} />;
  }
};

export default PrivateRoute;
