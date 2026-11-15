const skills = ["Python", "C", "Git & GitHub", "React", "HTML & CSS"];

function Skills() {
  return (
    <section id="skills" className="section alt">
      <div className="container">
        <h2>Skills</h2>
        <ul className="skill-list">
          {skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Skills;