// ServiceWork.jsx
// Reusable "Our Work" showcase for service pages.
// Shows our real work: 2 reels (video) + 2 creative posts (images).
// `accent` lets each service page tint it to match its own theme.

import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay, FiHeart, FiGlobe } from 'react-icons/fi'
import '../styles/ServiceWork.css'

const REELS = [
  { src: '/images/work/reel-1.mp4', title: 'Brand Reel', tag: 'Instagram Reel', views: '128K' },
  { src: '/images/work/reel-2.mp4', title: 'Promo Reel', tag: 'Instagram Reel', views: '94K' },
]
const POSTS = [
  { src: '/images/work/post-1.webp', title: 'Sunscreen Awareness', tag: 'Creative Post' },
  { src: '/images/work/post-2.webp', title: 'Brand Campaign', tag: 'Creative Post' },
]
const WEBSITES = [
  { src: '/images/work/amshine-jewels.webp', title: 'Amshine Jewels', tag: 'Jewellery E-Commerce' },
  { src: '/images/work/blameless-skincare.webp', title: 'Blameless', tag: 'Skincare E-Commerce' },
  { src: '/images/work/rithala-village.webp', title: 'Rithala Village', tag: 'Information & Community' },
  { src: '/images/work/stressless-learner.webp', title: 'Stressless Learner', tag: 'Education Website' },
]

export default function ServiceWork({
  accent = '#F5A800',
  accentSoft = '#FFF3CC',
  heading = 'Real Work We’ve Delivered',
  subtitle = 'A look at the reels and creative posts we’ve produced for real brands.',
  variant = 'mixed', // 'mixed' = reels+posts | 'websites' = website screenshots
}) {
  const isWeb = variant === 'websites'
  return (
    <section className={`section swork${isWeb ? ' swork--web' : ''}`} style={{ '--swork-accent': accent }}>
      <div className="container">
        <div className="svc-section-header" data-aos="fade-up">
          <span className="section-tag" style={{ background: accentSoft, color: accent }}>
            Our Work
          </span>
          <div className="divider divider-center" style={{ background: accent }} />
          <h2 className="h2" style={{ marginTop: '20px', marginBottom: '14px' }}>{heading}</h2>
          <p className="body-md" style={{ maxWidth: '560px', margin: '0 auto' }}>{subtitle}</p>
        </div>

        <div className="swork__grid">
          {isWeb ? (
            /* 4 website screenshots */
            WEBSITES.map((w, i) => (
              <div className="swork__card swork__card--web" key={w.src} data-aos="fade-up" data-aos-delay={(i % 4) * 70}>
                <div className="swork__media swork__media--web">
                  <img src={w.src} alt={w.title} loading="lazy" decoding="async" />
                  <span className="swork__badge"><FiGlobe size={11} /> Website</span>
                </div>
                <div className="swork__body">
                  <p className="swork__title">{w.title}</p>
                  <p className="swork__tag" style={{ color: accent }}>{w.tag}</p>
                </div>
              </div>
            ))
          ) : (
            <>
              {/* 2 reels */}
              {REELS.map((r, i) => (
                <div className="swork__card swork__card--reel" key={r.src} data-aos="fade-up" data-aos-delay={i * 70}>
                  <div className="swork__media">
                    <video src={r.src} autoPlay muted loop playsInline preload="metadata" />
                    <span className="swork__badge"><FiPlay size={11} /> Reel</span>
                    <span className="swork__views"><FiHeart size={12} /> {r.views}</span>
                  </div>
                  <div className="swork__body">
                    <p className="swork__title">{r.title}</p>
                    <p className="swork__tag" style={{ color: accent }}>{r.tag}</p>
                  </div>
                </div>
              ))}
              {/* 2 posts */}
              {POSTS.map((p, i) => (
                <div className="swork__card" key={p.src} data-aos="fade-up" data-aos-delay={(i + 2) * 70}>
                  <div className="swork__media">
                    <img src={p.src} alt={p.title} loading="lazy" decoding="async" />
                    <span className="swork__badge">Post</span>
                  </div>
                  <div className="swork__body">
                    <p className="swork__title">{p.title}</p>
                    <p className="swork__tag" style={{ color: accent }}>{p.tag}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="swork__cta" data-aos="fade-up">
          <Link to="/portfolio" className="swork__explore" style={{ background: accent }}>
            Explore More Projects <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
