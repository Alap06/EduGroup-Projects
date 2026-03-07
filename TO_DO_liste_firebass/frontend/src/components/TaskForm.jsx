// ============================================
// Composant TaskForm - Formulaire de tâche
// ============================================

import { useState, useEffect } from 'react';

function TaskForm({ initialData, onSubmit, onCancel }) {
    // État du formulaire
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    // État de validation
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pré-remplir le formulaire si on édite une tâche
    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || ''
            });
        }
    }, [initialData]);

    // Gérer les changements d'input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Effacer l'erreur quand l'utilisateur tape
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    // Valider le formulaire
    const validate = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Le titre est obligatoire';
        } else if (formData.title.trim().length < 3) {
            newErrors.title = 'Le titre doit contenir au moins 3 caractères';
        } else if (formData.title.trim().length > 100) {
            newErrors.title = 'Le titre ne peut pas dépasser 100 caractères';
        }

        if (formData.description && formData.description.length > 500) {
            newErrors.description = 'La description ne peut pas dépasser 500 caractères';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Soumettre le formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);
        try {
            await onSubmit({
                title: formData.title.trim(),
                description: formData.description.trim()
            });
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            {/* Champ Titre */}
            <div>
                <label
                    htmlFor="title"
                    className="block text-sm font-medium text-dark-200 mb-2"
                >
                    Titre <span className="text-red-400">*</span>
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Que devez-vous faire?"
                    className={`input-field ${errors.title ? 'border-red-500/50 focus:border-red-500/50' : ''}`}
                    disabled={isSubmitting}
                    autoFocus
                />
                {errors.title && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <span>⚠️</span> {errors.title}
                    </p>
                )}
                <p className="mt-1 text-xs text-dark-500">
                    {formData.title.length}/100 caractères
                </p>
            </div>

            {/* Champ Description */}
            <div>
                <label
                    htmlFor="description"
                    className="block text-sm font-medium text-dark-200 mb-2"
                >
                    Description <span className="text-dark-500">(optionnelle)</span>
                </label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Ajoutez des détails sur cette tâche..."
                    className={`textarea-field ${errors.description ? 'border-red-500/50 focus:border-red-500/50' : ''}`}
                    disabled={isSubmitting}
                    rows={3}
                />
                {errors.description && (
                    <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                        <span>⚠️</span> {errors.description}
                    </p>
                )}
                <p className="mt-1 text-xs text-dark-500">
                    {formData.description.length}/500 caractères
                </p>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Enregistrement...
                        </>
                    ) : (
                        <>
                            {initialData ? '✓ Mettre à jour' : '➕ Ajouter'}
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="btn-secondary"
                >
                    Annuler
                </button>
            </div>
        </form>
    );
}

export default TaskForm;
