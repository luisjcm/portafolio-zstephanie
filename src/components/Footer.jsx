// src/components/Footer.jsx
import { navLinks, socialLinks } from '../data/content';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-surface pt-16 pb-8 border-t border-brand-dark">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Contenedor Flex Principal: Centrado en móvil, Izquierda en Desktop */}
        <div className="flex flex-col md:flex-row gap-y-12 md:gap-x-8 mb-16 text-center md:text-left">
          
          {/* Columna 1: Marca y Email (Ocupa 100% en móvil, 25% en desktop) */}
          <div className="w-full md:w-1/4 flex flex-col items-center md:items-start pr-0 md:pr-4">
            <h3 className="text-xs tracking-[0.2em] font-semibold text-text-secondary uppercase mb-1">
              Portafolio de
            </h3>
            <h2 className="text-3xl font-serif font-bold text-brand-primary mb-4">
              Zstephanie.
            </h2>
            <p className="text-text-secondary text-sm mb-8 leading-relaxed max-w-[280px] md:max-w-none">
              Transformando ideas en identidades visuales memorables y estrategias digitales que conectan todos los días.
            </p>
            <a 
              href="mailto:hola@zstephanie.com" 
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-brand-primary/30 bg-brand-dark text-text-primary hover:border-brand-primary hover:text-brand-primary transition-colors text-sm font-medium"
            >
              hola@zstephanie.com
            </a>
          </div>

          {/* Contenedor de Enlaces: Grid de 2 columnas en móvil, Flex en desktop */}
          <div className="w-full md:w-2/4 grid grid-cols-2 gap-4 md:gap-8">
            
            {/* Columna 2: Explorar */}
            <div className="flex flex-col items-center md:items-start">
              <div className="w-full max-w-[140px] md:max-w-none">
                <h4 className="text-sm font-bold tracking-[0.15em] uppercase text-text-primary mb-6 border-b border-brand-primary/40 pb-3">
                  Explorar
                </h4>
                <ul className="space-y-4 text-sm">
                  {navLinks.map((link) => (
                    <li key={link.id}>
                      <a href={link.href} className="text-text-secondary hover:text-brand-primary transition-colors duration-300">
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Columna 3: Servicios */}
            <div className="flex flex-col items-center md:items-start">
              <div className="w-full max-w-[140px] md:max-w-none">
                <h4 className="text-sm font-bold tracking-[0.15em] uppercase text-text-primary mb-6 border-b border-brand-primary/40 pb-3">
                  Servicios
                </h4>
                <ul className="space-y-4 text-sm text-text-secondary">
                  <li><a href="#branding" className="hover:text-brand-primary transition-colors">Branding</a></li>
                  <li><a href="#social" className="hover:text-brand-primary transition-colors">Social Media</a></li>
                  <li><a href="#web" className="hover:text-brand-primary transition-colors">Diseño Web</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Columna 4: Síguenos */}
          <div className="w-full md:w-1/4 flex flex-col items-center md:items-start">
            <div className="w-full max-w-[140px] md:max-w-none">
              <h4 className="text-sm font-bold tracking-[0.15em] uppercase text-text-primary mb-6 border-b border-brand-primary/40 pb-3">
                Síguenos
              </h4>
              
                  <div className="flex gap-4">
                        {/* Reemplazamos <a> por <div role="button"> o <button> */}
                        <button className="w-10 h-10 rounded-full border border-text-secondary/20 flex items-center justify-center text-text-secondary hover:border-brand-primary hover:text-brand-primary transition-colors cursor-default">
                          I
                        </button>
                        <button className="w-10 h-10 rounded-full border border-text-secondary/20 flex items-center justify-center text-text-secondary hover:border-brand-primary hover:text-brand-primary transition-colors cursor-default">
                          B
                        </button>
                        <button className="w-10 h-10 rounded-full bg-brand-primary text-brand-dark flex items-center justify-center font-bold cursor-default">
                          L
                        </button>
                      </div>
                  
            </div>
          </div>

        </div>

        {/* Barra Inferior (Centrada y apilada en móvil) */}
        <div className="pt-6 border-t border-brand-dark/50 flex flex-col md:flex-row justify-between items-center text-xs text-text-secondary gap-4 md:gap-0 text-center">
          <p>© {currentYear} Zstephanie. Todos los derechos reservados.</p>
          <p>
            Desarrollado por <a href="https://github.com/luisjcm" target="_blank" rel="noopener noreferrer" className="text-brand-primary font-medium hover:underline">luisjcm</a>
          </p>
        </div>
      </div>
    </footer>
  );
}