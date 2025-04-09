import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // supprime le token
    navigation.replace('Login'); // redirige vers la page login
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Mon profil</Text>
      <Text style={styles.subtitle}>Bienvenue sur Ti-Kar !</Text>

      <View style={{ marginTop: 30 }}>
        <Button title="Se déconnecter" onPress={handleLogout} color="tomato" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default ProfileScreen;
