// src/components/Hero.jsx
import { motion } from 'framer-motion';
import { heroContent } from '../data/content';
import heroImg from '../assets/hero-zstephanie.jpg';

export default function Hero() {

  const words = heroContent.tagline.split(' ');
  const lastWord = words.pop();
  const firstPart = words.join(' ');

  return (
    <section id="inicio" className="min-h-screen flex items-center pt-20 pb-12 relative overflow-hidden">
      
      {/* Fondo decorativo opcional (un brillo sutil lavanda en la esquina) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
        
        {/* Columna Izquierda: Texto y Llamados a la Acción */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left z-10"
        >
          <h2 className="text-brand-primary font-medium tracking-[0.2em] uppercase mb-4 text-sm">
            {heroContent.greeting}
          </h2>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-text-primary leading-[1.1]">
                {firstPart} <span className="text-brand-primary block mt-2">{lastWord}.</span>
          </h1>
          
          <p className="text-text-secondary text-base md:text-lg mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
            {heroContent.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a 
              href={heroContent.whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center px-8 py-3.5 bg-brand-primary text-brand-dark font-bold rounded-full hover:bg-white hover:scale-105 transition-all duration-300"
            >
              Hablemos por WhatsApp
            </a>
            <a 
              href="#proyectos" 
              className="inline-flex justify-center items-center px-8 py-3.5 border border-brand-primary/50 text-text-primary rounded-full hover:border-brand-primary hover:text-brand-primary transition-all duration-300 font-medium"
            >
              Ver mis proyectos
            </a>
          </div>
        </motion.div>

        {/* Columna Derecha: Fotografía / Elemento Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-md lg:max-w-full z-10 mt-8 lg:mt-0"
        >
          {/* Contenedor de la imagen con borde y efecto */}
          <div className="aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden border border-brand-surface relative bg-brand-dark group shadow-2xl">
            {/* Overlay sutil al hacer hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60 z-10 pointer-events-none"></div>
            
            {/* Imagen. Asegúrate de poner una foto llamada "hero-zstephanie.jpg" en la carpeta public/ */}
            <img 
              src={heroImg}
              alt="Zstephanie" 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
              onError={(e) => {
                // Esto es por si aún no has puesto la imagen, muestra un contenedor elegante en su lugar
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML += '<div class="absolute inset-0 flex flex-col items-center justify-center text-text-secondary bg-brand-surface"><span class="text-3xl mb-2">📸</span><span class="text-sm">Añadir foto en /public/hero-zstephanie.jpg</span></div>';
              }}
            />
          </div>
          
          {/* Sombras/Brillos detrás de la imagen para dar profundidad */}
          <div className="absolute -inset-4 bg-brand-primary/20 blur-2xl -z-10 rounded-full lg:translate-x-4 lg:translate-y-4"></div>
        </motion.div>

      </div>
    </section>
  );
}