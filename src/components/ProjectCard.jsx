function ProjectCard({ title, description, tech, link }) {
  return (
    <article className="card">
      <h3>{title}</h3>
      <p>{description}</p>
      <ul className="tags">
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {link && (
        <a href={link} target="_blank" rel="noreferrer" className="card-link">
          GitHub'da Gör →
        </a>
      )}
    </article>
  );
}

export default ProjectCard;