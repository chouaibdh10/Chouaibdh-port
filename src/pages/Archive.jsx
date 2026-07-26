import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCalendar } from 'react-icons/fi';
import posts from '../data/posts';

export default function Archive() {
  return (
    <div className="collection-page fade-in">
      <header className="page-intro">
        <p className="eyebrow">Everything, chronologically</p>
        <h1>Archive</h1>
        <p>All published writeups and notes in one compact index.</p>
      </header>

      <div className="archive-list">
        {posts.map((post) => (
          <Link key={post.id} to={`/posts/${post.id}`} className="archive-item">
            <span className="archive-date"><FiCalendar /> {post.date}</span>
            <span className="archive-category-badge">{post.type === 'ctf' ? 'CTF' : 'Blog'}</span>
            <span className="archive-title">{post.title}</span>
            <FiArrowUpRight className="archive-arrow" />
          </Link>
        ))}
      </div>
    </div>
  );
}
