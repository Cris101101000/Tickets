import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import api from '../services/api';
import './Login.css'; // Importamos el archivo CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Nuevo estado para el mensaje de éxito
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      let response;
      if (isLogin) {
        response = await api.post('/auth/login', { email, password });
        if (response.data && response.data.user) {
          login(response.data.user);
          navigate(`/${response.data.user.role}-dashboard`);
        } else {
          setError('Respuesta del servidor no válida');
        }
      } else {
        response = await api.post('/auth/register', { name, email, password });
        if (response.data && response.data._id) {
          setSuccess('Usuario creado exitosamente. Ahora puedes iniciar sesión.');
          setIsLogin(true); // Cambia al modo de inicio de sesión
        } else {
          setError('Respuesta del servidor no válida');
        }
      }
    } catch (error) {
      console.error('Error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Error en la operación');
    }
  };

  return (
    <div className="App">
      <div className="login-container">
        <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>} {/* Mensaje de éxito */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre"
                required={!isLogin}
              />
            </div>
          )}
          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <button type="submit">{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</button>
        </form>
        <p>
          {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
