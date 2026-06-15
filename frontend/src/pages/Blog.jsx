import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Blog.css';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog?published=1')
      .then((r) => r.json())
      .then((data) => { setPosts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <main className="blog-page">
      {/* Hero */}
      <section className="blog-hero">
        <div className="blog-hero__content">
          <span className="blog-hero__label">Our Blog</span>
          <h1 className="blog-hero__heading">
            Digital Marketing <span className="blog-hero__yellow">Insights</span>
          </h1>
          <p className="blog-hero__sub">
            Tips, strategies and case studies to help your business grow online.
          </p>
          <nav className="blog-hero__breadcrumb">
            <Link to="/" className="blog-bc-link">Home</Link>
            <span> / </span>
            <span className="blog-bc-cur">Blog</span>
          </nav>
        </div>
      </section>

      {/* Cards */}
      <section className="blog-section">
        <div className="blog-container">
          {loading && <p className="blog-loading">Loading posts…</p>}
          {!loading && posts.length === 0 && (
            <div className="blog-empty">
              <p>No blog posts published yet. Check back soon!</p>
            </div>
          )}
          <div className="blog-grid">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.slug || post.id}`} className="blog-card">
      {/* Image — full width, rounded top */}
      <div className="blog-card__img-wrap">
        {post.image_url ? (
          <img src={post.image_url} alt={post.title} className="blog-card__img" />
        ) : (
          <div className="blog-card__img-placeholder">
            <span>📝</span>
          </div>
        )}
        {post.category && (
          <span className="blog-card__cat">{post.category}</span>
        )}
      </div>
      {/* Yellow body */}
      <div className="blog-card__body">
        <h3 className="blog-card__title">{post.title}</h3>
        {post.excerpt && <p className="blog-card__excerpt">{post.excerpt}</p>}
        <span className="blog-card__read">Read More &nbsp;→</span>
      </div>
    </Link>
  );
}
