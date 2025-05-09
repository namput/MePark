// src/screens/ProfileScreen.js

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }) {
  const user = {
    name: "คุณสมชาย ใจดี",
    email: "somchai@example.com",
    phone: "081-234-5678",
    memberSince: "2023-10-12",
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7faff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileCard}>
          <Image
            source={require("../../assets/me2.png")}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.phone}>{user.phone}</Text>
          <Text style={styles.member}>สมาชิกตั้งแต่: {user.memberSince}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("MyVehicles")}
          >
            <Ionicons name="car-outline" size={20} color="#0070F3" />
            <Text style={styles.buttonText}>รถของฉัน</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Ionicons name="key-outline" size={20} color="#0070F3" />
            <Text style={styles.buttonText}>เปลี่ยนรหัสผ่าน</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Ionicons name="log-out-outline" size={20} color="#D9534F" />
            <Text style={[styles.buttonText, { color: "#D9534F" }]}>
              ออกจากระบบ
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: "center",
  },
  profileCard: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 20,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  phone: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  member: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 6,
  },
  actions: {
    width: "100%",
  },
  button: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    elevation: 1,
  },
  buttonText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#0070F3",
    fontWeight: "500",
  },
});
