import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Proyectos',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del Proyecto',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug (Enlace)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción (Copy del proyecto)',
      type: 'text',
      rows: 4,
    }),
    
    // --- NUEVO: Selector de Tipo de Contenido ---
    defineField({
      name: 'mediaType',
      title: 'Tipo de Publicación Principal',
      description: '¿Qué formato protagonizará este proyecto?',
      type: 'string',
      options: {
        list: [
          { title: 'Una sola imagen (Alta Resolución)', value: 'image' },
          { title: 'Carrusel de imágenes', value: 'carousel' },
          { title: 'Video (Formato Reel)', value: 'reel' },
        ],
        layout: 'radio' // Aparecerán como botones para seleccionar
      },
      initialValue: 'image',
    }),

    // --- ARCHIVOS MULTIMEDIA PRINCIPALES ---
    // Este campo solo aparece si elige Imagen o Carrusel
    defineField({
      name: 'mainImages',
      title: 'Imágenes Principales',
      description: 'Sube una o varias imágenes. Si es Carrusel, se mostrarán con flechas.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      hidden: ({document}) => document?.mediaType === 'reel',
    }),
    
    // Este campo solo aparece si elige Reel
    defineField({
      name: 'reelVideo',
      title: 'Archivo de Video (Reel)',
      description: 'Sube el video en formato vertical (9:16) MP4.',
      type: 'file',
      options: { accept: 'video/mp4' },
      hidden: ({document}) => document?.mediaType !== 'reel',
    }),

    // --- SECCIÓN DE LOGOS Y GALERÍA EXTRA ---
    defineField({
      name: 'logos',
      title: 'Versiones del Logo',
      description: 'Sube las distintas versiones y variaciones del logo para la cuadrícula.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'gallery',
      title: 'Galería Estilo Instagram (Footer)',
      description: 'Arrastra aquí las imágenes para la cuadrícula final inferior.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      options: {
        layout: 'grid', // <-- ¡Esto cambia la interfaz a una cuadrícula visual!
      },
    }),
    defineField({
      name: 'brandManual',
      title: 'Manual de Marca (PDF)',
      type: 'file',
      options: { accept: 'application/pdf' }
    }),
  ],
})