import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:5000/api/tickets', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error.response?.data || error.message);
      }
    };

    fetchTickets();
  }, []);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:5000/api/tickets', { title, description, status }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTickets([...tickets, response.data]);
      setTitle('');
      setDescription('');
      setStatus('');
    } catch (error) {
      console.error('Error creating ticket:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Gestión de Tickets</h2>
      <form onSubmit={handleCreateTicket}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título" required />
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción" required />
        <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} placeholder="Estado" required />
        <button type="submit">Crear Ticket</button>
      </form>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket._id}>{ticket.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TicketManagement;
