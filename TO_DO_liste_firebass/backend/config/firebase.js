// ============================================
// Configuration Firebase - REST API
// ============================================

// URL de la base de données Realtime
const DATABASE_URL = 'https://todo-app-fullstack-default-rtdb.firebaseio.com';

console.log('✅ Firebase Realtime Database configuré!');
console.log(`📍 URL: ${DATABASE_URL}`);

// Exporter l'URL pour utilisation dans les routes
module.exports = { DATABASE_URL };
