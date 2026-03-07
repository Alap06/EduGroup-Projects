// ============================================
// Service API - Communication avec le backend
// ============================================

// URL de base de l'API backend
const API_BASE_URL = 'http://localhost:5000/api';

// ============================================
// Fonction utilitaire pour les requêtes
// ============================================

/**
 * Effectue une requête HTTP et gère les erreurs
 * @param {string} endpoint - L'endpoint de l'API
 * @param {Object} options - Options de la requête fetch
 * @returns {Promise<Object>} - Les données de la réponse
 */
const apiRequest = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        const data = await response.json();

        // Vérifier si la requête a réussi
        if (!response.ok) {
            throw new Error(data.error || 'Une erreur est survenue');
        }

        return data;

    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// ============================================
// Fonctions CRUD pour les tâches
// ============================================

/**
 * Récupère toutes les tâches
 * @returns {Promise<Array>} - Liste des tâches
 */
export const getAllTasks = async () => {
    const response = await apiRequest('/tasks');
    return response.data;
};

/**
 * Récupère une tâche par son ID
 * @param {string} id - ID de la tâche
 * @returns {Promise<Object>} - La tâche
 */
export const getTaskById = async (id) => {
    const response = await apiRequest(`/tasks/${id}`);
    return response.data;
};

/**
 * Crée une nouvelle tâche
 * @param {Object} taskData - Données de la tâche { title, description }
 * @returns {Promise<Object>} - La tâche créée
 */
export const createTask = async (taskData) => {
    const response = await apiRequest('/tasks', {
        method: 'POST',
        body: JSON.stringify(taskData),
    });
    return response.data;
};

/**
 * Met à jour une tâche existante
 * @param {string} id - ID de la tâche
 * @param {Object} taskData - Données à mettre à jour
 * @returns {Promise<Object>} - La tâche mise à jour
 */
export const updateTask = async (id, taskData) => {
    const response = await apiRequest(`/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(taskData),
    });
    return response.data;
};

/**
 * Supprime une tâche
 * @param {string} id - ID de la tâche
 * @returns {Promise<Object>} - Confirmation de suppression
 */
export const deleteTask = async (id) => {
    const response = await apiRequest(`/tasks/${id}`, {
        method: 'DELETE',
    });
    return response.data;
};

/**
 * Bascule l'état completed d'une tâche
 * @param {string} id - ID de la tâche
 * @param {boolean} completed - Nouvel état
 * @returns {Promise<Object>} - La tâche mise à jour
 */
export const toggleTaskComplete = async (id, completed) => {
    return updateTask(id, { completed });
};
