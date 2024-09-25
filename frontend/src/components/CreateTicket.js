import React, { useState } from 'react';
import api from '../utils/api';

const CreateTicket = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Media',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/tickets', formData);
      console.log('Ticket creado:', response.data);
      // Aquí puedes manejar el éxito de la creación, como redirigir al usuario
    } catch (error) {
      console.error('Error al crear ticket:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Título"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descripción"
        required
      />
      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
      >
        <option value="Baja">Baja</option>
        <option value="Media">Media</option>
        <option value="Alta">Alta</option>
      </select>
      <button type="submit">Crear Ticket</button>
    </form>
  );
};

export default CreateTicket;