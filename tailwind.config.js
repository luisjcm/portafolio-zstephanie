/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#121212',
        'lavender-accent': '#B19CD9', // Un lavanda premium
        'platinum-text': '#E5E5E5',
      },
      fontFamily: {
        'serif': ['"Playfair Display"', 'serif'], // Para los títulos editoriales
        'sans': ['"Inter"', 'sans-serif'], // Para el cuerpo limpio
      }
    },
  },
  plugins: [],
}