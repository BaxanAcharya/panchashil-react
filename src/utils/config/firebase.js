import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDq_K2__OFuYB52Qdqt9oPm-DlcBS0hK7s",
  authDomain: "school-management-system-3aeea.firebaseapp.com",
  projectId: "school-management-system-3aeea",
  storageBucket: "school-management-system-3aeea.appspot.com",
  messagingSenderId: "38749040112",
  appId: "1:38749040112:web:7afc8f8887be4b28eb8135",
  measurementId: "G-C0M0FJBXBS",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
