// 📄 utils/playSound.js
import { Audio } from 'expo-av';

export const playSound = async (soundFile) => {
  try {
    const { sound } = await Audio.Sound.createAsync(soundFile);

    // 🔊 Lecture du son
    await sound.playAsync();
    console.log('▶️ Son lancé');

    // ✅ Décharge automatique après la lecture complète
    sound.setOnPlaybackStatusUpdate(async (status) => {
      if (status.didJustFinish && !status.isLooping) {
        await sound.unloadAsync();
        console.log('🧹 Son déchargé de la mémoire');
      }
    });
  } catch (error) {
    console.error('❌ Erreur lors de la lecture du son :', error);
  }
};
