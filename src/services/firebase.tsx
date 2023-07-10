import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAFG8zupx9H-vn6bmJ4MhzjT0t-YagdJkA",
  authDomain: "otakunometro.firebaseapp.com",
  projectId: "otakunometro",
  storageBucket: "otakunometro.appspot.com",
  messagingSenderId: "11447402335",
  appId: "1:11447402335:web:123c0dd3c75f159776c0ea"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
