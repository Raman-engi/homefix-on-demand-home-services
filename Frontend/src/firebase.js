import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpCjthGzpb7yUcjW6KGmSkEbD1oMXC89E",
  authDomain: "homefix-79603.firebaseapp.com",
  projectId: "homefix-79603",
  storageBucket: "homefix-79603.firebasestorage.app",
  messagingSenderId: "970887711392",
  appId: "1:970887711392:web:d4e1458cb7f42d159517c5",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);