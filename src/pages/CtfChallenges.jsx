import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  FiBox,
  FiCode,
  FiFlag,
  FiLayers,
  FiSearch,
  FiShield,
  FiX,
} from 'react-icons/fi';
import { ctfWriteups, getCategories } from '../data/posts';
import PostCard from '../components/PostCard';

const platformGroups = [
  {
    id: '',
    label: 'All writeups',
    description: 'Everything in the archive',
    platforms: [],
    icon: FiLayers,
  },
  {
    id: 'hack-the-box',
    label: 'Hack The Box',
    description: 'Machines, Sherlocks & challenges',
    platforms: ['Hack The Box', 'HTB'],
    icon: FiBox,
  },
  {
    id: 'tryhackme',
    label: 'TryHackMe',
    description: 'Rooms and learning paths',
    platforms: ['TryHackMe'],
    icon: FiCode,
  },
  {
    id: 'cyberdefenders',
    label: 'CyberDefenders',
    description: 'Blue-team investigation labs',
    platforms: ['CyberDefenders'],
    icon: FiShield,
  },
  {
    id: 'competitions',
    label: 'CTF competitions',
    description: 'Event and community challenges',
    platforms: ['NMCTF', 'DalCTF', 'HBU BSides', 'Cybears', 'Nextrace'],
    icon: FiFlag,
  },
  {
    id: 'my-ctf',
    label: 'My CTF challenges',
    description: 'Challenges I created and solved',
    platforms: ['myNEXzero'],
    icon: FiCode,
  },
];

function countForGroup(group) {
  if (!group.id) return ctfWriteups.length;
  return ctfWriteups.filter((post) => group.platforms.includes(post.platform)).length;
}

export default function CtfChallenges() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || '');
  const [activeSource, setActiveSource] = useState(searchParams.get('source') || '');
  const categories = getCategories(ctfWriteups);

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || '');
    setActiveSource(searchParams.get('source') || '');
  }, [searchParams]);

  const activeGroup =
    platformGroups.find((group) => group.id === activeSource) || platformGroups[0];

  const sourcePosts = useMemo(() => {
    if (!activeGroup.id) return ctfWriteups;
    return ctfWriteups.filter((post) => activeGroup.platforms.includes(post.platform));
  }, [activeGroup]);

  const sourceCategories = getCategories(sourcePosts);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return sourcePosts.filter((post) => {
      const matchesCategory = !activeCategory || post.category === activeCategory;
      const haystack = [post.title, post.description, post.platform, ...post.tags]
        .join(' ')
        .toLowerCase();

      return matchesCategory && (!needle || haystack.includes(needle));
    });
  }, [activeCategory, query, sourcePosts]);

  const updateFilters = (source, category) => {
    const nextParams = {};
    if (source) nextParams.source = source;
    if (category) nextParams.category = category;
    setSearchParams(nextParams);
  };

  const selectSource = (source) => {
    setActiveSource(source);
    setActiveCategory('');
    updateFilters(source, '');
  };

  const selectCategory = (category) => {
    setActiveCategory(category);
    updateFilters(activeSource, category);
  };

  const resetFilters = () => {
    setQuery('');
    setActiveSource('');
    setActiveCategory('');
    setSearchParams({});
  };

  return (
    <div className="collection-page fade-in">
      <header className="page-intro">
        <p className="eyebrow">Challenge archive</p>
        <h1>CTF writeups</h1>
        <p>
          Browse practical solutions by platform or technique—from blue-team labs
          and competition CTFs to challenges I built myself.
        </p>
        <div className="intro-stats">
          <span><strong>{ctfWriteups.length}</strong> writeups</span>
          <span><strong>{categories.length}</strong> disciplines</span>
          <span>
            <strong>{new Set(ctfWriteups.map((post) => post.platform)).size}</strong> platforms
          </span>
        </div>
      </header>

      <div className="ctf-explorer">
        <aside className="ctf-filter-sidebar">
          <div className="ctf-filter-panel">
            <label className="ctf-sidebar-search">
              <FiSearch />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search writeups…"
                aria-label="Search CTF writeups"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
                  <FiX />
                </button>
              )}
            </label>

            <div className="ctf-filter-section">
              <div className="ctf-filter-title">
                <span>Platforms</span>
                <small>{platformGroups.length - 1}</small>
              </div>
              <div className="platform-filter-list">
                {platformGroups.map((group) => {
                  const Icon = group.icon;
                  const count = countForGroup(group);

                  return (
                    <button
                      type="button"
                      key={group.id || 'all'}
                      className={activeGroup.id === group.id ? 'active' : ''}
                      onClick={() => selectSource(group.id)}
                    >
                      <span className="platform-filter-icon"><Icon /></span>
                      <span className="platform-filter-copy">
                        <strong>{group.label}</strong>
                        <small>{group.description}</small>
                      </span>
                      <span className={`platform-count ${count === 0 ? 'is-empty' : ''}`}>
                        {count || 'Soon'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="ctf-filter-section">
              <div className="ctf-filter-title">
                <span>Techniques</span>
                <small>{sourceCategories.length}</small>
              </div>
              <div className="technique-filter-list">
                <button
                  type="button"
                  className={!activeCategory ? 'active' : ''}
                  onClick={() => selectCategory('')}
                >
                  All techniques <span>{sourcePosts.length}</span>
                </button>
                {sourceCategories.map((category) => (
                  <button
                    type="button"
                    key={category.name}
                    className={activeCategory === category.name ? 'active' : ''}
                    onClick={() => selectCategory(category.name)}
                  >
                    {category.name} <span>{category.count}</span>
                  </button>
                ))}
                {sourceCategories.length === 0 && (
                  <p className="technique-empty-note">Techniques will appear with new writeups.</p>
                )}
              </div>
            </div>
          </div>
        </aside>

        <main className="ctf-results">
          <div className="ctf-results-header">
            <div>
              <p className="eyebrow">Now browsing</p>
              <h2>{activeGroup.label}</h2>
              <p>{activeGroup.description}</p>
            </div>
            <div className="ctf-result-count">
              <strong>{filtered.length}</strong>
              <span>{filtered.length === 1 ? 'writeup' : 'writeups'}</span>
            </div>
          </div>

          {(query || activeCategory) && (
            <div className="active-filter-summary">
              <span>
                {query && <>Search: “{query}”</>}
                {query && activeCategory && ' · '}
                {activeCategory && <>Technique: {activeCategory}</>}
              </span>
              <button type="button" onClick={resetFilters}>Reset all</button>
            </div>
          )}

          <div className="ctf-results-grid">
            {filtered.map((post) => <PostCard key={post.id} post={post} compact />)}
          </div>

          {filtered.length === 0 && (
            <div className="empty-state ctf-empty-state">
              <span className="empty-state-icon"><activeGroup.icon /></span>
              <h2>
                {activeGroup.id === 'hack-the-box'
                  ? 'Hack The Box writeups coming soon'
                  : 'No matching writeups'}
              </h2>
              <p>
                {activeGroup.id === 'hack-the-box'
                  ? 'This section is ready for machines, Sherlocks, and challenge writeups.'
                  : 'Try another platform, technique, or a broader search.'}
              </p>
              <button type="button" className="button button-secondary" onClick={resetFilters}>
                Browse all writeups
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
