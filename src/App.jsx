// src/App.jsx
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-dark text-text-primary">
      <Header />
      
      {/* El <main> crecerá (flex-grow) para empujar el footer hacia abajo si hay poco contenido */}
      <main className="flex-grow pt-20"> 
        {/* Aquí irán las secciones (Hero, Proyectos, Timeline) */}
        <section id="inicio" className="h-screen flex items-center justify-center">
          <h1 className="text-4xl font-serif text-brand-primary">Contenido Principal</h1>
        </section>
      </main>

      <Footer />
    </div>
  )
}