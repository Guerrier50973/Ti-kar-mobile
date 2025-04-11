import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CreateTrajetScreen = ({ navigation }) => {
  const { userToken, userInfo } = useContext(AuthContext);
  const [lieuDepart, setLieuDepart] = useState('');
  const [lieuArrivee, setLieuArrivee] = useState('');
  const [date, setDate] = useState('');
  const [heure, setHeure] = useState('');
  const [places, setPlaces] = useState('');
  const [prix, setPrix] = useState('');

  const isVtc = userInfo?.role === 'vtc';

  // ✅ Fonctions de validation
  const isValidDate = (input) => /^\d{4}-\d{2}-\d{2}$/.test(input); // YYYY-MM-DD
  const isValidHeure = (input) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(input); // HH:mm

  const handleCreate = async () => {
    // ✅ Vérif des champs requis
    if (!lieuDepart || !lieuArrivee || !date || !heure) {
      return Alert.alert('Champs requis', 'Veuillez remplir tous les champs.');
    }

    // ✅ Vérif format date
    if (!isValidDate(date)) {
      return Alert.alert('Format invalide', '📅 La date doit être au format : YYYY-MM-DD (ex: 2025-04-10)');
    }

    // ✅ Vérif format heure
    if (!isValidHeure(heure)) {
      return Alert.alert('Format invalide', '🕒 L’heure doit être au format : HH:mm (ex: 14:00)');
    }

    // ✅ Vérif places si covoiturage
    if (!isVtc && !places) {
      return Alert.alert('Places manquantes', 'Indique le nombre de places pour le covoiturage.');
    }

    try {
      const payload = {
        lieuDepart,
        lieuArrivee,
        date,
        heure,
        ...(prix && { prix: parseFloat(prix) }),
        ...(!isVtc && { places: parseInt(places) }),
      };

      const route = isVtc ? 'vtc' : 'covoiturage';

      console.log('📦 Payload envoyé :', payload);

      const res = await axios.post(
        `http://192.168.1.173:3000/api/trajets/${route}`,
        payload,
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      navigation.navigate('TrajetConfirmation', { trajet: res.data.trajet });
    } catch (err) {
      console.error('❌ Erreur createTrajet :', JSON.stringify(err.response?.data, null, 2));
      Alert.alert('Erreur', err.response?.data?.message || 'Impossible de créer le trajet.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isVtc ? '🚘 Trajet VTC (Professionnel)' : '🤝 Trajet Covoiturage'}
      </Text>

      <TextInput placeholder="Ville de départ" value={lieuDepart} onChangeText={setLieuDepart} style={styles.input} />
      <TextInput placeholder="Ville d’arrivée" value={lieuArrivee} onChangeText={setLieuArrivee} style={styles.input} />
      <TextInput placeholder="Date (ex: 2025-04-10)" value={date} onChangeText={setDate} style={styles.input} />
      <TextInput placeholder="Heure (ex: 14:00)" value={heure} onChangeText={setHeure} style={styles.input} />

      {!isVtc && (
        <TextInput
          placeholder="Places disponibles"
          value={places}
          onChangeText={setPlaces}
          style={styles.input}
          keyboardType="numeric"
        />
      )}

      <TextInput
        placeholder="Prix (optionnel)"
        value={prix}
        onChangeText={setPrix}
        style={styles.input}
        keyboardType="numeric"
      />

      <Button title="Créer le trajet" onPress={handleCreate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default CreateTrajetScreen;
