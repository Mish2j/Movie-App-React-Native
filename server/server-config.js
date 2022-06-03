import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCP4hPvdzEt2XRQ43tu5skMc2t2kdCIHFE",
  authDomain: "movie-app-2c757.firebaseapp.com",
  databaseURL: "https://movie-app-2c757-default-rtdb.firebaseio.com",
  projectId: "movie-app-2c757",
  storageBucket: "movie-app-2c757.appspot.com",
  messagingSenderId: "557273305600",
  appId: "1:557273305600:web:e283e36701872f96b87ee5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const database = getDatabase(app);
