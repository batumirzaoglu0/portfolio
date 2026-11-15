function ProjectCard({ title, description, tech, category, link }) {
  return (
    <article className="card">
      <span className="badge">{category}</span>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul className="tags">
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      {link && (
        <a href={link} target="_blank" rel="noreferrer" className="card-link">
          View on GitHub →
        </a>
      )}
    </article>
  );
}

export default ProjectCard;