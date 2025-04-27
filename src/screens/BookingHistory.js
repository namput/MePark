// src/screens/BookingHistory.js

import React from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';

const bookings = [
  {
    id: '1',
    parkingName: 'Siam Parking',
    date: '2025-04-28',
    time: '10:00 - 12:00',
    status: 'Confirmed',
    totalPrice: '40 THB',
  },
  {
    id: '2',
    parkingName: 'CentralWorld Parking',
    date: '2025-04-27',
    time: '14:00 - 16:00',
    status: 'Completed',
    totalPrice: '60 THB',
  },
  {
    id: '3',
    parkingName: 'Silom Complex Parking',
    date: '2025-04-26',
    time: '18:00 - 20:00',
    status: 'Cancelled',
    totalPrice: '0 THB',
  },
];

export default function BookingHistory() {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return '#0070F3';
      case 'Completed': return 'green';
      case 'Cancelled': return 'red';
      default: return 'gray';
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.name}>{item.parkingName}</Text>
            <Text style={styles.detail}>Date: {item.date}</Text>
            <Text style={styles.detail}>Time: {item.time}</Text>
            <Text style={[styles.status, { color: getStatusColor(item.status) }]}>
              Status: {item.status}
            </Text>
            <Text style={styles.price}>Total: {item.totalPrice}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  card: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  name: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  detail: { fontSize: 14, color: '#555' },
  status: { fontSize: 14, fontWeight: 'bold', marginTop: 5 },
  price: { fontSize: 16, fontWeight: 'bold', marginTop: 10, color: '#0070F3' },
});
