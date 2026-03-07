// ============================================
// Composant TaskList - Liste des tâches
// ============================================

import TaskItem from './TaskItem';

function TaskList({ tasks, loading, onToggle, onEdit, onDelete }) {
    // Afficher le spinner pendant le chargement
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <div className="spinner mb-4"></div>
                <p className="text-dark-400">Chargement des tâches...</p>
            </div>
        );
    }

    // Afficher la liste des tâches
    return (
        <div className="space-y-4">
            {tasks.map((task, index) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    style={{ animationDelay: `${index * 50}ms` }}
                />
            ))}
        </div>
    );
}

export default TaskList;
