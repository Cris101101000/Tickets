import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');

      try {
        const response = await axios.get('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.response?.data || error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:5000/api/users', { name, email, password, role }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers([...users, response.data]);
      setName('');
      setEmail('');
      setPassword('');
      setRole('');
    } catch (error) {
      console.error('Error creating user:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>
      <form onSubmit={handleCreateUser}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" required />
        <input type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Rol" required />
        <button type="submit">Crear Usuario</button>
      </form>
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
