// src/data/content.js

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
    title: "Rebranding Corporativo",
    category: "Diseño Gráfico",
    description: "Creación de identidad visual completa, manual de marca y papelería corporativa.",
    imageUrl: "/proyectos/proyecto1.jpg", // Ruta desde public/
    tags: ["Canva", "Instagram", "Branding"],
  },
  // Añade aquí el resto de los proyectos que tenías en window.galleryData
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