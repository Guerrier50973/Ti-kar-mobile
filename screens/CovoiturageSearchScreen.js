import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Voiture Ti-Kar */}
      <Image
        source={require('../assets/car.png')}
        style={styles.carImage}
      />

      <Text style={styles.title}>Bienvenue sur Ti-Kar</Text>
      <Text style={styles.subtitle}>Choisissez un mode de transport :</Text>

      {/* Covoiturage */}
      <TouchableOpacity
        style={[styles.button, styles.covoiturage]}
        onPress={() => navigation.navigate('CovoiturageSearchScreen')}
      >
        <Text style={styles.buttonText}>🚗 Covoiturage</Text>
        <Text style={styles.buttonSub}>Passagers & Chauffeurs particuliers</Text>
      </TouchableOpacity>

      {/* VTC Pro */}
      <TouchableOpacity
        style={[styles.button, styles.vtc]}
        onPress={() => navigation.navigate('CityRideScreen')}
      >
        <Text style={styles.buttonText}>🚕 VTC Professionnel</Text>
        <Text style={styles.buttonSub}>Chauffeurs avec documents validés</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  carImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
    color: '#555',
  },
  button: {
    width: '90%',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonSub: {
    fontSize: 12,
    color: '#fff',
    marginTop: 4,
  },
  covoiturage: {
    backgroundColor: '#28a745',
  },
  vtc: {
    backgroundColor: '#007bff',
  },
});
