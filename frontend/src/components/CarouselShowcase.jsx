import React, { useState, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiHeart, FiMessageCircle, FiSend, FiBookmark } from 'react-icons/fi';
import '../styles/CarouselShowcase.css';

/* ── ADD YOUR CAROUSEL SLIDES HERE ─────────────────────────────
   Drop your images in:  frontend/public/images/carousel/
   Then list them below (Page 01, 02, 03, 04 …).
   Recommended size: 1080 x 1350 (Instagram portrait) or 1080x1080.
   ──────────────────────────────────────────────────────────── */
const SLIDES = [
  { id: 1, image: '/images/carousel/slide-1.jpg', page: 'Page 01' },
  { id: 2, image: '/images/carousel/slide-2.jpg', page: 'Page 02' },
  { id: 3, image: '/images/carousel/slide-3.jpg', page: 'Page 03' },
  { id: 4, image: '/images/carousel/slide-4.jpg', page: 'Page 04' },
];

export default function CarouselShowcase({
  handle = 'digiontop.agency',
  caption = 'Carousel Design · Swipe to explore →',
}) {
  const [active, setActive] = useState(0);
  const total = SLIDES.length;

  const go = (dir) => {
    setActive((p) => {
      const n = p + dir;
      if (n < 0) return total - 1;
      if (n >= total) return 0;
      return n;
    });
  };

  return (
    <section className="cshow" id="carousel">
      <div className="cshow__head">
        <span className="cshow__eyebrow">Carousel Posts</span>
        <h2 className="cshow__title">Swipeable Carousels That Tell a Story</h2>
        <p className="cshow__text">Multi-slide Instagram carousels designed to hook, inform and convert, swipe through a real one below.</p>
      </div>

      <div className="cshow__stage">
        <button className="cshow__nav cshow__nav--prev" onClick={() => go(-1)} aria-label="Previous slide"><FiChevronLeft /></button>

        {/* phone */}
        <div className="cshow__phone">
          <div className="cshow__notch" />
          <div className="cshow__screen">
            {/* IG top bar */}
            <div className="cshow__igtop">
              <div className="cshow__ava" />
              <div className="cshow__handle">{handle}</div>
              <div className="cshow__more">···</div>
            </div>

            {/* slides track */}
            <div className="cshow__viewport">
              <div className="cshow__track" style={{ transform: `translateX(-${active * 100}%)` }}>
                {SLIDES.map((s) => (
                  <div className="cshow__slide" key={s.id}>
                    <img src={s.image} alt={s.page} loading="lazy" />
                    <span className="cshow__page">{s.page}</span>
                  </div>
                ))}
              </div>
              {/* dots */}
              <div className="cshow__dots">
                {SLIDES.map((_, i) => (
                  <span key={i} className={`cshow__dot${i === active ? ' is-active' : ''}`} />
                ))}
              </div>
            </div>

            {/* IG actions */}
            <div className="cshow__igactions">
              <FiHeart /><FiMessageCircle /><FiSend />
              <FiBookmark className="cshow__save" />
            </div>
            <div className="cshow__igcaption"><b>{handle}</b> {caption}</div>
          </div>
        </div>

        <button className="cshow__nav cshow__nav--next" onClick={() => go(1)} aria-label="Next slide"><FiChevronRight /></button>
      </div>

      {/* counter */}
      <div className="cshow__counter">{String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</div>
    </section>
  );
}
