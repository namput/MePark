// src/screens/MainTab.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const PLACES = [
  { name: 'MePark Siam', latitude: 13.7563, longitude: 100.5018, price: '20' },
  { name: 'MePark CentralWorld', latitude: 13.7500, longitude: 100.5231, price: '30' },
  { name: 'MePark Asoke', latitude: 13.7394, longitude: 100.5622, price: '25' },
];

export default function MainTab({ navigation }) {
  const [searchText, setSearchText] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [mapRef, setMapRef] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [mapType, setMapType] = useState('standard');
  const [sortType, setSortType] = useState('distance');

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      const loc = await Location.getCurrentPositionAsync({});
      setUserLocation(loc.coords);
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

  const sortedPlaces = [...PLACES].sort((a, b) => {
    if (!userLocation) return 0;
    const d1 = getDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
    const d2 = getDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
    return sortType === 'distance' ? d1 - d2 : parseFloat(a.price) - parseFloat(b.price);
  });

  const visiblePlaces = filteredPlaces.length > 0 ? filteredPlaces : sortedPlaces;

  const handleSelectPlace = (place) => {
    setSearchText(place.name);
    setFilteredPlaces([]);
    mapRef.animateToRegion({
      latitude: place.latitude,
      longitude: place.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setSelectedPlace(place);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapType={mapType}
        ref={(ref) => setMapRef(ref)}
        initialRegion={{
          latitude: 13.7563,
          longitude: 100.5018,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {visiblePlaces.map((place, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            onPress={() => handleSelectPlace(place)}
          >
            <Image
              source={require('../../assets/pin.png')}
              style={{ width: 40, height: 40, resizeMode: 'contain' }}
            />
          </Marker>
        ))}
      </MapView>

      <LinearGradient colors={["rgba(0,0,0,0.6)", "transparent"]} style={styles.mapOverlay}>
        <Text style={styles.appTitle}>MePark</Text>
      </LinearGradient>

      <View style={styles.searchWrapper}>
        <Ionicons name="search-outline" size={20} color="#888" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="ค้นหาที่จอดรถ..."
          style={styles.searchBox}
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            setFilteredPlaces(
              text.length > 0
                ? PLACES.filter((p) => p.name.toLowerCase().includes(text.toLowerCase()))
                : []
            );
          }}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')}>
            <Ionicons name="close" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterBar}>
        <TouchableOpacity
          style={[styles.filterButton, sortType === 'distance' && styles.filterActive]}
          onPress={() => setSortType('distance')}
        >
          <Text style={styles.filterText}>ใกล้สุด</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, sortType === 'price' && styles.filterActive]}
          onPress={() => setSortType('price')}
        >
          <Text style={styles.filterText}>ราคาต่ำสุด</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.mapToggle}
          onPress={() => setMapType(mapType === 'standard' ? 'satellite' : 'standard')}
        >
          <Ionicons name="map-outline" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {selectedPlace && (
        <View style={styles.bottomSheet}>
          <Text style={styles.sheetTitle}>{selectedPlace.name}</Text>
          <Text style={styles.sheetDetail}>💰 {selectedPlace.price} บาท/ชม.</Text>
          {userLocation && (
            <Text style={styles.sheetDetail}>
              📏 ระยะทาง: {getDistance(userLocation.latitude, userLocation.longitude, selectedPlace.latitude, selectedPlace.longitude).toFixed(1)} กม.
            </Text>
          )}
          <TouchableOpacity
            style={styles.sheetButton}
            onPress={() => navigation.navigate('Booking', { place: selectedPlace })}
          >
            <Text style={styles.sheetButtonText}>จองทันที</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  mapOverlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  appTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 80,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 48,
    elevation: 5,
  },
  searchBox: {
    flex: 1,
    fontSize: 16,
  },
  filterBar: {
    position: 'absolute',
    top: 140,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  filterActive: {
    backgroundColor: '#0070F3',
  },
  filterText: {
    color: '#fff',
    fontWeight: '600',
  },
  mapToggle: {
    backgroundColor: '#0070F3',
    padding: 8,
    borderRadius: 20,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 10,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0070F3',
    marginBottom: 6,
  },
  sheetDetail: {
    fontSize: 15,
    color: '#444',
    marginBottom: 6,
  },
  sheetButton: {
    marginTop: 10,
    backgroundColor: '#FFA726',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  sheetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
