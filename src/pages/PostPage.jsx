import { useParams, Link } from 'react-router-dom';
import posts from '../data/posts';
import Sidebar from '../components/Sidebar';
import { FiCalendar, FiClock, FiArrowLeft } from 'react-icons/fi';

// Simple markdown-like renderer
function renderContent(content) {
  if (!content) return null;

  const lines = content.split('\n');
  const elements = [];
  let inCodeBlock = false;
  let codeLines = [];
  let codeLang = '';
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block toggle
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={key++}>
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLang = line.trim().replace('```', '');
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      elements.push(<h3 key={key++}>{formatInline(trimmed.slice(4))}</h3>);
    } else if (trimmed.startsWith('## ')) {
      elements.push(<h2 key={key++}>{formatInline(trimmed.slice(3))}</h2>);
    } else if (trimmed.startsWith('# ')) {
      elements.push(<h1 key={key++}>{formatInline(trimmed.slice(2))}</h1>);
    }
    // Blockquote
    else if (trimmed.startsWith('> ')) {
      elements.push(<blockquote key={key++}>{formatInline(trimmed.slice(2))}</blockquote>);
    }
    // Unordered list
    else if (trimmed.startsWith('- ')) {
      const items = [trimmed.slice(2)];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith('- ')) {
        i++;
        items.push(lines[i].trim().slice(2));
      }
      elements.push(
        <ul key={key++}>
          {items.map((item, j) => (
            <li key={j}>{formatInline(item)}</li>
          ))}
        </ul>
      );
    }
    // Paragraph
    else {
      elements.push(<p key={key++}>{formatInline(trimmed)}</p>);
    }
  }

  return elements;
}

function formatInline(text) {
  // Handle bold, inline code, links
  const parts = [];
  let remaining = text;
  let k = 0;

  while (remaining.length > 0) {
    // Inline code
    const codeMatch = remaining.match(/`([^`]+)`/);
    // Bold
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    // Link
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    let earliest = null;
    let type = null;

    if (codeMatch && (!earliest || remaining.indexOf(codeMatch[0]) < remaining.indexOf(earliest[0]))) {
      earliest = codeMatch;
      type = 'code';
    }
    if (boldMatch && (!earliest || remaining.indexOf(boldMatch[0]) < remaining.indexOf(earliest[0]))) {
      earliest = boldMatch;
      type = 'bold';
    }
    if (linkMatch && (!earliest || remaining.indexOf(linkMatch[0]) < remaining.indexOf(earliest[0]))) {
      earliest = linkMatch;
      type = 'link';
    }

    if (!earliest) {
      parts.push(remaining);
      break;
    }

    const idx = remaining.indexOf(earliest[0]);
    if (idx > 0) {
      parts.push(remaining.slice(0, idx));
    }

    if (type === 'code') {
      parts.push(<code key={k++}>{earliest[1]}</code>);
    } else if (type === 'bold') {
      parts.push(<strong key={k++}>{earliest[1]}</strong>);
    } else if (type === 'link') {
      parts.push(
        <a key={k++} href={earliest[2]} target="_blank" rel="noopener noreferrer">
          {earliest[1]}
        </a>
      );
    }

    remaining = remaining.slice(idx + earliest[0].length);
  }

  return parts;
}

export default function PostPage() {
  const { id } = useParams();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="main-layout fade-in">
        <main className="post-page">
          <div className="card" style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Post not found</h2>
            <p style={{ marginTop: '1rem' }}>
              <Link to="/">← Back to Home</Link>
            </p>
          </div>
        </main>
        <Sidebar />
      </div>
    );
  }

  return (
    <div className="main-layout fade-in">
      <main className="post-page">
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            marginBottom: '1.5rem',
            fontSize: '0.9rem',
            color: 'var(--text-tertiary)',
          }}
        >
          <FiArrowLeft /> Back to Home
        </Link>

        <div className="card" style={{ padding: '2rem 2.5rem' }}>
          <div className="post-header">
            <h1>{post.title}</h1>
            <div className="post-meta">
              <span className="post-card-category">{post.category}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <FiCalendar size={14} />
                {post.date}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <FiClock size={14} />
                {post.readTime}
              </span>
            </div>
            <div className="post-card-tags" style={{ marginTop: '0.75rem' }}>
              {post.tags.map((tag, i) => (
                <Link
                  key={tag}
                  to={`/archive?tag=${encodeURIComponent(tag)}`}
                  className="tag-item"
                  style={{ fontSize: '0.78rem' }}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '1.5rem 0' }} />

          <div className="post-body">{renderContent(post.content)}</div>
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
