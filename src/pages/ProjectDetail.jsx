import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../client';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);

  // --- ESTADOS DEL VISOR PREMIUM (LIGHTBOX) ---
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState([]);
  const [activeImgIdx, setActiveImgIdx] = useState(0);

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

  // --- FUNCIONES DEL VISOR PREMIUM ---
  const openViewer = (imagesList, index) => {
    setViewerImages(imagesList);
    setActiveImgIdx(index);
    setIsViewerOpen(true);
  };
  const nextViewerImg = () => { setActiveImgIdx((prev) => (prev + 1) % viewerImages.length); };
  const prevViewerImg = () => { setActiveImgIdx((prev) => (prev - 1 + viewerImages.length) % viewerImages.length); };

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
            
            {/* COLUMNA IZQUIERDA: MULTIMEDIA */}
            {/* Ajuste menor: Cambié el order en móvil para que la imagen siempre quede arriba del texto */}
            <div className="w-full lg:w-7/12 order-1 lg:order-1 flex flex-col gap-8">
              
              {project.mediaType === 'image' && validMainImages[0] && (
                <motion.div variants={itemVariants} className="w-full rounded-2xl overflow-hidden shadow-lg border border-brand-dark bg-brand-surface/30">
                  <img 
                    src={urlFor(validMainImages[0]).url()} 
                    alt={project.title} 
                    onClick={() => openViewer(validMainImages, 0)} // <-- Visor añadido
                    className="w-full h-auto object-cover cursor-zoom-in hover:opacity-95 transition-opacity" 
                  />
                </motion.div>
              )}

              {project.mediaType === 'carousel' && validMainImages.length > 0 && (
                <motion.div variants={itemVariants} className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-brand-dark group aspect-[4/3] bg-brand-surface/30">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentIdx}
                      src={urlFor(validMainImages[currentIdx]).url()} 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
                      onClick={() => openViewer(validMainImages, currentIdx)} // <-- Visor añadido
                      className="w-full h-full object-cover absolute inset-0 cursor-zoom-in"
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
                      <div 
                        key={index} 
                        onClick={() => openViewer(validLogos, index)} // <-- Visor añadido a los modelos
                        className="bg-brand-surface/40 backdrop-blur-sm rounded-xl p-6 border border-brand-dark flex items-center justify-center aspect-square hover:border-brand-primary/40 transition-colors cursor-zoom-in"
                      >
                        <img src={urlFor(logo).url()} alt={`Logo ${index + 1}`} className="max-w-full max-h-full object-contain filter drop-shadow-md hover:scale-105 transition-transform" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* COLUMNA DERECHA: TEXTO E INFO (Sticky en Desktop) */}
            {/* Ajuste menor: En móvil ahora queda debajo de la imagen (order-2) */}
            <div className="w-full lg:w-5/12 order-2 lg:order-2">
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
                  <div 
                    key={index} 
                    onClick={() => openViewer(validGallery, index)} // <-- Visor añadido
                    className="aspect-square bg-brand-surface overflow-hidden group cursor-zoom-in relative rounded-sm md:rounded-md"
                  >
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

      {/* --- COMPONENTE DEL VISOR PREMIUM (LIGHTBOX) --- */}
      <AnimatePresence>
        {isViewerOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4"
          >
            <div className="flex justify-between items-center max-w-6xl w-full mx-auto p-2 md:p-4 z-20">
              <span className="text-xs font-bold tracking-widest text-text-secondary uppercase">
                {activeImgIdx + 1} de {viewerImages.length}
              </span>
              <button 
                onClick={() => setIsViewerOpen(false)}
                className="text-white hover:text-brand-primary transition-colors text-3xl font-light p-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto w-full h-[60vh] px-2 md:px-10">
              {viewerImages.length > 1 && (
                <button onClick={prevViewerImg} className="absolute left-2 md:left-4 z-20 w-10 h-10 rounded-full bg-brand-surface/40 hover:bg-brand-primary hover:text-brand-dark text-white flex items-center justify-center transition-all border border-white/10 active:scale-95">←</button>
              )}
              
              <motion.img 
                key={activeImgIdx}
                src={urlFor(viewerImages[activeImgIdx]).url()} 
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }}
                className="max-w-full max-h-[65vh] object-contain rounded shadow-2xl select-none"
              />

              {viewerImages.length > 1 && (
                <button onClick={nextViewerImg} className="absolute right-2 md:right-4 z-20 w-10 h-10 rounded-full bg-brand-surface/40 hover:bg-brand-primary hover:text-brand-dark text-white flex items-center justify-center transition-all border border-white/10 active:scale-95">→</button>
              )}
            </div>

            {viewerImages.length > 1 && (
              <div className="w-full max-w-2xl mx-auto mt-4 overflow-x-auto pb-4 flex justify-center gap-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {viewerImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all ${idx === activeImgIdx ? 'border-brand-primary scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
                  >
                    <img src={img?.asset ? urlFor(img).url() : ''} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}