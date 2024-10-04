import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container, Typography, Button, Box, Select, MenuItem
} from '@mui/material';

const Reports = () => {
  const [reportType, setReportType] = useState('ticketsByStatus');
  const [data, setData] = useState([]); // Asegúrate de usar 'data' si es necesario

  const fetchReportData = async () => {
    try {
      const response = await axios.get(`/api/reports/${reportType}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  useEffect(() => {
    fetchReportData();
  }, [reportType]); // Incluye solo 'reportType' si 'fetchReportData' no cambia

  const renderChart = () => {
    // Implementa la lógica para renderizar el gráfico
  };

  const renderTable = () => {
    // Implementa la lógica para renderizar la tabla
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Informes</Typography>
      <Box mb={2}>
        <Select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
          fullWidth
        >
          <MenuItem value="ticketsByStatus">Tickets por Estado</MenuItem>
          <MenuItem value="ticketsByPriority">Tickets por Prioridad</MenuItem>
          <MenuItem value="ticketsByUser">Tickets por Usuario</MenuItem>
          <MenuItem value="usersByRole">Usuarios por Rol</MenuItem>
        </Select>
      </Box>
      {renderChart()}
      {renderTable()}
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={() => window.print()}>
          Imprimir Informe
        </Button>
      </Box>
    </Container>
  );
};

export default Reports;
