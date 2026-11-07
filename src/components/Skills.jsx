// src/components/Skills.jsx
import { motion } from 'framer-motion';
import { skills } from '../data/content';
import SectionHeading from './SectionHeading';

export default function Skills() {
  return (
    <section id="habilidades" className="py-24 bg-brand-ivory relative overflow-hidden">
      {/* Veladuras suaves: verde orgánico (acento secundario) y rosa creativo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-[30%] -left-[10%] w-[55%] h-[70%] rounded-full bg-brand-crimson/15 blur-[140px]"></div>
        <div className="absolute -top-[20%] -right-[10%] w-[45%] h-[55%] rounded-full bg-brand-crimson/10 blur-[130px]"></div>
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <SectionHeading kicker="Especialidad" title="Habilidades Clave." tone="light" />

        {/* Contenedor Flex para las Píldoras */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100 
              }}
              // Movimiento interactivo con Framer Motion
              whileHover={{ y: -5, scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              // Brillo discreto y cambio de fondo con Tailwind
              className="group flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full bg-white/70 backdrop-blur-sm border border-brand-crimson/25 hover:border-brand-crimson hover:bg-brand-crimson/10 hover:shadow-[0_10px_26px_rgba(220,20,60,0.2)] transition-colors duration-300 cursor-pointer"
            >
              {/* Icono SVG de Chispa con rotación suave al hover */}
              <svg 
                className="w-5 h-5 text-brand-crimson group-hover:rotate-12 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
              
              <span className="text-brand-dark font-medium text-sm md:text-base tracking-wide whitespace-nowrap">
                {skill.trim()}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}