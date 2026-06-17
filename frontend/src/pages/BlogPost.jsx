import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { useSettings } from '../context/SettingsContext';
import '../styles/Blog.css';

/**
 * Render blog content nicely.
 * - If it already contains block HTML tags, use it as-is.
 * - Otherwise (plain text pasted in the Simple editor), convert it:
 *   blank-line-separated chunks become paragraphs; short lines that look
 *   like headings become <h2>.
 */
function renderContent(raw) {
  if (!raw) return '';
  const hasHtml = /<(p|h[1-6]|ul|ol|li|blockquote|div|img|table)\b/i.test(raw);
  if (hasHtml) return raw;

  // Split into blocks by blank lines; if none, split by single newlines.
  let blocks = raw.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  if (blocks.length <= 1) {
    blocks = raw.split(/\n/).map((b) => b.trim()).filter(Boolean);
  }

  return blocks.map((block) => {
    const isHeading =
      block.length < 70 &&
      !/[.!?:]$/.test(block) &&
      /^[A-Z0-9]/.test(block) &&
      block.split(' ').length <= 9;
    if (isHeading) return `<h2>${block}</h2>`;
    return `<p>${block.replace(/\n/g, '<br/>')}</p>`;
  }).join('\n');
}

export default function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { settings } = useSettings();
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

  const date = new Date(post.created_at).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const authorInitial = (post.author || 'D').charAt(0).toUpperCase();

  return (
    <main className="blogpost-page2">
      <div className="blogpost2">

        {/* ── LEFT: Article ── */}
        <article className="blogpost2__main">
          {/* Category + date */}
          <div className="blogpost2__top">
            {post.category && <span className="blogpost2__cat">{post.category}</span>}
            <span className="blogpost2__date">📅 {date}</span>
          </div>

          {/* Title */}
          <h1 className="blogpost2__title">{post.title}</h1>

          {/* Author row: avatar + name (left), socials (right) */}
          <div className="blogpost2__author-row">
            <div className="blogpost2__author">
              <div className="blogpost2__avatar">{authorInitial}</div>
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
