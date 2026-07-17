import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const client = createClient({
  projectId: 'cct5ob70',
  dataset: 'production',
  useCdn: true, 
  apiVersion: '2024-01-01', 
});

// Esta función nos servirá más adelante para extraer las URLs de las imágenes
const builder = createImageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);