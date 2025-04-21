import axios from 'axios';

// Base URL - change this to your production API URL
const BASE_URL = 'http://192.168.197.5:3001/api';

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Verify QR code
export const verifyQRCode = async (codeData, locationData) => {
  try {
    const response = await api.post('/qrcodes/verify', {
      code_id: codeData.code_id,
      key: codeData.key,
      location: locationData
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export default api; 