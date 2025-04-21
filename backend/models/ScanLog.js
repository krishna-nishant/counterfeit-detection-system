const mongoose = require('mongoose');

const ScanLogSchema = new mongoose.Schema({
  scan_id: {
    type: String,
    required: true,
    unique: true
  },
  code_id: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      latitude: Number,
      longitude: Number,
      region: String
    },
    default: {}
  },
  device_info: {
    type: Object,
    default: {}
  },
  is_authentic: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model('ScanLog', ScanLogSchema); 