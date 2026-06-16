import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Testimonials.css';

const TCARD_COLORS = ['#F5A800', '#1a1a1a', '#F5A800', '#1a1a1a', '#F5A800', '#1a1a1a'];

/* ─── Testimonial Data ─── */
const testimonials = [
  {
    quote:
      'DigionTop completely transformed our Amazon listings. Within three months, our products were ranking on page one for competitive keywords and our organic sales doubled. The team understood the e-commerce space deeply and every recommendation they made actually moved the needle. I genuinely could not have scaled without them.',
    name: 'Rajesh Sharma',
    role: 'E-Commerce Seller, Delhi',
  },
  {
    quote:
      'I was struggling to get found online even though my studio had great reviews on Google. DigionTop overhauled our entire SEO strategy — from website structure to local listings — and within four months we were ranking for every major keyword in Bangalore. New client enquiries went up by over 60% and we had to hire two more trainers.',
    name: 'Priya Mehta',
    role: 'Wellness Studio Owner, Bangalore',
  },
  {
    quote:
      'When I came to DigionTop, my restaurant Instagram page had 400 followers and barely any engagement. They redesigned our content approach, ran targeted reels campaigns, and managed our community actively. In six months we crossed 4,200 followers and more importantly, I had customers walking in specifically because they found us on Instagram. The ROI was real.',
    name: 'Ankur Gupta',
    role: 'Restaurant Owner, Jaipur',
  },
  {
    quote:
      'As a first-time founder, I needed a website that could sell — not just look good. DigionTop built my entire Shopify store from scratch, set up the product pages, integrated payment gateways, and optimised everything for mobile. They even guided me on which apps to use and what to avoid. I launched in three weeks and made my first sale on day four.',
    name: 'Sneha Patel',
    role: 'Startup Founder, Mumbai',
  },
  {
    quote:
      'I sell on Meesho and competition is brutal. DigionTop helped me with listing optimisation, better product photography recommendations, and a social media strategy targeting the right buyer groups. My orders went up 180% in just two months. The investment paid for itself ten times over. These people genuinely care about results.',
    name: 'Vikram Singh',
    role: 'Meesho Seller, Lucknow',
  },
  {
    quote:
      'I wanted to build a personal brand as a consultant but did not know where to start. DigionTop created a content calendar, helped me write LinkedIn posts that got real engagement, and built a professional website that positions me as an expert. Within ninety days I had two inbound enquiries from clients I would never have reached otherwise. My visibility has changed completely.',
    name: 'Divya Nair',
    role: 'Business Consultant, Kerala',
  },
];

export default function Testimonials() {
  return (
    <main className="testimonials-page">
      {/* ══════════════════════════════════════
          1. PAGE HERO
      ══════════════════════════════════════ */}
      <section className="testimonials-hero">
        <div className="testimonials-hero__overlay" />
        <div className="testimonials-hero__content">
          <h1 className="testimonials-hero__heading">What Our Clients Say</h1>
          <p className="testimonials-hero__sub">
            Real results from real Indian businesses — no cherry-picked
            numbers, no manufactured reviews.
          </p>
          <nav className="testimonials-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="testimonials-hero__breadcrumb-link">Home</Link>
            <span className="testimonials-hero__breadcrumb-sep" aria-hidden="true">/</span>
            <span className="testimonials-hero__breadcrumb-current">Testimonials</span>
          </nav>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. TESTIMONIALS GRID
      ══════════════════════════════════════ */}
      <section className="testimonials-grid-section">
        <div className="testimonials-container">
          <div className="testimonials-section-header">
            <span className="testimonials-label">Client Stories</span>
            <h2 className="testimonials-section-heading">
              200+ Businesses Grown. Here Are Six Stories.
            </h2>
            <p className="testimonials-section-sub">
              From local sellers to startup founders, our clients come from
              every corner of India. Their words mean more than any claim we
              could make.
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={t.name} className="testimonial-card" style={{ '--accent': TCARD_COLORS[i % TCARD_COLORS.length] }}>
                {/* Big opening quote */}
                <div className="testimonial-card__quote-icon">"</div>
                {/* Stars */}
                <div className="testimonial-card__stars">{'★★★★★'}</div>
                {/* Text */}
                <p className="testimonial-card__text">{t.quote}</p>
                {/* Person row */}
                <div className="testimonial-card__person">
                  <div className="testimonial-card__avatar">{t.name.charAt(0)}</div>
                  <div>
                    <p className="testimonial-card__name">{t.name}</p>
                    <p className="testimonial-card__role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. CTA BANNER
      ══════════════════════════════════════ */}
      <section className="testimonials-cta">
        <div className="testimonials-container">
          <div className="testimonials-cta__inner">
            <div className="testimonials-cta__text">
              <h2 className="testimonials-cta__heading">
                Ready to Write Your Own Success Story?
              </h2>
              <p className="testimonials-cta__sub">
                Join 200+ Indian businesses that chose DigionTop for honest
                digital marketing that actually delivers. Start with a free
                consultation — zero pressure, real advice.
              </p>
            </div>
            <Link to="/contact" className="testimonials-cta__btn">
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
