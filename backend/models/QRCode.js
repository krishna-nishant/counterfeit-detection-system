const mongoose = require('mongoose');

const QRCodeSchema = new mongoose.Schema({
  code_id: {
    type: String,
    required: true,
    unique: true
  },
  key: {
    type: String,
    required: true,
    unique: true
  },
  is_used: {
    type: Boolean,
    default: false
  },
  product_info: {
    type: Object,
    default: {}
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  scanned_at: {
    type: Date,
    default: null
  },
  region: {
    type: String,
    default: ''
  }
});

module.exports = mongoose.model('QRCode', QRCodeSchema); 