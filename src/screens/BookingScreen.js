// src/screens/BookingScreen.js

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Platform,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

const availableSlots = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export default function BookingScreen({ route, navigation }) {
  const { place } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(Date.now() + 60 * 60 * 1000));
  const [pickerMode, setPickerMode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [plate, setPlate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [color, setColor] = useState('');

  const openPicker = (mode) => {
    setPickerMode(mode);
    setShowModal(true);
  };

  const onChangePicker = (event, date) => {
    if (pickerMode === 'date' && date) setSelectedDate(date);
    if (pickerMode === 'start' && date) setStartTime(date);
    if (pickerMode === 'end' && date) setEndTime(date);
    setShowModal(false);
    setPickerMode(null);
  };

  const calculateTotal = () => {
    const hours = Math.max(1, Math.ceil((endTime - startTime) / 3600000));
    return hours * parseFloat(place.price);
  };

  const confirmBooking = () => {
    if (!plate || !vehicleType || !selectedSlot) {
      alert('กรุณากรอกข้อมูลรถและเลือกช่องจอด');
      return;
    }
    navigation.navigate('Payment', {
      booking: {
        place: place.name,
        start: startTime.toLocaleTimeString(),
        end: endTime.toLocaleTimeString(),
        date: selectedDate.toLocaleDateString(),
        total: calculateTotal(),
        slot: selectedSlot,
        vehicle: {
          plate,
          type: vehicleType,
          color,
        },
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7faff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient
          colors={['#0070F3', '#00B2FF']}
          style={styles.headerCard}
        >
          <Text style={styles.headerTitle}>จองที่จอดรถ</Text>
          <Text style={styles.headerPlace}>📍 {place.name}</Text>
          <Text style={styles.headerPrice}>💰 {place.price} / ชั่วโมง</Text>
        </LinearGradient>

        <View style={styles.sectionCard}>
          <Text style={styles.section}>ข้อมูลรถของคุณ</Text>

          <TextInput
            style={styles.input}
            placeholder="ป้ายทะเบียน (เช่น 1กก1234)"
            value={plate}
            onChangeText={setPlate}
          />

          <TextInput
            style={styles.input}
            placeholder="ประเภทรถ (เช่น รถเก๋ง, มอไซค์)"
            value={vehicleType}
            onChangeText={setVehicleType}
          />

          <TextInput
            style={styles.input}
            placeholder="สีรถ (ถ้ามี)"
            value={color}
            onChangeText={setColor}
          />

          <Text style={styles.section}>เลือกวันและเวลา</Text>
          <TouchableOpacity style={styles.selectBox} onPress={() => openPicker('date')}>
            <Ionicons name="calendar" size={20} color="#0070F3" />
            <Text style={styles.selectText}>{selectedDate.toDateString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectBox} onPress={() => openPicker('start')}>
            <Ionicons name="time" size={20} color="#0070F3" />
            <Text style={styles.selectText}>เริ่ม: {startTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.selectBox} onPress={() => openPicker('end')}>
            <Ionicons name="time-outline" size={20} color="#0070F3" />
            <Text style={styles.selectText}>สิ้นสุด: {endTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>

          <Text style={styles.section}>เลือกช่องจอด</Text>
          <View style={styles.slotListElegant}>
            {availableSlots.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[styles.slotItemElegant, selectedSlot === slot && styles.slotSelected]}
                onPress={() => setSelectedSlot(slot)}
              >
                <Text style={[styles.slotTextElegant, selectedSlot === slot && { color: '#fff' }]}> {slot} </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.total}>รวมทั้งหมด: {calculateTotal()} THB</Text>
          <TouchableOpacity style={styles.button} onPress={confirmBooking}>
            <LinearGradient colors={['#FFA726', '#FB8C00']} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>ยืนยันการจอง</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        <Modal visible={showModal} transparent animationType="fade">
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>เลือก{pickerMode === 'date' ? 'วันที่' : 'เวลา'}</Text>
              <DateTimePicker
                value={pickerMode === 'start' ? startTime : pickerMode === 'end' ? endTime : selectedDate}
                mode={pickerMode === 'date' ? 'date' : 'time'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onChangePicker}
              />
              <TouchableOpacity style={styles.modalClose} onPress={() => setShowModal(false)}>
                <Text style={styles.modalCloseText}>ปิด</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 40 },
  headerCard: {
    padding: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  headerPlace: { fontSize: 18, color: '#fff' },
  headerPrice: { fontSize: 16, color: '#e0f7fa', marginTop: 6 },
  sectionCard: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    elevation: 4,
  },
  section: { fontSize: 18, fontWeight: '600', marginBottom: 14, color: '#222' },
  input: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    height: 48,
    marginBottom: 12,
  },
  selectBox: {
    backgroundColor: '#f2f6fc',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  selectText: { fontSize: 16, color: '#333', marginLeft: 10 },
  slotListElegant: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  slotItemElegant: {
    width: '30%',
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: '#E3E7ED',
    alignItems: 'center',
    marginBottom: 14,
  },
  slotTextElegant: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  slotSelected: {
    backgroundColor: '#0070F3',
  },
  summaryCard: {
    marginTop: 30,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 4,
  },
  total: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: { borderRadius: 12, overflow: 'hidden' },
  buttonGradient: { paddingVertical: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  modalClose: {
    marginTop: 10,
  },
  modalCloseText: {
    color: '#0070F3',
    fontWeight: 'bold',
    fontSize: 16,
  },
});