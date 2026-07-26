import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiCalendar, FiClock } from 'react-icons/fi';

export default function PostCard({ post, compact = false }) {
  return (
    <Link
      to={`/posts/${post.id}`}
      className={`post-card ${compact ? 'post-card-compact' : ''}`}
    >
      <div className="post-card-content">
        <div className="post-card-meta">
          <span className="post-card-category">{post.category}</span>
          <span className="meta-item">
            <FiCalendar size={13} />
            {post.date}
          </span>
        </div>
        <div className="post-card-heading">
          <h3 className="post-card-title">{post.title}</h3>
          <FiArrowUpRight className="post-card-arrow" />
        </div>
        {(post.platform || post.difficulty) && (
          <div className="post-card-context">
            {post.platform && <span>{post.platform}</span>}
            {post.difficulty && <span>{post.difficulty}</span>}
          </div>
        )}
        <p className="post-card-desc">{post.description}</p>
        <div className="post-card-tags">
          {post.tags.slice(0, compact ? 3 : 4).map((tag) => (
            <span key={tag}>#{tag}</span>
          ))}
        </div>
        <div className="post-card-footer">
          <FiClock size={13} />
          {post.readTime}
        </div>
      </div>
    </Link>
  );
}
