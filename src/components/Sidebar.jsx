import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import { ctfWriteups, getCategories } from '../data/posts';

export default function Sidebar() {
  const categories = getCategories(ctfWriteups);

  return (
    <aside className="sidebar">
      <div className="panel profile-card">
        <img src="/DSC_0346.jpg" alt="Boudouh Ahmed Chouaib" className="avatar" />
        <div className="name">Boudouh Ahmed Chouaib</div>
        <div className="bio">
          Cybersecurity student, CTF player, and web developer based in Algeria.
        </div>
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

      <div className="panel sidebar-section">
        <div className="sidebar-title-row">
          <h3>Challenge index</h3>
          <span>{ctfWriteups.length}</span>
        </div>
        <div className="category-list">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/ctf?category=${encodeURIComponent(category.name)}`}
              className="category-item"
            >
              <span>{category.name}</span>
              <span className="count">{category.count}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="panel sidebar-cta">
        <span className="eyebrow">Source repository</span>
        <p>Browse challenge files, solve scripts, and original Markdown on GitHub.</p>
        <a
          href="https://github.com/chouaibdh10/My_CTF_Challenges__Writeups"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open repository <FiArrowUpRight />
        </a>
      </div>
    </aside>
  );
}
