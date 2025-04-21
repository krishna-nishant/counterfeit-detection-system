import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Button, Title, Text, Card, useTheme } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Counterfeit Product Detection</Title>
        <Text style={styles.subtitle}>Verify your product authenticity</Text>
      </View>
      
      <Card style={styles.card}>
        <Card.Cover source={require('../assets/qr-code.png')} style={styles.cardImage} />
        <Card.Content>
          <Title>How it works</Title>
          <Text>
            This app helps you verify if a product is genuine or counterfeit by scanning the QR code on the product packaging.
          </Text>
        </Card.Content>
      </Card>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title>Instructions</Title>
          <Text style={styles.instructionText}>1. Look for the QR code on the product packaging</Text>
          <Text style={styles.instructionText}>2. Remove the scratch label over the QR code</Text>
          <Text style={styles.instructionText}>3. Press the "Scan QR Code" button below</Text>
          <Text style={styles.instructionText}>4. Point your camera at the QR code</Text>
          <Text style={styles.instructionText}>5. Get instant verification result</Text>
        </Card.Content>
      </Card>
      
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="qrcode-scan"
          onPress={() => navigation.navigate('Scanner')}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          labelStyle={styles.buttonLabel}
        >
          Scan QR Code
        </Button>
      </View>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title>Important Note</Title>
          <Text>
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
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  card: {
    margin: 15,
    elevation: 3,
  },
  instructionText: {
    marginVertical: 5,
  },
  buttonContainer: {
    padding: 20,
    alignItems: 'center',
  },
  button: {
    width: '80%',
    padding: 5,
  },
  buttonLabel: {
    fontSize: 16,
    paddingVertical: 5,
  },
  cardImage: {
    height: 200,
    resizeMode: 'contain',
  },
});

export default HomeScreen; 