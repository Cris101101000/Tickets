console.log('Cargando rutas de autenticación...');
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
console.log('Controlador de autenticación cargado');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
