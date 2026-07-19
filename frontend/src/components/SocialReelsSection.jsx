import React from 'react';
import '../styles/SocialReelsSection.css';

const REELS = [
  { id: 1, label: 'Brand Reel', video: '/reel2.mp4', views: '12K', tag: 'Instagram' },
  { id: 2, label: 'Product Shoot', thumb: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200&h=356&fit=crop', views: '8.4K', tag: 'Reels' },
  { id: 3, label: 'Client Story', thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=356&fit=crop', views: '21K', tag: 'YouTube' },
  { id: 4, label: 'UGC Content', thumb: 'https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=200&h=356&fit=crop', views: '5.6K', tag: 'Facebook' },
];

const SocialReelsSection = () => (
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

      {/* RIGHT — reel thumbnails grid */}
      <div className="home-reels__grid" data-aos="fade-left">
        {REELS.map(r => (
          <div key={r.id} className="home-reels__thumb">
            {r.video
              ? <video src={r.video} autoPlay loop muted playsInline preload="metadata" className="home-reels__thumb-video" />
              : <img src={r.thumb} alt={r.label} />
            }
            <div className="home-reels__thumb-overlay">
              <span className="home-reels__thumb-tag">{r.tag}</span>
              <span className="home-reels__thumb-views">▶ {r.views}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  </section>
);

export default SocialReelsSection;
