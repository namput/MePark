// AppNavigation.js (หรือใน App.js)

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import BookingHistoryScreen from './src/screens/BookingHistoryScreen';
import NearbyParkingScreen from './src/screens/NearbyParkingScreen';
import BookingScreen from './src/screens/BookingScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import ReceiptScreen from './src/screens/ReceiptScreen';
import MyVehiclesScreen from './src/screens/MyVehiclesScreen';
import MainTab from './src/screens/MainTab'; // 👈 หน้า Home จริง

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Nearby') iconName = 'location-outline';
          else if (route.name === 'History') iconName = 'time-outline';
          else if (route.name === 'Profile') iconName = 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0070F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={MainTab} options={{ title: 'หน้าหลัก' }} />
      <Tab.Screen name="Nearby" component={NearbyParkingScreen} options={{ title: 'ใกล้ฉัน' }} />
      <Tab.Screen name="History" component={BookingHistoryScreen} options={{ title: 'ประวัติ' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'โปรไฟล์' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: Platform.OS === 'ios' ? '#f7faff' : '#fff',
          },
          headerTintColor: '#0070F3',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />

        <Stack.Screen name="Booking" component={BookingScreen} options={{ title: 'จองที่จอดรถ' }} />
        <Stack.Screen name="Payment" component={PaymentScreen} options={{ title: 'ชำระเงิน' }} />
        <Stack.Screen name="Receipt" component={ReceiptScreen} options={{ title: 'ใบเสร็จ' }} />
        <Stack.Screen name="MyVehicles" component={MyVehiclesScreen} options={{ title: 'รถของฉัน' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
