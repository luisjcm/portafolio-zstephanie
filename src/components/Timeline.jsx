// src/components/Timeline.jsx
import { motion } from 'framer-motion';
import { experience, education } from '../data/content';

export default function Timeline() {
  return (
    <section id="experiencia" className="py-24 bg-brand-surface/30 border-t border-brand-dark">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Cabecera */}
        <div className="mb-16 md:mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-brand-primary font-medium tracking-[0.2em] uppercase mb-3 text-sm"
          >
            Trayectoria
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-text-primary"
          >
            Experiencia & Formación.
          </motion.h3>
        </div>

        {/* Contenedor de 2 columnas para Desktop, 1 en Móvil */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Columna Izquierda: Experiencia Laboral */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              {/* Icono de Maletín SVG */}
              <div className="p-3 rounded-xl bg-brand-primary/10 border border-brand-primary/20">
                <svg className="w-7 h-7 text-brand-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h4 className="text-2xl font-serif font-bold text-text-primary">Experiencia Laboral</h4>
            </div>
            
            <div className="border-l border-brand-primary/20 pl-8 relative">
              {experience.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="mb-12 last:mb-0 relative"
                >
                  <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(177,156,217,0.5)]"></div>
                  <span className="text-brand-primary text-xs font-bold tracking-widest uppercase bg-brand-primary/10 px-3 py-1 rounded-full">
                    {item.period}
                  </span>
                  <h5 className="text-xl font-bold text-text-primary mt-4 mb-1">
                    {item.role}
                  </h5>
                  <span className="text-text-secondary text-sm font-medium uppercase tracking-wider block mb-4">
                    {item.company}
                  </span>
                  <p className="text-text-secondary leading-relaxed text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Columna Derecha: Formación Académica */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              {/* Icono de Birrete Académico SVG */}
              <div className="p-3 rounded-xl bg-brand-primary/10 border border-brand-primary/20">
                <svg className="w-7 h-7 text-brand-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                </svg>
              </div>
              <h4 className="text-2xl font-serif font-bold text-text-primary">Formación Académica</h4>
            </div>
            
            <div className="border-l border-brand-primary/20 pl-8 relative">
              {education.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="mb-12 last:mb-0 relative"
                >
                  <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-brand-primary shadow-[0_0_10px_rgba(177,156,217,0.5)]"></div>
                  <span className="text-brand-primary text-xs font-bold tracking-widest uppercase bg-brand-primary/10 px-3 py-1 rounded-full">
                    {item.period}
                  </span>
                  <h5 className="text-xl font-bold text-text-primary mt-4 mb-1">
                    {item.degree}
                  </h5>
                  <span className="text-text-secondary text-sm font-medium uppercase tracking-wider block mb-4">
                    {item.institution}
                  </span>
                  <p className="text-text-secondary leading-relaxed text-sm">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}