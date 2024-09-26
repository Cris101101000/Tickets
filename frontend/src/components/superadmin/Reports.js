import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Container, Typography, Button, Box, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Select, MenuItem
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
  const [reportType, setReportType] = useState('ticketsByStatus');
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    fetchReportData();
  }, [reportType, fetchReportData]);

  const fetchReportData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/reports/${reportType}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setReportData(response.data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  }, [reportType]);

  const renderChart = () => {
    if (!reportData) return null;

    const chartData = {
      labels: Object.keys(reportData),
      datasets: [
        {
          label: 'Cantidad',
          data: Object.values(reportData),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: getReportTitle(),
        },
      },
    };

    return <Bar data={chartData} options={options} />;
  };

  const renderTable = () => {
    if (!reportData) return null;

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{getReportTitle().split(' ')[0]}</TableCell>
              <TableCell align="right">Cantidad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(reportData).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell component="th" scope="row">
                  {key}
                </TableCell>
                <TableCell align="right">{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const getReportTitle = () => {
    switch (reportType) {
      case 'ticketsByStatus':
        return 'Tickets por Estado';
      case 'ticketsByPriority':
        return 'Tickets por Prioridad';
      case 'ticketsByUser':
        return 'Tickets por Usuario';
      case 'usersByRole':
        return 'Usuarios por Rol';
      default:
        return 'Reporte';
    }
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
