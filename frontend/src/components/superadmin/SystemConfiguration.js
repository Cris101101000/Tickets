import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Switch, FormControlLabel, Box } from '@mui/material';

const SystemConfiguration = () => {
  const [config, setConfig] = useState({
    allowUserRegistration: true,
    maxFileUploadSize: 5,
    emailNotificationsEnabled: true,
  });

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const { data } = await axios.get('/api/system-config', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setConfig(data);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put('/api/system-config', config, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Configuración actualizada con éxito');
    } catch (error) {
      console.error('Error updating system configuration:', error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
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