import { useState, useEffect } from 'react';
import profile from '../assets/profile.jpg';

const words = ['C', 'Python', 'Java', 'AI'];

function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-text">
          <p className="eyebrow">Computer Engineering Student</p>
          <h1>Hi, I'm Batu Mirzaoğlu.</h1>
          <p className="lead">
            I'm a first-year student at İzmir Katip Çelebi University, interested in
            software development, artificial intelligence and emerging technologies.
          </p>
          <p className="learning">
            Currently learning{' '}
            <span key={words[index]} className="rotator">{words[index]}</span>
          </p>
          <div className="hero-actions">
            <a href="#projects" className="btn">View projects</a>
            <a href="#contact" className="btn btn-ghost">Get in touch</a>
          </div>
        </div>

        <img
          src={profile}
          alt="Portrait of Batu Mirzaoğlu"
          className="hero-photo"
          width="260"
          height="260"
        />
      </div>
    </section>
  );
}

export default Hero;