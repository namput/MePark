// src/screens/SearchParking.js

import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

const parkingSpots = [
  { id: '1', name: 'Siam Parking', price: '20 THB/hr' },
  { id: '2', name: 'CentralWorld Parking', price: '30 THB/hr' },
  { id: '3', name: 'Silom Complex', price: '25 THB/hr' },
];

export default function SearchParking() {
  const [query, setQuery] = useState('');

  const filteredSpots = parkingSpots.filter(spot =>
    spot.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBox}
        placeholder="Search for parking..."
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filteredSpots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  searchBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 20,
  },
  card: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  price: { fontSize: 14, color: '#0070F3' },
});
