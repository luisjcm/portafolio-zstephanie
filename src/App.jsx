// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import Proyectos from './components/Proyectos';
import Timeline from './components/Timeline';
import Skills from './components/Skills';
import Footer from './components/Footer';

import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  return (

<Router >
    <div className="min-h-screen bg-brand-dark text-text-primary">
      <Routes>
        <Route path="/" 
        element={
          <>
                <Header />
                
                      <main> 
                        <Hero />
                        <Proyectos />
                        <Timeline />
                        <Skills />
                        <Footer />
                      </main>
          </>
                }
        />

        <Route path="/proyectos/:slug" element={<ProjectDetail />} />
      </Routes>

    </div>
</Router>
  );
}
