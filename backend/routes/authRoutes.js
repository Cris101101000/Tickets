console.log('Cargando rutas de autenticación...');
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserRole } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware'); // Asegúrate de que esta ruta sea correcta
const { login } = require('../controllers/authController');
console.log('Controlador de autenticación cargado');

router.post('/register', registerUser);
router.post('/login', login);

// Ruta para obtener el perfil del usuario autenticado
router.get('/me', protect, getUserProfile);

// Ruta temporal para actualizar el rol del usuario
router.put('/update-role', updateUserRole);

module.exports = router;
