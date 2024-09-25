import React from 'react';
import { useParams } from 'react-router-dom';

const TicketDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalles del Ticket</h1>
      <p>Mostrando detalles para el ticket con ID: {id}</p>
    </div>
  );
};

export default TicketDetails;
