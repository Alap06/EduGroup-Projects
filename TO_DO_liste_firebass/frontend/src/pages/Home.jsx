// ============================================
// Page Home - Page principale de l'application
// ============================================

import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { getAllTasks, createTask, updateTask, deleteTask, toggleTaskComplete } from '../services/api';

function Home({ showToast }) {
    // États
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingTask, setEditingTask] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [filter, setFilter] = useState('all'); // all, pending, completed

    // ============================================
    // Chargement initial des tâches
    // ============================================
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await getAllTasks();
            setTasks(data);
        } catch (error) {
            showToast(error.message || 'Erreur lors du chargement', 'error');
        } finally {
            setLoading(false);
        }
    };

    // ============================================
    // CREATE - Ajouter une tâche
    // ============================================
    const handleCreate = async (taskData) => {
        try {
            const newTask = await createTask(taskData);
            setTasks(prev => [newTask, ...prev]);
            setShowForm(false);
            showToast('✅ Tâche créée avec succès!', 'success');
        } catch (error) {
            showToast(error.message || 'Erreur lors de la création', 'error');
        }
    };

    // ============================================
    // UPDATE - Modifier une tâche
    // ============================================
    const handleUpdate = async (taskData) => {
        try {
            const updatedTask = await updateTask(editingTask.id, taskData);
            setTasks(prev => prev.map(t => t.id === editingTask.id ? updatedTask : t));
            setEditingTask(null);
            setShowForm(false);
            showToast('✏️ Tâche mise à jour!', 'success');
        } catch (error) {
            showToast(error.message || 'Erreur lors de la mise à jour', 'error');
        }
    };

    // ============================================
    // DELETE - Supprimer une tâche
    // ============================================
    const handleDelete = async (id) => {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cette tâche?')) return;

        try {
            await deleteTask(id);
            setTasks(prev => prev.filter(t => t.id !== id));
            showToast('🗑️ Tâche supprimée!', 'success');
        } catch (error) {
            showToast(error.message || 'Erreur lors de la suppression', 'error');
        }
    };

    // ============================================
    // TOGGLE - Changer l'état completed
    // ============================================
    const handleToggle = async (id, currentStatus) => {
        try {
            const updatedTask = await toggleTaskComplete(id, !currentStatus);
            setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
            showToast(
                !currentStatus ? '🎉 Tâche terminée!' : '🔄 Tâche réouverte',
                'success'
            );
        } catch (error) {
            showToast(error.message || 'Erreur lors de la mise à jour', 'error');
        }
    };

    // ============================================
    // Édition d'une tâche
    // ============================================
    const handleEdit = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    // Annuler l'édition ou la création
    const handleCancel = () => {
        setEditingTask(null);
        setShowForm(false);
    };

    // ============================================
    // Filtrage des tâches
    // ============================================
    const filteredTasks = tasks.filter(task => {
        if (filter === 'pending') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    // Statistiques
    const stats = {
        total: tasks.length,
        completed: tasks.filter(t => t.completed).length,
        pending: tasks.filter(t => !t.completed).length,
    };

    // ============================================
    // Rendu
    // ============================================
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Statistiques */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="glass-card p-4 text-center">
                    <p className="text-3xl font-bold text-primary-400">{stats.total}</p>
                    <p className="text-sm text-dark-400">Total</p>
                </div>
                <div className="glass-card p-4 text-center">
                    <p className="text-3xl font-bold text-amber-400">{stats.pending}</p>
                    <p className="text-sm text-dark-400">En cours</p>
                </div>
                <div className="glass-card p-4 text-center">
                    <p className="text-3xl font-bold text-emerald-400">{stats.completed}</p>
                    <p className="text-sm text-dark-400">Terminées</p>
                </div>
            </div>

            {/* Barre d'actions */}
            <div className="glass-card p-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                    {/* Bouton ajouter */}
                    <button
                        onClick={() => { setEditingTask(null); setShowForm(true); }}
                        className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                        <span className="text-xl">➕</span>
                        Nouvelle tâche
                    </button>

                    {/* Filtres */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'all'
                                    ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                                    : 'bg-dark-700/50 text-dark-300 border border-dark-600/50 hover:border-dark-500/50'
                                }`}
                        >
                            Toutes
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'pending'
                                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    : 'bg-dark-700/50 text-dark-300 border border-dark-600/50 hover:border-dark-500/50'
                                }`}
                        >
                            En cours
                        </button>
                        <button
                            onClick={() => setFilter('completed')}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === 'completed'
                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'bg-dark-700/50 text-dark-300 border border-dark-600/50 hover:border-dark-500/50'
                                }`}
                        >
                            Terminées
                        </button>
                    </div>
                </div>
            </div>

            {/* Formulaire (modal) */}
            {showForm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="glass-card p-6 w-full max-w-lg animate-slide-up">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            {editingTask ? '✏️ Modifier la tâche' : '➕ Nouvelle tâche'}
                        </h2>
                        <TaskForm
                            initialData={editingTask}
                            onSubmit={editingTask ? handleUpdate : handleCreate}
                            onCancel={handleCancel}
                        />
                    </div>
                </div>
            )}

            {/* Liste des tâches */}
            <TaskList
                tasks={filteredTasks}
                loading={loading}
                onToggle={handleToggle}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* Message si aucune tâche */}
            {!loading && filteredTasks.length === 0 && (
                <div className="glass-card p-12 text-center">
                    <p className="text-6xl mb-4">📭</p>
                    <p className="text-xl text-dark-300 mb-2">
                        {filter === 'all'
                            ? 'Aucune tâche pour le moment'
                            : filter === 'pending'
                                ? 'Aucune tâche en cours'
                                : 'Aucune tâche terminée'}
                    </p>
                    <p className="text-dark-500">
                        {filter === 'all' && 'Cliquez sur "Nouvelle tâche" pour commencer'}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Home;
