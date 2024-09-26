import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Asegúrate de que esta ruta sea correcta

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const userData = {
        name: response.data.name,
        email: response.data.email,
        role: response.data.role
      };

      if (rememberMe) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('user', JSON.stringify(userData));
      }

      setUser(userData);

      switch (userData.role) {
        case 'super admin':
          navigate('/super-admin-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'usuario':
          navigate('/user-dashboard');
          break;
        default:
          navigate('/login');
          break;
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error.response?.data || error.message);
      alert('Error al iniciar sesión. Por favor, intenta de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Iniciar Sesión</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <div className="remember-me">
          <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
          <label>Recuérdame</label>
        </div>
        <button type="submit">Login</button>
        <p>¿No tienes una cuenta? <Link to="/register">Regístrate aquí</Link></p>
      </form>
    </div>
  );
};

export default Login;
