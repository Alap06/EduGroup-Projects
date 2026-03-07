// ============================================
// Composant Toast - Notifications
// ============================================

import { useEffect } from 'react';

function Toast({ message, type = 'success', onClose, duration = 3000 }) {
    // Fermer automatiquement après la durée spécifiée
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [onClose, duration]);

    // Styles selon le type
    const styles = {
        success: 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300',
        error: 'bg-red-500/20 border-red-500/50 text-red-300',
        warning: 'bg-amber-500/20 border-amber-500/50 text-amber-300',
        info: 'bg-primary-500/20 border-primary-500/50 text-primary-300',
    };

    // Icônes selon le type
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️',
    };

    return (
        <div className="fixed top-20 right-4 z-50 animate-slide-down">
            <div
                className={`
          flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-xl
          shadow-2xl min-w-[300px] max-w-md
          ${styles[type]}
        `}
            >
                {/* Icône */}
                <span className="text-xl flex-shrink-0">{icons[type]}</span>

                {/* Message */}
                <p className="flex-1 text-sm font-medium">{message}</p>

                {/* Bouton fermer */}
                <button
                    onClick={onClose}
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
            hover:bg-white/10 transition-colors duration-200"
                >
                    ✕
                </button>
            </div>

            {/* Barre de progression */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 rounded-b-xl overflow-hidden">
                <div
                    className={`h-full ${type === 'error' ? 'bg-red-400' : type === 'warning' ? 'bg-amber-400' : 'bg-emerald-400'}`}
                    style={{
                        animation: `shrink ${duration}ms linear forwards`
                    }}
                />
            </div>

            {/* Animation CSS pour la barre */}
            <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes slide-down {
          from { 
            opacity: 0; 
            transform: translateY(-20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}

export default Toast;
