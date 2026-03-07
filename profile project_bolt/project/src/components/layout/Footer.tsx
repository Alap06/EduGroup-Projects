import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Left - Branding */}
          <div>
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2"
            >
              Ala Amara
            </motion.h3>
            <p className="text-gray-400">
              Développeur Full-Stack & Designer UI/UX
            </p>
          </div>

          {/* Center - Copyright */}
          <div className="text-center">
            <p className="text-gray-400 flex items-center justify-center">
              © {new Date().getFullYear()} Made with{' '}
              <Heart className="h-4 w-4 text-red-500 mx-1 animate-pulse" />{' '}
              by Ala Amara
            </p>
          </div>

          {/* Right - Back to Top */}
          <div className="flex justify-end">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg transition-all duration-300"
            >
              <ArrowUp className="h-6 w-6" />
            </motion.button>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            Tous droits réservés • Tozeur, Tunisie • Disponible pour de nouveaux projets
          </p>
        </div>
      </div>
    </footer>
  );
};