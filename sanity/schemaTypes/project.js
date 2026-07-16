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
      description: 'Haz clic en "Generate" para crear el enlace automáticamente basado en el título.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción Corta',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo del Cliente',
      type: 'image',
      options: { hotspot: true }, // Permite recortar la imagen en el panel
    }),
    defineField({
      name: 'gallery',
      title: 'Galería de Imágenes',
      description: 'Arrastra aquí todas las imágenes del proyecto (Mockups, diseños, etc.)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'brandManual',
      title: 'Manual de Marca (PDF)',
      description: 'Sube aquí el archivo PDF si el proyecto lo requiere',
      type: 'file',
      options: {
        accept: 'application/pdf'
      }
    }),
  ],
})