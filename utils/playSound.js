// 📄 utils/playSound.js
import { Audio } from 'expo-av';

export const playSound = async (soundFile) => {
  try {
    const { sound } = await Audio.Sound.createAsync(soundFile);
    await sound.playAsync();

    // Optionnel : décharger le son après lecture
    sound.setOnPlaybackStatusUpdate((status) => {
      if (status.didJustFinish) {
        sound.unloadAsync();
      }
    });
  } catch (error) {
    console.log('❌ Erreur lors de la lecture du son :', error);
  }
};
