import { FiArrowUpRight, FiCheck, FiMapPin } from 'react-icons/fi';

const skills = [
  'Digital forensics & incident response',
  'Network traffic analysis',
  'Steganography & file analysis',
  'Python scripting & automation',
  'React and modern frontend development',
  'Linux systems & security tooling',
];

export default function About() {
  return (
    <div className="about-page fade-in">
      <header className="page-intro page-intro-split">
        <div>
          <p className="eyebrow">About me</p>
          <h1>Curious by default.<br />Methodical by practice.</h1>
        </div>
        <p>
          I’m Boudouh Ahmed Chouaib, a third-year ESTIN student in Algeria working
          at the intersection of cybersecurity and web development.
        </p>
      </header>

      <div className="about-grid">
        <div className="about-portrait panel">
          <img src="/DSC_0346.jpg" alt="Boudouh Ahmed Chouaib" />
          <div>
            <strong>Boudouh Ahmed Chouaib</strong>
            <span><FiMapPin /> Algeria</span>
          </div>
        </div>

        <article className="about-story">
          <p className="eyebrow">How I work</p>
          <h2>I like evidence, useful abstractions, and explanations that can be repeated.</h2>
          <p>
            CTFs give me a compact way to practice real investigative thinking:
            form a hypothesis, test it against artifacts, automate the repetitive
            parts, and document the exact chain that leads to an answer.
          </p>
          <p>
            Web development exercises the other half of that mindset—turning a
            complicated system into an interface that feels simple. This portfolio
            brings both disciplines together.
          </p>
        </article>
      </div>

      <section className="skills-panel">
        <div>
          <p className="eyebrow">Capabilities</p>
          <h2>Tools change. The investigative habits stay useful.</h2>
        </div>
        <ul>
          {skills.map((skill) => <li key={skill}><FiCheck /> {skill}</li>)}
        </ul>
      </section>

      <section className="about-contact">
        <div>
          <p className="eyebrow">Connect</p>
          <h2>Have a security problem or product idea?</h2>
        </div>
        <div className="about-links">
          <a href="https://github.com/chouaibdh10" target="_blank" rel="noopener noreferrer">
            GitHub <FiArrowUpRight />
          </a>
          <a
            href="https://www.linkedin.com/in/ahmed-chouaib-boudouh-34a3a52bb/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn <FiArrowUpRight />
          </a>
        </div>
      </section>
    </div>
  );
}
