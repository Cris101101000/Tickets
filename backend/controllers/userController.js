const User = require('../models/userModel');

// Función para crear un usuario
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

// Función para obtener todos los usuarios
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// Función para actualizar un usuario, incluyendo asignar roles
exports.updateUser = async (req, res) => {
  // Lógica para actualizar un usuario, incluyendo asignar roles
};

// Función para eliminar un usuario
exports.deleteUser = async (req, res) => {
  // Lógica para eliminar un usuario
};

// Función para restablecer la contraseña de un usuario
exports.resetPassword = async (req, res) => {
  // Lógica para restablecer la contraseña de un usuario
};