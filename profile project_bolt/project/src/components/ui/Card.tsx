import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -8, scale: 1.02 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={clsx(
        'bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl',
        'hover:shadow-2xl hover:border-white/30 transition-all duration-300',
        className
      )}
    >
      {children}
    </motion.div>
  );
};