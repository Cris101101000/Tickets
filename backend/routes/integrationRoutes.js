const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { manageIntegrations } = require('../controllers/integrationController');

const router = express.Router();

router.get('/', protect, authorize('superadmin'), manageIntegrations);

module.exports = router;
