import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Card, Title, Paragraph, List, Avatar, useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ResultScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const { success, message, product_info = {}, error } = route.params || {};

  const renderProductInfo = () => {
    if (!product_info || Object.keys(product_info).length === 0) {
      return null;
    }

    return (
      <Card style={styles.card}>
        <Card.Content>
          <Title>Product Information</Title>
          {Object.entries(product_info).map(([key, value]) => (
            <List.Item
              key={key}
              title={key.charAt(0).toUpperCase() + key.slice(1).replace('_', ' ')}
              description={value.toString()}
              left={() => <List.Icon icon="information" />}
            />
          ))}
        </Card.Content>
      </Card>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={[styles.resultCard, success ? styles.successCard : styles.errorCard]}>
        <Card.Content style={styles.resultContent}>
          <Avatar.Icon 
            size={80} 
            icon={success ? 'check-circle' : 'alert-circle'} 
            style={{ backgroundColor: 'transparent' }}
            color={success ? theme.colors.success : theme.colors.error}
          />
          <Title style={styles.resultTitle}>{success ? 'Verified' : 'Not Verified'}</Title>
          <Paragraph style={styles.resultMessage}>{message}</Paragraph>
        </Card.Content>
      </Card>

      {success && renderProductInfo()}

      {error && (
        <Card style={styles.card}>
          <Card.Content>
            <List.Item
              title="What does this mean?"
              description="This could mean the product is counterfeit, the QR code has already been used, or there was a technical issue."
              left={() => <List.Icon icon="help-circle" />}
            />
            <List.Item
              title="What should I do?"
              description="If you suspect a counterfeit product, don't purchase it or contact the manufacturer for verification."
              left={() => <List.Icon icon="alert" />}
            />
          </Card.Content>
        </Card>
      )}

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          icon="home"
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
        >
          Back to Home
        </Button>
        <Button
          mode="outlined"
          icon="qrcode-scan"
          onPress={() => navigation.navigate('Scanner')}
          style={styles.button}
        >
          Scan Another
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  resultCard: {
    margin: 15,
    padding: 10,
    elevation: 4,
  },
  successCard: {
    backgroundColor: '#e8f5e9',
  },
  errorCard: {
    backgroundColor: '#ffebee',
  },
  resultContent: {
    alignItems: 'center',
    padding: 20,
  },
  resultTitle: {
    fontSize: 24,
    marginTop: 10,
    fontWeight: 'bold',
  },
  resultMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  card: {
    margin: 15,
    elevation: 3,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15,
    marginBottom: 20,
  },
  button: {
    width: '45%',
  },
});

export default ResultScreen; 