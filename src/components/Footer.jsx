export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© {year} Boudouh Ahmed Chouaib</span>
        <span className="footer-note">Built around curiosity, evidence, and clean writeups.</span>
        <div className="footer-links">
          <a href="https://github.com/chouaibdh10" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ahmed-chouaib-boudouh-34a3a52bb/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
