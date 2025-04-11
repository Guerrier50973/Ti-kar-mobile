// 📄 screens/AdminScreen.js

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminScreen = () => {
  const { userToken } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axios.get('http://192.168.1.173:3000/api/validation/admin/validations', {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        setRequests(res.data);
      } catch (err) {
        console.error('❌ Erreur récupération des demandes admin :', err.message);
      }
    };

    fetchRequests();
  }, [userToken]);

  const handleStatusChange = async (requestId, status) => {
    try {
      await axios.patch(
        `http://192.168.1.173:3000/api/validation/approve/${requestId}`,
        { status },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      Alert.alert('Succès', `Demande ${status}`);
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req._id === requestId ? { ...req, status: status } : req
        )
      );
    } catch (err) {
      console.error('❌ Erreur mise à jour du statut :', err.message);
      Alert.alert('Erreur', 'Impossible de mettre à jour le statut.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👨‍💻 Interface Admin</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.requestContainer}>
            <Text style={styles.name}>{item.user.name} ({item.status})</Text>
            <Text style={styles.vtcNumber}>Numéro VTC: {item.vtcNumber}</Text>
            <Text style={styles.status}>Statut: {item.status}</Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleStatusChange(item._id, 'approved')}
              >
                <Text style={styles.buttonText}>Valider</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleStatusChange(item._id, 'rejected')}
              >
                <Text style={styles.buttonText}>Refuser</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default AdminScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
  },
  requestContainer: {
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  vtcNumber: {
    fontSize: 16,
    marginTop: 5,
  },
  status: {
    fontSize: 14,
    marginTop: 5,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
