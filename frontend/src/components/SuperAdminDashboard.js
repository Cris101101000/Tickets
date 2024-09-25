import React from 'react';
import { Container, Typography, Button, AppBar, Toolbar, Box, Paper, Grid } from '@mui/material';

const SuperAdminDashboard = ({ user, handleLogout }) => {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Super Admin Dashboard
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
      <Box mt={4}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">Sección 1</Typography>
              <Typography variant="body2">Contenido de la sección 1</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">Sección 2</Typography>
              <Typography variant="body2">Contenido de la sección 2</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6">Sección 3</Typography>
              <Typography variant="body2">Contenido de la sección 3</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default SuperAdminDashboard;
