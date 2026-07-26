import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiX } from 'react-icons/fi';
import { ctfWriteups, getCategories } from '../data/posts';
import PostCard from '../components/PostCard';

export default function CtfChallenges() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '');
  const categories = getCategories(ctfWriteups);

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || '');
  }, [searchParams]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return ctfWriteups.filter((post) => {
      const matchesCategory = !activeCategory || post.category === activeCategory;
      const haystack = [post.title, post.description, post.platform, ...post.tags]
        .join(' ')
        .toLowerCase();
      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [activeCategory, query]);

  const selectCategory = (category) => {
    setActiveCategory(category);
    setSearchParams(category ? { category } : {});
  };

  return (
    <div className="collection-page fade-in">
      <header className="page-intro">
        <p className="eyebrow">Challenge archive</p>
        <h1>CTF writeups</h1>
        <p>
          Reproducible solutions across forensics, cryptography, reverse engineering,
          steganography, and network analysis. Every imported article links back to
          its original GitHub source.
        </p>
        <div className="intro-stats">
          <span><strong>{ctfWriteups.length}</strong> writeups</span>
          <span><strong>{categories.length}</strong> disciplines</span>
          <span>
            <strong>{new Set(ctfWriteups.map((post) => post.platform)).size}</strong> platforms
          </span>
        </div>
      </header>

      <div className="collection-toolbar">
        <label className="search-box">
          <FiSearch />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tools, platforms, or techniques…"
            aria-label="Search CTF writeups"
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Clear search"><FiX /></button>
          )}
        </label>
        <div className="filter-row">
          <button className={!activeCategory ? 'active' : ''} onClick={() => selectCategory('')}>
            All <span>{ctfWriteups.length}</span>
          </button>
          {categories.map((category) => (
            <button
              key={category.name}
              className={activeCategory === category.name ? 'active' : ''}
              onClick={() => selectCategory(category.name)}
            >
              {category.name} <span>{category.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="results-heading">
        <span>{filtered.length} {filtered.length === 1 ? 'result' : 'results'}</span>
        {(query || activeCategory) && (
          <button onClick={() => { setQuery(''); selectCategory(''); }}>Reset filters</button>
        )}
      </div>

      <div className="collection-grid">
        {filtered.map((post) => <PostCard key={post.id} post={post} compact />)}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <h2>No writeups found</h2>
          <p>Try a broader keyword or clear the active category.</p>
        </div>
      )}
    </div>
  );
}
