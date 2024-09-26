import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, Typography, Button, AppBar, Toolbar, Box, Paper, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem
} from '@mui/material';

const SupportDashboard = ({ user, handleLogout }) => {
  const [tickets, setTickets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  const fetchTickets = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      const { data } = await axios.get('http://localhost:5000/api/tickets', config);
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleOpenDialog = (ticket) => {
    setSelectedTicket(ticket);
    setNewStatus(ticket.status);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTicket(null);
    setNewStatus('');
  };

  const handleUpdateTicket = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      };
      await axios.put(`http://localhost:5000/api/tickets/${selectedTicket._id}`, 
        { status: newStatus },
        config
      );
      fetchTickets();
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  if (!user) {
    return <div>Cargando datos del usuario...</div>;
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Panel de Soporte
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
          Lista de Tickets
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Título</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Creado por</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket._id}>
                  <TableCell>{ticket.title}</TableCell>
                  <TableCell>{ticket.description}</TableCell>
                  <TableCell>{ticket.status}</TableCell>
                  <TableCell>{ticket.createdBy.name}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleOpenDialog(ticket)}>
                      Actualizar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Actualizar Ticket</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Título"
            type="text"
            fullWidth
            value={selectedTicket?.title || ''}
            disabled
          />
          <TextField
            margin="dense"
            label="Descripción"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={selectedTicket?.description || ''}
            disabled
          />
          <Select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            fullWidth
            margin="dense"
          >
            <MenuItem value="open">Abierto</MenuItem>
            <MenuItem value="in-progress">En Progreso</MenuItem>
            <MenuItem value="closed">Cerrado</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleUpdateTicket} color="primary">
            Actualizar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SupportDashboard;
