import axios from 'axios';

// Base URL for the API
const BASE_URL = '/api';

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Generate QR codes
 * @param {number} count - Number of QR codes to generate
 * @param {Object} productInfo - Product information to associate with the QR codes
 * @returns {Promise<Object>} - Generated QR codes
 */
export const generateQRCodes = async (count, productInfo = {}) => {
  try {
    const response = await api.post('/qrcodes/generate', { count, productInfo });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

/**
 * Get all QR codes
 * @returns {Promise<Object>} - All QR codes
 */
export const getQRCodes = async () => {
  try {
    const response = await api.get('/qrcodes');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

/**
 * Get scan statistics
 * @returns {Promise<Object>} - Scan statistics
 */
export const getStats = async () => {
  try {
    const response = await api.get('/qrcodes/stats');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default api; 