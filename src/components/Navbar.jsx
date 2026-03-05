import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  FiSun,
  FiMoon,
  FiHome,
  FiArchive,
  FiUser,
  FiExternalLink,
  FiMenu,
  FiX,
} from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home', icon: <FiHome /> },
    { to: '/archive', label: 'Archive', icon: <FiArchive /> },
    { to: '/about', label: 'About', icon: <FiUser /> },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          Chouaibdh
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/chouaibdh10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
            GitHub
            <FiExternalLink className="external-icon" />
          </a>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
}
