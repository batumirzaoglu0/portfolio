import { useState } from 'react';

const EMAIL = 'batumirzaoglu0@gmail.com';

const contacts = [
  { label: 'GitHub', text: 'github.com/batumirzaoglu0', href: 'https://github.com/batumirzaoglu0' },
  { label: 'LinkedIn', text: 'Batu Mirzaoğlu', href: 'https://www.linkedin.com/in/batu-mirzao%C4%9Flu-2a6700444/' },
  { label: 'Email', text: EMAIL, href: `mailto:${EMAIL}` },
];

function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

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
        <button className="btn btn-ghost copy-btn" onClick={copyEmail}>
          {copied ? 'Copied ✓' : 'Copy email'}
        </button>
      </div>
    </section>
  );
}

export default Contact;