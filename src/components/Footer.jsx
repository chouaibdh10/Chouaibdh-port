export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      © {year} Boudouh Ahmed Chouaib. All Rights Reserved. |{' '}
      Powered by{' '}
      <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
        React
      </a>
    </footer>
  );
}
