import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';
import { LogBox } from 'react-native';
import * as Audio from 'expo-av/build/Audio'; // ⚠️ RESTE AVEC CET IMPORT

export default function App() {
  useEffect(() => {
    const configureAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: false,
          playsInSilentModeIOS: true,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
        console.log('🎧 Audio config OK');
      } catch (e) {
        console.log('❌ Erreur audio dans App :', e.message || e);
      }
    };

    configureAudio();

    LogBox.ignoreLogs([
      'Setting a timer',
      'Non-serializable values were found in the navigation state',
    ]);
  }, []);

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
