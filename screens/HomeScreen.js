import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur Ti-Kar</Text>
      <Text style={styles.subtitle}>Choisissez un mode de transport :</Text>

      {/* Logo de voiture */}
      <Image
        source={require('../assets/car.png')}
        style={styles.carImage}
      />

      {/* Bouton Covoiturage */}
      <TouchableOpacity
        style={styles.covoiturageBtn}
        onPress={() => navigation.navigate('CreateTrajet')}
      >
        <Text style={styles.btnText}>🚗 Covoiturage</Text>
        <Text style={styles.btnSub}>Passagers & Chauffeurs particuliers</Text>
      </TouchableOpacity>

      {/* Bouton VTC */}
      <TouchableOpacity
        style={styles.vtcBtn}
        onPress={() => navigation.navigate('VTCValidation')}
      >
        <Text style={styles.btnText}>🚖 VTC Professionnel</Text>
        <Text style={styles.btnSub}>Uniquement pour chauffeurs déclarés</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  carImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  covoiturageBtn: {
    backgroundColor: '#28a745',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
  },
  vtcBtn: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  btnSub: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});
