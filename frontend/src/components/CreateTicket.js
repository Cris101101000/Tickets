import React, { useState } from 'react'; // Importa useState
import api from '../utils/api'; // Asegúrate de que este archivo exista y esté en la ubicación correcta

const CreateTicket = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Baja');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/tickets', { title, description, priority });
      // Manejar el éxito (por ejemplo, redirigir o mostrar un mensaje)
    } catch (error) {
      console.error('Error al crear el ticket:', error);
      // Manejar el error (por ejemplo, mostrar un mensaje de error)
    }
  };

  return (
    <div>
      <h1>Crear Nuevo Ticket</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Título"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descripción"
          required
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="Baja">Baja</option>
          <option value="Media">Media</option>
          <option value="Alta">Alta</option>
        </select>
        <button type="submit">Crear Ticket</button>
      </form>
    </div>
  );
};

export default CreateTicket;