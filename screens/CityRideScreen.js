// screens/CityRideScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function CityRideScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course en ville (VTC)</Text>
      <Text style={styles.subtitle}>🚕 Réservez un trajet rapide en ville</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Commander une course</Text>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    color: '#666',
  },
  button: {
    backgroundColor: '#0052cc',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
