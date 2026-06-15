import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../styles/Blog.css';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog?slug=${slug}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => { setPost(data); setLoading(false); })
      .catch(() => { setLoading(false); navigate('/blog'); });
  }, [slug]);

  if (loading) return <div className="blog-loading-page">Loading…</div>;
  if (!post) return null;

  const date = new Date(post.created_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  return (
    <main className="blogpost-page">
      {/* Hero with featured image */}
      <section className="blogpost-hero" style={post.image_url ? { backgroundImage: `url(${post.image_url})` } : {}}>
        <div className="blogpost-hero__overlay" />
        <div className="blogpost-hero__content">
          {post.category && <span className="blogpost-cat">{post.category}</span>}
          <h1 className="blogpost-title">{post.title}</h1>
          <div className="blogpost-meta">
            {post.author && <span>✍ {post.author}</span>}
            <span>📅 {date}</span>
          </div>
          <nav className="blogpost-breadcrumb">
            <Link to="/" className="blog-bc-link">Home</Link>
            <span> / </span>
            <Link to="/blog" className="blog-bc-link">Blog</Link>
            <span> / </span>
            <span className="blog-bc-cur">{post.title}</span>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="blogpost-body">
        <div className="blogpost-container">
          {post.excerpt && <p className="blogpost-excerpt">{post.excerpt}</p>}
          <div
            className="blogpost-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="blogpost-back">
            <Link to="/blog" className="blogpost-back-btn">← Back to Blog</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
