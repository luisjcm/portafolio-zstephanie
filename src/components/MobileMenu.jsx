// src/components/MobileMenu.jsx
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/content';

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
          className="fixed inset-0 z-40 bg-brand-dark bg-opacity-95 backdrop-blur-lg flex flex-col items-center justify-center md:hidden pt-20 overscroll-none touch-none"
        >
         

          {/* Links */}
          <nav className="flex flex-col gap-8 text-center">
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