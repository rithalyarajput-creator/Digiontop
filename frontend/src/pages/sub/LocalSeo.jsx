import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiMapPin, FiStar, FiPhone, FiNavigation, FiSearch, FiTrendingUp,
  FiCheck, FiArrowRight, FiArrowUpRight, FiClock, FiMessageSquare,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/LocalSeo.css'

const FAQS = [
  { q: 'How long until I rank in the local pack?', a: 'Most local businesses start seeing movement in the Google Map Pack within 6–10 weeks, depending on competition and your current Google Business Profile health.' },
  { q: 'Do you optimize my Google Business Profile?', a: 'Yes — full GBP optimization is core to local SEO: categories, services, photos, posts, Q&A, and review strategy all get handled.' },
  { q: 'What are citations and do I need them?', a: 'Citations are consistent listings of your Name, Address & Phone (NAP) across directories. They build trust signals that help you rank in local results — yes, they matter.' },
  { q: 'Can you help with customer reviews?', a: 'Absolutely. We set up a review-generation system that gets more genuine 5-star reviews and helps you respond to them professionally.' },
  { q: 'I have multiple locations — can you handle that?', a: 'Yes, we run multi-location local SEO with dedicated location pages, individual GBP optimization, and geo-targeted content for each area.' },
]

const RANK_FACTORS = [
  { icon: <FiMapPin />, label: 'Google Business Profile', pct: 92 },
  { icon: <FiStar />, label: 'Reviews & Ratings', pct: 85 },
  { icon: <FiNavigation />, label: 'NAP Citations', pct: 78 },
  { icon: <FiSearch />, label: 'On-Page Local Signals', pct: 74 },
]

const STEPS = [
  { icon: <FiMapPin />, t: 'Claim & Optimize GBP', d: 'We fully optimize your Google Business Profile — categories, services, photos, hours & posts.' },
  { icon: <FiNavigation />, t: 'Build Local Citations', d: 'Consistent NAP across 50+ trusted directories to earn local trust signals.' },
  { icon: <FiStar />, t: 'Grow Real Reviews', d: 'A simple review-generation system that brings in genuine 5-star ratings.' },
  { icon: <FiTrendingUp />, t: 'Rank & Report', d: 'Track your Map Pack positions and calls, and refine month after month.' },
]

export default function LocalSeo() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])

  return (
    <main className="lseo">
      {/* ── HERO: map-panel split ── */}
      <section className="lseo-hero">
        <div className="lseo-hero__inner">
          <div className="lseo-hero__text" data-aos="fade-right">
            <span className="lseo-tag"><FiMapPin /> Local SEO</span>
            <h1 className="lseo-hero__title">Get Found by Customers <span>Near You</span></h1>
            <p className="lseo-hero__sub">
              Dominate the Google Map Pack and "near me" searches. We put your business on the map —
              literally — so nearby customers call, visit and buy.
            </p>
            <div className="lseo-hero__cta">
              <Link to="/contact" className="lseo-btn lseo-btn--solid">Rank My Business <FiArrowRight /></Link>
              <Link to="/contact" className="lseo-btn lseo-btn--ghost">Free Local Audit</Link>
            </div>
            <div className="lseo-hero__trust">
              <span><FiCheck /> Google Business Profile</span>
              <span><FiCheck /> Map Pack Rankings</span>
              <span><FiCheck /> More Calls & Visits</span>
            </div>
          </div>

          {/* faux map + pin + local-pack card */}
          <div className="lseo-hero__map" data-aos="fade-left">
            <div className="lseo-map">
              <span className="lseo-map__road lseo-map__road--1" />
              <span className="lseo-map__road lseo-map__road--2" />
              <span className="lseo-map__road lseo-map__road--3" />
              <span className="lseo-map__pin lseo-map__pin--main"><FiMapPin /></span>
              <span className="lseo-map__pin lseo-map__pin--a" />
              <span className="lseo-map__pin lseo-map__pin--b" />
              <span className="lseo-map__pulse" />
            </div>
            <div className="lseo-pack">
              <div className="lseo-pack__head"><FiSearch /> plumber near me</div>
              <div className="lseo-pack__item lseo-pack__item--top">
                <span className="lseo-pack__rank">1</span>
                <div><b>Your Business</b><small><FiStar className="fill" /><FiStar className="fill" /><FiStar className="fill" /><FiStar className="fill" /><FiStar className="fill" /> 4.9 · Open now</small></div>
                <FiPhone className="lseo-pack__call" />
              </div>
              <div className="lseo-pack__item"><span className="lseo-pack__rank">2</span><div><b>Competitor A</b><small>4.2 · 1.4 km</small></div></div>
              <div className="lseo-pack__item"><span className="lseo-pack__rank">3</span><div><b>Competitor B</b><small>3.9 · 2.1 km</small></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STAT STRIP ── */}
      <section className="lseo-stats">
        <div className="lseo-stats__inner">
          <div data-aos="fade-up"><b>46%</b><span>of all Google searches are local</span></div>
          <div data-aos="fade-up" data-aos-delay="80"><b>88%</b><span>call or visit within 24 hrs</span></div>
          <div data-aos="fade-up" data-aos-delay="160"><b>#1</b><span>Map Pack gets ~45% of clicks</span></div>
        </div>
      </section>

      {/* ── RANK FACTORS (bars) ── */}
      <section className="lseo-factors">
        <div className="lseo-container">
          <div className="lseo-head" data-aos="fade-up">
            <span className="lseo-eyebrow">What Moves Local Rankings</span>
            <h2>The Signals Google Actually Weighs</h2>
          </div>
          <div className="lseo-factors__grid">
            {RANK_FACTORS.map((f, i) => (
              <div className="lseo-factor" key={f.label} data-aos="fade-up" data-aos-delay={i * 70}>
                <div className="lseo-factor__top"><span className="lseo-factor__icon">{f.icon}</span><span className="lseo-factor__pct">{f.pct}%</span></div>
                <div className="lseo-factor__label">{f.label}</div>
                <div className="lseo-factor__bar"><span style={{ width: `${f.pct}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS (horizontal cards) ── */}
      <section className="lseo-steps">
        <div className="lseo-container">
          <div className="lseo-head lseo-head--light" data-aos="fade-up">
            <span className="lseo-eyebrow lseo-eyebrow--light">How We Do It</span>
            <h2>From Invisible to #1 Near You</h2>
          </div>
          <div className="lseo-steps__grid">
            {STEPS.map((s, i) => (
              <div className="lseo-step" key={s.t} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="lseo-step__n">0{i + 1}</span>
                <span className="lseo-step__icon">{s.icon}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GBP CHECKLIST split ── */}
      <section className="lseo-gbp">
        <div className="lseo-container lseo-gbp__inner">
          <div className="lseo-gbp__text" data-aos="fade-right">
            <span className="lseo-eyebrow">Google Business Profile</span>
            <h2>Your Storefront on Google — Fully Tuned</h2>
            <p>Your GBP is the single biggest local ranking factor. We optimize every part of it so you show up more often, look more trustworthy, and win the click.</p>
            <Link to="/contact" className="lseo-btn lseo-btn--solid">Optimize My Profile <FiArrowUpRight /></Link>
          </div>
          <ul className="lseo-gbp__list" data-aos="fade-left">
            {['Category & service optimization', 'Geo-tagged photos & posts', 'Q&A and messaging setup', 'Review generation & replies', 'Products & offers listing', 'Weekly Google Posts'].map((x) => (
              <li key={x}><FiCheck /> {x}</li>
            ))}
          </ul>
        </div>
      </section>

      <ServiceFaq service="Local SEO" faqs={FAQS} />

      {/* ── CTA ── */}
      <section className="lseo-cta">
        <div className="lseo-container">
          <div className="lseo-cta__box" data-aos="zoom-in">
            <FiMapPin className="lseo-cta__pin" />
            <h2>Ready to Own Your Local Market?</h2>
            <p>Get a free local audit — we'll show you exactly where you rank now and how to reach the top 3.</p>
            <Link to="/contact" className="lseo-btn lseo-btn--light">Get My Free Local Audit <FiArrowRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
