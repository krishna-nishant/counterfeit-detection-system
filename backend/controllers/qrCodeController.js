const QRCode = require('../models/QRCode');
const ScanLog = require('../models/ScanLog');
const qrcode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

// @desc    Generate multiple QR codes
// @route   POST /api/qrcodes/generate
// @access  Private/Admin
exports.generateQRCodes = async (req, res) => {
  try {
    const { count = 1, productInfo = {} } = req.body;
    
    if (!count || count < 1) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid count'
      });
    }

    const generatedCodes = [];
    
    for (let i = 0; i < count; i++) {
      const code_id = uuidv4();
      const key = uuidv4();
      
      // Generate QR code image as base64
      const qrCodeData = JSON.stringify({ code_id, key });
      const qrCodeImage = await qrcode.toDataURL(qrCodeData);
      
      // Create new QR code in database
      const newQRCode = new QRCode({
        code_id,
        key,
        product_info: productInfo
      });
      
      await newQRCode.save();
      
      generatedCodes.push({
        code_id,
        qrCodeImage
      });
    }
    
    return res.status(201).json({
      success: true,
      count: generatedCodes.length,
      data: generatedCodes
    });
  } catch (error) {
    console.error('Error generating QR codes:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Verify a QR code
// @route   POST /api/qrcodes/verify
// @access  Public
exports.verifyQRCode = async (req, res) => {
  try {
    const { code_id, key, location = {} } = req.body;
    
    if (!code_id || !key) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }
    
    // Find the QR code in database
    const qrCode = await QRCode.findOne({ code_id });
    
    if (!qrCode) {
      // Log scan attempt
      const scanLog = new ScanLog({
        scan_id: uuidv4(),
        code_id,
        location,
        device_info: req.headers['user-agent'],
        is_authentic: false
      });
      
      await scanLog.save();
      
      return res.status(404).json({
        success: false,
        message: 'QR code not found'
      });
    }
    
    // Check if QR code is already used
    if (qrCode.is_used) {
      // Log scan attempt
      const scanLog = new ScanLog({
        scan_id: uuidv4(),
        code_id,
        location,
        device_info: req.headers['user-agent'],
        is_authentic: false
      });
      
      await scanLog.save();
      
      return res.status(400).json({
        success: false,
        message: 'This QR code has already been used'
      });
    }
    
    // Verify key
    if (qrCode.key !== key) {
      // Log scan attempt
      const scanLog = new ScanLog({
        scan_id: uuidv4(),
        code_id,
        location,
        device_info: req.headers['user-agent'],
        is_authentic: false
      });
      
      await scanLog.save();
      
      return res.status(400).json({
        success: false,
        message: 'Invalid key'
      });
    }
    
    // Mark QR code as used
    qrCode.is_used = true;
    qrCode.scanned_at = Date.now();
    qrCode.region = location.region || '';
    
    await qrCode.save();
    
    // Log successful scan
    const scanLog = new ScanLog({
      scan_id: uuidv4(),
      code_id,
      location,
      device_info: req.headers['user-agent'],
      is_authentic: true
    });
    
    await scanLog.save();
    
    return res.status(200).json({
      success: true,
      message: 'Product is genuine',
      product_info: qrCode.product_info
    });
  } catch (error) {
    console.error('Error verifying QR code:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get all QR codes
// @route   GET /api/qrcodes
// @access  Private/Admin
exports.getQRCodes = async (req, res) => {
  try {
    const qrCodes = await QRCode.find().sort({ created_at: -1 });
    
    return res.status(200).json({
      success: true,
      count: qrCodes.length,
      data: qrCodes
    });
  } catch (error) {
    console.error('Error getting QR codes:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// @desc    Get scan statistics
// @route   GET /api/qrcodes/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
  try {
    const totalQRCodes = await QRCode.countDocuments();
    const usedQRCodes = await QRCode.countDocuments({ is_used: true });
    const totalScans = await ScanLog.countDocuments();
    const authenticScans = await ScanLog.countDocuments({ is_authentic: true });
    
    // Get regional data
    const regionalData = await QRCode.aggregate([
      { $match: { is_used: true } },
      { $group: { _id: '$region', count: { $sum: 1 } } }
    ]);
    
    return res.status(200).json({
      success: true,
      data: {
        totalQRCodes,
        usedQRCodes,
        unusedQRCodes: totalQRCodes - usedQRCodes,
        usagePercentage: (usedQRCodes / totalQRCodes) * 100,
        totalScans,
        authenticScans,
        counterfeitScanAttempts: totalScans - authenticScans,
        regionalData
      }
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
}; 