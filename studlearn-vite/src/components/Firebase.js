import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

export function getGoogleAuth() {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_APP_FIREBASE_API,
    authDomain: import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_APP_FIREBASE_PROJECTID,
    storageBucket: import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGE_SENDERID,
    appId: import.meta.env.VITE_APP_FIREBASE_APPID,
    measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENTID,
  };

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  return {
    auth: getAuth(app),
    provider: new GoogleAuthProvider(),
  };
}
