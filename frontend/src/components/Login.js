import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import api from '../services/api';
import './Login.css'; // Asegúrate de que la ruta sea correcta

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isLogin) {
        response = await api.post('/auth/login', { email, password });
      } else {
        response = await api.post('/auth/register', { name, email, password });
      }
      login(response.data.user);
      // Redirige basado en el rol del usuario
      switch(response.data.user.role) {
        case 'superadmin':
          navigate('/superadmin-dashboard');
          break;
        case 'admin':
          navigate('/admin-dashboard');
          break;
        case 'support':
          navigate('/support-dashboard');
          break;
        default:
          navigate('/user-dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            required={!isLogin}
          />
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button type="submit">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
      </button>
    </div>
  );
}

export default Login;
