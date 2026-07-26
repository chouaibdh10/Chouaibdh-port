import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import projects from '../data/projects';

export default function Projects() {
  return (
    <div className="collection-page fade-in">
      <header className="page-intro page-intro-split">
        <div>
          <p className="eyebrow">Selected work</p>
          <h1>Projects</h1>
        </div>
        <p>
          Product work and security resources built to solve a real need, explain
          a difficult process, or make the next investigation faster.
        </p>
      </header>

      <div className="projects-list">
        {projects.map((project, index) => (
          <article className={`project-card project-card-${project.accent}`} key={project.id}>
            <div className="project-number">0{index + 1}</div>
            <div className="project-info">
              <p className="eyebrow">{project.eyebrow}</p>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              <div className="project-impact">{project.impact}</div>
              <div className="project-stack">
                {project.stack.map((item) => <span key={item}>{item}</span>)}
              </div>
              <div className="project-links">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live project <FiArrowUpRight />
                  </a>
                )}
                {project.internalUrl && (
                  <Link to={project.internalUrl}>Explore collection <FiArrowUpRight /></Link>
                )}
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <FiGithub /> Repository
                </a>
              </div>
            </div>
            <div className="project-art" aria-hidden="true">
              <span className="art-orbit" />
              <span className="art-core">{project.id === 'dz-fellah' ? 'DZ' : 'CTF'}</span>
              <span className="art-line art-line-one" />
              <span className="art-line art-line-two" />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
