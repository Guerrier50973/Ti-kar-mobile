import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Button, Alert } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const TrajetsDispoScreen = () => {
  const { userToken } = useContext(AuthContext);
  const [trajets, setTrajets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrajets = async () => {
    try {
      const res = await axios.get('http://192.168.1.173:3000/api/trajets/covoiturage', {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      setTrajets(res.data.trajets);
    } catch (error) {
      console.error('❌ Erreur lors du chargement des trajets :', error.message);
    } finally {
      setLoading(false);
    }
  };

  const reserverTrajet = async (trajetId) => {
    try {
      const res = await axios.post(
        `http://192.168.1.173:3000/api/reservations/${trajetId}`,
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      Alert.alert('✅ Réservé', 'Trajet réservé avec succès !');
    } catch (error) {
      console.error('❌ Erreur de réservation :', error.response?.data || error.message);
      Alert.alert('Erreur', 'Impossible de réserver ce trajet.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>
        {item.lieuDepart} → {item.lieuArrivee}
      </Text>
      <Text>Date : {item.date}</Text>
      <Text>Heure : {item.heure}</Text>
      <Text>Places : {item.places}</Text>
      {item.prix && <Text>Prix : {item.prix} €</Text>}

      <Button title="🛎️ Réserver ce trajet" onPress={() => reserverTrajet(item._id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📍 Trajets disponibles</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={trajets}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default TrajetsDispoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f1f1f1',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
});
