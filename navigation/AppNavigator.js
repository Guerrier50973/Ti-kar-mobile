import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// 📄 Import des écrans
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import CreateTrajetScreen from '../screens/CreateTrajetScreen';
import VTCValidationScreen from '../screens/VTCValidationScreen';
import MyTrajetsScreen from '../screens/MyTrajetsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChauffeurHome from '../screens/ChauffeurHome';
import SoundTestScreen from '../screens/SoundTestScreen';
import TrajetsDispoScreen from '../screens/TrajetsDispoScreen';
import TrajetConfirmationScreen from '../screens/TrajetConfirmationScreen';
import AdminScreen from '../screens/AdminScreen'; // ✅ Nouvel écran Admin

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Accueil':
              iconName = 'home';
              break;
            case 'Créer':
              iconName = 'add-circle';
              break;
            case 'MesTrajets':
              iconName = 'car';
              break;
            case 'Trajets':
              iconName = 'map';
              break;
            case 'Profil':
              iconName = 'person-circle';
              break;
            case 'Sons':
              iconName = 'volume-high';
              break;
            default:
              iconName = 'apps';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Créer" component={CreateTrajetScreen} />
      <Tab.Screen name="MesTrajets" component={MyTrajetsScreen} />
      <Tab.Screen name="Trajets" component={TrajetsDispoScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
      <Tab.Screen name="Sons" component={SoundTestScreen} />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Authentification */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

        {/* App principale avec onglets */}
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />

        {/* Écrans spécifiques */}
        <Stack.Screen name="ChauffeurHome" component={ChauffeurHome} options={{ headerShown: false }} />
        <Stack.Screen name="TrajetConfirmation" component={TrajetConfirmationScreen} options={{ title: 'Résumé de votre trajet' }} />
        <Stack.Screen name="CreateTrajet" component={CreateTrajetScreen} options={{ title: 'Créer un trajet' }} />
        <Stack.Screen name="VTCValidation" component={VTCValidationScreen} options={{ title: 'Validation VTC' }} />
        <Stack.Screen name="Admin" component={AdminScreen} options={{ title: 'Administration' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
