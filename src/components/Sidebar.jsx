import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { getCategories, getTags } from '../data/posts';

export default function Sidebar() {
  const { hue, setHue } = useTheme();
  const categories = getCategories();
  const tags = getTags();

  return (
    <aside className="sidebar">
      {/* Profile Card */}
      <div className="card profile-card">
        <img
          src="/DSC_0346.jpg"
          alt="Boudouh Ahmed Chouaib"
          style={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'top',
            margin: '0 auto 1rem',
            display: 'block',
            border: '3px solid var(--primary)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          }}
        />
        <div className="name">Boudouh Ahmed Chouaib</div>
        <div className="bio">CTF Player | Cybersecurity Enthusiast</div>
        <div className="profile-links">
          <a
            href="https://www.linkedin.com/in/ahmed-chouaib-boudouh-34a3a52bb/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/chouaibdh10"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Color Theme */}
      <div className="card">
        <div className="color-picker-container">
          <span className="color-picker-label">Theme Color</span>
          <input
            type="range"
            min="0"
            max="360"
            value={hue}
            onChange={(e) => setHue(Number(e.target.value))}
            className="color-slider"
          />
          <span className="hue-value">{hue}</span>
        </div>
      </div>

      {/* Categories */}
      <div className="card sidebar-section">
        <h3>Categories</h3>
        <div className="category-list">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/archive?category=${encodeURIComponent(cat.name)}`}
              className="category-item"
            >
              {cat.name}
              <span className="count">{cat.count}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div className="card sidebar-section">
        <h3>Tags</h3>
        <div className="tag-list">
          {tags.map((tag) => (
            <Link
              key={tag}
              to={`/archive?tag=${encodeURIComponent(tag)}`}
              className="tag-item"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
