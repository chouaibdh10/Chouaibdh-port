import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  FiBookOpen,
  FiExternalLink,
  FiFlag,
  FiGrid,
  FiHome,
  FiMenu,
  FiMoon,
  FiSun,
  FiUser,
  FiX,
} from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home', icon: <FiHome /> },
    { to: '/blog', label: 'Blog', icon: <FiBookOpen /> },
    { to: '/ctf', label: 'CTF', icon: <FiFlag /> },
    { to: '/projects', label: 'Projects', icon: <FiGrid /> },
    { to: '/about', label: 'About', icon: <FiUser /> },
  ];

  const isActive = (path) =>
    location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark">C</span>
          <span>Chouaibdh</span>
        </Link>

        <button
          className="nav-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={isActive(link.to) ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <a
            href="https://github.com/chouaibdh10/My_CTF_Challenges__Writeups"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-github"
          >
            <FaGithub />
            Writeups
            <FiExternalLink className="external-icon" />
          </a>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
}
