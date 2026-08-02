import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  FiBookOpen,
  FiDroplet,
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

const DEFAULT_HUE = 164;

const colorPresets = [
  { label: 'Emerald', hue: 164 },
  { label: 'Cyan', hue: 190 },
  { label: 'Blue', hue: 218 },
  { label: 'Violet', hue: 268 },
  { label: 'Rose', hue: 338 },
  { label: 'Amber', hue: 38 },
];

export default function Navbar() {
  const { isDark, toggleTheme, hue, setHue } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const colorControlRef = useRef(null);

  useEffect(() => {
    const closeColorPicker = (event) => {
      if (colorControlRef.current && !colorControlRef.current.contains(event.target)) {
        setColorOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setColorOpen(false);
    };

    document.addEventListener('pointerdown', closeColorPicker);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('pointerdown', closeColorPicker);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

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
          <div className="color-control" ref={colorControlRef}>
            <button
              type="button"
              className="color-toggle"
              onClick={() => setColorOpen((open) => !open)}
              aria-label="Customize accent color"
              aria-expanded={colorOpen}
              aria-haspopup="dialog"
            >
              <FiDroplet />
              <span className="nav-control-label">Color</span>
            </button>

            {colorOpen && (
              <div className="color-panel" role="dialog" aria-label="Accent color settings">
                <div className="color-panel-header">
                  <div>
                    <strong>Accent color</strong>
                    <span>{hue}° hue</span>
                  </div>
                  <button type="button" onClick={() => setHue(DEFAULT_HUE)}>
                    Reset
                  </button>
                </div>

                <div className="color-presets" aria-label="Color presets">
                  {colorPresets.map((preset) => (
                    <button
                      type="button"
                      key={preset.label}
                      className={hue === preset.hue ? 'active' : ''}
                      style={{ '--swatch-hue': preset.hue }}
                      onClick={() => setHue(preset.hue)}
                      aria-label={preset.label}
                      aria-pressed={hue === preset.hue}
                      title={preset.label}
                    />
                  ))}
                </div>

                <label className="hue-slider">
                  <span>Fine tune</span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={hue}
                    onChange={(event) => setHue(Number(event.target.value))}
                    aria-label="Accent color hue"
                  />
                </label>
              </div>
            )}
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            {isDark ? <FiSun /> : <FiMoon />}
            <span className="nav-control-label">{isDark ? 'Light mode' : 'Dark mode'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
