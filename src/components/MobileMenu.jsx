// src/components/MobileMenu.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '../data/content';

export default function MobileMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-50 bg-brand-dark flex flex-col items-center justify-center md:hidden"
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