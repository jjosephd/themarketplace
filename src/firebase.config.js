import { initializeApp } from 'firebase/app';
import { getFireStore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC94QRqPFVFCXDw8YdApoOAdYaIHhNKaa8',
  authDomain: 'themarketplace-b521c.firebaseapp.com',
  projectId: 'themarketplace-b521c',
  storageBucket: 'themarketplace-b521c.firebasestorage.app',
  messagingSenderId: '262446474459',
  appId: '1:262446474459:web:6c7cb08a4414b61ce9d8fe',
};

// Initialize Firebase
export const db = getFireStore();
