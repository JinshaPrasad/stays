import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyDcJuqqa8Ka6eY_pZg_ln9bMfoZSO5zbi0",
    authDomain: "home-stay-64f8d.firebaseapp.com",
    projectId: "home-stay-64f8d",
    storageBucket: "home-stay-64f8d.appspot.com",
    messagingSenderId: "946334428025",
    appId: "1:946334428025:web:87d02fcbdf7985e9c59da8",
    measurementId: "G-LMPDPDVQGH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };