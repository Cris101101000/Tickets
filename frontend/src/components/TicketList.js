import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await api.get('/tickets');
        setTickets(response.data);
      } catch (error) {
        console.error('Error al obtener tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      <h2>Lista de Tickets</h2>
      {tickets.map((ticket) => (
        <div key={ticket._id}>
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>
          <p>Estado: {ticket.status}</p>
          <p>Prioridad: {ticket.priority}</p>
        </div>
      ))}
    </div>
  );
};

export default TicketList;
