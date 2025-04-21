const express = require('express');
const {
  generateQRCodes,
  verifyQRCode,
  getQRCodes,
  getStats
} = require('../controllers/qrCodeController');

const router = express.Router();

// Route: /api/qrcodes
router.get('/', getQRCodes);
router.post('/generate', generateQRCodes);
router.post('/verify', verifyQRCode);
router.get('/stats', getStats);

module.exports = router; 