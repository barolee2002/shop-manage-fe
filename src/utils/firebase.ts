// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBAsAk5Hn3LLYRu4Z8sgwxiCBPig-y-OJA',
  authDomain: 'clothesshop-e9c4a.firebaseapp.com',
  projectId: 'clothesshop-e9c4a',
  storageBucket: 'clothesshop-e9c4a.appspot.com',
  messagingSenderId: '399592839240',
  appId: '1:399592839240:web:6481670b23d0e6db03207d',
  measurementId: 'G-5RZ33M7XN7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
export const storage = getStorage(app);
