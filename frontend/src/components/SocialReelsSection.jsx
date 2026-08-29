import React, { useEffect, useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import '../styles/SocialReelsSection.css';

/* Fallback shown while the API loads or if the database has no reels yet.
   The live list is managed in the admin panel under Site → Reels. */
const REELS = [
  { id: 1, label: 'Brand Reel', video: '/reel2.mp4', views: '12K', tag: 'Instagram' },
  { id: 2, label: 'Product Shoot', video: '/reel3.mp4', views: '8.4K', tag: 'Reels' },
  { id: 3, label: 'Client Story', video: '/reel4.mp4', views: '21K', tag: 'YouTube' },
  { id: 4, label: 'UGC Content', thumb: 'https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=200&h=356&fit=crop', views: '5.6K', tag: 'Facebook' },
];

const PER_PAGE = 2; // reels visible at once on desktop

const SocialReelsSection = () => {
  const [reels, setReels] = useState(REELS);
  const [page, setPage] = useState(0);

  const pages = Math.max(1, Math.ceil(reels.length / PER_PAGE));
  const go = (dir) => setPage((p) => (p + dir + pages) % pages);

  useEffect(() => {
    fetch('/api/cms?resource=reels')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((rows) => {
        if (!Array.isArray(rows) || rows.length === 0) return;
        setReels(rows.map((r) => ({
          id: 'db-' + r.id,
          label: r.title,
          video: r.video_url || '',
          thumb: r.thumb_url || '',
          views: r.views || '',
          tag: r.tag || 'Instagram',
          link: r.instagram_url || '',
        })));
      })
      .catch(() => {});
  }, []);

  return (
    <section className="home-reels">
      <div className="home-reels__inner">

        {/* LEFT text */}
        <div className="home-reels__text" data-aos="fade-right">
          <p className="section-label">SOCIAL MEDIA</p>
          <h2 className="home-reels__heading">
            We Create Reels<br />
            <span className="home-reels__heading-yellow">That Go Viral</span>
          </h2>
          <p className="home-reels__sub">
            From brand storytelling to UGC content and influencer reels, we produce
            short-form videos that stop the scroll, grow your audience, and drive
            real engagement across Instagram, YouTube & Facebook.
          </p>
          <ul className="home-reels__list">
            <li><span className="home-reels__tick">✓</span> Platform Handling & Scheduling</li>
            <li><span className="home-reels__tick">✓</span> Reels & Video Production</li>
            <li><span className="home-reels__tick">✓</span> Influencer & UGC Content</li>
            <li><span className="home-reels__tick">✓</span> Social Media Strategy</li>
          </ul>
          <a href="/services/social-media-marketing" className="home-reels__btn">
            See Our Social Work →
          </a>
        </div>

        {/* CENTER — phone mockup */}
        <div className="home-reels__phone-wrap" data-aos="fade-up">
          <div className="home-reels__phone">
            <div className="home-reels__phone-notch" />
            <div className="home-reels__phone-screen">
              <video
                className="home-reels__phone-video"
                src="/reel.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </div>

        {/* RIGHT — reels carousel: desktop pages with arrows, mobile swipe-scroll */}
        <div className="home-reels__grid" data-aos="fade-left">
          <div className="home-reels__viewport">
            <div
              className="home-reels__track"
              style={{ transform: `translateX(calc(${-page} * (100% + 14px)))` }}
            >
              {reels.map(r => {
                const Wrap = r.link ? 'a' : 'div';
                const wrapProps = r.link
                  ? { href: r.link, target: '_blank', rel: 'noopener noreferrer' }
                  : {};
                return (
                  <Wrap key={r.id} className="home-reels__thumb" {...wrapProps}>
                    {r.video
                      ? <video src={r.video} autoPlay loop muted playsInline preload="metadata" className="home-reels__thumb-video" />
                      : <img src={r.thumb} alt={r.label} loading="lazy" />
                    }
                    <div className="home-reels__thumb-overlay">
                      <span className="home-reels__thumb-tag">{r.tag}</span>
                      {r.views && <span className="home-reels__thumb-views">▶ {r.views}</span>}
                    </div>
                  </Wrap>
                );
              })}
            </div>
          </div>

          {pages > 1 && (
            <div className="home-reels__carousel-bar">
              <button type="button" className="home-reels__arrow" onClick={() => go(-1)} aria-label="Previous reels"><FiArrowLeft /></button>
              <button type="button" className="home-reels__arrow" onClick={() => go(1)} aria-label="Next reels"><FiArrowRight /></button>
              <span className="home-reels__progress"><i style={{ width: `${((page + 1) / pages) * 100}%` }} /></span>
              <span className="home-reels__pagenum">{String(page + 1).padStart(2, '0')}</span>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default SocialReelsSection;
