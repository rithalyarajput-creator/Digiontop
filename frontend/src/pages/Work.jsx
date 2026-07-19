import React, { useMemo, useState } from 'react';
import Seo from '../components/Seo';
import { FaRocket } from 'react-icons/fa';
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
    image: '/images/work/stressless-learner.webp',
    link: 'https://example.com', // replace with the live URL
  },
  {
    id: 2,
    title: 'Rithala Village',
    subtitle: 'Website Design & Development',
    category: 'community',
    image: '/images/work/rithala-village.webp',
    link: 'https://example.com', // replace with the live URL
  },
  {
    id: 3,
    title: 'Blameless',
    subtitle: 'E-Commerce Website Development',
    category: 'ecommerce',
    image: '/images/work/blameless-skincare.webp',
    link: 'https://blameless.in/',
  },
  {
    id: 8,
    title: 'Delhi Dentist',
    subtitle: 'Dental Healthcare Website Development',
    category: 'healthcare',
    image: '/images/work/delhi-dentist.webp',
    link: '#',
  },
  {
    id: 10,
    title: 'Brand Reel',
    subtitle: 'Social Media · Reel Production',
    category: 'reels',
    video: '/images/work/reel-1.mp4',
    link: '#',
  },
  {
    id: 11,
    title: 'Promo Reel',
    subtitle: 'Social Media · Reel Production',
    category: 'reels',
    video: '/images/work/reel-2.mp4',
    link: '#',
  },
  {
    id: 12,
    title: 'Sunscreen Awareness Post',
    subtitle: 'Social Media · Creative Post',
    category: 'posts',
    poster: '/images/work/post-1.webp',
    link: '#',
  },
  {
    id: 13,
    title: 'Brand Campaign Post',
    subtitle: 'Social Media · Creative Post',
    category: 'posts',
    poster: '/images/work/post-2.webp',
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
  { id: 'reels', label: 'Social Media Reels' },
  { id: 'posts', label: 'Social Media Posts' },
];

export default function Work() {
  const [active, setActive] = useState('all');

  const filtered = useMemo(
    () => (active === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === active)),
    [active]
  );

  return (
    <main className="work-page">
      <Seo
        title="Our Work, Websites We've Designed & Built"
        description="Explore live websites and reels DigionTop has delivered across education, e-commerce, healthcare and community projects in India. Hover any project to preview it."
        path="/work"
      />
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
              <div className="work-coming-soon__icon"><FaRocket /></div>
              <h2 className="work-coming-soon__heading">More Projects Coming Soon</h2>
              <p className="work-coming-soon__text">
                We're adding more work to this category. Check back soon.
              </p>
              <Link to="/contact" className="work-coming-soon__cta">Discuss Your Project →</Link>
            </div>
          ) : (
            <div className={`work-grid${active === 'reels' ? ' work-grid--reels' : ''}${active === 'posts' ? ' work-grid--posts' : ''}`}>
              {filtered.map((p) => {
                const isReel = !!p.video;
                const isPost = !!p.poster;
                const Wrapper = p.link && p.link !== '#' ? 'a' : 'div';
                const wrapProps = p.link && p.link !== '#'
                  ? { href: p.link, target: '_blank', rel: 'noopener noreferrer' }
                  : {};
                return (
                  <Wrapper
                    key={p.id}
                    {...wrapProps}
                    className={`work-card${isReel ? ' work-card--reel' : ''}${isPost ? ' work-card--post' : ''}`}
                  >
                    {isReel ? (
                      /* ── Reel: vertical autoplay video ── */
                      <div className="work-card__reel">
                        <video src={p.video} autoPlay loop muted playsInline preload="metadata" />
                        <span className="work-card__reel-badge">▶ Reel</span>
                      </div>
                    ) : isPost ? (
                      /* ── Post: square creative image ── */
                      <div className="work-card__post">
                        <img src={p.poster} alt={p.title} />
                      </div>
                    ) : (
                      /* ── Website: browser frame + scroll ── */
                      <>
                        <div className="work-card__bar">
                          <span className="work-card__dot" />
                          <span className="work-card__dot" />
                          <span className="work-card__dot" />
                          <span className="work-card__url">{prettyUrl(p.link)}</span>
                        </div>
                        <div className="work-card__window">
                          <img src={p.image} alt={p.title} className="work-card__shot" />
                        </div>
                      </>
                    )}
                    {/* Caption */}
                    <div className="work-card__caption">
                      <div>
                        <span className="work-card__title">{p.title}</span>
                        {p.subtitle && <span className="work-card__sub">{p.subtitle}</span>}
                      </div>
                      <span className="work-card__btn"><FiExternalLink /></span>
                    </div>
                  </Wrapper>
                );
              })}
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
