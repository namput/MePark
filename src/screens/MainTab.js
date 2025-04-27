// src/screens/MainTab.js

import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MainTab() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 13.7563, // พิกัดกรุงเทพ
          longitude: 100.5018,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker
          coordinate={{ latitude: 13.7563, longitude: 100.5018 }}
          title="MePark Siam"
          description="20 THB/hr"
        />
        <Marker
          coordinate={{ latitude: 13.7500, longitude: 100.5231 }}
          title="MePark CentralWorld"
          description="30 THB/hr"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
