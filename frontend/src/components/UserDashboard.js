import React from 'react';
import { Container, Typography, Button, AppBar, Toolbar, Box, Paper } from '@mui/material';
import { useUser } from '../contexts/UserContext'; // Importa el hook useUser

const UserDashboard = () => {
  const { user, logout } = useUser(); // Usa el hook useUser para obtener el usuario y la función de logout

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Panel de Usuario
          </Typography>
          <Button color="inherit" onClick={logout}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>
      <Box mt={4}>
        <Paper elevation={3} style={{ padding: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Bienvenido, {user.name}
          </Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          <Typography variant="body1">Rol: {user.role || 'Usuario'}</Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default UserDashboard;
