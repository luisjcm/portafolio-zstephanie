import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    outDir: 'docs', // Aquí cambiamos el nombre de la carpeta de salida
  },
  base: '/portafolio-zstephanie/'
})