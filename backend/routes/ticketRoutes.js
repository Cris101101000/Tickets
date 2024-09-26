const express = require('express');
const { getTickets, createTicket } = require('../controllers/ticketController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getTickets);
router.post('/', protect, createTicket);

module.exports = router;
