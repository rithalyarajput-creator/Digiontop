import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiEye,
  FiTarget,
  FiUsers,
  FiTrendingUp,
  FiShield,
  FiBookOpen,
} from 'react-icons/fi';
import '../styles/About.css';

/* ─── Stats ─── */
const stats = [
  { value: '200+', label: 'Clients' },
  { value: '500+', label: 'Projects' },
  { value: '5+',   label: 'Years' },
  { value: '98%',  label: 'Satisfaction' },
];

/* ─── Core Values ─── */
const values = [
  {
    icon: <FiShield size={32} />,
    title: 'Transparency',
    description:
      'We keep you in the loop — always. No hidden fees, no vague reports, no smoke and mirrors. You see exactly what we do, when we do it, and why.',
  },
  {
    icon: <FiTrendingUp size={32} />,
    title: 'Results First',
    description:
      'Vanity metrics don\'t pay bills. We obsess over outcomes that actually move the needle — leads, sales, visibility, and revenue growth for your business.',
  },
  {
    icon: <FiUsers size={32} />,
    title: 'Client Partnership',
    description:
      'We treat your business as our own. Your goals become our goals, and your success is the only benchmark that matters to us.',
  },
  {
    icon: <FiBookOpen size={32} />,
    title: 'Continuous Learning',
    description:
      'Digital marketing evolves every day. Our team stays ahead of algorithm changes, platform updates, and industry trends so you never fall behind.',
  },
  {
    icon: <FiTarget size={32} />,
    title: 'Integrity',
    description:
      'We say what we mean and do what we say. If something won\'t work for you, we\'ll tell you — even when it\'s uncomfortable. Your trust is our most valuable asset.',
  },
];

export default function About() {
  return (
    <main className="about-page">
      {/* ══════════════════════════════════════
          1. PAGE HERO
      ══════════════════════════════════════ */}
      <section className="about-hero">
        <div className="about-hero__overlay" />
        <div className="about-hero__content">
          <h1 className="about-hero__heading">About DigionTop</h1>
          <nav className="about-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="about-hero__breadcrumb-link">Home</Link>
            <span className="about-hero__breadcrumb-sep" aria-hidden="true">/</span>
            <span className="about-hero__breadcrumb-current">About Us</span>
          </nav>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. OUR STORY
      ══════════════════════════════════════ */}
      <section className="about-story">
        <div className="about-container">
          <div className="about-story__grid">
            {/* Text */}
            <div className="about-story__text">
              <span className="about-label">Our Story</span>
              <h2 className="about-story__heading">
                Built for Indian Businesses. Priced for Real Growth.
              </h2>
              <p className="about-story__lead">
                DigionTop was built for one reason: Indian businesses deserve
                world-class digital marketing without paying world-class agency
                prices.
              </p>
              <p>
                We started as a small team of marketers, designers, and
                developers who were frustrated watching talented business owners
                get overcharged by bloated agencies — agencies that billed for
                account managers, office overheads, and client lunches, not
                actual results.
              </p>
              <p>
                So we did things differently. We went fully remote, kept our
                team lean and specialized, and passed every rupee of savings
                directly to our clients. Since then, we have helped over 200
                businesses — from local service providers in Tier-2 cities to
                e-commerce brands scaling across India — grow their digital
                presence without burning through their budgets.
              </p>
              <p>
                Today, DigionTop is a trusted remote digital agency delivering
                SEO, social media marketing, website development, and
                e-commerce solutions that compete with anything the big agencies
                produce — at a fraction of the cost.
              </p>
            </div>

            {/* Stats */}
            <div className="about-story__stats">
              {stats.map((s) => (
                <div key={s.label} className="about-stat-card">
                  <span className="about-stat-card__value">{s.value}</span>
                  <span className="about-stat-card__label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. MISSION & VISION
      ══════════════════════════════════════ */}
      <section className="about-mv">
        <div className="about-container">
          <div className="about-mv__grid">
            {/* Mission */}
            <div className="about-mv__card about-mv__card--mission">
              <div className="about-mv__icon-wrap">
                <FiTarget size={36} />
              </div>
              <h3 className="about-mv__card-title">Our Mission</h3>
              <p className="about-mv__card-text">
                Our mission is to empower every Indian business — regardless of
                size or budget — with the digital tools, strategies, and
                expertise they need to compete, grow, and thrive in an
                increasingly online world. We believe great marketing should not
                be a luxury reserved for large corporations.
              </p>
            </div>

            {/* Vision */}
            <div className="about-mv__card about-mv__card--vision">
              <div className="about-mv__icon-wrap">
                <FiEye size={36} />
              </div>
              <h3 className="about-mv__card-title">Our Vision</h3>
              <p className="about-mv__card-text">
                To become India's most trusted remote digital agency — the
                go-to partner for businesses that want honest advice, measurable
                results, and a team that genuinely cares about their growth. We
                envision a future where every Indian brand has a powerful
                digital footprint, no matter where they are based.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          4. CORE VALUES
      ══════════════════════════════════════ */}
      <section className="about-values">
        <div className="about-container">
          <div className="about-section-header">
            <span className="about-label">What We Stand For</span>
            <h2 className="about-section-heading">Our Core Values</h2>
            <p className="about-section-sub">
              These principles guide every decision we make and every campaign
              we run — from onboarding to reporting.
            </p>
          </div>

          <div className="about-values__grid">
            {values.map((v) => (
              <div key={v.title} className="about-value-card">
                <div className="about-value-card__icon">{v.icon}</div>
                <h4 className="about-value-card__title">{v.title}</h4>
                <p className="about-value-card__desc">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          5. CTA BANNER
      ══════════════════════════════════════ */}
      <section className="about-cta">
        <div className="about-container">
          <div className="about-cta__inner">
            <div className="about-cta__text">
              <h2 className="about-cta__heading">Want to Know More? Talk to Our Team</h2>
              <p className="about-cta__sub">
                Whether you have a quick question or want to explore a full
                partnership, we are always happy to have a real conversation —
                no pushy sales pitch, just honest advice.
              </p>
            </div>
            <Link to="/contact" className="about-cta__btn">
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
