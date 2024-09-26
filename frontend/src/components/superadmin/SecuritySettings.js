import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, TextField, Button, Switch, FormControlLabel,
  Box, Slider
} from '@mui/material';

const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: true,
    passwordExpirationDays: 90,
    maxLoginAttempts: 5,
    lockoutDurationMinutes: 30,
    sessionTimeoutMinutes: 60,
    twoFactorAuthEnabled: false,
    allowedIpAddresses: '',
  });

  useEffect(() => {
    fetchSecuritySettings();
  }, []);

  const fetchSecuritySettings = async () => {
    try {
      const response = await axios.get('/api/security-settings', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setSettings(response.data);
    } catch (error) {
      console.error('Error fetching security settings:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: event.target.type === 'checkbox' ? checked : value
    }));
  };

  const handleSliderChange = (name) => (event, newValue) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: newValue
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put('/api/security-settings', settings, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Configuración de seguridad actualizada con éxito');
    } catch (error) {
      console.error('Error updating security settings:', error);
      alert('Error al actualizar la configuración de seguridad');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Configuración de Seguridad</Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <Typography id="password-min-length-slider" gutterBottom>
            Longitud mínima de contraseña: {settings.passwordMinLength}
          </Typography>
          <Slider
            value={settings.passwordMinLength}
            onChange={handleSliderChange('passwordMinLength')}
            aria-labelledby="password-min-length-slider"
            valueLabelDisplay="auto"
            step={1}
            marks
            min={6}
            max={20}
          />
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={settings.passwordRequireUppercase}
              onChange={handleChange}
              name="passwordRequireUppercase"
            />
          }
          label="Requerir mayúsculas en contraseña"
        />

        <FormControlLabel
          control={
            <Switch
              checked={settings.passwordRequireLowercase}
              onChange={handleChange}
              name="passwordRequireLowercase"
            />
          }
          label="Requerir minúsculas en contraseña"
        />

        <FormControlLabel
          control={
            <Switch
              checked={settings.passwordRequireNumbers}
              onChange={handleChange}
              name="passwordRequireNumbers"
            />
          }
          label="Requerir números en contraseña"
        />

        <FormControlLabel
          control={
            <Switch
              checked={settings.passwordRequireSpecialChars}
              onChange={handleChange}
              name="passwordRequireSpecialChars"
            />
          }
          label="Requerir caracteres especiales en contraseña"
        />

        <TextField
          name="passwordExpirationDays"
          label="Días para expiración de contraseña"
          type="number"
          value={settings.passwordExpirationDays}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="maxLoginAttempts"
          label="Máximo de intentos de inicio de sesión"
          type="number"
          value={settings.maxLoginAttempts}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="lockoutDurationMinutes"
          label="Duración del bloqueo (minutos)"
          type="number"
          value={settings.lockoutDurationMinutes}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          name="sessionTimeoutMinutes"
          label="Tiempo de expiración de sesión (minutos)"
          type="number"
          value={settings.sessionTimeoutMinutes}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <FormControlLabel
          control={
            <Switch
              checked={settings.twoFactorAuthEnabled}
              onChange={handleChange}
              name="twoFactorAuthEnabled"
            />
          }
          label="Habilitar autenticación de dos factores"
        />

        <TextField
          name="allowedIpAddresses"
          label="Direcciones IP permitidas (separadas por comas)"
          value={settings.allowedIpAddresses}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Guardar Configuración de Seguridad
        </Button>
      </form>
    </Container>
  );
};

export default SecuritySettings;


