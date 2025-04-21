import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, useTheme, Button, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ResultScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const { success, message, product_info = {} } = route.params || {};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Surface style={styles.card}>
        <MaterialCommunityIcons
          name={success ? 'check-circle' : 'alert-circle'}
          size={64}
          color={success ? theme.colors.success : theme.colors.error}
        />
        <Text style={[styles.title, { color: success ? theme.colors.success : theme.colors.error }]}>
          {success ? 'Product Verified' : 'Verification Failed'}
        </Text>
        <Text style={styles.message}>{message}</Text>

        {success && (
          <View style={styles.infoSection}>
            <Text style={styles.label}>Product Name</Text>
            <Text style={styles.value}>{product_info.name || 'N/A'}</Text>

            <Text style={styles.label}>Brand</Text>
            <Text style={styles.value}>{product_info.brand || 'N/A'}</Text>

            <Text style={styles.label}>Manufacturing Date</Text>
            <Text style={styles.value}>{product_info.mfg_date || 'N/A'}</Text>

            <Text style={styles.label}>Batch No.</Text>
            <Text style={styles.value}>{product_info.batch_no || 'N/A'}</Text>
          </View>
        )}

        <Button
          mode="contained"
          onPress={() => navigation.navigate('Home')}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
        >
          Scan Another
        </Button>

        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Scanner')}
          style={[styles.button, { borderColor: theme.colors.primary, borderWidth: 1.5 }]}
        >
          Retry
        </Button>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 24,
  },
  card: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
  },
  message: {
    fontSize: 16,
    color: '#4b5563',
    marginVertical: 12,
    textAlign: 'center',
    lineHeight: 22,
  },
  infoSection: {
    marginVertical: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 12,
  },
  button: {
    width: '100%',
    marginTop: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
});

export default ResultScreen;
