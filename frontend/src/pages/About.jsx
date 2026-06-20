import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiCheck, FiUsers, FiTarget, FiTrendingUp,
  FiArrowRight, FiArrowUpRight, FiStar, FiMapPin, FiBriefcase, FiCheckCircle,
} from 'react-icons/fi';
import { FaHandshake } from 'react-icons/fa';
import '../styles/About.css';

const SERVICE_OPTIONS = [
  'Website Development', 'Shopify Store', 'SEO Services', 'Social Media Marketing',
  'Performance Ads', 'Branding & Design', 'E-Commerce Solutions',
];

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

const INITIAL = { firstName: '', lastName: '', company: '', website: '', email: '', phone: '', service: '', message: '', consent: false };

export default function About() {
  const [form, setForm] = useState(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function change(e) {
    const { name, value, type, checked } = e.target;
    if (name === 'phone') {
      // only digits, max 10
      const digits = value.replace(/\D/g, '').slice(0, 10);
      setForm((p) => ({ ...p, phone: digits }));
      return;
    }
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  }

  async function submit(e) {
    e.preventDefault();
    setError('');
    // email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: `${form.firstName} ${form.lastName}`.trim(),
          businessName: form.company,
          email: form.email,
          phone: form.phone ? `+91 ${form.phone}` : '',
          service: form.service,
          message: `${form.message}${form.website ? `\nWebsite: ${form.website}` : ''}`,
          source: 'about-page',
        }),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      setForm(INITIAL);
    } catch {
      setError('Something went wrong. Please call us directly.');
    } finally {
      setSubmitting(false);
    }
  }

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

      {/* ══ 6. READY TO PARTNER ══ */}
      <section className="about-partner">
        <div className="about-container about-partner__inner">
          <div className="about-partner__text" data-aos="fade-up">
            <span className="about-partner__eyebrow">Get Started</span>
            <h2 className="about-partner__heading">Ready to <span>partner with us</span>?</h2>
            <p>
              Whether you're scaling a D2C brand, rebuilding a marketing operation, or launching a
              new website — we run senior-led teams that own the outcome.
            </p>
            <p>Tell us where you are; we'll show up with a clear 90-day plan and real results.</p>
            <div className="about-partner__btns">
              <a href="#about-lead" className="about-partner__btn about-partner__btn--primary">Talk to Us</a>
              <Link to="/portfolio" className="about-partner__btn about-partner__btn--ghost">See Our Work</Link>
            </div>
          </div>
          <div className="about-partner__visual" data-aos="fade-left">
            <div className="about-partner__photo">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=520&h=620&fit=crop" alt="DigionTop team" loading="lazy" />
            </div>
            <span className="about-partner__chip about-partner__chip--star"><FiStar /><FiStar /><FiStar /><FiStar /><FiStar /></span>
            <span className="about-partner__chip about-partner__chip--pin"><FiMapPin /></span>
            <span className="about-partner__chip about-partner__chip--brief"><FiBriefcase /></span>
            <span className="about-partner__chip about-partner__chip--hand"><FaHandshake /></span>
          </div>
        </div>
      </section>

      {/* ══ 7. FREE PROPOSAL LEAD FORM ══ */}
      <section className="about-lead" id="about-lead">
        <div className="about-container about-lead__inner">
          {/* left promo panel */}
          <div className="about-lead__promo" data-aos="fade-up">
            <h2>Get your free proposal</h2>
            <p>Tell us where you are and what you want to achieve. We reply within one business day with a clear plan and a quote.</p>
            <div className="about-lead__bars"><span /><span /><span /><i>↑</i><i>↑</i></div>
          </div>

          {/* right form */}
          <form className="about-lead__form" onSubmit={submit} data-aos="fade-up" data-aos-delay="100">
            {submitted ? (
              <div className="about-lead__success">
                <FiCheckCircle size={26} />
                <h3>Thank you!</h3>
                <p>We've received your details and will get back to you within one business day.</p>
              </div>
            ) : (
              <>
                <div className="about-lead__row">
                  <label>First Name <b>*</b><input name="firstName" value={form.firstName} onChange={change} placeholder="First Name" required /></label>
                  <label>Last Name <b>*</b><input name="lastName" value={form.lastName} onChange={change} placeholder="Last Name" required /></label>
                </div>
                <div className="about-lead__row">
                  <label>Company / Organization <b>*</b><input name="company" value={form.company} onChange={change} placeholder="Company / Organization" required /></label>
                  <label>Website<input name="website" value={form.website} onChange={change} placeholder="https://example.com" /></label>
                </div>
                <div className="about-lead__row">
                  <label>Email Address <b>*</b><input type="email" name="email" value={form.email} onChange={change} placeholder="you@company.com" required /></label>
                  <label>Phone Number
                    <span className="about-lead__phone">
                      <span className="about-lead__cc">IN +91</span>
                      <input name="phone" value={form.phone} onChange={change} placeholder="9898989889" inputMode="numeric" />
                    </span>
                  </label>
                </div>
                <label className="about-lead__full">Services* (pick one)
                  <select name="service" value={form.service} onChange={change} required>
                    <option value="">Services* (pick one or more)</option>
                    {SERVICE_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </label>
                <label className="about-lead__full">Message
                  <textarea name="message" value={form.message} onChange={change} rows="4" placeholder="Tell us about your business" />
                </label>
                <label className="about-lead__consent">
                  <input type="checkbox" name="consent" checked={form.consent} onChange={change} required />
                  I consent to receive notifications and promotional messages
                </label>
                {error && <p className="about-lead__error">{error}</p>}
                <button type="submit" className="about-lead__btn" disabled={submitting}>
                  {submitting ? 'Sending…' : 'Get Your Free Proposal'}
                </button>
                <p className="about-lead__note">Need quick assistance? Reach us at <strong>+91 92175 94664</strong></p>
              </>
            )}
          </form>
        </div>
      </section>

    </main>
  );
}
