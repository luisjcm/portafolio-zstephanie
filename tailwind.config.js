/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#121212',
          surface: '#18181B', // Un gris oscuro ideal para tarjetas o secciones destacadas
          primary: '#B19CD9', // El acento lavanda principal
          accent: '#FFFFFF',
        },
        text: {
          primary: '#E5E5E5',
          secondary: '#A1A1AA',
        },
        whatsapp: '#25D366'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      }
    },
  },
  plugins: [],
}