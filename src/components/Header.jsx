// src/components/Header.jsx
import { useState } from 'react';
import { navLinks } from '../data/content';
import MobileMenu from './MobileMenu';
import MenuButton from './MenuButton';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Detalle Senior: Si el menú está abierto, el fondo es sólido (bg-brand-dark) y sin borde.
        Si está cerrado, mantiene su efecto cristal (backdrop-blur-md).
      */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isMenuOpen 
            ? 'bg-brand-dark border-transparent' 
            : 'bg-brand-dark/80 backdrop-blur-md border-b border-brand-surface'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <a 
            href="#inicio" 
            className="text-2xl font-serif font-bold text-brand-primary tracking-wide"
            onClick={() => setIsMenuOpen(false)} // Si tocan el logo, se cierra el menú
          >
            Zstephanie.
          </a>

          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.id} 
                href={link.href}
                className="text-text-secondary hover:text-brand-primary transition-colors duration-300 text-sm uppercase tracking-widest font-medium"
              >
                {link.title}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="https://wa.me/+584126099909" target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex px-6 py-2 border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 rounded-full font-medium"
            >
              Hablemos
            </a>

            {/* El botón animado que ahora será la única vía para abrir/cerrar */}
            <MenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>

        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}