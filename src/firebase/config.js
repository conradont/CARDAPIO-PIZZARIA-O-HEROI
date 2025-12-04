// Configuração do Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuração do seu app Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB4jkd8aVjIYPpKDi5BJksfmW1LsvQwuyw",
  authDomain: "pizzaria-hero.firebaseapp.com",
  projectId: "pizzaria-hero",
  storageBucket: "pizzaria-hero.firebasestorage.app",
  messagingSenderId: "279085834847",
  appId: "1:279085834847:web:384ebad585840752e031ea"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore (banco de dados)
export const db = getFirestore(app);

export default app;

