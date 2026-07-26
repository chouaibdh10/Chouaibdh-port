import { Link } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiMapPin } from 'react-icons/fi';
import { ctfWriteups, blogPosts } from '../data/posts';
import projects from '../data/projects';
import PostCard from '../components/PostCard';

export default function Home() {
  const featuredWriteups = ctfWriteups.filter((post) => post.featured).slice(0, 3);
  const featuredProject = projects[0];

  return (
    <div className="home-page fade-in">
      <section className="hero">
        <div className="hero-copy">
          <div className="availability">
            <span />
            Open to cybersecurity opportunities
          </div>
          <p className="eyebrow">Cybersecurity · CTF </p>
          <h1>
            I investigate systems,
            <span> break challenges,</span>
            and document the path back.
          </h1>
          <p className="hero-lead">
            I’m Ahmed Chouaib Boudouh, an ESTIN student turning packet captures,
            memory images, cryptographic puzzles, and product ideas into clear,
            reproducible work.
          </p>
          <div className="hero-actions">
            <Link to="/ctf" className="button button-primary">
              Explore writeups <FiArrowRight />
            </Link>
            <Link to="/projects" className="button button-secondary">
              View projects
            </Link>
          </div>
          <div className="hero-location">
            <FiMapPin /> Algeria · UTC+1
          </div>
        </div>

        <div className="hero-visual" aria-label="Profile">
          <div className="hero-grid" />
          <div className="portrait-frame">
            <img src="/DSC_0346.jpg" alt="Boudouh Ahmed Chouaib" />
          </div>
          <div className="terminal-card">
            <div className="terminal-dots"><span /><span /><span /></div>
            <code>
              <span className="terminal-prompt">$</span> whoami
              <strong>chouaibdh</strong>
              <span className="terminal-prompt">$</span> focus --current
              <strong>DFIR / CTF / Web</strong>
            </code>
          </div>
        </div>
      </section>

      <section className="metrics" aria-label="Portfolio metrics">
        <div><strong>{ctfWriteups.length}</strong><span>CTF writeups</span></div>
        <div><strong>{new Set(ctfWriteups.map((post) => post.platform)).size}</strong><span>Platforms</span></div>
        <div><strong>{projects.length}</strong><span>Featured projects</span></div>
        <div>
          <strong>{new Set(ctfWriteups.map((post) => post.category)).size}</strong>
          <span>Security disciplines</span>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected investigations</p>
            <h2>Featured CTF writeups</h2>
            <p>
              Evidence-first walkthroughs with the commands, reasoning, and artifacts
              that made the difference.
            </p>
          </div>
          <Link to="/ctf" className="text-link">View all challenges <FiArrowRight /></Link>
        </div>
        <div className="featured-grid">
          {featuredWriteups.map((post, index) => (
            <div className={`featured-item featured-item-${index + 1}`} key={post.id}>
              <PostCard post={post} compact />
            </div>
          ))}
        </div>
      </section>

      <section className="section-block project-spotlight">
        <div className="project-copy">
          <p className="eyebrow">{featuredProject.eyebrow}</p>
          <h2>{featuredProject.title}</h2>
          <p>{featuredProject.description}</p>
          <ul>
            <li><FiCheckCircle /> Built around a real Algerian use case</li>
            <li><FiCheckCircle /> Responsive React interface</li>
            <li><FiCheckCircle /> Clear path from discovery to delivery</li>
          </ul>
          <div className="hero-actions">
            <a
              className="button button-primary"
              href={featuredProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open live project <FiArrowRight />
            </a>
            <Link className="button button-secondary" to="/projects">Project details</Link>
          </div>
        </div>
        <div className="project-window">
          <div className="window-bar">
            <span /><span /><span /><small>dz-fellah.vercel.app</small>
          </div>
          <div className="window-content">
            <span className="window-badge">DZ</span>
            <h3>From local farms<br />to local tables.</h3>
            <div className="window-cards"><span /><span /><span /></div>
          </div>
        </div>
      </section>

      <section className="section-block compact-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">From the notebook</p>
            <h2>Security notes</h2>
          </div>
          <Link to="/blog" className="text-link">Read the blog <FiArrowRight /></Link>
        </div>
        {blogPosts.map((post) => <PostCard post={post} key={post.id} />)}
      </section>

      <section className="home-cta">
        <p className="eyebrow">Let’s build or investigate</p>
        <h2>Good work starts with a precise question.</h2>
        <p>
          I’m interested in DFIR, blue-team research, security engineering, and
          thoughtful web products.
        </p>
        <a
          className="button button-primary"
          href="https://www.linkedin.com/in/ahmed-chouaib-boudouh-34a3a52bb/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Start a conversation <FiArrowRight />
        </a>
      </section>
    </div>
  );
}
