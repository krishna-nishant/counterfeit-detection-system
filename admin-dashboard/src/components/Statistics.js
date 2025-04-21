import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  CircularProgress, 
  Container, 
  Grid, 
  Paper,
  Typography 
} from '@mui/material';
import { getStats } from '../services/api';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistics = () => {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await getStats();
        setStatsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching statistics:', error);
        setError('Failed to load statistics. Please try again later.');
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // Prepare data for QR code usage chart
  const qrCodeUsageData = {
    labels: ['Used', 'Unused'],
    datasets: [
      {
        data: [statsData.usedQRCodes, statsData.unusedQRCodes],
        backgroundColor: ['#4caf50', '#2196f3'],
        hoverBackgroundColor: ['#388e3c', '#1976d2'],
      },
    ],
  };

  // Prepare data for scan statistics chart
  const scanStatsData = {
    labels: ['Authentic Scans', 'Counterfeit Scan Attempts'],
    datasets: [
      {
        data: [statsData.authenticScans, statsData.counterfeitScanAttempts],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverBackgroundColor: ['#388e3c', '#d32f2f'],
      },
    ],
  };

  // Prepare data for regional distribution
  const regions = statsData.regionalData.map(item => item._id || 'Unknown');
  const regionCounts = statsData.regionalData.map(item => item.count);

  const regionalData = {
    labels: regions,
    datasets: [
      {
        label: 'Number of Scans',
        data: regionCounts,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>
        Dashboard Statistics
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total QR Codes
              </Typography>
              <Typography variant="h4">
                {statsData.totalQRCodes}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Used QR Codes
              </Typography>
              <Typography variant="h4">
                {statsData.usedQRCodes}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {Math.round(statsData.usagePercentage)}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Scans
              </Typography>
              <Typography variant="h4">
                {statsData.totalScans}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Counterfeit Attempts
              </Typography>
              <Typography variant="h4" color="error">
                {statsData.counterfeitScanAttempts}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              QR Code Usage
            </Typography>
            <Box sx={{ height: 300 }}>
              <Pie data={qrCodeUsageData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Scan Statistics
            </Typography>
            <Box sx={{ height: 300 }}>
              <Pie data={scanStatsData} options={{ maintainAspectRatio: false }} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Regional Distribution
            </Typography>
            <Box sx={{ height: 400 }}>
              <Bar 
                data={regionalData} 
                options={{ 
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Number of Scans'
                      }
                    },
                    x: {
                      title: {
                        display: true,
                        text: 'Region'
                      }
                    }
                  }
                }} 
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Statistics; 