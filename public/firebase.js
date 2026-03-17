import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "glory90-85e7c.firebaseapp.com",
  projectId: "glory90-85e7c",
  storageBucket: "glory90-85e7c.appspot.com",
  messagingSenderId: "986038538950",
  appId: "1:986038538950:web:19914a0889519f05ea7dc7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
