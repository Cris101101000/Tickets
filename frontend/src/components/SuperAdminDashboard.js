import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext'; // Importa useUser
import { 
  Box, 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText 
} from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useUser(); // Usa el hook useUser

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Si el usuario no está autenticado o no es un superadmin, redirige al login
  React.useEffect(() => {
    if (!user || user.role !== 'superadmin') {
      navigate('/login');
    }
  }, [user, navigate]);

  // Si el usuario aún no se ha cargado, muestra un mensaje de carga
  if (!user) {
    return <div>Cargando...</div>;
  }

  const menuItems = [
    { text: 'Gestión de Usuarios', icon: <PeopleIcon />, path: '/user-management' },
    { text: 'Gestión de Tickets', icon: <ConfirmationNumberIcon />, path: '/ticket-management' },
    { text: 'Configuración del Sistema', icon: <SettingsIcon />, path: '/system-configuration' },
    { text: 'Reportes', icon: <AssessmentIcon />, path: '/reports' },
    { text: 'Configuración de Seguridad', icon: <SecurityIcon />, path: '/security-settings' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
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
            {menuItems.map((item) => (
              <ListItem button key={item.text} onClick={() => navigate(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography paragraph>
          Bienvenido, Super Admin {user.name}
        </Typography>
        {/* Aquí puedes agregar más contenido para el dashboard */}
      </Box>
    </Box>
  );
};

export default SuperAdminDashboard;
