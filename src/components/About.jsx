const focus = [
  'Building strong programming foundations with Python and C',
  'Exploring artificial intelligence and machine learning concepts',
  'Learning Git workflows and version control through real projects',
  'Developing practical coding projects',
];

function About() {
  return (
    <section id="about" className="section">
      <div className="container about-grid">
        <div>
          <h2>About</h2>
          <p>
            I'm a first-year Computer Engineering student at İzmir Katip Çelebi
            University. I like understanding how software works and learning by
            building small, practical things.
          </p>
          <p>
            <strong>Goal:</strong> to grow into a well-rounded software engineer
            with a focus on artificial intelligence.
          </p>
        </div>

        <div className="panel">
          <h3>Current focus</h3>
          <ul className="focus-list">
            {focus.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default About;