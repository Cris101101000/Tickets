import React from 'react';
import axios from 'axios';
import { Container, Button } from '@mui/material';

const BackupManagement = () => {
  const handleBackup = async () => {
    try {
      await axios.post('/api/backup', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Copia de seguridad realizada con éxito');
    } catch (error) {
      console.error('Error realizando copia de seguridad:', error);
    }
  };

  const handleRestore = async () => {
    try {
      await axios.post('/api/restore', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Restauración realizada con éxito');
    } catch (error) {
      console.error('Error restaurando datos:', error);
    }
  };

  return (
    <Container>
      <Button variant="contained" color="primary" onClick={handleBackup}>
        Realizar Copia de Seguridad
      </Button>
      <Button variant="contained" color="secondary" onClick={handleRestore}>
        Restaurar Datos
      </Button>
    </Container>
  );
};

export default BackupManagement;
