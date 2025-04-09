import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const TrajetConfirmationScreen = ({ route, navigation }) => {
  const { trajet } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✅ Trajet créé avec succès</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>🗺️ Départ :</Text>
        <Text style={styles.value}>{trajet.lieuDepart}</Text>

        <Text style={styles.label}>🏁 Arrivée :</Text>
        <Text style={styles.value}>{trajet.lieuArrivee}</Text>

        <Text style={styles.label}>📅 Date :</Text>
        <Text style={styles.value}>{new Date(trajet.date).toLocaleDateString()}</Text>

        <Text style={styles.label}>🕒 Heure :</Text>
        <Text style={styles.value}>{trajet.heure}</Text>

        {trajet.places && (
          <>
            <Text style={styles.label}>👥 Places :</Text>
            <Text style={styles.value}>{trajet.places}</Text>
          </>
        )}

        {trajet.prix && (
          <>
            <Text style={styles.label}>💰 Prix :</Text>
            <Text style={styles.value}>{trajet.prix} €</Text>
          </>
        )}

        <Text style={styles.label}>🚗 Type :</Text>
        <Text style={styles.value}>
          {trajet.type === 'vtc' ? 'VTC (Professionnel)' : 'Covoiturage'}
        </Text>
      </View>

      <Button
        title="🔙 Retour aux trajets"
        onPress={() => navigation.navigate('MesTrajets')}
      />
    </View>
  );
};

export default TrajetConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#28a745',
    textAlign: 'center',
    marginBottom: 30,
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 25,
    elevation: 3,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
});
