import React, { useState, useEffect } from 'react';
import TicketForm from '../components/TicketForm';
import TicketList from '../components/TicketList';
import { getTickets, createTicket, updateTicket, deleteTicket } from '../services/ticketService';

const HomePage = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const data = await getTickets();
    setTickets(data);
  };

  const handleCreate = async (ticket) => {
    await createTicket(ticket);
    fetchTickets();
  };

  const handleUpdate = async (id, ticket) => {
    await updateTicket(id, ticket);
    fetchTickets();
  };

  const handleDelete = async (id) => {
    await deleteTicket(id);
    fetchTickets();
  };

  return (
    <div>
      <h1>Ticket Management</h1>
      <TicketForm onCreate={handleCreate} />
      <TicketList tickets={tickets} onUpdate={handleUpdate} onDelete={handleDelete} />
    </div>
  );
};

export default HomePage;
