import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardMedia, 
  CircularProgress, 
  Container, 
  FormControl,
  FormHelperText,
  Grid, 
  InputLabel, 
  MenuItem, 
  Paper,
  Select,
  TextField, 
  Typography 
} from '@mui/material';
import { generateQRCodes } from '../services/api';
import { useReactToPrint } from 'react-to-print';

const QRCodeGenerator = () => {
  const [count, setCount] = useState(10);
  const [productCategory, setProductCategory] = useState('');
  const [productName, setProductName] = useState('');
  const [productId, setProductId] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedCodes, setGeneratedCodes] = useState([]);
  const printRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const productInfo = {
        name: productName,
        category: productCategory,
        id: productId,
        generated_at: new Date().toISOString()
      };
      
      const response = await generateQRCodes(count, productInfo);
      setGeneratedCodes(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error generating QR codes:', error);
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Generate QR Codes
        </Typography>
        <Typography variant="body1" paragraph>
          Generate unique QR codes to apply on product packaging. Each QR code can only be used once for verification.
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Number of QR Codes"
                type="number"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                fullWidth
                required
                inputProps={{ min: 1, max: 1000 }}
                helperText="Maximum 1000 codes at once"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Product Category</InputLabel>
                <Select
                  value={productCategory}
                  onChange={(e) => setProductCategory(e.target.value)}
                  label="Product Category"
                >
                  <MenuItem value="electronics">Electronics</MenuItem>
                  <MenuItem value="fashion">Fashion</MenuItem>
                  <MenuItem value="beauty">Beauty</MenuItem>
                  <MenuItem value="pharmaceutical">Pharmaceutical</MenuItem>
                  <MenuItem value="food">Food & Beverages</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                <FormHelperText>Category of the product</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Product ID"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button 
                type="submit" 
                variant="contained" 
                size="large" 
                disabled={loading}
                sx={{ mr: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Generate QR Codes'}
              </Button>
              
              {generatedCodes.length > 0 && (
                <Button 
                  variant="outlined" 
                  size="large" 
                  onClick={handlePrint}
                >
                  Print QR Codes
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      {generatedCodes.length > 0 && (
        <Paper elevation={3} sx={{ p: 4 }} ref={printRef}>
          <Typography variant="h5" gutterBottom>
            Generated QR Codes
          </Typography>
          <Typography variant="body2" paragraph>
            Print these QR codes and apply them on product packaging with a scratch label.
          </Typography>
          
          <Grid container spacing={2}>
            {generatedCodes.map((code, index) => (
              <Grid item xs={6} sm={4} md={3} key={code.code_id}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia 
                    component="img"
                    image={code.qrCodeImage}
                    alt={`QR Code ${index + 1}`}
                  />
                  <Box sx={{ p: 1, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Code #{index + 1}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      )}
    </Container>
  );
};

export default QRCodeGenerator; 