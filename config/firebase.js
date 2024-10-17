import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCrivI_qGtQihspW-2Ie8MDmJRfkZrF_Ys",
  authDomain: "ichat-78b1c.firebaseapp.com",
  projectId: "ichat-78b1c",
  storageBucket: "ichat-78b1c.appspot.com",
  messagingSenderId: "98030838138",
  appId: "1:98030838138:web:159b4c765367036516b6c3",
  measurementId: "G-N8580QDST7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  
export const database = getFirestore();
export const storage = getStorage();