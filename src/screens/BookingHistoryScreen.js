// src/screens/BookingHistoryScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { LinearGradient } from 'expo-linear-gradient';

export default function BookingHistoryScreen({ navigation }) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const data = await AsyncStorage.getItem('bookingHistory');
      if (data) setHistory(JSON.parse(data));
    };
    const unsubscribe = navigation.addListener('focus', loadHistory);
    return unsubscribe;
  }, [navigation]);

  const openMap = (lat, lng, label) => {
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${lat},${lng}&q=${label}`,
      android: `geo:${lat},${lng}?q=${label}`,
    });
    Linking.openURL(url);
  };

  if (!history.length) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>📜 ประวัติการจอง</Text>
        <Text style={styles.empty}>ยังไม่มีข้อมูลการจอง</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7faff' }}>
      <LinearGradient colors={['#0070F3', '#00B2FF']} style={styles.header}>
        <Text style={styles.title}>📜 ประวัติการจอง</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.listWrapper}>
        {history.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('Receipt', { receipt: item })}
          >
            <LinearGradient colors={['#ffffff', '#f4f7fb']} style={styles.innerCard}>
              <View style={styles.cardHeader}>
                <Image source={require('../../assets/me2.png')} style={styles.logo} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.place}>{item.place}</Text>
                  <Text style={styles.detail}>🗓 {item.date} | ⏰ {item.start} - {item.end}</Text>
                </View>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.detail}>🚗 ช่อง {item.slot}</Text>
                <Text style={styles.detail}>💳 {item.method}</Text>
                <Text style={styles.detail}>ทะเบียน: {item.vehicle?.plate || '-'}</Text>
                <Text style={styles.detail}>ประเภทรถ: {item.vehicle?.type || '-'}</Text>
                <Text style={styles.total}>💰 {item.total} THB</Text>
                <TouchableOpacity
                  onPress={() => openMap(item.latitude || 13.7563, item.longitude || 100.5018, item.place)}
                  style={styles.mapLink}
                >
                  <Ionicons name="navigate" size={16} color="#0070F3" />
                  <Text style={styles.mapLinkText}>เปิดแผนที่</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#f7faff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  empty: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 20,
  },
  listWrapper: {
    padding: 20,
    gap: 16,
  },
  card: {
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  innerCard: {
    padding: 18,
    borderRadius: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  logo: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  cardBody: {
    paddingLeft: 4,
    gap: 2,
  },
  place: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0070F3',
    marginBottom: 2,
  },
  detail: {
    fontSize: 14,
    color: '#444',
  },
  total: {
    marginTop: 6,
    fontWeight: 'bold',
    color: '#000',
    fontSize: 16,
  },
  mapLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  mapLinkText: {
    color: '#0070F3',
    fontSize: 14,
    fontWeight: '500',
  },
});
