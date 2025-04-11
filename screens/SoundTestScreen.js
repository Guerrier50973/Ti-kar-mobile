// 📄 screens/SoundTestScreen.js
import React, { useState, useRef } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

// 🔊 Import des sons
import demandeSound from '../assets/demande-vtc.mp3';
import klaxonSound from '../assets/klaxon.mp3';
import confirmationSound from '../assets/confirmation.mp3';
import notificationSound from '../assets/notification.mp3';

const SoundTestScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const currentSound = useRef(null);

  const playSound = async (soundFile) => {
    try {
      // Stop current sound if playing
      if (currentSound.current) {
        await currentSound.current.unloadAsync();
        currentSound.current = null;
      }

      const { sound } = await Audio.Sound.createAsync(soundFile);
      currentSound.current = sound;
      setIsPlaying(true);

      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish) {
          await sound.unloadAsync();
          currentSound.current = null;
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error('❌ Erreur lecture son :', error.message || error);
    }
  };

  const stopSound = async () => {
    try {
      if (currentSound.current) {
        await currentSound.current.stopAsync();
        await currentSound.current.unloadAsync();
        currentSound.current = null;
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('❌ Erreur arrêt son :', error.message || error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔊 Test des sons</Text>

      <Button title="📢 Demande VTC" onPress={() => playSound(demandeSound)} />
      <View style={styles.spacer} />
      <Button title="🚕 Klaxon (Covoiturage)" onPress={() => playSound(klaxonSound)} />
      <View style={styles.spacer} />
      <Button title="✅ Confirmation" onPress={() => playSound(confirmationSound)} />
      <View style={styles.spacer} />
      <Button title="📲 Notification" onPress={() => playSound(notificationSound)} />
      <View style={styles.spacer} />

      {isPlaying && (
        <Button title="⛔️ Stopper le son" color="red" onPress={stopSound} />
      )}
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
  spacer: {
    height: 10,
  },
});
