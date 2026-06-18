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
    subtitle: 'Website Design & Development',
    category: 'education',
    image: '/images/work/stressless-learner.png',
    link: 'https://example.com', // replace with the live URL
  },
  {
    id: 2,
    title: 'Rithala Village',
    subtitle: 'Website Design & Development',
    category: 'community',
    image: '/images/work/rithala-village.png',
    link: 'https://example.com', // replace with the live URL
  },
  {
    id: 3,
    title: 'Blameless',
    subtitle: 'E-Commerce Website Development',
    category: 'ecommerce',
    image: '/images/work/blameless-skincare.png',
    link: 'https://blameless.in/',
  },
  {
    id: 4,
    title: 'Smile Dental Care Centre',
    subtitle: 'Healthcare Website Development',
    category: 'healthcare',
    image: '/images/work/smile-dental.png',
    link: 'https://smiledentalcarecentre.com/',
  },
  {
    id: 5,
    title: 'Baid Stock Broking',
    subtitle: 'Financial Services Website Development',
    category: 'finance',
    image: '/images/work/baid-finance.png',
    link: 'https://baidstockbroking.com/',
  },
  {
    id: 6,
    title: 'Toreto',
    subtitle: 'E-Commerce Website Development',
    category: 'ecommerce',
    image: '/images/work/toreto.png',
    link: 'https://toreto.in/',
  },
  {
    id: 7,
    title: 'Delhi Dental Implants',
    subtitle: 'Dental Clinic Website Development',
    category: 'healthcare',
    image: '/images/work/delhi-dental.png',
    link: '#',
  },
  {
    id: 8,
    title: 'Delhi Dentist',
    subtitle: 'Dental Healthcare Website Development',
    category: 'healthcare',
    image: '/images/work/delhi-dentist.png',
    link: '#',
  },
  {
    id: 9,
    title: 'Lightboard Signage',
    subtitle: 'Business Website Development',
    category: 'advertising',
    image: '/images/work/lightboard-signage.png',
    link: '#',
  },
];

/* Sub-categories shown as filter tabs */
const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'healthcare', label: 'Healthcare & Dental' },
  { id: 'finance', label: 'Finance & Stock Market' },
  { id: 'education', label: 'Education & Learning' },
  { id: 'community', label: 'Information & Community' },
  { id: 'advertising', label: 'Advertising & Branding' },
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
