import React, { useEffect, useState, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const MyTrajetsScreen = () => {
  const { token } = useContext(AuthContext);
  const [mesTrajets, setMesTrajets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMesTrajets = async () => {
    try {
      const res = await axios.get('http://192.168.1.173:3000/api/trajets/mes-trajets', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMesTrajets(res.data);
    } catch (err) {
      console.error(err);
      Alert.alert('Erreur', 'Impossible de charger vos trajets');
    } finally {
      setLoading(false);
    }
  };

  const supprimerTrajet = async (id) => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer ce trajet ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`http://192.168.1.173:3000/api/trajets/${id}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              Alert.alert("Trajet supprimé ✅");
              fetchMesTrajets(); // recharge la liste
            } catch (err) {
              console.error(err);
              Alert.alert("Erreur", "Impossible de supprimer ce trajet.");
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchMesTrajets();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Chargement de vos trajets...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes trajets</Text>
      {mesTrajets.length === 0 ? (
        <Text style={styles.empty}>Aucun trajet trouvé.</Text>
      ) : (
        <FlatList
          data={mesTrajets}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.trajetCard}>
              <Text style={styles.destination}>
                🛣️ {item.depart} → {item.destination}
              </Text>
              <Text>📅 Date : {item.date}</Text>
              <Text>
                💰 Prix : {item.prix ? `${item.prix}€` : 'Non précisé'}
              </Text>

              <View style={{ marginTop: 10 }}>
                <Button
                  title="Supprimer"
                  color="red"
                  onPress={() => supprimerTrajet(item._id)}
                />
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  trajetCard: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  destination: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  loader: {
    marginTop: 100,
    alignItems: 'center',
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
    color: '#888',
  },
});

export default MyTrajetsScreen;
