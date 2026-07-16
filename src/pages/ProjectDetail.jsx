import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../client';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const query = `*[_type == "project" && slug.current == $slug][0]{
      ...,
      "reelVideoUrl": reelVideo.asset->url,
      "pdfUrl": brandManual.asset->url
    }`;
    
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
        <div className="w-12 h-12 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin shadow-[0_0_15px_rgba(177,156,217,0.5)]"></div>
      </div>
    );
  }

  if (!project) return <div className="min-h-screen bg-brand-dark text-white flex items-center justify-center font-serif text-2xl">Proyecto no encontrado.</div>;

  const validMainImages = project.mainImages?.filter(img => img?.asset) || [];
  const validLogos = project.logos?.filter(logo => logo?.asset) || [];
  const validGallery = project.gallery?.filter(img => img?.asset) || [];

  const nextImage = () => { if (validMainImages.length > 0) setCurrentIdx((prev) => (prev + 1) % validMainImages.length); };
  const prevImage = () => { if (validMainImages.length > 0) setCurrentIdx((prev) => (prev - 1 + validMainImages.length) % validMainImages.length); };

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const itemVariants = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };

  return (
    <main className="min-h-screen bg-brand-dark relative selection:bg-brand-primary/30 selection:text-brand-primary pb-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-brand-primary/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-24 relative z-10">
        
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/" className="group inline-flex items-center text-text-secondary hover:text-brand-primary transition-colors duration-300 mb-12 text-xs font-bold tracking-[0.2em] uppercase">
            <span className="mr-3 group-hover:-translate-x-2 transition-transform duration-300 text-lg">←</span> 
            Volver
          </Link>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="show">
          
          {/* LAYOUT DE PANTALLA DIVIDIDA (SPLIT SCREEN) */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24">
            
            {/* COLUMNA IZQUIERDA: MULTIMEDIA (Se expande fluidamente) */}
            <div className="w-full lg:w-7/12 order-2 lg:order-1 flex flex-col gap-8">
              
              {project.mediaType === 'image' && validMainImages[0] && (
                <motion.div variants={itemVariants} className="w-full rounded-2xl overflow-hidden shadow-lg border border-brand-dark bg-brand-surface/30">
                  <img src={urlFor(validMainImages[0]).url()} alt={project.title} className="w-full h-auto object-cover" />
                </motion.div>
              )}

              {project.mediaType === 'carousel' && validMainImages.length > 0 && (
                <motion.div variants={itemVariants} className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-brand-dark group aspect-[4/3] bg-brand-surface/30">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentIdx}
                      src={urlFor(validMainImages[currentIdx]).url()} 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </AnimatePresence>
                  
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-dark/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-brand-primary z-10 border border-white/10 shadow-lg">←</button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-dark/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-brand-primary z-10 border border-white/10 shadow-lg">→</button>
                  
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 p-2 bg-brand-dark/50 rounded-full backdrop-blur-md">
                    {validMainImages.map((_, i) => (
                      <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentIdx ? 'bg-brand-primary w-6' : 'bg-white/50'}`} />
                    ))}
                  </div>
                </motion.div>
              )}

              {project.mediaType === 'reel' && project.reelVideoUrl && (
                <motion.div variants={itemVariants} className="w-full max-w-[380px] mx-auto aspect-[9/16] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(177,156,217,0.15)] border border-brand-primary/20 bg-black">
                  <video src={project.reelVideoUrl} controls playsInline className="w-full h-full object-cover" />
                </motion.div>
              )}

              {/* GRILLA DE LOGOS DEBAJO DEL MULTIMEDIA PRINCIPAL */}
              {validLogos.length > 0 && (
                <motion.div variants={itemVariants} className="mt-8">
                  <h4 className="text-text-secondary text-sm font-bold tracking-widest uppercase mb-6">Versiones de Marca</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {validLogos.map((logo, index) => (
                      <div key={index} className="bg-brand-surface/40 backdrop-blur-sm rounded-xl p-6 border border-brand-dark flex items-center justify-center aspect-square hover:border-brand-primary/40 transition-colors">
                        <img src={urlFor(logo).url()} alt={`Logo ${index + 1}`} className="max-w-full max-h-full object-contain filter drop-shadow-md" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* COLUMNA DERECHA: TEXTO E INFO (Sticky en Desktop) */}
            <div className="w-full lg:w-5/12 order-1 lg:order-2">
              <div className="lg:sticky lg:top-32 h-fit flex flex-col gap-8">
                
                <header>
                  <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-6 leading-tight">
                    {project.title}
                  </motion.h1>
                  <motion.div variants={itemVariants} className="w-12 h-1 bg-brand-primary rounded-full mb-6"></motion.div>
                  <motion.p variants={itemVariants} className="text-text-secondary text-lg leading-relaxed font-light">
                    {project.description}
                  </motion.p>
                </header>

                {project.pdfUrl && (
                  <motion.div variants={itemVariants} className="pt-6 border-t border-brand-dark">
                    <a 
                      href={project.pdfUrl} target="_blank" rel="noopener noreferrer"
                      className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 font-bold text-brand-dark bg-brand-primary rounded-full overflow-hidden transition-transform hover:scale-105"
                    >
                      <span className="absolute inset-0 w-full h-full bg-white/30 group-hover:translate-x-full transition-transform duration-500 ease-out -translate-x-full skew-x-12"></span>
                      <svg className="w-5 h-5 mr-3 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      <span className="relative z-10">Descargar Manual (PDF)</span>
                    </a>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {/* GALERÍA INSTAGRAM (Ocupa todo el ancho al final) */}
          {validGallery.length > 0 && (
            <motion.section variants={itemVariants} className="mt-20 border-t border-brand-dark pt-16">
              <div className="flex items-center gap-6 mb-12">
                <h3 className="text-brand-primary tracking-[0.2em] uppercase text-sm font-bold">Galería Social</h3>
                <div className="h-px bg-gradient-to-r from-brand-primary/30 to-transparent flex-1"></div>
              </div>
              
              <div className="grid grid-cols-3 gap-1 md:gap-3 max-w-5xl mx-auto">
                {validGallery.map((image, index) => (
                  <div key={index} className="aspect-square bg-brand-surface overflow-hidden group cursor-pointer relative rounded-sm md:rounded-md">
                    <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/20 transition-colors duration-300 z-10 mix-blend-overlay"></div>
                    <img 
                      src={urlFor(image).url()} 
                      alt={`Feed ${index + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>
                ))}
              </div>
            </motion.section>
          )}
          
        </motion.div>
      </div>
    </main>
  );
}