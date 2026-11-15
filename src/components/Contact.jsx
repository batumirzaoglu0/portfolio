const contacts = [
  { label: 'GitHub', text: 'github.com/batumirzaoglu0', href: 'https://github.com/batumirzaoglu0' },
  { label: 'Email', text: 'batumirzaoglu0@gmail.com', href: 'mailto:batumirzaoglu0@gmail.com' },
];

function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container contact-wrap">
        <h2>Contact</h2>
        <p className="contact-lead">
          I'm always happy to talk about software, AI or learning opportunities.
        </p>
        <ul className="contact-list">
          {contacts.map((c) => (
            <li key={c.label}>
              <a href={c.href}>
                <span>{c.label}</span>
                <span className="muted">{c.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Contact;