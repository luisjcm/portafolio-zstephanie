
// src/data/content.js

export const navLinks = [
  { id: 'inicio', title: 'Inicio', href: '#inicio' },
  { id: 'proyectos', title: 'Proyectos', href: '#proyectos' },
  { id: 'experiencia', title: 'Experiencia', href: '#experiencia' },
  { id: 'formacion', title: 'Formación', href: '#formacion' },
];

export const socialLinks = [
  { id: 'instagram', label: 'Instagram', url: 'https://instagram.com/tu-usuario' },
  { id: 'behance', label: 'Behance', url: 'https://behance.net/tu-usuario' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/tu-usuario' }
];

export const heroContent = {
  greeting: "¡Hola! Soy Zstephanie Rodriguez",
  tagline: "Social Media Manager",
  description: "Productora de Contenido Digital y Diseñadora, soy T.S.U. en Audiovisuales. Especialista en creación de contenido estratégico, diseño de carruseles de alto impacto y edición de Reels dinámicos. Experta en transformar conceptos complejos en piezas visuales atractivas con Canva y CapCut, garantizando estética, coherencia y resultados para diversas marcas.",
  whatsappUrl: "https://wa.me/+584126099909",
};

export const projects = [
  {
    id: 1,
    title: "Rebranding Corporativo Minimalista",
    category: "Diseño Gráfico",
    description: "Creación de identidad visual completa, manual de marca y paleta de colores para firma de arquitectura.",
    // Usamos una imagen externa de Unsplash temporalmente
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop", 
    tags: ["Illustrator", "Photoshop", "Branding"],
  },
  {
    id: 2,
    title: "Estrategia de Lanzamiento en Instagram",
    category: "Social Media",
    description: "Diseño de grilla, carruseles educativos y guiones para Reels enfocados en conversión para marca de skincare.",
    imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop",
    tags: ["Canva", "CapCut", "Instagram"],
  },
  {
    id: 3,
    title: "Producción de Contenido UGC",
    category: "Contenido Audiovisual",
    description: "Dirección de arte y edición dinámica de videos cortos para campañas publicitarias en TikTok.",
    imageUrl: "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=800&auto=format&fit=crop",
    tags: ["TikTok", "Edición", "Dirección"],
  }
];

export const experience = [
  {
    id: 1,
    role: "Social Media Manager",
    company: "Agencia Creativa XYZ",
    period: "Ene 2023 - Presente",
    description: "Gestión de comunidades, creación de parrillas de contenido y análisis de métricas para marcas del sector retail.",
  },
  // Añade aquí la experiencia laboral
];

export const education = [
  {
    id: 1,
    degree: "TSU en Ciencias Audiovisuales y Fotografia",
    institution: "IUTIRLA",
    period: "2018",
    description: "Especialización en estrategias de inbound marketing y paid media.",
  },
  
  // Añade aquí la formación académica
];

export const skills = [
  "Diseño de Contenido Estratégico ",
  "Edición de Video (Reels y TikTok) ",
  "Narrativa Visual y Storytelling ",
  "Estrategia de Comunicación ",
  "Creación de Contenido",
];