import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const VTCValidationScreen = () => {
  const { userToken, userInfo } = useContext(AuthContext);
  const [fullName, setFullName] = useState(userInfo?.name || '');
  const [vtcNumber, setVtcNumber] = useState('');
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(null);

  // 📦 Charger statut de validation (fake backend pour test)
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`http://192.168.1.173:3000/api/validation/status`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        setStatus(res.data.status); // Ex: "pending", "approved", "rejected"
      } catch (err) {
        console.log('❌ Erreur statut validation :', err.message);
      }
    };

    fetchStatus();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!fullName || !vtcNumber || !image) {
      return Alert.alert('Champs requis', 'Remplis toutes les infos et ajoute une pièce jointe.');
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('vtcNumber', vtcNumber);
    formData.append('document', {
      uri: image,
      type: 'image/jpeg',
      name: 'vtc-doc.jpg',
    });

    try {
      await axios.post('http://192.168.1.173:3000/api/validation/submit', formData, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      Alert.alert('Envoyé', 'Ta demande a bien été envoyée ✅');
      setStatus('pending');
    } catch (error) {
      console.log('❌ Erreur envoi validation :', error.message);
      Alert.alert('Erreur', 'Impossible d’envoyer la demande.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚖 Validation Chauffeur VTC</Text>

      <TextInput placeholder="Nom complet" value={fullName} onChangeText={setFullName} style={styles.input} />
      <TextInput placeholder="Numéro de permis VTC" value={vtcNumber} onChangeText={setVtcNumber} style={styles.input} />

      <TouchableOpacity onPress={pickImage} style={styles.uploadBtn}>
        <Text style={styles.uploadText}>{image ? '🖼️ Modifier la pièce' : '📎 Ajouter une pièce (photo)'}</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.preview} />}

      <Button title="📤 Envoyer pour validation" onPress={handleSubmit} />

      {status && (
        <View style={styles.statusBox}>
          <Text style={styles.statusText}>
            Statut :{' '}
            {status === 'pending'
              ? '🟡 En attente'
              : status === 'approved'
              ? '✅ Validé'
              : '❌ Refusé'}
          </Text>
        </View>
      )}
    </View>
  );
};

export default VTCValidationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  uploadBtn: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
    alignItems: 'center',
  },
  uploadText: {
    color: '#333',
  },
  preview: {
    width: '100%',
    height: 180,
    marginBottom: 20,
    borderRadius: 8,
  },
  statusBox: {
    marginTop: 25,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
