import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Blog from './pages/Blog';
import CtfChallenges from './pages/CtfChallenges';
import Projects from './pages/Projects';
import Archive from './pages/Archive';
import About from './pages/About';
import PostPage from './pages/PostPage';
import './styles/global.css';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <div className="site-wrapper page-shell">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/ctf" element={<CtfChallenges />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/archive" element={<Archive />} />
            <Route path="/about" element={<About />} />
            <Route path="/posts/:id" element={<PostPage />} />
          </Routes>
        </div>
        <Footer />
        <BackToTop />
      </BrowserRouter>
    </ThemeProvider>
  );
}
