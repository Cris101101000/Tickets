const User = require('../models/userModel');

// Función para crear un usuario
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Verifica que el rol sea válido
    if (!['usuario', 'admin', 'soporte', 'super admin'].includes(role)) {
      return res.status(400).json({ message: 'Rol no válido' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ message: 'Error al crear usuario', error: error.message });
  }
};

// Función para obtener todos los usuarios
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
  }
};
