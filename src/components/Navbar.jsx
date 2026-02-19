import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/team', label: 'Team' },
    { to: '/initiatives', label: 'Initiatives' },
    { to: '/gallery', label: 'The VRIF Chronicles' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${isOpen ? 'navbar--open' : ''}`}>
      <div className="navbar__container">
        <NavLink to="/" className="navbar__logo">
          <div><img src="../public/assets/logo.png" alt="vtu-logo" className="navbar-logo-img" /></div>
          <span className="navbar__logo-text">Visvesvaraya Research & <br /> Innovation Foundation</span>
        </NavLink>

        <button
          className={`navbar__toggle ${isOpen ? 'navbar__toggle--active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`navbar__menu ${isOpen ? 'navbar__menu--open' : ''}`}>
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                  }
                  end={link.to === '/'}
                >
                  {link.label}
                  <span className="navbar__link-indicator" />
                </NavLink>
              </li>
            ))}
          </ul>
          <NavLink to="/contact" className="btn-primary navbar__cta">
            Get in Touch
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
