import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // تاخذ هذا من Firebase Console
  apiKey: "xxx",
  authDomain: "norvest-app.firebaseapp.com",
  projectId: "norvest-app",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);