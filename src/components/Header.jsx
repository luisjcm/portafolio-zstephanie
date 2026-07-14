// src/components/Header.jsx
import { navLinks } from '../data/content';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-brand-dark/80 backdrop-blur-md border-b border-brand-surface">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo / Marca */}
        <a href="#inicio" className="text-2xl font-serif font-bold text-brand-primary tracking-wide">
          Zstephanie.
        </a>

        {/* Navegación Desktop */}
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

        {/* Botón CTA (Llamado a la acción) */}
        <a 
          href={navLinks[0].href} // Ajustaremos esto luego al contacto
          className="hidden md:inline-flex px-6 py-2 border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 rounded-full font-medium"
        >
          Hablemos
        </a>

        {/* Menú Hamburguesa para Móviles (Solo estructura base por ahora) */}
        <button className="md:hidden text-text-primary">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}