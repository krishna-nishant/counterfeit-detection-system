import React from 'react';
import { 
  Box,
  Button,
  Card, 
  CardActionArea, 
  CardContent, 
  Container, 
  Grid, 
  Paper, 
  Typography 
} from '@mui/material';
import QrCodeIcon from '@mui/icons-material/QrCode';
import BarChartIcon from '@mui/icons-material/BarChart';
import SecurityIcon from '@mui/icons-material/Security';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Counterfeit Product Detection System
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          An admin dashboard to generate QR codes and monitor product verification statistics.
        </Typography>
      </Box>

      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          mb: 4, 
          backgroundImage: 'linear-gradient(to right, #3a7bd5, #00d2ff)',
          color: 'white'
        }}
      >
        <Typography variant="h5" gutterBottom>
          Welcome to the Admin Dashboard
        </Typography>
        <Typography variant="body1" paragraph>
          This dashboard helps you generate secure one-time QR codes for your products and track verification statistics.
          Apply these QR codes to your product packaging along with scratch labels to prevent counterfeit products.
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          size="large"
          onClick={() => navigate('/generate')}
          sx={{ mt: 1 }}
        >
          Generate QR Codes
        </Button>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea onClick={() => navigate('/generate')}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <QrCodeIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="div" gutterBottom>
                  Generate QR Codes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create unique one-time QR codes to apply on your product packaging.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardActionArea onClick={() => navigate('/stats')}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <BarChartIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" component="div" gutterBottom>
                  View Statistics
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Monitor verification statistics and detect suspicious activities.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          How It Works
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <QrCodeIcon sx={{ fontSize: 30, color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" component="div">
                    Step 1: Generate QR Codes
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Generate unique QR codes with corresponding keys that are stored in the database.
                  Each QR code contains a unique ID and a secure key.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SecurityIcon sx={{ fontSize: 30, color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" component="div">
                    Step 2: Apply on Products
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Print and apply the QR codes on product packaging with a scratch label over them.
                  The scratch label prevents the QR code from being scanned before purchase.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <InfoIcon sx={{ fontSize: 30, color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" component="div">
                    Step 3: Monitor Verification
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Track verification statistics, including authentic scans, counterfeit attempts,
                  and regional distribution of your products.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard; 