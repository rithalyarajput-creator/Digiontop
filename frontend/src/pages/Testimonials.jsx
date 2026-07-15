import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import GoogleReviewCard, { sortNewestFirst } from '../components/GoogleReviewCard';
import '../styles/Testimonials.css';

const PER_PAGE = 9;

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);

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

  const pageCount = Math.max(1, Math.ceil(reviews.length / PER_PAGE));
  // Clamp in case the list shrank (e.g. reviews deleted) while on a later page.
  const current = Math.min(page, pageCount);
  const pageReviews = reviews.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  function goToPage(p) {
    setPage(p);
    // Jump back up to the first card so the new page starts at the top.
    document.querySelector('.testimonials-grid-section')?.scrollIntoView({ behavior: 'smooth' });
  }

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

      {/* Review CTA — straddles the hero and the grid, sends people straight
          to our Google review form. */}
      <div className="testimonials-writecard-wrap">
        <div className="testimonials-writecard">
          <div className="testimonials-writecard__left">
            <span className="testimonials-writecard__g" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 48 48">
                <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"/>
                <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"/>
                <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z"/>
                <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"/>
              </svg>
            </span>
            <div>
              <p className="testimonials-writecard__title">Worked with us? Leave a Google review</p>
              <p className="testimonials-writecard__sub">It takes 30 seconds and means the world to us.</p>
            </div>
          </div>
          <a
            className="testimonials-writecard__btn"
            href="https://g.page/r/CVXDeOcytLd6EBM/review"
            target="_blank"
            rel="noopener noreferrer"
          >
            Write a Review
          </a>
        </div>
      </div>

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
            <>
              <div className="testimonials-grid">
                {pageReviews.map((r) => (
                  <GoogleReviewCard key={r.id} review={r} />
                ))}
              </div>

              {pageCount > 1 && (
                <nav className="testimonials-pager" aria-label="Reviews pages">
                  <button
                    type="button"
                    className="testimonials-pager__btn testimonials-pager__btn--arrow"
                    onClick={() => goToPage(current - 1)}
                    disabled={current === 1}
                    aria-label="Previous page"
                  >
                    ‹
                  </button>
                  {Array.from({ length: pageCount }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`testimonials-pager__btn${p === current ? ' testimonials-pager__btn--active' : ''}`}
                      onClick={() => goToPage(p)}
                      aria-current={p === current ? 'page' : undefined}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="testimonials-pager__btn testimonials-pager__btn--arrow"
                    onClick={() => goToPage(current + 1)}
                    disabled={current === pageCount}
                    aria-label="Next page"
                  >
                    ›
                  </button>
                </nav>
              )}
            </>
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
