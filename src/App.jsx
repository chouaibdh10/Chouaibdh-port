import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Archive from './pages/Archive';
import About from './pages/About';
import PostPage from './pages/PostPage';
import './styles/global.css';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />
        <Banner />
        <div className="site-wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
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
