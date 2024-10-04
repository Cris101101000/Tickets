const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { createUser, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

router.post('/', protect, authorize('superadmin'), createUser);
router.put('/:id', protect, authorize('superadmin'), updateUser);
router.delete('/:id', protect, authorize('superadmin'), deleteUser);

module.exports = router;