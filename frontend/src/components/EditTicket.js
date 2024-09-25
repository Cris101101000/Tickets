import React from 'react';
import { useParams } from 'react-router-dom';

const EditTicket = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Editar Ticket</h1>
      <p>Formulario para editar el ticket con ID: {id}</p>
    </div>
  );
};

export default EditTicket;
