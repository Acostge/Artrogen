// Importar librerías de Firebase compatibles con Service Workers
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

// Configuración de tu proyecto 'cartelera-e250d'
const firebaseConfig = {
  apiKey: "AIzaSyDcGWSxS73Qvu1QnFO2fiQcsDZP5Jq7dls", // <-- REEMPLAZA: Coloca aquí el Web API Key de tu proyecto Firebase
  authDomain: "cartelera-e250d.firebaseapp.com",
  projectId: "cartelera-e250d",
  storageBucket: "cartelera-e250d.appspot.com",
  messagingSenderId: "338952445371", // ID de remitente del proyecto
  appId: "1:1081163436869:web:4ba4b24f48ac8de00ba42c" // <-- REEMPLAZA: Coloca aquí el App ID de tu aplicación web en Firebase
};

// Inicializar Firebase en segundo plano
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Capturar la notificación cuando la app está en segundo plano o cerrada
messaging.onBackgroundMessage((payload) => {
  console.log('Notificación en segundo plano:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'A.png', // Usa el icono de Artrogen que ya tienes configurado
    badge: 'A.png',
    data: payload.data
  };

  // 1. Mostrar la alerta visual en la barra de notificaciones del celular
  self.registration.showNotification(notificationTitle, notificationOptions);

  // 2. ¡EL GLOBO ROJO DE OUTLOOK! Pintar el círculo en el icono de la pantalla de inicio
  if ('setAppBadge' in navigator) {
    navigator.setAppBadge(1).catch((error) => {
      console.error("Error al establecer el badge:", error);
    });
  }
});