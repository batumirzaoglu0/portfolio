import { useState, useEffect } from 'react';
import Reveal from './components/Reveal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ShootingStars from './components/ShootingStars';
import './App.css';

function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  }, [dark]);

  return (
    <>
    {dark && <ShootingStars />}
      <Navbar dark={dark} onToggle={() => setDark(!dark)} />
      <main>
  <Hero />
  <Reveal><About /></Reveal>
  <Reveal><Skills /></Reveal>
  <Reveal><Projects /></Reveal>
  <Reveal><Contact /></Reveal>
</main>
      <Footer />
    </>
  );
}

export default App;