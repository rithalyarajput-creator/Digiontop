import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiUsers, FiTarget, FiTrendingUp } from 'react-icons/fi';
import '../styles/About.css';

const teamImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=220&fit=crop',
  'https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=220&fit=crop',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=220&fit=crop',
  'https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=300&h=220&fit=crop',
];

const pillars = [
  { icon: <FiCheck size={20} />, text: 'Creative & Strategic Solutions' },
  { icon: <FiCheck size={20} />, text: 'On-Time Project Delivery' },
  { icon: <FiCheck size={20} />, text: '100% Client Satisfaction' },
];

const strengths = [
  {
    icon: <FiUsers size={32} />,
    title: 'Professional Team',
    desc: 'Expert professionals dedicated to your success',
  },
  {
    icon: <FiTarget size={32} />,
    title: 'Target Oriented',
    desc: 'Focused strategies for maximum growth',
  },
  {
    icon: <FiTrendingUp size={32} />,
    title: 'Success Guarantee',
    desc: 'Proven results & 100% satisfaction',
  },
];

export default function About() {
  return (
    <main className="about-page">

      {/* ══ 1. HERO ══ */}
      <section className="about-hero">
        <div className="about-hero__deco about-hero__deco--tl" />
        <div className="about-hero__deco about-hero__deco--br" />
        <div className="about-hero__content">
          <h1 className="about-hero__heading">About Us</h1>
          <p className="about-hero__sub">
            We are a passionate team dedicated to helping businesses<br />
            grow, innovate, and succeed in the digital world.
          </p>
          <nav className="about-hero__breadcrumb">
            <Link to="/" className="about-hero__breadcrumb-link">Home</Link>
            <span className="about-hero__breadcrumb-sep">/</span>
            <span className="about-hero__breadcrumb-current">About Us</span>
          </nav>
        </div>
      </section>

      {/* ══ 2. TEAM PHOTOS ══ */}
      <section className="about-photos">
        <div className="about-container">
          <div className="about-photos__grid">
            {teamImages.map((src, i) => (
              <div key={i} className="about-photos__item">
                <img src={src} alt={`DigionTop team ${i + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. IDEA + DELIVERY ══ */}
      <section className="about-idea">
        <div className="about-container">
          <div className="about-idea__grid">
            <div className="about-idea__left">
              <h2 className="about-idea__heading">
                We make sure your idea &amp; creation<br />
                <span className="about-idea__highlight">delivered properly</span>
              </h2>
              <p className="about-idea__desc">
                We turn your vision into reality with creativity, strategy,
                and flawless execution.
              </p>
            </div>
            <div className="about-idea__right">
              {pillars.map((p, i) => (
                <div key={i} className="about-idea__pillar">
                  <span className="about-idea__pillar-check">{p.icon}</span>
                  <span>{p.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. EMPOWER SECTION ══ */}
      <section className="about-empower">
        <div className="about-container">
          <div className="about-empower__grid">
            {/* Left: image with quote overlay */}
            <div className="about-empower__img-wrap">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=480&h=380&fit=crop"
                alt="DigionTop founder"
                className="about-empower__img"
              />
              <div className="about-empower__quote-box">
                <p className="about-empower__quote-text">"Making an impact, together."</p>
                <p className="about-empower__quote-attr">— DigionTop Founder</p>
              </div>
              <div className="about-empower__play">
                <span className="about-empower__play-icon">▶</span>
              </div>
            </div>

            {/* Right: text */}
            <div className="about-empower__text">
              <h2 className="about-empower__heading">
                We empower small<br />business owners
              </h2>
              <p className="about-empower__desc">
                DigionTop was built for Indian businesses — so that great
                digital marketing is no longer a luxury reserved for large
                corporations. We went fully remote, kept our team lean and
                specialized, and pass every rupee of savings directly to our
                clients.
              </p>
              <blockquote className="about-empower__blockquote">
                <span className="about-empower__blockquote-icon">"</span>
                <p>Our mission is to support businesses with innovative ideas, measurable results, and long-term growth.</p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 5. GROW SECTION ══ */}
      <section className="about-grow">
        <div className="about-container">
          <div className="about-grow__header">
            <h2 className="about-grow__heading">
              We help businesses to grow<br />
              <span className="about-grow__highlight">faster and bigger</span>
            </h2>
            <p className="about-grow__sub">
              From startups to established brands, we deliver digital strategies that
              drive real, measurable growth across India.
            </p>
          </div>

          <div className="about-grow__grid">
            {strengths.map((s, i) => (
              <div key={i} className="about-grow__card">
                <div className="about-grow__card-icon">{s.icon}</div>
                <h4 className="about-grow__card-title">{s.title}</h4>
                <p className="about-grow__card-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. CTA ══ */}
      <section className="about-cta">
        <div className="about-container">
          <div className="about-cta__inner">
            <div>
              <h2 className="about-cta__heading">Ready to Grow Your Business?</h2>
              <p className="about-cta__sub">Let's have a real conversation about your goals — free, no pressure.</p>
            </div>
            <Link to="/contact" className="about-cta__btn">Get Free Consultation</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
