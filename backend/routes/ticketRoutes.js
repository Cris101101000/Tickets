const express = require('express');
const { createTicket, getTickets, updateTicket } = require('../controllers/ticketController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', protect, createTicket);
router.get('/', protect, getTickets);
router.put('/:id', protect, updateTicket);

module.exports = router;
