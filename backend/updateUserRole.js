require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel'); // Asegúrate de que esta ruta es correcta

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch((err) => console.error('Error de conexión a MongoDB:', err));

