import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Work.css';

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'website', label: 'Website Mockups' },
  { id: 'reels', label: 'Reels & Videos' },
  { id: 'social', label: 'Social Media Posts' },
  { id: 'branding', label: 'Logo & Branding' },
  { id: 'seo', label: 'SEO Case Studies' },
];

export default function Work() {
  return (
    <main className="work-page">
      {/* Hero */}
      <section className="work-hero">
        <div className="work-hero__content">
          <span className="work-hero__label">Our Portfolio</span>
          <h1 className="work-hero__heading">
            Work That <span className="work-hero__yellow">Delivers Results</span>
          </h1>
          <p className="work-hero__sub">
            Real projects. Real growth. See how we've helped brands across India rank higher, grow faster and generate more revenue.
          </p>
          <nav className="work-hero__breadcrumb">
            <Link to="/" className="work-hero__bc-link">Home</Link>
            <span> / </span>
            <span className="work-hero__bc-current">Our Work</span>
          </nav>
        </div>
      </section>

      {/* Categories */}
      <section className="work-categories">
        <div className="work-container">
          <div className="work-cats">
            {categories.map((cat) => (
              <button key={cat.id} className={`work-cat-btn${cat.id === 'all' ? ' work-cat-btn--active' : ''}`}>
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Empty state — projects will be added later */}
      <section className="work-grid-section">
        <div className="work-container">
          <div className="work-coming-soon">
            <div className="work-coming-soon__icon">🚀</div>
            <h2 className="work-coming-soon__heading">Portfolio Coming Soon</h2>
            <p className="work-coming-soon__text">
              We're putting together our best work. Check back soon to see websites, reels, social media posts, logos and more.
            </p>
            <Link to="/contact" className="work-coming-soon__cta">
              Discuss Your Project →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
