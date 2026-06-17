import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink } from 'react-icons/fi';
import '../styles/Work.css';

/* ──────────────────────────────────────────────────────────────
   PROJECTS
   Add each website here. `image` = full-length website screenshot
   (a tall image — it scrolls top→bottom on hover).
   `category` is the sub-category. `link` = live website URL.
   ────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: 'Stressless Learner',
    subtitle: 'Education · Web Design',
    category: 'education',
    image: '/images/work/stressless-learner.png',
    link: 'https://example.com', // replace with the live URL
  },
  // Add more like:
  // { id: 2, title: 'My Store', subtitle: 'E-Commerce · Web Design', category: 'ecommerce', image: '/images/work/store.png', link: 'https://...' },
];

/* Sub-categories shown as filter tabs */
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'website', label: 'Website' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'informative', label: 'Informative' },
  { id: 'education', label: 'Education' },
  { id: 'seo', label: 'SEO' },
];

export default function Work() {
  const [active, setActive] = useState('all');

  const filtered = useMemo(
    () => (active === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === active)),
    [active]
  );

  return (
    <main className="work-page">
      {/* Hero */}
      <section className="work-hero">
        <div className="work-hero__content">
          <span className="work-hero__label">Our Portfolio</span>
          <h1 className="work-hero__heading">
            Check Out <span className="work-hero__yellow">Our Work</span>
          </h1>
          <p className="work-hero__sub">
            Real websites we've designed & built for businesses across India.
            Hover any project to preview the full page.
          </p>
          <nav className="work-hero__breadcrumb">
            <Link to="/" className="work-hero__bc-link">Home</Link>
            <span> / </span>
            <span className="work-hero__bc-current">Our Work</span>
          </nav>
        </div>
      </section>

      {/* Category tabs */}
      <section className="work-categories">
        <div className="work-container">
          <div className="work-cats">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`work-cat-btn${active === cat.id ? ' work-cat-btn--active' : ''}`}
                onClick={() => setActive(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project grid */}
      <section className="work-grid-section">
        <div className="work-container">
          {filtered.length === 0 ? (
            <div className="work-coming-soon">
              <div className="work-coming-soon__icon">🚀</div>
              <h2 className="work-coming-soon__heading">More Projects Coming Soon</h2>
              <p className="work-coming-soon__text">
                We're adding more work to this category. Check back soon.
              </p>
              <Link to="/contact" className="work-coming-soon__cta">Discuss Your Project →</Link>
            </div>
          ) : (
            <div className="work-grid">
              {filtered.map((p) => (
                <a
                  key={p.id}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-card"
                >
                  {/* Browser-style frame */}
                  <div className="work-card__bar">
                    <span className="work-card__dot" />
                    <span className="work-card__dot" />
                    <span className="work-card__dot" />
                    <span className="work-card__url">{prettyUrl(p.link)}</span>
                  </div>
                  {/* Scrolling screenshot window */}
                  <div className="work-card__window">
                    <img src={p.image} alt={p.title} className="work-card__shot" />
                  </div>
                  {/* Caption */}
                  <div className="work-card__caption">
                    <div>
                      <span className="work-card__title">{p.title}</span>
                      {p.subtitle && <span className="work-card__sub">{p.subtitle}</span>}
                    </div>
                    <span className="work-card__btn"><FiExternalLink /></span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function prettyUrl(url) {
  try { return new URL(url).hostname.replace('www.', ''); } catch { return url; }
}
