import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Select, MenuItem } from '@mui/material';

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const { data } = await axios.get('/api/tickets', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleOpen = (ticket) => {
    setCurrentTicket(ticket);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentTicket(null);
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      if (currentTicket._id) {
        await axios.put(`/api/tickets/${currentTicket._id}`, currentTicket, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      }
      fetchTickets();
      handleClose();
    } catch (error) {
      console.error('Error saving ticket:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/tickets/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      fetchTickets();
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket._id}>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>{ticket.description}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>
                  <Button onClick={() => handleOpen(ticket)}>Editar</Button>
                  <Button onClick={() => handleDelete(ticket._id)}>Eliminar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentTicket?._id ? 'Editar Ticket' : 'Crear Ticket'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Título"
            value={currentTicket?.title || ''}
            onChange={(e) => setCurrentTicket({ ...currentTicket, title: e.target.value })}
            fullWidth
          />
          <TextField
            label="Descripción"
            value={currentTicket?.description || ''}
            onChange={(e) => setCurrentTicket({ ...currentTicket, description: e.target.value })}
            fullWidth
          />
          <Select
            value={currentTicket?.status || ''}
            onChange={(e) => setCurrentTicket({ ...currentTicket, status: e.target.value })}
            fullWidth
          >
            <MenuItem value="open">Abierto</MenuItem>
            <MenuItem value="in-progress">En Progreso</MenuItem>
            <MenuItem value="closed">Cerrado</MenuItem>
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

export default TicketManagement;