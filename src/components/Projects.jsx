import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2>Projects</h2>
        <div className="card-grid">
          {projects.map((p) => (
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