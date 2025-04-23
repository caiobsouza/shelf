import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const AUTH_ERROR_MESSAGES = {
  "auth/invalid-credential": "Email ou senha incorreto.",
  "auth/wrong-password": "Email ou senha incorreto.",
  "auth/user-not-found": "Email ou senha incorreto.",
  "auth/configuration-not-found": "Erro ao autenticar.",
};

export function getAuthErrorMessage(error: string) {
  return AUTH_ERROR_MESSAGES[error as keyof typeof AUTH_ERROR_MESSAGES];
}

const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);
setPersistence(firebaseAuth, browserLocalPersistence);

const firebaseStorage = getStorage(firebaseApp);

export {
  firebaseApp,
  firebaseStorage,
  firebaseAuth,
};

