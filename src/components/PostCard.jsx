import { Link } from 'react-router-dom';
import { FiCalendar, FiClock } from 'react-icons/fi';

export default function PostCard({ post }) {
  return (
    <Link to={`/posts/${post.id}`} className="card post-card no-image" style={{ textDecoration: 'none' }}>
      <div className="post-card-content">
        <div className="post-card-meta">
          <span className="post-card-category">{post.category}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <FiCalendar size={13} />
            {post.date}
          </span>
        </div>
        <div className="post-card-title">{post.title}</div>
        <div className="post-card-tags">
          {post.tags.map((tag, i) => (
            <span key={tag}>
              {tag}
              {i < post.tags.length - 1 ? ' /' : ''}
            </span>
          ))}
        </div>
        <div className="post-card-desc">{post.description}</div>
        <div className="post-card-footer" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <FiClock size={13} />
          {post.wordCount} words | {post.readTime}
        </div>
      </div>
    </Link>
  );
}
