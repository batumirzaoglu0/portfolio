import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const categories = ['all', 'web', 'python', 'c'];

function Projects() {
  const [filter, setFilter] = useState('all');

  const visible =
    filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2>Projects</h2>

        <div className="filters">
          {categories.map((c) => (
            <button
              key={c}
              className={filter === c ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="card-grid">
          {visible.map((p) => (
            <ProjectCard
              key={p.id}
              title={p.title}
              description={p.description}
              tech={p.tech}
              link={p.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;