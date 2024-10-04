const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { createUser, getUsers } = require('../controllers/userController');
const router = express.Router();

router.get('/api/users', protect, getUsers);
router.post('/api/users', protect, createUser);

module.exports = router;