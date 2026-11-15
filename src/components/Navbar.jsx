function Navbar({ dark, onToggle }) {
  return (
    <header className="navbar">
      <nav className="container nav-inner">
        <a href="#home" className="logo">Batu</a>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="theme-btn" onClick={onToggle} aria-label="Tema değiştir">
          {dark ? '☀️' : '🌙'}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;