// src/screens/ProfileScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileScreen({ navigation }) {
  const handleLogout = () => {
    navigation.replace('Welcome'); 
    // กลับไปหน้า Welcome และล้าง Stack เดิม
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      {/* ข้อมูลผู้ใช้แบบเบื้องต้น */}
      <View style={styles.profileBox}>
        <Text style={styles.infoText}>Name: Demo User</Text>
        <Text style={styles.infoText}>Email: demo@mepark.com</Text>
      </View>

      {/* ปุ่ม Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  profileBox: { marginBottom: 40 },
  infoText: { fontSize: 18, marginBottom: 10 },
  logoutButton: {
    backgroundColor: '#FF4D4F',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
