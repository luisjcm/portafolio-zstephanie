// src/App.jsx
import Header from './components/Header';
import Hero from './components/Hero';
import Proyectos from './components/Proyectos';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-dark text-text-primary">
      <Header />
      
      {/* El <main> crecerá (flex-grow) para empujar el footer hacia abajo si hay poco contenido */}
      <main className="flex-grow pt-20"> 
        <Hero />
        <Proyectos />
      </main>

      <Footer />
    </div>
  )
}