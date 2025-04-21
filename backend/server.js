const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Import routes
const qrCodeRoutes = require('./routes/qrCodeRoutes');

// Create Express app
const app = express();

// Middleware
app.use(express.json());

// Configure CORS to allow connections from any device
app.use(cors({
  origin: '*',  // Allow any origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/qrcodes', qrCodeRoutes);

// Database connection
const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        console.log(`MongoDB URI: ${process.env.MONGO_URI}`);
        
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/counterfeit-detection', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000 // 5 seconds timeout
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        console.log('Starting server without MongoDB connection. Some functionality will be limited.');
        // We'll continue without exiting so we can at least test the API
    }
};

// Connect to database
connectDB();

// Test endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    console.log(`Server accessible at http://localhost:${PORT} and http://192.168.197.5:${PORT}`);
}); 