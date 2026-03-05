import posts from '../data/posts';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div className="main-layout fade-in">
      <main>
        <div className="post-list">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
      <Sidebar />
    </div>
  );
}
