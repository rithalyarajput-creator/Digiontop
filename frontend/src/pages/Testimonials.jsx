import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import GoogleReviewCard, { sortNewestFirst } from '../components/GoogleReviewCard';
import '../styles/Testimonials.css';

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch('/api/testimonials')
      .then((r) => r.json())
      .then((d) => {
        if (!alive) return;
        setItems(Array.isArray(d) ? d : []);
        setLoaded(true);
      })
      .catch(() => {
        if (alive) setLoaded(true);
      });
    return () => {
      alive = false;
    };
  }, []);

  // Newest review first. The API orders by created_at (when the review was added
  // in the admin), but what a visitor reads is reviewed_at (when it was actually
  // left) — so an older review typed in today must not jump to the front.
  const reviews = useMemo(() => sortNewestFirst(items), [items]);

  return (
    <main className="testimonials-page">
      <Seo
        title="Google Reviews — What Our Clients Say About DigionTop"
        description="Read the Google reviews left by DigionTop clients — Amazon sellers, restaurant owners, founders and consultants across India. Real, unedited feedback from the businesses we've grown."
        path="/testimonials"
      />

      {/* ══════════════════════════════════════
          1. PAGE HERO
      ══════════════════════════════════════ */}
      <section className="testimonials-hero">
        <div className="testimonials-hero__overlay" />
        <div className="testimonials-hero__content">
          <h1 className="testimonials-hero__heading">Our Google Reviews</h1>
          <p className="testimonials-hero__sub">
            Every review below was left on Google by a real DigionTop client.
            Nothing edited, nothing cherry-picked — just what they said.
          </p>
          <nav className="testimonials-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="testimonials-hero__breadcrumb-link">Home</Link>
            <span className="testimonials-hero__breadcrumb-sep" aria-hidden="true">/</span>
            <span className="testimonials-hero__breadcrumb-current">Google Reviews</span>
          </nav>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. REVIEWS GRID
      ══════════════════════════════════════ */}
      <section className="testimonials-grid-section">
        <div className="testimonials-container">
          <div className="testimonials-section-header">
            <span className="testimonials-label">Google Reviews</span>
            <h2 className="testimonials-section-heading">
              What Our Clients Wrote About Us
            </h2>
            <p className="testimonials-section-sub">
              From local sellers to startup founders, our clients come from every
              corner of India. Their words mean more than any claim we could make.
            </p>
          </div>

          {reviews.length > 0 ? (
            <div className="testimonials-grid">
              {reviews.map((r) => (
                <GoogleReviewCard key={r.id} review={r} />
              ))}
            </div>
          ) : (
            <div className="testimonials-empty">
              {loaded ? (
                <>
                  <p className="testimonials-empty__title">No reviews to show yet.</p>
                  <p className="testimonials-empty__sub">
                    We'd rather show you nothing than show you something we made up.
                    If you've worked with us, we'd love for you to be the first.
                  </p>
                  <Link to="/contact" className="testimonials-empty__link">
                    Talk to us
                  </Link>
                </>
              ) : (
                <p className="testimonials-empty__sub">Loading reviews…</p>
              )}
            </div>
          )}
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
