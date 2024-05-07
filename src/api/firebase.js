// Import the functions you need from the SDKs you need

import { Env } from '@env';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Env.FIREBASE_API_KEY,
  authDomain: Env.FIREBASE_AUTH_DOMAIN,
  projectId: Env.FIREBASE_PROJECT_ID,
  storageBucket: Env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: Env.FIREBASE_SENDER_ID,
  appId: Env.FIREBASE_APP_ID,
  measurementId: Env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
