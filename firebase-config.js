// 1) Ve a https://console.firebase.google.com
// 2) Crea un proyecto nuevo (gratis)
// 3) Dentro del proyecto: "Compilación" > "Firestore Database" > "Crear base de datos"
//    - Modo: "Iniciar en modo de prueba" (luego puedes ajustar las reglas, ver README)
// 4) En "Configuración del proyecto" (el engranaje) > "Tus apps" > icono </> (Web)
//    Registra una app y copia el objeto firebaseConfig que te da aquí abajo:

export const firebaseConfig = {
  apiKey: "AIzaSyDok2d_vtg_q3XcCgQJbf-VcWSEMEcpIrg",
  authDomain: "jukebox-local.firebaseapp.com",
  projectId: "jukebox-local",
  storageBucket: "jukebox-local.firebasestorage.app",
  messagingSenderId: "526438759354",
  appId: "1:526438759354:web:94475f515cd27900f73b83"
};

// PIN de administrador (para admin.html). Cámbialo por el que quieras.
export const ADMIN_PIN = "2468";

// Clave de YouTube Data API v3 (para buscar videos desde index.html)
export const YOUTUBE_API_KEY = "AIzaSyB9AA12U0lwqbrhPo0asv29696tKo3GmwU";
