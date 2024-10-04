import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
  Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem
} from '@mui/material';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', password: '', role: '' });
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirigir al usuario a la página de inicio de sesión
      navigate('/login');
    } else {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const { data } = await axios.get('/api/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleOpen = (user = { name: '', email: '', password: '', role: '' }) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentUser({ name: '', email: '', password: '', role: '' });
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      if (currentUser._id) {
        await axios.put(`/api/users/${currentUser._id}`, currentUser, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } else {
        await axios.post('/api/users', currentUser, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Volver al Dashboard
      </Button>
      <Button variant="contained" color="primary" onClick={() => handleOpen()} style={{ marginLeft: '10px' }}>
        Crear Usuario
      </Button>
      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Rol</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(user)}>Editar</Button>
                  <Button onClick={() => handleDelete(user._id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentUser._id ? 'Editar Usuario' : 'Crear Usuario'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            value={currentUser.name}
            onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
            fullWidth
          />
          <TextField
            label="Email"
            value={currentUser.email}
            onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
            fullWidth
          />
          {!currentUser._id && (
            <TextField
              label="Contraseña"
              type="password"
              value={currentUser.password}
              onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
              fullWidth
            />
          )}
          <Select
            label="Rol"
            value={currentUser.role}
            onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
            fullWidth
          >
            <MenuItem value="user">Usuario</MenuItem>
            <MenuItem value="admin">Administrador</MenuItem>
            <MenuItem value="superadmin">Super Administrador</MenuItem>
            <MenuItem value="support">Soporte</MenuItem> {/* Agregar rol de soporte */}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagement;