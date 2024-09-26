const express = require('express');
const { createUser, getUsers } = require('../controllers/userController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();

// Asegúrate de que createUser y getUsers estén definidos en userController.js
router.post('/', protect, authorize('superadmin'), createUser);
router.get('/', protect, authorize('superadmin'), getUsers);

module.exports = router;
