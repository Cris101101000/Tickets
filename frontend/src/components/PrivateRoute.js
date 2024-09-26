import React from 'react';
import { Navigate } from 'react-router-dom';
import SuperAdminDashboard from './SuperAdminDashboard';

const PrivateRoute = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <SuperAdminDashboard />;
};

export default PrivateRoute;
