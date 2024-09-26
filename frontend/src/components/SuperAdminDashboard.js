import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Typography, Button, AppBar, Toolbar, Box, 
  Drawer, List, ListItem, ListItemIcon, ListItemText 
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';
import UserManagement from './superadmin/UserManagement';
import TicketManagement from './superadmin/TicketManagement';
import SystemConfiguration from './superadmin/SystemConfiguration';
import Reports from './superadmin/Reports';
import SecuritySettings from './superadmin/SecuritySettings';

const SuperAdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('users');

  const handleLogout = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio de sesión
    navigate('/login');
  };

  const renderSection = () => {
    switch(currentSection) {
      case 'users':
        return <UserManagement />;
      case 'tickets':
        return <TicketManagement />;
      case 'config':
        return <SystemConfiguration />;
      case 'reports':
        return <Reports />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <Typography>Selecciona una sección</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Panel de Super Admin
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {[
              { text: 'Usuarios', icon: <PeopleIcon />, section: 'users' },
              { text: 'Tickets', icon: <ConfirmationNumberIcon />, section: 'tickets' },
              { text: 'Sistema', icon: <SettingsIcon />, section: 'system' },
              { text: 'Reportes', icon: <AssessmentIcon />, section: 'reports' },
              { text: 'Seguridad', icon: <SecurityIcon />, section: 'security' }
            ].map((item) => (
              <ListItem button key={item.text} onClick={() => setCurrentSection(item.section)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {currentSection === 'users' && <UserManagement />}
        {currentSection === 'tickets' && <TicketManagement />}
        {currentSection === 'system' && <SystemConfiguration />}
        {currentSection === 'reports' && <Reports />}
        {currentSection === 'security' && <SecuritySettings />}
      </Box>
    </Box>
  );
};

export default SuperAdminDashboard;
