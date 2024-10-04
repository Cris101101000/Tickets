const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { createUser } = require('../controllers/userController');
const router = express.Router();

router.post('/api/users', protect, createUser);

module.exports = router;