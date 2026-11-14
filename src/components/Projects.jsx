import ProjectCard from './ProjectCard';

function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <h2>Projects</h2>
        <div className="card-grid">
          <ProjectCard title="Proje 1" description="Kısa açıklama buraya." />
          <ProjectCard title="Proje 2" description="Kısa açıklama buraya." />
          <ProjectCard title="Proje 3" description="Kısa açıklama buraya." />
        </div>
      </div>
    </section>
  );
}

export default Projects;