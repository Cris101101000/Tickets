console.log('Cargando controlador de autenticación...');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Ajusta según tus necesidades
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // Crear nuevo usuario
    const user = await User.create({
      name,
      email,
      password, // Asegúrate de hashear la contraseña antes de guardarla
    });

    // Generar token
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(400).json({ message: 'Error en el registro de usuario', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({
    token,
    name: user.name,
    email: user.email,
    role: user.role,
  });
};

// Función para obtener el perfil del usuario autenticado
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor', error: error.message });
  }
};

// Función para actualizar el rol del usuario
exports.updateUserRole = async (req, res) => {
  console.log('Función updateUserRole llamada');
  try {
    const { email, role } = req.body;

    console.log('Datos recibidos para actualizar rol:', { email, role });

    const user = await User.findOneAndUpdate(
      { email },
      { role },
      { new: true }
    );

    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error detallado en la actualización del rol:', error);
    res.status(500).json({ 
      message: 'Error del servidor', 
      error: error.message,
      stack: process.env.NODE_ENV === 'production' ? '🥞' : error.stack 
    });
  }
};


