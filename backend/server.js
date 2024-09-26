require('dotenv').config();
console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
console.log('PORT:', process.env.PORT);

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Mantén solo esta declaración
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

console.log('Intentando conectar a MongoDB...');
console.log('MONGO_URI:', process.env.MONGO_URI);

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Conectado exitosamente a MongoDB');
  const PORT = process.env.PORT || 5000;
  
  const server = app.listen(PORT, () => {
    const actualPort = server.address().port;
    console.log(`Servidor corriendo en el puerto ${actualPort}`);
  });

  server.on('error', (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    switch (error.code) {
      case 'EACCES':
        console.error(`El puerto ${PORT} requiere privilegios elevados`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`El puerto ${PORT} ya está en uso`);
        console.log('Intentando con el siguiente puerto...');
        server.listen(0); // Esto intentará con el siguiente puerto disponible
        break;
      default:
        throw error;
    }
  });
})
.catch((err) => {
  console.error('Error detallado de conexión a MongoDB:', err);
  process.exit(1);
});

// Middleware para verificar la conexión a MongoDB antes de cada solicitud
app.use((req, res, next) => {
  console.log(`Solicitud recibida: ${req.method} ${req.path}`);
  console.log('Estado de conexión a MongoDB:', mongoose.connection.readyState);
  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({ message: 'Error de conexión a la base de datos' });
  }
  next();
});

// Añade esto justo antes de definir las rutas
console.log('Configurando rutas...');

// Rutas
console.log('Rutas de autenticación cargadas');
app.use('/api/auth', authRoutes);
console.log('Rutas de autenticación configuradas');

// Rutas de tickets (añade otras rutas que necesites)
app.use('/api/tickets', ticketRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  console.log('Solicitud recibida en la ruta raíz');
  res.json({ message: 'API funcionando correctamente' });
});

// Actualizar usuario a superadmin
const User = require('./models/userModel'); // Ajusta la ruta según sea necesario



// Manejador de errores global
app.use((err, req, res, next) => {
  console.error('Error no manejado:', err);
  res.status(500).json({ message: 'Error interno del servidor', error: err.message });
});

// Agregar este código al final del archivo
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Ruta para crear usuarios
app.use('/api/users', userRoutes);
