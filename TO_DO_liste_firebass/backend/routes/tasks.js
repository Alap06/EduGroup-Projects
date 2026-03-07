// ============================================
// Routes CRUD pour les Tâches - Firebase REST API
// ============================================

const express = require('express');
const router = express.Router();
const { DATABASE_URL } = require('../config/firebase');

// ============================================
// GET /api/tasks - Récupérer toutes les tâches
// ============================================
router.get('/', async (req, res, next) => {
    try {
        const response = await fetch(`${DATABASE_URL}/tasks.json`);
        const data = await response.json();

        // Transformer l'objet en tableau
        const tasks = [];
        if (data) {
            Object.keys(data).forEach(key => {
                tasks.push({
                    id: key,
                    ...data[key]
                });
            });
        }

        // Trier par date de création (plus récentes en premier)
        tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.json({
            success: true,
            count: tasks.length,
            data: tasks
        });

    } catch (error) {
        console.error('GET tasks error:', error);
        next(error);
    }
});

// ============================================
// GET /api/tasks/:id - Récupérer une tâche par ID
// ============================================
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const response = await fetch(`${DATABASE_URL}/tasks/${id}.json`);
        const data = await response.json();

        if (!data) {
            return res.status(404).json({
                success: false,
                error: 'Tâche non trouvée'
            });
        }

        res.json({
            success: true,
            data: {
                id: id,
                ...data
            }
        });

    } catch (error) {
        console.error('GET task by ID error:', error);
        next(error);
    }
});

// ============================================
// POST /api/tasks - Créer une nouvelle tâche
// ============================================
router.post('/', async (req, res, next) => {
    try {
        const { title, description } = req.body;

        // Validation des données
        if (!title || title.trim() === '') {
            return res.status(400).json({
                success: false,
                error: 'Le titre est obligatoire'
            });
        }

        // Créer l'objet tâche
        const newTask = {
            title: title.trim(),
            description: description ? description.trim() : '',
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Ajouter à Firebase via REST API (POST génère une clé unique)
        const response = await fetch(`${DATABASE_URL}/tasks.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTask)
        });

        const result = await response.json();

        if (result.error) {
            throw new Error(result.error);
        }

        res.status(201).json({
            success: true,
            message: 'Tâche créée avec succès',
            data: {
                id: result.name, // Firebase retourne { name: "generated-key" }
                ...newTask
            }
        });

    } catch (error) {
        console.error('POST task error:', error);
        next(error);
    }
});

// ============================================
// PUT /api/tasks/:id - Mettre à jour une tâche
// ============================================
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        // Vérifier si la tâche existe
        const checkResponse = await fetch(`${DATABASE_URL}/tasks/${id}.json`);
        const existingTask = await checkResponse.json();

        if (!existingTask) {
            return res.status(404).json({
                success: false,
                error: 'Tâche non trouvée'
            });
        }

        // Construire l'objet de mise à jour
        const updateData = {
            ...existingTask,
            updatedAt: new Date().toISOString()
        };

        // Ajouter seulement les champs fournis
        if (title !== undefined) {
            if (title.trim() === '') {
                return res.status(400).json({
                    success: false,
                    error: 'Le titre ne peut pas être vide'
                });
            }
            updateData.title = title.trim();
        }

        if (description !== undefined) {
            updateData.description = description.trim();
        }

        if (completed !== undefined) {
            updateData.completed = Boolean(completed);
        }

        // Mettre à jour via REST API (PUT remplace le document)
        const response = await fetch(`${DATABASE_URL}/tasks/${id}.json`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
        });

        const result = await response.json();

        res.json({
            success: true,
            message: 'Tâche mise à jour avec succès',
            data: {
                id: id,
                ...result
            }
        });

    } catch (error) {
        console.error('PUT task error:', error);
        next(error);
    }
});

// ============================================
// DELETE /api/tasks/:id - Supprimer une tâche
// ============================================
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        // Vérifier si la tâche existe
        const checkResponse = await fetch(`${DATABASE_URL}/tasks/${id}.json`);
        const existingTask = await checkResponse.json();

        if (!existingTask) {
            return res.status(404).json({
                success: false,
                error: 'Tâche non trouvée'
            });
        }

        // Supprimer via REST API
        await fetch(`${DATABASE_URL}/tasks/${id}.json`, {
            method: 'DELETE'
        });

        res.json({
            success: true,
            message: 'Tâche supprimée avec succès',
            data: {
                id: id
            }
        });

    } catch (error) {
        console.error('DELETE task error:', error);
        next(error);
    }
});

module.exports = router;
