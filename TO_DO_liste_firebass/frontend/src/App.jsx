// ============================================
// Application principale - To-Do App
// ============================================

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Toast from './components/Toast';

function App() {
    // État global pour les notifications toast
    const [toast, setToast] = useState(null);

    // Fonction pour afficher un toast
    const showToast = (message, type = 'success') => {
        setToast({ message, type });
    };

    // Fonction pour fermer le toast
    const hideToast = () => {
        setToast(null);
    };

    return (
        <Router>
            {/* Notification Toast */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={hideToast}
                />
            )}

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 glass-card rounded-none border-t-0 border-x-0">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">📝</span>
                            <div>
                                <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                                    To-Do App
                                </h1>
                                <p className="text-xs text-dark-400">Firebase + React</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="text-sm text-dark-400">En ligne</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Contenu principal */}
            <main className="pt-24 pb-10 min-h-screen">
                <Routes>
                    <Route path="/" element={<Home showToast={showToast} />} />
                </Routes>
            </main>

            {/* Footer */}
            <footer className="fixed bottom-0 left-0 right-0 py-4 text-center text-dark-500 text-sm">
                <p>Made with 💙 using React, Node.js & Firebase</p>
            </footer>
        </Router>
    );
}

export default App;
