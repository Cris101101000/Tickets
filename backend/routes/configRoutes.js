const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { getConfig, updateConfig } = require('../controllers/configController');

const router = express.Router();

router.get('/', protect, authorize('superadmin'), getConfig);
router.put('/', protect, authorize('superadmin'), updateConfig);

module.exports = router;
