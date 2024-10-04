const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { getTickets, updateTicket, deleteTicket } = require('../controllers/ticketController');

const router = express.Router();

router.get('/', protect, authorize('superadmin'), getTickets);
router.put('/:id', protect, authorize('superadmin'), updateTicket);
router.delete('/:id', protect, authorize('superadmin'), deleteTicket);

module.exports = router;