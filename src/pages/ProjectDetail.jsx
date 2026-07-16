import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../client';
import { motion } from 'framer-motion';

export default function ProjectDetail() {
  const { slug } = useParams(); // Capturamos la URL dinámica
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Le pedimos a Sanity el proyecto que coincida exactamente con el slug
    const query = `*[_type == "project" && slug.current == $slug][0]`;
    
    client.fetch(query, { slug })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return <div className="min-h-screen text-white flex items-center justify-center">Proyecto no encontrado</div>;
  }

  return (
    <motion.main 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-brand-dark pt-24 pb-12 px-6"
    >
      <div className="max-w-5xl mx-auto">
        {/* Botón Volver */}
        <Link to="/" className="inline-flex items-center text-text-secondary hover:text-brand-primary transition-colors mb-12">
          <span className="mr-2">←</span> Volver al portafolio
        </Link>

        {/* Cabecera */}
        <header className="mb-16 flex flex-col md:flex-row gap-8 items-start md:items-center">
          {project.logo && (
            <div className="w-32 h-32 flex-shrink-0 bg-brand-surface rounded-2xl p-4 border border-brand-primary/20">
              <img src={urlFor(project.logo).url()} alt="Logo" className="w-full h-full object-contain" />
            </div>
          )}
          <div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-text-primary mb-4">
              {project.title}
            </h1>
            <p className="text-text-secondary text-lg leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </div>
        </header>

        {/* Galería (Solo se renderiza si hay imágenes extra) */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-16">
            <h3 className="text-brand-primary tracking-widest uppercase text-sm mb-6">Galería del Proyecto</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.gallery.map((image, index) => (
                <div key={index} className="bg-brand-surface rounded-xl overflow-hidden aspect-video border border-brand-dark">
                  <img src={urlFor(image).url()} alt={`Galería ${index}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Botón PDF (Solo se renderiza si se subió un archivo) */}
        {project.brandManual && (
          <div className="mt-12 text-center md:text-left">
            {/* Aquí luego le conectaremos la URL del archivo real de Sanity */}
            <button className="bg-brand-primary text-brand-dark font-bold py-4 px-8 rounded-full hover:scale-105 transition-transform">
              Ver Manual de Marca (PDF)
            </button>
          </div>
        )}
      </div>
    </motion.main>
  );
}