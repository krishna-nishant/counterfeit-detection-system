import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions } from 'react-native';
import { Button, Title, Text, Card, useTheme, Surface } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Surface style={styles.header}>
        <Title style={styles.title}>Counterfeit Product Detection</Title>
        <Text style={styles.subtitle}>Verify your product authenticity with confidence</Text>
      </Surface>

      <Card style={styles.card} elevation={1}>
        <Card.Cover
          source={require('../assets/qr-code.png')}
          style={styles.cardImage}
          resizeMode="contain"
        />
        <Card.Content style={styles.cardContent}>
          <Title style={styles.cardTitle}>How it works</Title>
          <Text style={styles.cardText}>
            This app helps you verify if a product is genuine by scanning the QR code on the product packaging.
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.card} elevation={1}>
        <Card.Content style={styles.cardContent}>
          <Title style={styles.cardTitle}>Instructions</Title>

          <View style={styles.instructionItem}>
            <MaterialCommunityIcons name="numeric-1-circle" size={24} color={theme.colors.primary} />
            <Text style={styles.instructionText}>Look for the QR code on the product packaging</Text>
          </View>

          <View style={styles.instructionItem}>
            <MaterialCommunityIcons name="numeric-2-circle" size={24} color={theme.colors.primary} />
            <Text style={styles.instructionText}>Remove the scratch label over the QR code</Text>
          </View>

          <View style={styles.instructionItem}>
            <MaterialCommunityIcons name="numeric-3-circle" size={24} color={theme.colors.primary} />
            <Text style={styles.instructionText}>Press the "Scan QR Code" button below</Text>
          </View>

          <View style={styles.instructionItem}>
            <MaterialCommunityIcons name="numeric-4-circle" size={24} color={theme.colors.primary} />
            <Text style={styles.instructionText}>Point your camera at the QR code</Text>
          </View>

          <View style={styles.instructionItem}>
            <MaterialCommunityIcons name="numeric-5-circle" size={24} color={theme.colors.primary} />
            <Text style={styles.instructionText}>Get instant verification result</Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon={({ size, color }) => (
            <MaterialCommunityIcons name="qrcode-scan" size={size} color={color} />
          )}
          onPress={() => navigation.navigate('Scanner')}
          style={styles.button}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Scan QR Code
        </Button>
      </View>

      <Card style={styles.card} elevation={1}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.warningHeader}>
            <MaterialCommunityIcons name="alert-circle" size={24} color={theme.colors.error} />
            <Title style={[styles.cardTitle, { color: theme.colors.error }]}>Important Note</Title>
          </View>
          <Text style={styles.cardText}>
            If the QR code is already scratched or tampered with, the product might be counterfeit.
            Do not purchase such products.
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  contentContainer: {
    paddingBottom: 24,
  },
  header: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: 'transparent',
    elevation: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 24,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#ffffff',
    borderColor: '#e5e7eb',
    borderWidth: 1,
  },
  cardContent: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 22,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  instructionText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#4b5563',
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  button: {
    borderRadius: 12,
    elevation: 2,
  },
  buttonContent: {
    height: 56,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  cardImage: {
    height: 180,
    backgroundColor: '#f3f4f6',
  },
  warningHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  footerText: {
    color: '#6b7280',
    fontSize: 14,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
});

export default HomeScreen;