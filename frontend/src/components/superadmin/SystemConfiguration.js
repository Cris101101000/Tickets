import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, TextField, Button, Switch, FormControlLabel,
  Select, MenuItem, FormControl, InputLabel, Box
} from '@mui/material';

const SystemConfiguration = () => {
  const [config, setConfig] = useState({
    ticketPriorities: ['low', 'medium', 'high', 'urgent'],
    ticketStatuses: ['open', 'in-progress', 'closed'],
    defaultTicketPriority: 'medium',
    allowUserRegistration: true,
    maxFileUploadSize: 5, // in MB
    emailNotificationsEnabled: true
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await axios.get('/api/system-config', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setConfig(response.data);
    } catch (error) {
      console.error('Error fetching system configuration:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setConfig(prevConfig => ({
      ...prevConfig,
      [name]: event.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayChange = (event, index, arrayName) => {
    const newArray = [...config[arrayName]];
    newArray[index] = event.target.value;
    setConfig(prevConfig => ({
      ...prevConfig,
      [arrayName]: newArray
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put('/api/system-config', config, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Configuración actualizada con éxito');
    } catch (error) {
      console.error('Error updating system configuration:', error);
      alert('Error al actualizar la configuración');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Configuración del Sistema</Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <Typography variant="h6">Prioridades de Tickets</Typography>
          {config.ticketPriorities.map((priority, index) => (
            <TextField
              key={index}
              label={`Prioridad ${index + 1}`}
              value={priority}
              onChange={(e) => handleArrayChange(e, index, 'ticketPriorities')}
              fullWidth
              margin="normal"
            />
          ))}
        </Box>

        <Box mb={2}>
          <Typography variant="h6">Estados de Tickets</Typography>
          {config.ticketStatuses.map((status, index) => (
            <TextField
              key={index}
              label={`Estado ${index + 1}`}
              value={status}
              onChange={(e) => handleArrayChange(e, index, 'ticketStatuses')}
              fullWidth
              margin="normal"
            />
          ))}
        </Box>

        <FormControl fullWidth margin="normal">
          <InputLabel>Prioridad por Defecto de Tickets</InputLabel>
          <Select
            name="defaultTicketPriority"
            value={config.defaultTicketPriority}
            onChange={handleChange}
          >
            {config.ticketPriorities.map((priority) => (
              <MenuItem key={priority} value={priority}>{priority}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControlLabel
          control={
            <Switch
              checked={config.allowUserRegistration}
              onChange={handleChange}
              name="allowUserRegistration"
            />
          }
          label="Permitir Registro de Usuarios"
        />

        <TextField
          name="maxFileUploadSize"
          label="Tamaño Máximo de Archivo (MB)"
          type="number"
          value={config.maxFileUploadSize}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <FormControlLabel
          control={
            <Switch
              checked={config.emailNotificationsEnabled}
              onChange={handleChange}
              name="emailNotificationsEnabled"
            />
          }
          label="Habilitar Notificaciones por Email"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Guardar Configuración
        </Button>
      </form>
    </Container>
  );
};

export default SystemConfiguration;
