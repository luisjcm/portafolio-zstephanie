// src/components/Proyectos.jsx
import { motion } from 'framer-motion';
import { projects } from '../data/content';

export default function Proyectos() {
  return (
    <section id="proyectos" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Cabecera de la sección */}
        <div className="mb-16 md:mb-20 text-center md:text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-brand-primary font-medium tracking-[0.2em] uppercase mb-3 text-sm"
          >
            Portafolio
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-text-primary"
          >
            Proyectos Destacados.
          </motion.h3>
        </div>

        {/* Cuadrícula de Proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.article 
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              // Añadimos un pequeño retraso dinámico (stagger) basado en el índice
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group rounded-2xl bg-brand-surface border border-brand-dark overflow-hidden hover:border-brand-primary/50 transition-colors duration-300 flex flex-col"
            >
              {/* Contenedor de la Imagen */}
              <div className="aspect-video w-full overflow-hidden relative bg-brand-dark">
                {/* Overlay oscuro al hacer hover */}
                <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none"></div>
                
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-text-secondary text-sm">Añadir imagen en public' + project.imageUrl + '</div>';
                  }}
                />
              </div>

              {/* Contenido de la Tarjeta */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <span className="text-brand-primary text-xs font-bold tracking-wider uppercase mb-3">
                  {project.category}
                </span>
                
                <h4 className="text-xl font-serif font-bold text-text-primary mb-3 group-hover:text-brand-primary transition-colors">
                  {project.title}
                </h4>
                
                <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                {/* Etiquetas (Tags) */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 text-[11px] font-medium tracking-wide text-text-secondary bg-brand-dark rounded-full border border-brand-primary/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}