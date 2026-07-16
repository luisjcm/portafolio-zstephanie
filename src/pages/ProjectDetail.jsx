import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { client, urlFor } from '../client';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIdx, setCurrentIdx] = useState(0);

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerImages, setViewerImages] = useState([]);
  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const logosScrollRef = useRef(null);

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
        <div className="w-12 h-12 border-4 border-brand-primary/30 border-t-brand-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!project) return <div className="min-h-screen bg-brand-dark text-white flex items-center justify-center font-serif text-2xl">Proyecto no encontrado.</div>;

  const validMainImages = project.mainImages?.filter(img => img?.asset) || [];
  const validLogos = project.logos?.filter(logo => logo?.asset) || [];
  const validGallery = project.gallery?.filter(img => img?.asset) || [];

  const nextMainImage = () => { if (validMainImages.length > 0) setCurrentIdx((prev) => (prev + 1) % validMainImages.length); };
  const prevMainImage = () => { if (validMainImages.length > 0) setCurrentIdx((prev) => (prev - 1 + validMainImages.length) % validMainImages.length); };

  const scrollLogos = (direction) => {
    if (logosScrollRef.current) {
      const { scrollLeft, clientWidth } = logosScrollRef.current;
      const offset = clientWidth * 0.6;
      logosScrollRef.current.scrollTo({ left: direction === 'left' ? scrollLeft - offset : scrollLeft + offset, behavior: 'smooth' });
    }
  };

  const openViewer = (imagesList, index) => {
    setViewerImages(imagesList);
    setActiveImgIdx(index);
    setIsViewerOpen(true);
  };
  const nextViewerImg = () => { setActiveImgIdx((prev) => (prev + 1) % viewerImages.length); };
  const prevViewerImg = () => { setActiveImgIdx((prev) => (prev - 1 + viewerImages.length) % viewerImages.length); };

  const containerVariants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const itemVariants = { hidden: { opacity: 0, y: 25 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } } };

  return (
    <main className="min-h-screen bg-brand-dark relative selection:bg-brand-primary/30 selection:text-brand-primary pb-24 overflow-x-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-brand-primary/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 pt-24 relative z-10">
        
        <motion.div initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/#proyectos" className="group inline-flex items-center text-text-secondary hover:text-brand-primary transition-colors duration-300 mb-12 text-xs font-bold tracking-[0.2em] uppercase">
            <span className="mr-3 group-hover:-translate-x-1.5 transition-transform duration-300 text-lg">←</span> Volver
          </Link>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="show">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-24">
            
            <div className="w-full lg:w-7/12 order-1 flex flex-col gap-10">
              
              {project.mediaType === 'image' && validMainImages[0] && (
                <motion.div variants={itemVariants} className="w-full rounded-2xl overflow-hidden shadow-lg border border-brand-dark bg-brand-surface/30">
                  <img src={urlFor(validMainImages[0]).url()} alt={project.title} onClick={() => openViewer(validMainImages, 0)} className="w-full h-auto object-cover cursor-zoom-in hover:opacity-95" />
                </motion.div>
              )}

              {project.mediaType === 'carousel' && validMainImages.length > 0 && (
                <motion.div variants={itemVariants} className="relative w-full rounded-2xl overflow-hidden shadow-lg border border-brand-dark group aspect-[4/3] bg-brand-surface/30">
                  <AnimatePresence mode="wait">
                    <motion.img 
                      key={currentIdx} 
                      src={urlFor(validMainImages[currentIdx]).url()} 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
                      onClick={() => openViewer(validMainImages, currentIdx)} 
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.7}
                      onDragEnd={(e, { offset }) => {
                        if (offset.x < -50) nextMainImage();
                        else if (offset.x > 50) prevMainImage();
                      }}
                      className="w-full h-full object-contain absolute inset-0 p-2 cursor-grab active:cursor-grabbing" 
                    />
                  </AnimatePresence>
                  <button onClick={prevMainImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-dark/80 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-brand-primary z-10 border border-white/10 pointer-events-none md:pointer-events-auto">←</button>
                  <button onClick={nextMainImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-brand-dark/80 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center hover:bg-brand-primary z-10 border border-white/10 pointer-events-none md:pointer-events-auto">→</button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 p-1.5 bg-brand-dark/60 backdrop-blur-md rounded-full pointer-events-none">
                    {validMainImages.map((_, i) => <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIdx ? 'bg-brand-primary w-4' : 'bg-white/40'}`} />)}
                  </div>
                </motion.div>
              )}

              {project.mediaType === 'reel' && project.reelVideoUrl && (
                <motion.div variants={itemVariants} className="w-full max-w-[340px] mx-auto aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border border-brand-primary/10 bg-black">
                  <video src={project.reelVideoUrl} controls playsInline className="w-full h-full object-cover" />
                </motion.div>
              )}

              {/* AQUI ESTÁ EL CAMBIO DE LOS LOGOS: Ahora son compactos y con scroll horizontal táctil nativo */}
              {validLogos.length > 0 && (
                <motion.div variants={itemVariants} className="mt-2 border-t border-brand-dark/50 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-text-secondary text-xs font-bold tracking-widest uppercase">Versiones de Marca</h4>
                    {validLogos.length > 3 && (
                      <div className="flex gap-2">
                        <button onClick={() => scrollLogos('left')} className="w-8 h-8 rounded-full border border-brand-primary/20 flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary hidden md:flex">←</button>
                        <button onClick={() => scrollLogos('right')} className="w-8 h-8 rounded-full border border-brand-primary/20 flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary hidden md:flex">→</button>
                      </div>
                    )}
                  </div>
                  
                  {/* Contenedor Flex horizontal que permite deslizar con el dedo (swipe) suavemente */}
                  <div ref={logosScrollRef} className="flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4" style={{ scrollbarWidth: 'none' }}>
                    <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                    {validLogos.map((logo, index) => (
                      <div key={index} onClick={() => openViewer(validLogos, index)} className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 snap-start bg-brand-surface/30 backdrop-blur-sm rounded-lg p-4 border border-brand-dark flex items-center justify-center cursor-zoom-in hover:border-brand-primary/30 transition-all">
                        <img src={urlFor(logo).url()} alt={`Logo ${index + 1}`} className="max-w-full max-h-full object-contain pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            <div className="w-full lg:w-5/12 order-2">
              <div className="lg:sticky lg:top-32 h-fit flex flex-col gap-6">
                <header>
                  <motion.h1 variants={itemVariants} className="text-3xl md:text-5xl font-serif font-bold text-text-primary mb-6 leading-tight">{project.title}</motion.h1>
                  <motion.div variants={itemVariants} className="w-12 h-1 bg-brand-primary rounded-full mb-6"></motion.div>
                  <motion.p variants={itemVariants} className="text-text-secondary text-lg leading-relaxed font-light">{project.description}</motion.p>
                </header>
                {project.pdfUrl && (
                  <motion.div variants={itemVariants} className="pt-6 border-t border-brand-dark">
                    <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 font-bold text-brand-dark bg-brand-primary rounded-full overflow-hidden hover:scale-105 transition-transform">
                      <span className="absolute inset-0 w-full h-full bg-white/30 group-hover:translate-x-full transition-transform duration-500 ease-out -translate-x-full skew-x-12"></span>
                      <svg className="w-5 h-5 mr-3 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      <span className="relative z-10">Descargar Manual (PDF)</span>
                    </a>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          {validGallery.length > 0 && (
            <motion.section variants={itemVariants} className="mt-12 border-t border-brand-dark pt-16">
              <div className="flex items-center gap-6 mb-12">
                <h3 className="text-brand-primary tracking-[0.2em] uppercase text-sm font-bold">Galería Social</h3>
                <div className="h-px bg-gradient-to-r from-brand-primary/30 to-transparent flex-1"></div>
              </div>
              <div className="grid grid-cols-3 gap-1 md:gap-3 max-w-5xl mx-auto">
                {validGallery.map((image, index) => (
                  <div key={index} onClick={() => openViewer(validGallery, index)} className="aspect-square bg-brand-surface overflow-hidden group cursor-zoom-in relative rounded-sm md:rounded-md">
                    <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/20 transition-colors duration-300 z-10 mix-blend-overlay"></div>
                    <img src={urlFor(image).url()} alt={`Feed ${index + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            </motion.section>
          )}
          
        </motion.div>
      </div>

      <AnimatePresence>
        {isViewerOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-2 md:p-4 overscroll-none touch-none">
            <div className="flex justify-between items-center max-w-6xl w-full mx-auto p-2 md:p-4 z-20">
              <span className="text-xs font-bold tracking-widest text-text-secondary uppercase">{activeImgIdx + 1} de {viewerImages.length}</span>
              <button onClick={() => setIsViewerOpen(false)} className="text-white hover:text-brand-primary transition-colors text-3xl font-light p-2 cursor-pointer">✕</button>
            </div>
            
            <div className="relative flex-1 flex items-center justify-center max-w-5xl mx-auto w-full h-[60vh] px-2 md:px-10 overflow-hidden">
              {viewerImages.length > 1 && <button onClick={prevViewerImg} className="absolute left-2 md:left-4 z-20 w-10 h-10 rounded-full bg-brand-surface/40 hover:bg-brand-primary text-white flex items-center justify-center transition-all border border-white/10 hidden md:flex">←</button>}
              
              <motion.img 
                key={activeImgIdx} 
                src={urlFor(viewerImages[activeImgIdx]).url()} 
                initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.25 }} 
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(e, { offset }) => {
                  if (offset.x < -50) nextViewerImg();
                  else if (offset.x > 50) prevViewerImg();
                }}
                className="max-w-full max-h-[65vh] object-contain rounded shadow-2xl select-none cursor-grab active:cursor-grabbing" 
              />

              {viewerImages.length > 1 && <button onClick={nextViewerImg} className="absolute right-2 md:right-4 z-20 w-10 h-10 rounded-full bg-brand-surface/40 hover:bg-brand-primary text-white flex items-center justify-center transition-all border border-white/10 hidden md:flex">→</button>}
            </div>
            
            {viewerImages.length > 1 && (
              <div className="w-full max-w-3xl mx-auto mt-4 overflow-x-auto pb-4 flex justify-start gap-2 px-2 snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`div::-webkit-scrollbar { display: none; }`}</style>
                {viewerImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIdx(idx)}
                    className={`flex-shrink-0 w-14 h-14 snap-center rounded overflow-hidden border-2 transition-all ${idx === activeImgIdx ? 'border-brand-primary scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
                  >
                    <img src={img?.asset ? urlFor(img).url() : ''} className="w-full h-full object-cover pointer-events-none" />
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