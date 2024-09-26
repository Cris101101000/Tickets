const User = require('../models/userModel');

// Función para crear un usuario
exports.createUser = async (req, res) => {
  if (req.user.role !== 'super admin') {
    return res.status(403).json({ message: 'No autorizado' });
  }

  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });
  await user.save();
  res.status(201).json(user);
};

// Función para obtener todos los usuarios
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
