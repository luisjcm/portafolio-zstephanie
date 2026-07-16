import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client, urlFor } from '../client';
import { Link } from 'react-router-dom';

export default function Proyectos() {
  const [loadedImages, setLoadedImages] = useState({});
  const [proyectos, setProyectos] = useState([]);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    const query = '*[_type == "project"] | order(_createdAt desc)';
    client.fetch(query)
      .then((data) => setProyectos(data))
      .catch((error) => console.error("Error trayendo proyectos:", error));
  }, []);

  return (
    <section id="proyectos" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="mb-12 md:mb-20 text-center md:text-left">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} className="text-brand-primary font-medium tracking-[0.2em] uppercase mb-3 text-sm">
            Portafolio
          </motion.h2>
          <motion.h3 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ delay: 0.1 }} className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-text-primary">
            Proyectos Destacados.
          </motion.h3>
        </div>

        {/* ¡El cambio Mágico! 
          grid-cols-2 en móvil, grid-cols-2 en tablet, grid-cols-3 en escritorio.
          gap-4 en móvil para que no queden tan separadas, gap-8 en desktop.
        */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          {proyectos.map((project, index) => (
            <motion.article 
              key={project._id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="group rounded-xl md:rounded-2xl bg-brand-surface border border-brand-dark overflow-hidden hover:border-brand-primary hover:shadow-[0_0_30px_rgba(177,156,217,0.15)] transition-all duration-300 flex flex-col cursor-pointer"
            >
              <Link to={`/proyectos/${project.slug.current}`} className="flex flex-col h-full" aria-label={`Ver detalles de ${project.title}`}>
                
                {/* Imagen (Mantiene relación de aspecto 16:9 en desktop, y se adapta en móvil) */}
                <div className="aspect-square md:aspect-video w-full overflow-hidden relative bg-brand-dark">
                  {project.mainImages && project.mainImages[0] && !loadedImages[project._id] && (
                      <div className="absolute inset-0 bg-brand-surface flex items-center justify-center z-10">
                        <div className="w-6 h-6 md:w-8 md:h-8 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
                      </div>
                  )}

                  {project.mainImages && project.mainImages[0] ? (
                    <img 
                      src={urlFor(project.mainImages[0]).url()} 
                      alt={project.title}
                      onLoad={() => handleImageLoad(project._id)}
                      className={`w-full h-full object-cover transition-opacity duration-500 ${loadedImages[project._id] ? 'opacity-100' : 'opacity-0'}`}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-brand-dark text-brand-primary/50 text-[10px] md:text-xs font-serif">Sin portada</div>
                  )}
                </div>

                {/* Contenido (Textos adaptables) */}
                <div className="p-3 md:p-6 flex flex-col flex-grow relative z-20 bg-brand-surface">
                  <h4 className="text-sm md:text-xl font-serif font-bold text-text-primary mb-1 md:mb-3 group-hover:text-brand-primary transition-colors line-clamp-1 md:line-clamp-none">
                    {project.title}
                  </h4>
                  {/* En móvil truncamos la descripción a 2 líneas para que no rompa la tarjeta */}
                  <p className="text-text-secondary text-[11px] md:text-sm leading-relaxed mb-3 md:mb-6 flex-grow line-clamp-2 md:line-clamp-3">
                    {project.description}
                  </p>
                  
                  {project.tags && (
                    <div className="flex flex-wrap gap-1 md:gap-2 mt-auto">
                      {project.tags.slice(0,2).map((tag, i) => (
                        <span key={i} className="px-2 py-0.5 md:px-3 md:py-1 text-[9px] md:text-[11px] font-medium tracking-wide text-text-secondary bg-brand-dark rounded-full border border-brand-primary/10 group-hover:border-brand-primary/30 transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}