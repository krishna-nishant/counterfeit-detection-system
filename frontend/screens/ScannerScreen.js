import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Text, ActivityIndicator, useTheme } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Location from 'expo-location';
import axios from 'axios';

// API URL (replace with your server URL in production)
const API_URL = 'http://192.168.197.5:3001/api/qrcodes/verify';

const ScannerScreen = ({ navigation }) => {
  const theme = useTheme();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Request camera permission
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    // Request location permission
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status === 'granted') {
        try {
          const location = await Location.getCurrentPositionAsync({});
          const geocode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
          });
          
          setLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            region: geocode[0]?.region || geocode[0]?.city || 'Unknown'
          });
        } catch (error) {
          console.error('Error getting location:', error);
        }
      }
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    try {
      setScanned(true);
      setLoading(true);
      
      // Parse the QR code data
      const qrData = JSON.parse(data);
      
      if (!qrData.code_id || !qrData.key) {
        Alert.alert('Invalid QR Code', 'This QR code does not contain valid product verification data.');
        setLoading(false);
        return;
      }
      
      // Send verification request to server
      const response = await axios.post(API_URL, {
        code_id: qrData.code_id,
        key: qrData.key,
        location: location || {}
      });
      
      setLoading(false);
      
      // Navigate to result screen with the verification result
      navigation.navigate('Result', {
        success: response.data.success,
        message: response.data.message,
        product_info: response.data.product_info || {}
      });
    } catch (error) {
      setLoading(false);
      
      if (error.response) {
        // Server responded with error
        navigation.navigate('Result', {
          success: false,
          message: error.response.data.message || 'Verification failed',
          error: true
        });
      } else {
        // Network error or invalid QR code format
        Alert.alert(
          'Error',
          'There was a problem verifying the product. Please try again.'
        );
      }
    }
  };

  // Handle permission states
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera. Please enable camera permission in your device settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      
      {!scanned && (
        <View style={styles.overlay}>
          <View style={styles.scannerBox} />
          <Text style={styles.instructions}>
            Position the QR code within the frame to scan
          </Text>
        </View>
      )}
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Verifying product...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerBox: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10,
    backgroundColor: 'transparent',
  },
  instructions: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 5,
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
  },
});

export default ScannerScreen; 