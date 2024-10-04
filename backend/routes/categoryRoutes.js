const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { getCategories, updateCategories } = require('../controllers/categoryController');

const router = express.Router();

router.get('/', protect, authorize('superadmin'), getCategories);
router.put('/', protect, authorize('superadmin'), updateCategories);

module.exports = router;
