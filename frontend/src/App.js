import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext';
import Login from './components/Login';
import SuperAdminDashboard from './components/SuperAdminDashboard';
import AdminDashboard from './components/AdminDashboard';
import SupportDashboard from './components/SupportDashboard';
import UserDashboard from './components/UserDashboard';
import UserManagement from './components/superadmin/UserManagement';
import TicketManagement from './components/superadmin/TicketManagement';
import SystemConfiguration from './components/superadmin/SystemConfiguration';
import Reports from './components/superadmin/Reports';
import SecuritySettings from './components/superadmin/SecuritySettings';
import BackupManagement from './components/superadmin/BackupManagement';
import IntegrationManagement from './components/superadmin/IntegrationManagement';
import CategoryManagement from './components/superadmin/CategoryManagement';

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

const App = () => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
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
          path="/user-dashboard"  // Asegúrate de que esta ruta sea '/user-dashboard'
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={
          user ? (
            <Navigate to={`/${user.role}-dashboard`} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        } />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/ticket-management" element={<TicketManagement />} />
        <Route path="/system-configuration" element={<SystemConfiguration />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/security-settings" element={<SecuritySettings />} />
        <Route path="/backup-management" element={<BackupManagement />} />
        <Route path="/integration-management" element={<IntegrationManagement />} />
        <Route path="/category-management" element={<CategoryManagement />} />
      </Routes>
    </Router>
  );
};

const AppWrapper = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

export default AppWrapper;
