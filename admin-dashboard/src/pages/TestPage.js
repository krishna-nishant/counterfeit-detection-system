import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { 
  Box, 
  Button, 
  Card, 
  Container, 
  Grid, 
  Paper, 
  TextField, 
  Typography,
  CircularProgress
} from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';

const TestPage = () => {
  const [codeId, setCodeId] = useState('');
  const [key, setKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // Simulating location data
      const location = {
        latitude: 37.7749,
        longitude: -122.4194,
        region: 'California'
      };

      const response = await axios.post('/api/qrcodes/verify', {
        code_id: codeId,
        key: key,
        location: location
      });

      setResult(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
      setLoading(false);
    }
  };

  return (
    <Layout title="Mobile App Simulator">
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Mobile App Simulator
          </Typography>
          <Typography variant="body1" paragraph>
            This page simulates the mobile app's QR code scanning functionality. Enter a QR code ID and key manually to test.
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="QR Code ID"
                  value={codeId}
                  onChange={(e) => setCodeId(e.target.value)}
                  fullWidth
                  required
                  placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="QR Code Key"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  fullWidth
                  required
                  placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                />
              </Grid>
              <Grid item xs={12}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  size="large" 
                  disabled={loading}
                  startIcon={<QrCodeIcon />}
                >
                  {loading ? <CircularProgress size={24} /> : 'Verify QR Code'}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>

        {result && (
          <Paper elevation={3} sx={{ p: 4, bgcolor: '#e8f5e9' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CheckCircleIcon sx={{ color: 'success.main', fontSize: 32, mr: 1 }} />
              <Typography variant="h6">
                {result.message}
              </Typography>
            </Box>
            
            {result.product_info && Object.keys(result.product_info).length > 0 && (
              <Card sx={{ p: 2, mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Product Information:
                </Typography>
                <Grid container spacing={2}>
                  {Object.entries(result.product_info).map(([key, value]) => (
                    <Grid item xs={12} sm={6} key={key}>
                      <Typography variant="body2" color="textSecondary" component="span">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}:
                      </Typography>
                      <Typography variant="body1" component="span" sx={{ ml: 1 }}>
                        {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>
              </Card>
            )}
          </Paper>
        )}

        {error && (
          <Paper elevation={3} sx={{ p: 4, bgcolor: '#ffebee' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ErrorIcon sx={{ color: 'error.main', fontSize: 32, mr: 1 }} />
              <Typography variant="h6" color="error">
                {error}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              This could mean the product is counterfeit, the QR code has already been used, or there was a technical issue.
            </Typography>
          </Paper>
        )}
      </Container>
    </Layout>
  );
};

export default TestPage; 