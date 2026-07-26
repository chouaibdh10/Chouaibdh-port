import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import posts from '../data/posts';
import Sidebar from '../components/Sidebar';
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiCalendar,
  FiClock,
  FiGithub,
} from 'react-icons/fi';

export default function PostPage() {
  const { id } = useParams();
  const post = posts.find((item) => item.id === id);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [id]);

  if (!post) {
    return (
      <div className="empty-state page-empty">
        <p className="eyebrow">404</p>
        <h1>Writeup not found</h1>
        <p>The article may have moved or the URL is incomplete.</p>
        <Link className="button button-primary" to="/">Back home</Link>
      </div>
    );
  }

  const backTo = post.type === 'ctf' ? '/ctf' : '/blog';
  const backLabel = post.type === 'ctf' ? 'All CTF writeups' : 'Back to blog';

  return (
    <div className="article-layout fade-in">
      <main className="post-page">
        <Link to={backTo} className="back-link"><FiArrowLeft /> {backLabel}</Link>

        <article className="article-card">
          <header className="post-header">
            <div className="post-kicker">
              <span>{post.category}</span>
              {post.platform && <span>{post.platform}</span>}
              {post.difficulty && <span>{post.difficulty}</span>}
            </div>
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <div className="post-meta">
              <span><FiCalendar /> {post.date}</span>
              <span><FiClock /> {post.readTime}</span>
              <span>{post.wordCount.toLocaleString()} words</span>
            </div>
            <div className="post-card-tags">
              {post.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
            {post.sourceUrl && (
              <a
                className="source-link"
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub /> View original Markdown <FiArrowUpRight />
              </a>
            )}
          </header>

          <div className="post-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children, ...props }) => (
                  <a
                    href={href}
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    {...props}
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>
      </main>
      <Sidebar />
    </div>
  );
}
