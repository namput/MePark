// src/screens/MyVehiclesScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MyVehiclesScreen() {
  const [vehicles, setVehicles] = useState([]);
  const [plate, setPlate] = useState('');
  const [type, setType] = useState('');
  const [color, setColor] = useState('');

  const addVehicle = () => {
    if (!plate || !type) {
      Alert.alert('กรุณากรอกข้อมูลให้ครบ');
      return;
    }
    const newVehicle = { plate, type, color };
    setVehicles([...vehicles, newVehicle]);
    setPlate('');
    setType('');
    setColor('');
  };

  const removeVehicle = (index) => {
    const updated = vehicles.filter((_, i) => i !== index);
    setVehicles(updated);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7faff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🚗 รถของฉัน</Text>

        <View style={styles.formCard}>
          <TextInput
            style={styles.input}
            placeholder="ป้ายทะเบียน"
            value={plate}
            onChangeText={setPlate}
          />
          <TextInput
            style={styles.input}
            placeholder="ประเภทรถ"
            value={type}
            onChangeText={setType}
          />
          <TextInput
            style={styles.input}
            placeholder="สีรถ (ถ้ามี)"
            value={color}
            onChangeText={setColor}
          />
          <TouchableOpacity style={styles.addButton} onPress={addVehicle}>
            <Ionicons name="add-circle-outline" size={20} color="#fff" />
            <Text style={styles.addButtonText}>เพิ่มรถ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.listWrapper}>
          {vehicles.map((v, i) => (
            <View key={i} style={styles.vehicleCard}>
              <View>
                <Text style={styles.plate}>{v.plate}</Text>
                <Text style={styles.detail}>ประเภท: {v.type}</Text>
                {v.color ? <Text style={styles.detail}>สี: {v.color}</Text> : null}
              </View>
              <TouchableOpacity onPress={() => removeVehicle(i)}>
                <Ionicons name="trash-outline" size={22} color="#D9534F" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0070F3',
    marginBottom: 20,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    elevation: 3,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#28A745',
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listWrapper: {
    gap: 12,
  },
  vehicleCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
    alignItems: 'center',
  },
  plate: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#0070F3',
  },
  detail: {
    fontSize: 14,
    color: '#444',
  },
});
