import React, { useEffect, useMemo, useState } from 'react';
import Seo from '../components/Seo';
import { Link } from 'react-router-dom';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import '../styles/Blog.css';

/* ~200 words/minute, stripped of HTML tags — matches typical blog read-time estimates. */
function readTime(html) {
  const words = (html || '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function formatDate(iso) {
  const d = new Date(iso);
  if (isNaN(d)) return '';
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

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
  // The newest post also gets a wide banner above the grid — desktop only,
  // hidden on mobile where there isn't room for it (see .blog-featured2 CSS).
  const newest = sorted[0];

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

      {/* Newest post — wide banner, desktop only (see .blog-featured2 CSS). */}
      {!loading && newest && (
        <section className="blog-featured2">
          <div className="blog-container">
            <Link to={`/blog/${newest.slug || newest.id}`} className="blog-featured2__card">
              <div className="blog-featured2__media">
                {newest.image_url
                  ? <img src={newest.image_url} alt={newest.title} loading="lazy" />
                  : <div className="blog-featured2__placeholder" />}
              </div>
              <div className="blog-featured2__body">
                <div className="blog-featured2__meta">
                  <span>{formatDate(newest.created_at)}</span>
                  <span className="blog-featured2__dot" aria-hidden="true">·</span>
                  <span>{readTime(newest.content)} min read</span>
                </div>
                <h2 className="blog-featured2__title">{newest.title}</h2>
                {newest.excerpt && <p className="blog-featured2__excerpt">{newest.excerpt}</p>}
                <span className="blog-featured2__read">Read More <FiArrowRight /></span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="blog-section">
        <div className="blog-container">
          {loading && <p className="blog-loading">Loading posts…</p>}

          {!loading && posts.length === 0 && (
            <div className="blog-empty"><p>No blog posts published yet. Check back soon!</p></div>
          )}

          {/* ── Filter + search bar ── */}
          {!loading && posts.length > 1 && (
            <div className="blog-filterbar">
              {/* Chips on desktop; a single dropdown on mobile, where a row of
                  chips wrapped onto several lines. */}
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
              <select
                className="blog-cat-select"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                aria-label="Filter by category"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
                ))}
              </select>
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
        <span className="blog-card__read">Read More <FiArrowRight /></span>
      </div>
    </Link>
  );
}
