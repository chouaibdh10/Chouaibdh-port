import Sidebar from '../components/Sidebar';

export default function About() {
  return (
    <div className="main-layout fade-in">
      <main className="about-page">
        <div className="card">
          <h1>About</h1>
          <p>Hi there 👋 I'm <strong>Boudouh Ahmed Chouaib</strong></p>
          <p>🎓 3rd year student at ESTIN</p>
          <p>💻 Passionate about Web Development and Cybersecurity</p>
          <p>📍 Based in Algeria</p>

          <h3>Skills & Interests</h3>
          <ul>
            <li>🔐 CTF Player & Cybersecurity Enthusiast</li>
            <li>🌐 Web Development (React, Astro, Node.js)</li>
            <li>🛡️ Forensics, Network Analysis, Steganography</li>
            <li>🐧 Linux & System Administration</li>
            <li>🐍 Python Scripting & Automation</li>
          </ul>

          <h3>Connect</h3>
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/in/ahmed-chouaib-boudouh-34a3a52bb/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/chouaibdh10"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
