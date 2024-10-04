const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { backupData, restoreData } = require('../controllers/backupController');

const router = express.Router();

router.post('/backup', protect, authorize('superadmin'), backupData);
router.post('/restore', protect, authorize('superadmin'), restoreData);

module.exports = router;
