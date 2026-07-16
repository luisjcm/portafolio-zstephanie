// src/components/Proyectos.jsx
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
    // Consulta GROQ: Trae los proyectos y los ordena por el más nuevo primero
    const query = '*[_type == "project"] | order(_createdAt desc)';

    client.fetch(query)
      .then((data) => {
        console.log("¡Datos desde Sanity! 🚀", data);
        setProyectos(data);
      })
      .catch((error) => console.error("Error trayendo proyectos:", error));
  }, []);

  return (
    <section id="proyectos" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Cabecera */}
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

        {/* Cuadrícula */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectos.map((project, index) => (
            <motion.article 
              key={project._id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              className="group rounded-2xl bg-brand-surface border border-brand-dark overflow-hidden hover:border-brand-primary hover:shadow-[0_0_30px_rgba(177,156,217,0.15)] transition-all duration-300 flex flex-col cursor-pointer"
            >

              <Link to={`/proyectos/${project.slug.current}`} className="flex flex-col h-full" aria-label={`Ver detalles de ${project.title}`}>
              <div className="aspect-video w-full overflow-hidden relative bg-brand-dark">
                
                {/* Spinner condicionado: Solo gira si HAY imagen principal pero aún no carga */}
                {project.mainImages && project.mainImages[0] && !loadedImages[project._id] && (
                    <div className="absolute inset-0 bg-brand-surface flex items-center justify-center z-10">
                      <div className="w-8 h-8 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
                    </div>
                )}

                {/* Renderizado condicionado de la imagen */}
                {project.mainImages && project.mainImages[0] ? (
                  <img 
                    src={urlFor(project.mainImages[0]).url()} 
                    alt={project.title}
                    onLoad={() => handleImageLoad(project._id)}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${loadedImages[project._id] ? 'opacity-100' : 'opacity-0'}`}
                  />
                ) : (
                  // Fallback por si el proyecto no tiene imágenes cargadas aún
                  <div className="w-full h-full flex items-center justify-center bg-brand-dark text-brand-primary/50 text-xs font-serif">
                    Sin portada
                  </div>
                )}
              </div>

              {/* Contenido */}
              <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20 bg-brand-surface">
                <h4 className="text-xl font-serif font-bold text-text-primary mb-3 group-hover:text-brand-primary transition-colors mt-2">
                  {project.title}
                </h4>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                
                {project.tags && (
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 text-[11px] font-medium tracking-wide text-text-secondary bg-brand-dark rounded-full border border-brand-primary/10 group-hover:border-brand-primary/30 transition-colors"
                      >
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