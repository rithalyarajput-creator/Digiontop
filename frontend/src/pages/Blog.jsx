import React, { useEffect, useMemo, useState } from 'react';
import Seo from '../components/Seo';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import '../styles/Blog.css';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cat, setCat] = useState('all');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/api/blog?published=1')
      .then((r) => r.json())
      .then((data) => { setPosts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  // newest first
  // Sort by whichever is more recent — updated_at (bumped when a post is
  // edited or auto-published from a schedule) or created_at. Sorting by
  // created_at alone left a scheduled post's original draft date in place,
  // so it could publish without ever reaching the top of the list.
  const sorted = useMemo(
    () => [...posts].sort((a, b) => {
      const aTime = Math.max(new Date(a.updated_at || 0), new Date(a.created_at || 0));
      const bTime = Math.max(new Date(b.updated_at || 0), new Date(b.created_at || 0));
      return bTime - aTime;
    }),
    [posts]
  );
  // Every post uses the same card now — no separate featured banner.
  const rest = sorted;

  // category list from posts
  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [posts]);

  const filtered = useMemo(() => {
    let list = rest;
    if (cat !== 'all') list = list.filter((p) => p.category === cat);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => (p.title || '').toLowerCase().includes(q));
    }
    return list;
  }, [rest, cat, query]);

  return (
    <main className="blog-page">
      <Seo
        title="Digital Marketing Blog — SEO, Social & E-Commerce Tips"
        description="Practical digital marketing insights from DigionTop — SEO tactics, social media strategy, e-commerce growth tips and real case studies. Start reading today."
        path="/blog"
      />
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
        </div>
      </section>

      <section className="blog-section">
        <div className="blog-container">
          {loading && <p className="blog-loading">Loading posts…</p>}

          {!loading && posts.length === 0 && (
            <div className="blog-empty"><p>No blog posts published yet. Check back soon!</p></div>
          )}

          {/* ── Filter + search bar ── */}
          {!loading && posts.length > 1 && (
            <div className="blog-filterbar">
              <div className="blog-filterbar__cats">
                {categories.map((c) => (
                  <button
                    key={c}
                    className={`blog-chip${cat === c ? ' blog-chip--active' : ''}`}
                    onClick={() => setCat(c)}
                  >
                    {c === 'all' ? 'All Categories' : c}
                  </button>
                ))}
              </div>
              <div className="blog-search">
                <FiSearch />
                <input
                  type="text"
                  placeholder="Search articles…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ── Grid of remaining posts ── */}
          <div className="blog-grid">
            {filtered.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          {!loading && posts.length > 1 && filtered.length === 0 && (
            <p className="blog-loading">No articles match your search.</p>
          )}
        </div>
      </section>
    </main>
  );
}


export function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.slug || post.id}`} className="blog-card">
      <div className="blog-card__img-wrap">
        {post.image_url ? (
          <img src={post.image_url} alt={post.title} className="blog-card__img" loading="lazy" />
        ) : (
          <div className="blog-card__img-placeholder" />
        )}
      </div>
      <div className="blog-card__yellow">
        <h3 className="blog-card__title">{post.title}</h3>
        <span className="blog-card__read">Read More</span>
      </div>
    </Link>
  );
}
