import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // 🔄 Récupérer les infos utilisateur depuis /me
  const fetchUserProfile = async (token) => {
    try {
      const res = await axios.get('http://192.168.1.173:3000/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserInfo(res.data);
      await AsyncStorage.setItem('user', JSON.stringify(res.data));
    } catch (error) {
      console.log('Erreur récupération profil:', error.response?.data || error.message);
    }
  };

  // 🔐 Inscription (chauffeur ou passager)
  const register = async (nom, email, motdepasse, role, docs = {}) => {
    try {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('email', email);
      formData.append('motDePasse', motdepasse);
      formData.append('role', role);

      if (role === 'chauffeur') {
        if (docs.permis)
          formData.append('permis', {
            uri: docs.permis,
            name: 'permis.jpg',
            type: 'image/jpeg',
          });

        if (docs.assurance)
          formData.append('assurance', {
            uri: docs.assurance,
            name: 'assurance.jpg',
            type: 'image/jpeg',
          });

        if (docs.carteGrise)
          formData.append('carteGrise', {
            uri: docs.carteGrise,
            name: 'carteGrise.jpg',
            type: 'image/jpeg',
          });

        if (docs.photoVoiture)
          formData.append('photoVoiture', {
            uri: docs.photoVoiture,
            name: 'photoVoiture.jpg',
            type: 'image/jpeg',
          });
      }

      const res = await axios.post('http://192.168.1.173:3000/api/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { token } = res.data;
      setUserToken(token);
      await AsyncStorage.setItem('token', token);

      // 🔁 Récupération profil à jour
      await fetchUserProfile(token);
    } catch (error) {
      console.log('Erreur inscription:', error.response?.data || error.message);
      alert("Erreur à l'inscription. Vérifie les champs et fichiers.");
    }
  };

  // 🔐 Connexion
  const login = async (email, motdepasse) => {
    try {
      const res = await axios.post('http://192.168.1.173:3000/api/users/login', {
        email,
        motdepasse,
      });

      const { token } = res.data;
      setUserToken(token);
      await AsyncStorage.setItem('token', token);

      // 🔁 Récupération profil à jour
      await fetchUserProfile(token);
    } catch (error) {
      console.log('Erreur connexion:', error.response?.data || error.message);
      alert("Email ou mot de passe incorrect");
    }
  };

  // 🔓 Déconnexion
  const logout = async () => {
    setUserToken(null);
    setUserInfo(null);
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
  };

  // 🔁 Vérifie connexion automatique
  const isLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setUserToken(token);
        await fetchUserProfile(token);
      }
    } catch (error) {
      console.log('Erreur stockage local :', error);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userInfo,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
