import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Dimensions, Animated } from 'react-native';
import { Text, ActivityIndicator, useTheme, Surface } from 'react-native-paper';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Location from 'expo-location';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// API URL (replace with your server URL in production)
const API_URL = 'http://192.168.197.5:3001/api/qrcodes/verify';

const { width } = Dimensions.get('window');
const scannerSize = width * 0.7;

const ScannerScreen = ({ navigation }) => {
  const theme = useTheme();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  // Animation for scanner frame
  const pulseAnim = new Animated.Value(0);

  useEffect(() => {
    // Start pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

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

  // Scale animation for the scanner frame
  const borderScale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1]
  });

  // Handle permission states
  if (hasPermission === null) {
    return (
      <View style={styles.permissionContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.permissionText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <MaterialCommunityIcons name="camera-off" size={64} color={theme.colors.error} />
        <Text style={styles.permissionTitle}>Camera Access Required</Text>
        <Text style={styles.permissionText}>
          No access to camera. Please enable camera permission in your device settings.
        </Text>
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
          <Animated.View
            style={[
              styles.scannerBox,
              {
                transform: [{ scale: borderScale }],
                borderColor: theme.colors.primary,
              }
            ]}
          />

          <Surface style={styles.instructionsContainer}>
            <MaterialCommunityIcons name="qrcode-scan" size={20} color={theme.colors.primary} />
            <Text style={styles.instructions}>
              Position the QR code within the frame to scan
            </Text>
          </Surface>
        </View>
      )}

      {loading && (
        <View style={styles.loadingContainer}>
          <Surface style={styles.loadingCard}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Verifying product...</Text>
          </Surface>
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
    width: scannerSize,
    height: scannerSize,
    borderWidth: 2,
    borderRadius: 24,
    backgroundColor: 'transparent',
  },
  instructionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    elevation: 4,
  },
  instructions: {
    color: '#1f2937',
    fontSize: 14,
    marginLeft: 8,
    fontWeight: '500',
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
  loadingCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 8,
  },
  loadingText: {
    color: '#1f2937',
    fontSize: 16,
    marginTop: 16,
    fontWeight: '500',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f9fafb',
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  permissionText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#4b5563',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default ScannerScreen;