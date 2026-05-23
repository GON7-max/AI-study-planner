import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase web config (same as before)
const firebaseConfig = {
  apiKey: "AIzaSyBaS-QJ-yIb-uLgFKLuH39Oycg0wvBx23Y",
  authDomain: "myreactnativefirebaseapp-9e7aa.firebaseapp.com",
  databaseURL: "https://myreactnativefirebaseapp-9e7aa-default-rtdb.firebaseio.com",
  projectId: "myreactnativefirebaseapp-9e7aa",
  storageBucket: "myreactnativefirebaseapp-9e7aa.firebasestorage.app",
  messagingSenderId: "758211699724",
  appId: "1:758211699724:web:275ec1ee4a01533e11ba29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage (for Expo)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { auth, db };