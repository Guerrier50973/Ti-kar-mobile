// 📄 screens/ChauffeurHome.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import socket from '../services/socket';
import axios from 'axios';

const ChauffeurHome = () => {
  const [demandes, setDemandes] = useState([]);
  const [sound, setSound] = useState();

  // 🛎️ Joue le son à chaque nouvelle demande
  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/notification.mp3') // Mets le fichier ici
    );
    setSound(sound);
    await sound.playAsync();
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    socket.connect();

    socket.on('new_trajet', (data) => {
      if (data.type === 'vtc') {
        setDemandes((prev) => [data, ...prev]);
        playSound(); // 📢 Alerte sonore
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const accepterTrajet = async (trajetId) => {
    try {
      await axios.post(`http://192.168.1.173:3000/api/trajets/${trajetId}/reserver`);
      Alert.alert('✅ Réservation réussie');
      setDemandes((prev) => prev.filter((d) => d._id !== trajetId));
    } catch (err) {
      console.error(err);
      Alert.alert('❌ Échec de la réservation');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚗 Demandes en temps réel (VTC)</Text>
      <FlatList
        data={demandes}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>🛫 {item.lieuDepart}</Text>
            <Text>🛬 {item.lieuArrivee}</Text>
            <Text>🕓 {item.heure} | 📆 {item.date}</Text>
            <Button title="✅ Accepter" onPress={() => accepterTrajet(item._id)} />
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Aucune demande pour l’instant</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  card: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f3f3f3',
    marginBottom: 10,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: 'gray',
  },
});

export default ChauffeurHome;
