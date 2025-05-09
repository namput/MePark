// src/screens/PaymentScreen.js

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function PaymentScreen({ route, navigation }) {
  const { booking } = route.params;

  const handlePayment = (method) => {
    Alert.alert(
      'ชำระเงินสำเร็จ',
      `คุณได้ชำระด้วย ${method}\nยอดชำระ ${booking.total} THB`,
      [
        {
          text: 'ดูใบเสร็จ',
          onPress: () =>
            navigation.navigate('Receipt', {
              receipt: {
                id: 'RCP' + Date.now(),
                ...booking,
                method,
                date: new Date().toLocaleDateString(),
              },
            }),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7faff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient colors={['#0070F3', '#00B2FF']} style={styles.headerCard}>
          <Text style={styles.title}>ชำระเงิน</Text>
          <Text style={styles.label}>📍 {booking.place}</Text>
          <Text style={styles.label}>🗓 {booking.date}</Text>
          <Text style={styles.label}>⏰ {booking.start} - {booking.end}</Text>
          <Text style={styles.label}>🚗 ช่อง {booking.slot}</Text>
          <Text style={styles.total}>💰 {booking.total} THB</Text>
        </LinearGradient>

        <View style={styles.sectionCard}>
          <Text style={styles.section}>ข้อมูลรถ</Text>
          <Text style={styles.detail}>ป้ายทะเบียน: {booking.vehicle?.plate}</Text>
          <Text style={styles.detail}>ประเภท: {booking.vehicle?.type}</Text>
          {booking.vehicle?.color ? (
            <Text style={styles.detail}>สี: {booking.vehicle?.color}</Text>
          ) : null}
        </View>

        <Text style={styles.section}>เลือกวิธีชำระเงิน</Text>

        <TouchableOpacity
          style={styles.payOption}
          onPress={() => handlePayment('PromptPay')}
        >
          <Ionicons name="qr-code" size={22} color="#0070F3" />
          <Text style={styles.optionText}>PromptPay (QR Code)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.payOption}
          onPress={() => handlePayment('Credit Card')}
        >
          <MaterialCommunityIcons name="credit-card-outline" size={22} color="#0070F3" />
          <Text style={styles.optionText}>Credit / Debit Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.payOption}
          onPress={() => handlePayment('Mobile Banking')}
        >
          <Ionicons name="phone-portrait-outline" size={22} color="#0070F3" />
          <Text style={styles.optionText}>Mobile Banking</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 4,
  },
  total: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    color: '#fff',
  },
  sectionCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    margin: 20,
    color: '#333',
  },
  detail: {
    fontSize: 15,
    color: '#333',
    marginBottom: 6,
  },
  payOption: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
  },
});