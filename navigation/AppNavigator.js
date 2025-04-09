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
import MyTrajetsScreen from '../screens/MyTrajetsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChauffeurHome from '../screens/ChauffeurHome';
import SoundTestScreen from '../screens/SoundTestScreen';
import TrajetConfirmationScreen from '../screens/TrajetConfirmationScreen'; // ✅ Ajout pour le résumé après création

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ✅ Onglets principaux visibles après connexion
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
      <Tab.Screen name="Profil" component={ProfileScreen} />
      <Tab.Screen name="Sons" component={SoundTestScreen} />
    </Tab.Navigator>
  );
};

// ✅ Navigation globale
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* 🔐 Auth */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />

        {/* 🔁 Accès principal */}
        <Stack.Screen
          name="Main"
          component={MainTabs}
          options={{ headerShown: false }}
        />

        {/* 🚖 Chauffeur page dédiée */}
        <Stack.Screen
          name="ChauffeurHome"
          component={ChauffeurHome}
          options={{ headerShown: false }}
        />

        {/* ✅ Résumé du trajet après création */}
        <Stack.Screen
          name="TrajetConfirmation"
          component={TrajetConfirmationScreen}
          options={{ title: 'Résumé de votre trajet' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
