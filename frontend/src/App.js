import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext';
import Login from './components/Login';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import AdminDashboard from './components/AdminDashboard';
import SupportDashboard from './components/SupportDashboard';
import UserDashboard from './components/UserDashboard';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useUser();
  
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppRoutes() {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route 
        path="/superadmin-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['superadmin']}>
            <SuperAdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/support-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['support']}>
            <SupportDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/user-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <UserDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/" element={
        user ? (
          user.role === 'superadmin' ? <Navigate to="/superadmin-dashboard" replace /> :
          user.role === 'admin' ? <Navigate to="/admin-dashboard" replace /> :
          user.role === 'support' ? <Navigate to="/support-dashboard" replace /> :
          <Navigate to="/user-dashboard" replace />
        ) : <Navigate to="/login" replace />
      } />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <Router>
        <AppRoutes />
      </Router>
    </UserProvider>
  );
}

export default App;
