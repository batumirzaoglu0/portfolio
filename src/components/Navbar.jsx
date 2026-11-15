import { useState } from 'react';

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

function Navbar({ dark, onToggle }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <nav className="container nav-inner" aria-label="Main navigation">
        <a href="#home" className="logo">Batu<span>.</span></a>

        <ul className={open ? 'nav-links open' : 'nav-links'}>
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={() => setOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button className="icon-btn" onClick={onToggle} aria-label="Toggle theme">
            {dark ? '☀' : '☾'}
          </button>
          <button
            className="icon-btn menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;