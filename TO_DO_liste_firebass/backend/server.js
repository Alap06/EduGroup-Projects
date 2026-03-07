// ============================================
// Serveur Express - Point d'entrée principal
// ============================================

const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importer les routes
const tasksRoutes = require('./routes/tasks');

// Importer le middleware d'erreur
const errorHandler = require('./middleware/errorHandler');

// Créer l'application Express
const app = express();

// ============================================
// Configuration des Middlewares
// ============================================

// Permettre les requêtes cross-origin (frontend -> backend)
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Parser le JSON des requêtes
app.use(express.json());

// Logger les requêtes en développement
app.use((req, res, next) => {
    console.log(`📥 ${req.method} ${req.path}`);
    next();
});

// ============================================
// Routes
// ============================================

// Route de test / health check
app.get('/', (req, res) => {
    res.json({
        message: '🚀 API To-Do App en ligne!',
        endpoints: {
            tasks: '/api/tasks'
        }
    });
});

// Routes CRUD pour les tâches
app.use('/api/tasks', tasksRoutes);

// ============================================
// Gestion des erreurs
// ============================================

// Route 404 - Non trouvée
app.use((req, res, next) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

// Middleware de gestion des erreurs
app.use(errorHandler);

// ============================================
// Démarrage du serveur
// ============================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('');
    console.log('============================================');
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`📍 http://localhost:${PORT}`);
    console.log(`📍 API: http://localhost:${PORT}/api/tasks`);
    console.log('============================================');
    console.log('');
});
