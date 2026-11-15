const groups = [
  { title: 'Languages', items: ['Python', 'C', 'JavaScript'] },
  { title: 'Web', items: ['React', 'Vite', 'HTML', 'CSS'] },
  { title: 'Tools', items: ['Git', 'GitHub', 'GitHub Actions', 'VS Code'] },
];

function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <h2>Skills</h2>
        <div className="skill-groups">
          {groups.map((g) => (
            <div key={g.title} className="skill-group">
              <h3>{g.title}</h3>
              <ul className="chips">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;