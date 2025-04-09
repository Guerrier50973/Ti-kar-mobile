// 📄 screens/SoundTestScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { playSound } from '../utils/playSound';

// 🔊 Import des sons
import demandeSound from '../assets/demande-vtc.wav';
import klaxonSound from '../assets/klaxon.wav';
import confirmationSound from '../assets/confirmation.wav';
import notificationSound from '../assets/notification.wav'; // ✅ ajouté

const SoundTestScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔊 Test des sons</Text>

      <Button title="📢 Demande VTC" onPress={() => playSound(demandeSound)} />
      <View style={{ height: 10 }} />
      <Button title="🚕 Klaxon (Covoiturage)" onPress={() => playSound(klaxonSound)} />
      <View style={{ height: 10 }} />
      <Button title="✅ Confirmation" onPress={() => playSound(confirmationSound)} />
      <View style={{ height: 10 }} />
      <Button title="📲 Notification" onPress={() => playSound(notificationSound)} />
    </View>
  );
};

export default SoundTestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
});
