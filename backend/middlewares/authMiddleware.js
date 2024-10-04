const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
  console.log('Headers de autorización:', req.headers.authorization);
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('Token extraído:', token);
  }

  if (!token) {
    console.log('No se encontró token');
    return res.status(401).json({ message: 'No autorizado, no se encontró el token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado:', decoded);
    
    req.user = await User.findById(decoded.id).select('-password');
    console.log('Usuario encontrado:', req.user);
    
    if (!req.user) {
      console.log('No se encontró el usuario asociado al token');
      return res.status(401).json({ message: 'No se encontró el usuario asociado al token' });
    }
    
    next();
  } catch (error) {
    console.error('Error en el middleware de autenticación:', error);
    return res.status(401).json({ message: 'No autorizado, token no válido' });
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'User role not authorized' });
    }
    next();
  };
};
