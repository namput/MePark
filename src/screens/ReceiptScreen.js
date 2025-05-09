// src/screens/ReceiptScreen.js

import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Linking from 'expo-linking';

export default function ReceiptScreen({ route, navigation }) {
  const { receipt } = route.params;
  const receiptRef = useRef();
  const now = new Date().toLocaleString();

  const saveReceiptImage = async () => {
    const { granted } = await MediaLibrary.requestPermissionsAsync();
    if (!granted) {
      Alert.alert('ไม่สามารถบันทึกได้', 'กรุณาอนุญาตเข้าถึงคลังรูปภาพ');
      return;
    }

    try {
      const uri = await captureRef(receiptRef, {
        format: 'png',
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('บันทึกสำเร็จ', 'บันทึกใบเสร็จเป็นรูปภาพเรียบร้อยแล้ว');
    } catch (error) {
      Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถบันทึกใบเสร็จได้');
    }
  };

  const openMap = () => {
    const lat = receipt.latitude || 13.7563;
    const lng = receipt.longitude || 100.5018;
    const label = encodeURIComponent(receipt.place);
    const url = Platform.select({
      ios: `http://maps.apple.com/?ll=${lat},${lng}&q=${label}`,
      android: `geo:${lat},${lng}?q=${label}`,
    });
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7faff' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.receiptCard} ref={receiptRef}>
          <View style={styles.logoBox}>
            <Image source={require('../../assets/me2.png')} style={styles.logo} />
            <Text style={styles.brand}>MePark</Text>
          </View>

          <Text style={styles.title}>🧾 ใบเสร็จรับเงิน</Text>
          <Text style={styles.timeText}>ออกเมื่อ: {now}</Text>

          <Text style={styles.section}>ข้อมูลการจอง</Text>
          <Text style={styles.label}>📍 สถานที่: {receipt.place}</Text>
          <Text style={styles.label}>🚗 ช่องจอด: {receipt.slot}</Text>
          <Text style={styles.label}>🗓 วันที่: {receipt.date}</Text>
          <Text style={styles.label}>⏰ เวลา: {receipt.start} - {receipt.end}</Text>

          <TouchableOpacity style={styles.mapLink} onPress={openMap}>
            <Ionicons name="navigate" size={18} color="#0070F3" />
            <Text style={styles.mapLinkText}>เปิดแผนที่นำทาง</Text>
          </TouchableOpacity>

          <View style={styles.divider} />

          <Text style={styles.section}>ข้อมูลรถ</Text>
          <Text style={styles.label}>ป้ายทะเบียน: {receipt.vehicle?.plate}</Text>
          <Text style={styles.label}>ประเภทรถ: {receipt.vehicle?.type}</Text>
          {receipt.vehicle?.color ? (
            <Text style={styles.label}>สี: {receipt.vehicle?.color}</Text>
          ) : null}

          <View style={styles.divider} />

          <Text style={styles.section}>รายละเอียดการชำระเงิน</Text>
          <Text style={styles.label}>💳 วิธีชำระ: {receipt.method}</Text>
          <Text style={styles.label}>💰 ยอดรวม: {receipt.total} THB</Text>
          <Text style={styles.label}>🧾 เลขที่ใบเสร็จ: #{receipt.id}</Text>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveReceiptImage}>
          <Ionicons name="download-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>บันทึกใบเสร็จ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.popToTop()}>
          <Ionicons name="home-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>กลับหน้าหลัก</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  receiptCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 30,
  },
  logoBox: {
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  brand: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0070F3',
    marginTop: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#0070F3',
  },
  timeText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  section: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#444',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 16,
  },
  mapLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  mapLinkText: {
    color: '#0070F3',
    fontSize: 15,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#28A745',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#0070F3',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});