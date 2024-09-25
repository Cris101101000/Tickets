const express = require('express');
const router = express.Router();
const { 
  getTickets, 
  createTicket, 
  getTicket, 
  updateTicket, 
  deleteTicket 
} = require('../controllers/ticketController');
const { protect, authorize } = require('../middlewares/authMiddleware');
const User = require('../models/userModel'); // Asegúrate de que esta ruta es correcta

// Asegúrate de que todas estas funciones estén definidas en tu ticketController
router.route('/')
  .get(protect, authorize('soporte', 'admin', 'superadmin'), getTickets)
  .post(protect, createTicket);

router.route('/:id')
  .get(protect, getTicket)
  .put(protect, updateTicket)
  .delete(protect, authorize('soporte', 'admin', 'superadmin'), deleteTicket);

module.exports = router;
