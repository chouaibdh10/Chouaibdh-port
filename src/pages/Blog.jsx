import { FiArrowRight } from 'react-icons/fi';
import { blogPosts } from '../data/posts';
import PostCard from '../components/PostCard';

export default function Blog() {
  return (
    <div className="collection-page fade-in">
      <header className="page-intro page-intro-split">
        <div>
          <p className="eyebrow">Field notes</p>
          <h1>Blog</h1>
        </div>
        <p>
          Longer-form notes on security workflows, tools, and the habits that turn
          raw technical evidence into useful conclusions.
        </p>
      </header>

      <div className="blog-feature">
        {blogPosts.map((post) => <PostCard post={post} key={post.id} />)}
      </div>

      <section className="newsletter-panel">
        <div>
          <p className="eyebrow">More notes are coming</p>
          <h2>Follow the repository for new investigations.</h2>
        </div>
        <a
          className="button button-primary"
          href="https://github.com/chouaibdh10"
          target="_blank"
          rel="noopener noreferrer"
        >
          Follow on GitHub <FiArrowRight />
        </a>
      </section>
    </div>
  );
}
