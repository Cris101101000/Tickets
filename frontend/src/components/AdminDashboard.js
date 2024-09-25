import React from 'react';
import { Container, Typography, Button, AppBar, Toolbar, Box, Paper } from '@mui/material';

const AdminDashboard = ({ user, handleLogout }) => {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
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
          <Typography variant="body1">Role: {user.role}</Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
