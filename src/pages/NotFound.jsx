import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-6 relative overflow-hidden selection:bg-brand-primary/30 selection:text-brand-primary">
      
      {/* Luz de fondo difuminada */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl h-[400px] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center flex flex-col items-center"
      >
        {/* SVG Animado Alusivo (Ruta perdida) */}
        <motion.div 
          animate={{ y: [0, -15, 0] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 text-brand-primary"
        >
          <svg className="w-40 h-40 md:w-56 md:h-56 opacity-90" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 12v.01M16 16l2 2m-2-2l-2 2m2-2l2-2m-2 2l-2-2" />
          </svg>
        </motion.div>

        <h1 className="text-7xl md:text-9xl font-serif font-bold text-text-primary tracking-tighter mb-4">
          404
        </h1>
        
        <h2 className="text-xl md:text-2xl text-text-secondary font-medium tracking-wide mb-6">
          Parece que te saliste de la ruta.
        </h2>
        
        <p className="text-sm md:text-base text-text-secondary/70 font-light max-w-md mx-auto mb-10 leading-relaxed">
          La página o el proyecto que estás buscando no existe, ha sido movido, o el enlace es incorrecto.
        </p>

        <Link 
          to="/"
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-brand-dark bg-brand-primary rounded-full overflow-hidden transition-transform hover:scale-105"
        >
          <span className="absolute inset-0 w-full h-full bg-white/30 group-hover:translate-x-full transition-transform duration-500 ease-out -translate-x-full skew-x-12"></span>
          <span className="relative z-10 flex items-center">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al inicio
          </span>
        </Link>

      </motion.div>
    </main>
  );
}  