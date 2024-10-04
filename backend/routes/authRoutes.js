console.log('Cargando rutas de autenticación...');
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
const { protect, authorize } = require('../middlewares/authMiddleware'); // Importa el middleware
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
console.log('Controlador de autenticación cargado');

router.post('/register', async (req, res) => {
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
      role: 'user' // Asignar un rol por defecto
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
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Crear y enviar el token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

router.get('/me', protect, async (req, res) => {
  console.log('Ruta /me accedida, usuario:', req.user);
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error en /api/auth/me:', err);
    res.status(500).send('Error del servidor');
  }
});

module.exports = router;
