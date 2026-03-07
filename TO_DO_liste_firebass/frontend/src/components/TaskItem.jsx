// ============================================
// Composant TaskItem - Affichage d'une tâche
// ============================================

function TaskItem({ task, onToggle, onEdit, onDelete, style }) {
    // Formater la date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div
            className={`task-card shine-effect ${task.completed ? 'opacity-70' : ''}`}
            style={style}
        >
            <div className="flex items-start gap-4">
                {/* Checkbox */}
                <button
                    onClick={() => onToggle(task.id, task.completed)}
                    className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center
            border-2 transition-all duration-200 mt-1
            ${task.completed
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'bg-transparent border-dark-500 hover:border-primary-500'
                        }`}
                >
                    {task.completed && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </button>

                {/* Contenu */}
                <div className="flex-1 min-w-0">
                    {/* Titre */}
                    <h3 className={`text-lg font-semibold mb-1 ${task.completed ? 'line-through text-dark-400' : 'text-white'
                        }`}>
                        {task.title}
                    </h3>

                    {/* Description */}
                    {task.description && (
                        <p className={`text-sm mb-3 ${task.completed ? 'text-dark-500' : 'text-dark-300'
                            }`}>
                            {task.description}
                        </p>
                    )}

                    {/* Métadonnées */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-dark-500">
                        {/* Badge statut */}
                        <span className={task.completed ? 'badge-completed' : 'badge-pending'}>
                            {task.completed ? '✓ Terminée' : '⏳ En cours'}
                        </span>

                        {/* Date de création */}
                        <span>📅 {formatDate(task.createdAt)}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                    {/* Bouton éditer */}
                    <button
                        onClick={() => onEdit(task)}
                        className="btn-secondary !px-3 !py-2"
                        title="Modifier"
                    >
                        ✏️
                    </button>

                    {/* Bouton supprimer */}
                    <button
                        onClick={() => onDelete(task.id)}
                        className="btn-danger !px-3 !py-2"
                        title="Supprimer"
                    >
                        🗑️
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TaskItem;
