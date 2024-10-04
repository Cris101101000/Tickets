const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { generateReport } = require('../controllers/reportController');

const router = express.Router();

router.get('/', protect, authorize('superadmin'), generateReport);

module.exports = router;
