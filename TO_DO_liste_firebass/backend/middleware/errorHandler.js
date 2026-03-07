// ============================================
// Middleware de gestion des erreurs
// ============================================

const errorHandler = (err, req, res, next) => {
    // Logger l'erreur en développement
    console.error('❌ Erreur:', err.message);
    console.error(err.stack);

    // Déterminer le code de statut
    const statusCode = err.statusCode || 500;

    // Envoyer la réponse d'erreur
    res.status(statusCode).json({
        success: false,
        error: err.message || 'Erreur serveur interne',
        // Inclure le stack trace seulement en développement
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};

module.exports = errorHandler;
