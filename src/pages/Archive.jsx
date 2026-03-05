import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import posts, { getCategories, getTags } from '../data/posts';
import Sidebar from '../components/Sidebar';
import { FiCalendar } from 'react-icons/fi';

export default function Archive() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialTag = searchParams.get('tag') || '';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeTag, setActiveTag] = useState(initialTag);

  const categories = getCategories();
  const tags = getTags();

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (activeTag && !p.tags.includes(activeTag)) return false;
      return true;
    });
  }, [activeCategory, activeTag]);

  const clearFilters = () => {
    setActiveCategory('');
    setActiveTag('');
  };

  return (
    <div className="main-layout fade-in">
      <main className="archive-page">
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.25rem' }}>
          Archive
        </h1>

        {/* Category filters */}
        <div className="archive-filters">
          <button
            className={`filter-btn ${!activeCategory ? 'active' : ''}`}
            onClick={() => setActiveCategory('')}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.name}
              className={`filter-btn ${activeCategory === cat.name ? 'active' : ''}`}
              onClick={() => { setActiveCategory(cat.name); setActiveTag(''); }}
            >
              {cat.name} ({cat.count})
            </button>
          ))}
        </div>

        {/* Tag filters */}
        {activeTag && (
          <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>Tag:</span>
            <span className="tag-item" style={{ cursor: 'default' }}>{activeTag}</span>
            <button
              onClick={clearFilters}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                cursor: 'pointer',
                fontSize: '0.85rem',
              }}
            >
              Clear
            </button>
          </div>
        )}

        {/* Post list */}
        <div className="card archive-list">
          {filtered.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-tertiary)' }}>
              No posts found.
            </div>
          )}
          {filtered.map((post) => (
            <Link key={post.id} to={`/posts/${post.id}`} className="archive-item">
              <span className="archive-date">
                <FiCalendar size={13} style={{ marginRight: '0.3rem', verticalAlign: '-2px' }} />
                {post.date}
              </span>
              <span className="archive-category-badge">{post.category}</span>
              <span className="archive-title">{post.title}</span>
            </Link>
          ))}
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
