// src/components/MobileMenu.jsx
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/content';
import zsLogo from '../assets/zs-logo.png';

export default function MobileMenu({ isOpen, onClose }) {

// Magia pura: Bloqueamos el scroll de la página de fondo cuando el menú se abre
  useEffect(() => {
    if (isOpen) {
      // Congela el body
      document.body.style.overflow = 'hidden';
    } else {
      // Lo descongela al cerrar
      document.body.style.overflow = 'unset';
    }

    // Limpieza por seguridad si el componente se desmonta
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-40 bg-brand-dark/95 backdrop-blur-lg flex flex-col items-center justify-center md:hidden pt-20 overscroll-none touch-none overflow-hidden"
        >
          {/* Resplandor carmesí de fondo */}
          <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[120%] h-[50%] rounded-full bg-brand-crimson/50 blur-[110px] pointer-events-none"></div>

          <img src={zsLogo} alt="Monograma ZS" width="205" height="280" className="relative h-24 w-auto mb-10" />

          {/* Links */}
          <nav className="relative flex flex-col gap-8 text-center">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={onClose}
                className="text-2xl font-serif text-text-primary hover:text-brand-primary transition-colors"
              >
                {link.title}
              </a>
            ))}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}