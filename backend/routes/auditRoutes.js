const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { getAuditLogs } = require('../controllers/auditController');

const router = express.Router();

router.get('/', protect, authorize('superadmin'), getAuditLogs);

module.exports = router;
