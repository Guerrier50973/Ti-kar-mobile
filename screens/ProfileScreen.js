import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const { logout, userInfo } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Mon profil</Text>

      {userInfo ? (
        <>
          <Text style={styles.label}>Nom :</Text>
          <Text style={styles.value}>{userInfo.nom}</Text>

          <Text style={styles.label}>Email :</Text>
          <Text style={styles.value}>{userInfo.email}</Text>

          <Text style={styles.label}>Rôle :</Text>
          <Text style={styles.value}>{userInfo.role}</Text>
        </>
      ) : (
        <Text style={{ marginTop: 20 }}>Chargement des informations...</Text>
      )}

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
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#444',
  },
});

export default ProfileScreen;
