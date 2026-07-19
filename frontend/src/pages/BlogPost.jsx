import React, { useEffect, useState } from 'react';
import Seo from '../components/Seo';
import JsonLd, { toPlainText } from '../components/JsonLd';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { FiCheckCircle, FiArrowRight, FiCalendar } from 'react-icons/fi';
import { useSettings } from '../context/SettingsContext';
import { renderBlogContent as renderContent } from '../utils/renderBlog';
import '../styles/Blog.css';

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog?slug=${slug}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((data) => { setPost(data); setLoading(false); })
      .catch(() => { setLoading(false); navigate('/blog'); });
  }, [slug]);

  useEffect(() => {
    fetch('/api/cms?resource=authors')
      .then((r) => r.json())
      .then((a) => { if (Array.isArray(a)) setAuthors(a); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('/api/blog?published=1')
      .then((r) => r.json())
      .then((all) => {
        if (!Array.isArray(all)) return;
        const others = all.filter((p) => (p.slug || String(p.id)) !== slug);
        // Prefer same category, then fill with latest others
        const sameCat = post?.category ? others.filter((p) => p.category === post.category) : [];
        const rest = others.filter((p) => !sameCat.includes(p));
        setRelated([...sameCat, ...rest].slice(0, 3));
      })
      .catch(() => {});
  }, [slug, post?.category]);

  if (loading) return <div className="blog-loading-page">Loading…</div>;
  if (!post) return null;

  const date = new Date(post.created_at).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const authorInitial = (post.author || 'D').charAt(0).toUpperCase();
  const authorObj = authors.find((a) => a.name === post.author);
  const authorAvatar = authorObj?.avatar_url;

  // BlogPosting schema — only real post data; fields are omitted when absent.
  const SITE = 'https://www.digiontop.com';
  const postDescription = toPlainText(post.meta_description || post.excerpt || '');
  const postSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/blog/${post.slug || slug}` },
    ...(postDescription ? { description: postDescription } : {}),
    ...(post.image_url ? { image: post.image_url } : {}),
    ...(post.created_at ? { datePublished: new Date(post.created_at).toISOString() } : {}),
    ...(post.updated_at || post.created_at
      ? { dateModified: new Date(post.updated_at || post.created_at).toISOString() }
      : {}),
    ...(post.author ? { author: { '@type': 'Person', name: post.author } } : {}),
    publisher: {
      '@type': 'Organization',
      name: 'DigionTop',
      logo: { '@type': 'ImageObject', url: `${SITE}/images/logo-header.webp` },
    },
  };

  return (
    <main className="blogpost-page2">
      <JsonLd data={postSchema} />
      <Seo
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt || `Read "${post.title}" on the DigionTop blog, practical digital marketing insight for growing Indian businesses.`}
        path={`/blog/${post.slug || slug}`}
        type="article"
        image={post.image_url || undefined}
      />
      <div className="blogpost2">

        {/* ── LEFT: Article ── */}
        <article className="blogpost2__main">
          {/* Category + date */}
          <div className="blogpost2__top">
            {post.category && <span className="blogpost2__cat">{post.category}</span>}
            <span className="blogpost2__date"><FiCalendar /> {date}</span>
          </div>

          {/* Title */}
          <h1 className="blogpost2__title">{post.title}</h1>

          {/* Author row: avatar + name (left), socials (right) */}
          <div className="blogpost2__author-row">
            <div className="blogpost2__author">
              <div className="blogpost2__avatar">
                {authorAvatar ? <img src={authorAvatar} alt={post.author || 'Author'} /> : authorInitial}
              </div>
              <div>
                <p className="blogpost2__written">Written by</p>
                <p className="blogpost2__author-name">{post.author || 'DigionTop Team'}</p>
              </div>
            </div>
            <div className="blogpost2__socials">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" aria-label="Share on Facebook"><FaFacebookF /></a>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer" aria-label="Share on X"><FaXTwitter /></a>
              <a href={settings.social_instagram || 'https://instagram.com'} target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Featured image */}
          {post.image_url && (
            <div className="blogpost2__hero-img">
              <img src={post.image_url} alt={post.title} />
            </div>
          )}

          {/* Content */}
          <div
            className="blogpost-content"
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />

          <div className="blogpost-back">
            <Link to="/blog" className="blogpost-back-btn">← Back to Blog</Link>
          </div>
        </article>

        {/* ── RIGHT: Contact form (sticky) ── */}
        <aside className="blogpost2__side">
          <BlogLeadForm />
        </aside>

      </div>

      {/* ── Related posts ── */}
      {related.length > 0 && (
        <section className="blog-related">
          <h2 className="blog-related__heading">You Must Also Read</h2>
          <div className="blog-related__grid">
            {related.map((r) => (
              <Link key={r.id} to={`/blog/${r.slug || r.id}`} className="blog-related__card">
                {r.image_url
                  ? <img src={r.image_url} alt={r.title} className="blog-related__img" />
                  : <div className="blog-related__img" />}
                <div className="blog-related__body">
                  {r.category && <span className="blog-related__cat">{r.category}</span>}
                  <h3 className="blog-related__title">{r.title}</h3>
                  <span className="blog-related__date">
                    <FiCalendar /> {new Date(r.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

/* Sidebar lead form (editorial style) */
function BlogLeadForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setSending(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.name, phone: form.phone, email: form.email,
          message: 'Lead from blog sidebar', source: 'blog',
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="blog-leadform">
      <h3 className="blog-leadform__title">Grow Your Business</h3>
      <p className="blog-leadform__sub">Get a free marketing strategy. No commitment needed.</p>
      {sent ? (
        <div className="blog-leadform__success">
          <FiCheckCircle size={20} /> <span>Thanks! We'll reach out soon.</span>
        </div>
      ) : (
        <form onSubmit={submit} className="blog-leadform__form">
          <input type="text" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input type="tel" placeholder="Mobile Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required />
          <input type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <button type="submit" disabled={sending}>
            {sending ? 'Sending…' : <>Get Free Strategy <FiArrowRight /></>}
          </button>
        </form>
      )}
      <ul className="blog-leadform__perks">
        <li><FiCheckCircle /> Free Consultation</li>
        <li><FiCheckCircle /> No Commitment</li>
        <li><FiCheckCircle /> Expert Team</li>
      </ul>
    </div>
  );
}
