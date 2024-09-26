import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Button, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
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

const SuperAdminDashboard = ({ user, handleLogout }) => {
  const [currentSection, setCurrentSection] = useState('UserManagement');

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Super Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout} sx={{ marginLeft: 'auto' }}>
            Cerrar Sesión
          </Button>
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
            <ListItem button onClick={() => setCurrentSection('UserManagement')}>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Gestión de Usuarios" />
            </ListItem>
            <ListItem button onClick={() => setCurrentSection('TicketManagement')}>
              <ListItemIcon>
                <ConfirmationNumberIcon />
              </ListItemIcon>
              <ListItemText primary="Gestión de Tickets" />
            </ListItem>
            <ListItem button onClick={() => setCurrentSection('SystemConfiguration')}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Configuración del Sistema" />
            </ListItem>
            <ListItem button onClick={() => setCurrentSection('Reports')}>
              <ListItemIcon>
                <AssessmentIcon />
              </ListItemIcon>
              <ListItemText primary="Reportes" />
            </ListItem>
            <ListItem button onClick={() => setCurrentSection('SecuritySettings')}>
              <ListItemIcon>
                <SecurityIcon />
              </ListItemIcon>
              <ListItemText primary="Configuración de Seguridad" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {currentSection === 'UserManagement' && <UserManagement />}
        {currentSection === 'TicketManagement' && <TicketManagement />}
        {currentSection === 'SystemConfiguration' && <SystemConfiguration />}
        {currentSection === 'Reports' && <Reports />}
        {currentSection === 'SecuritySettings' && <SecuritySettings />}
      </Box>
    </Box>
  );
};

export default SuperAdminDashboard;
