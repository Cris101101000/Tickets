import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, AppBar, Toolbar, Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const AdminDashboard = ({ user, handleLogout }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        };
        const { data } = await axios.get('http://localhost:5000/api/users', config);
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Panel de Administrador
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
          <Typography variant="body1">Rol: {user.role}</Typography>
        </Paper>
      </Box>
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Lista de Usuarios
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Rol</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default AdminDashboard;
