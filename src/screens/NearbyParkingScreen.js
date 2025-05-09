// src/screens/NearbyParkingScreen.js

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const PLACES = [
  {
    name: 'MePark Siam',
    latitude: 13.7563,
    longitude: 100.5018,
    price: '20',
  },
  {
    name: 'MePark CentralWorld',
    latitude: 13.7500,
    longitude: 100.5231,
    price: '30',
  },
  {
    name: 'MePark Asoke',
    latitude: 13.7394,
    longitude: 100.5622,
    price: '25',
  },
];

export default function NearbyParkingScreen({ navigation }) {
  const [userLocation, setUserLocation] = useState(null);
  const [sortedPlaces, setSortedPlaces] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const loc = await Location.getCurrentPositionAsync({});
      setUserLocation(loc.coords);

      const enriched = PLACES.map((p) => {
        const d = getDistance(
          loc.coords.latitude,
          loc.coords.longitude,
          p.latitude,
          p.longitude
        );
        return { ...p, distance: d };
      });

      enriched.sort((a, b) => a.distance - b.distance);
      setSortedPlaces(enriched);
    })();
  }, []);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const toRad = (deg) => deg * Math.PI / 180;
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
    const a = Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c) / 1000;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7faff' }}>
      <LinearGradient colors={['#0070F3', '#00B2FF']} style={styles.header}>
        <Text style={styles.title}>📍 จุดจอดใกล้คุณ</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.container}>
        {sortedPlaces.map((place, i) => (
          <TouchableOpacity
            key={i}
            style={styles.card}
            onPress={() => navigation.navigate('Booking', { place })}
          >
            <LinearGradient colors={['#ffffff', '#f4f7fb']} style={styles.innerCard}>
              <View style={styles.cardHeader}>
                <Image
                  source={require('../../assets/me2.png')}
                  style={styles.logo}
                />
                <Text style={styles.name}>{place.name}</Text>
              </View>
              <Text style={styles.detail}>💰 {place.price} บาท/ชั่วโมง</Text>
              <Text style={styles.detail}>📏 ระยะทาง: {place.distance.toFixed(1)} กม.</Text>
              <View style={styles.goButton}>
                <Ionicons name="navigate" size={16} color="#0070F3" />
                <Text style={styles.goText}>จองเลย</Text>
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
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0070F3',
  },
  detail: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  goButton: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  goText: {
    color: '#0070F3',
    fontWeight: 'bold',
  },
});