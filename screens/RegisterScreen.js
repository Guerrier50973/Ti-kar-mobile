import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { AuthContext } from '../context/AuthContext';
import styles from './styles';

const RegisterScreen = ({ navigation }) => {
  const { register } = useContext(AuthContext);
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motdepasse, setMotdepasse] = useState('');
  const [role, setRole] = useState('passager');

  // Docs pour chauffeur
  const [permis, setPermis] = useState(null);
  const [assurance, setAssurance] = useState(null);
  const [carteGrise, setCarteGrise] = useState(null);
  const [photoVoiture, setPhotoVoiture] = useState(null);

  const pickImage = async (setter) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setter(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
    if (!nom || !email || !motdepasse) {
      Alert.alert('Champs requis', 'Remplis tous les champs obligatoires');
      return;
    }

    // Vérification si chauffeur → docs obligatoires
    if (role === 'chauffeur' && (!permis || !assurance || !carteGrise || !photoVoiture)) {
      Alert.alert('Documents requis', 'Tous les documents doivent être fournis pour les chauffeurs');
      return;
    }

    try {
      await register(nom, email, motdepasse, role, {
        permis,
        assurance,
        carteGrise,
        photoVoiture,
      });
    } catch (err) {
      console.log(err);
      Alert.alert("Erreur", "Échec de l'inscription. Réessaye.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un compte</Text>

      <TextInput style={styles.input} placeholder="Nom" onChangeText={setNom} value={nom} />
      <TextInput style={styles.input} placeholder="Email" onChangeText={setEmail} value={email} keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Mot de passe" onChangeText={setMotdepasse} value={motdepasse} secureTextEntry />

      <View style={styles.roleContainer}>
        <TouchableOpacity onPress={() => setRole('passager')} style={[styles.roleButton, role === 'passager' && styles.active]}>
          <Text>Passager</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRole('chauffeur')} style={[styles.roleButton, role === 'chauffeur' && styles.active]}>
          <Text>Chauffeur</Text>
        </TouchableOpacity>
      </View>

      {role === 'chauffeur' && (
        <>
          <Text style={styles.subTitle}>Documents requis</Text>

          <Button title="Téléverser le permis de conduire" onPress={() => pickImage(setPermis)} />
          {permis && <Image source={{ uri: permis }} style={styles.docPreview} />}

          <Button title="Téléverser la carte grise" onPress={() => pickImage(setCarteGrise)} />
          {carteGrise && <Image source={{ uri: carteGrise }} style={styles.docPreview} />}

          <Button title="Téléverser l'assurance véhicule" onPress={() => pickImage(setAssurance)} />
          {assurance && <Image source={{ uri: assurance }} style={styles.docPreview} />}

          <Button title="Photo du véhicule" onPress={() => pickImage(setPhotoVoiture)} />
          {photoVoiture && <Image source={{ uri: photoVoiture }} style={styles.docPreview} />}
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Déjà un compte ? Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
