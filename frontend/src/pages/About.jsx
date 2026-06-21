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

const WHAT_WE_DO = [
  { icon: <FiTrendingUp />, title: 'Website Development & Digital Solutions', desc: 'Custom websites, WordPress, Shopify stores, e-commerce platforms, web apps, landing pages, and business management systems.' },
  { icon: <FiTarget />, title: 'Search Engine Optimization (SEO)', desc: 'Strategies that improve visibility, increase organic traffic, and help businesses rank higher on search engines.' },
  { icon: <FiUsers />, title: 'Social Media Marketing', desc: 'Content creation, social media management, branding, reels, influencer collaborations, and audience engagement.' },
  { icon: <FiTrendingUp />, title: 'E-Commerce Growth Solutions', desc: 'Amazon, Flipkart, Meesho & Shopify management — product listings, product SEO, catalog optimization, and growth.' },
  { icon: <FiTarget />, title: 'Performance Marketing', desc: 'Google Ads, Meta Ads, lead generation campaigns, conversion optimization, and customer acquisition strategies.' },
];

const WHY_CHOOSE = [
  'Customized Solutions For Every Business',
  'Modern Design & Development Standards',
  'Growth-Focused Marketing Strategies',
  'Transparent Communication',
  'Affordable & Competitive Pricing',
  'Dedicated Support & Guidance',
  'Long-Term Partnership Approach',
  'Results-Driven Execution',
];

const ABOUT_STATS = [
  { num: '250+', label: 'Projects Delivered' },
  { num: '120+', label: 'Happy Clients' },
  { num: '8M+', label: 'Audience Reached' },
  { num: '5★', label: 'Client Rating' },
];

const COMMITMENTS = [
  { icon: <FiUsers />, title: 'A Dedicated Team On Every Project', desc: 'A senior specialist owns your project from day one — no juniors learning on your budget.' },
  { icon: <FiTrendingUp />, title: 'Regular Progress Reports', desc: 'Clear, honest updates on what we did, what worked, and what comes next — every step.' },
  { icon: <FiCheckCircle />, title: 'Results You Can Measure', desc: 'Every campaign is built around real KPIs — leads, traffic, and revenue you can track.' },
];

const STORY = [
  { year: '2024', text: 'DigionTop started with a simple goal — make pro digital marketing affordable for Indian businesses.' },
  { year: '2025', text: 'Grew into a full-service team — websites, SEO, social media, e-commerce & ads under one roof.' },
  { year: '2026', text: 'Now a trusted growth partner for 120+ brands, delivering 250+ projects across India.' },
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
      <section className="ab-hero">
        <div className="ab-hero__bg"><span className="ab-hero__orb ab-hero__orb--1" /><span className="ab-hero__orb ab-hero__orb--2" /></div>
        <div className="about-container ab-hero__inner">
          <span className="ab-tag" data-aos="fade-up">About DigionTop Agency</span>
          <h1 className="ab-hero__title" data-aos="fade-up" data-aos-delay="60">
            Building Digital Experiences That <span>Drive Business Growth</span>
          </h1>
          <p className="ab-hero__sub" data-aos="fade-up" data-aos-delay="120">
            We help businesses grow through professional websites, strategic marketing,
            e-commerce solutions, and performance-driven digital services.
          </p>
          <Link to="/contact" className="ab-btn ab-btn--primary" data-aos="fade-up" data-aos-delay="180">
            Get Free Consultation <FiArrowRight />
          </Link>
          <div className="ab-hero__stats" data-aos="fade-up" data-aos-delay="240">
            {ABOUT_STATS.map((s) => (
              <div key={s.label}><b>{s.num}</b><span>{s.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 1c. COMMITMENTS ══ */}
      <section className="ab-commit">
        <div className="about-container">
          <div className="ab-head" data-aos="fade-up">
            <span className="ab-eyebrow">Three Commitments</span>
            <h2 className="ab-h2">What Every Client Gets — In Writing</h2>
          </div>
          <div className="ab-commit__grid">
            {COMMITMENTS.map((c, i) => (
              <div className="ab-commit__card" key={c.title} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="ab-commit__icon">{c.icon}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 2. WHO WE ARE (image left + content right) ══ */}
      <section className="ab-split">
        <div className="about-container ab-split__inner">
          <div className="ab-split__media" data-aos="fade-right">
            <img src="/images/digiontop-office-wall.png" alt="DigionTop office" loading="lazy" />
            <div className="ab-split__badge">
              <b>Since 2024</b>
              <span>Delhi, India</span>
            </div>
          </div>
          <div className="ab-split__text" data-aos="fade-left">
            <span className="ab-eyebrow">Who We Are</span>
            <h2 className="ab-h2">Helping Businesses Build, Grow &amp; Scale Online</h2>
            <p>
              DigionTop Agency is a results-driven digital growth agency based in Delhi, dedicated to
              helping businesses establish a powerful online presence and achieve sustainable growth.
            </p>
            <p>
              We combine creativity, technology, and marketing expertise to deliver solutions that not
              only look professional but also generate measurable business results — understand your
              business, identify growth opportunities, and build digital solutions that create real impact.
            </p>
            <ul className="ab-split__points">
              <li><FiCheck /> Senior-led team on every project</li>
              <li><FiCheck /> Transparent, honest communication</li>
              <li><FiCheck /> Results you can measure &amp; track</li>
              <li><FiCheck /> Long-term partnership, not one-time work</li>
            </ul>
            <Link to="/contact" className="ab-btn ab-btn--primary">Work With Us <FiArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* ══ 3. WHAT WE DO ══ */}
      <section className="ab-do">
        <div className="about-container">
          <div className="ab-head" data-aos="fade-up">
            <span className="ab-eyebrow">What We Do</span>
            <h2 className="ab-h2">Complete Digital Solutions for Every Stage</h2>
          </div>
          <div className="ab-do__grid">
            {WHAT_WE_DO.map((d, i) => (
              <div className="ab-do__card" key={d.title} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="ab-do__num">0{i + 1}</span>
                <span className="ab-do__icon">{d.icon}</span>
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
                <span className="ab-do__arrow"><FiArrowRight /></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. MISSION & VISION ══ */}
      <section className="ab-mv">
        <div className="about-container ab-mv__grid">
          <div className="ab-mv__card ab-mv__card--mission" data-aos="fade-up">
            <span className="ab-mv__icon"><FiTarget /></span>
            <h3>Our Mission</h3>
            <p>
              To help businesses leverage digital technology to grow faster, reach more customers,
              and build stronger brands. Every project is approached with a focus on performance,
              innovation, and long-term success.
            </p>
          </div>
          <div className="ab-mv__card ab-mv__card--vision" data-aos="fade-up" data-aos-delay="100">
            <span className="ab-mv__icon"><FiTrendingUp /></span>
            <h3>Our Vision</h3>
            <p>
              To become a trusted digital growth partner for businesses by delivering modern solutions
              that drive measurable results, help brands stay ahead of competition, and achieve
              sustainable growth in an ever-evolving digital landscape.
            </p>
          </div>
        </div>
      </section>

      {/* ══ 5. WHY CHOOSE ══ */}
      <section className="ab-why">
        <div className="about-container">
          <div className="ab-head" data-aos="fade-up">
            <span className="ab-eyebrow">Why Businesses Choose DigionTop</span>
            <h2 className="ab-h2">Built on Trust, Driven by Results</h2>
          </div>
          <div className="ab-why__grid">
            {WHY_CHOOSE.map((w, i) => (
              <div className="ab-why__item" key={w} data-aos="fade-up" data-aos-delay={(i % 4) * 50}>
                <FiCheck /> {w}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5b. OUR GOAL ══ */}
      <section className="ab-goal">
        <div className="about-container ab-goal__inner" data-aos="zoom-in">
          <span className="ab-eyebrow">Our Goal</span>
          <h2 className="ab-goal__title">Helping Your Business <span>Reach The Top</span></h2>
          <p>
            Our goal is not simply to build websites, manage social media, or run campaigns —
            it's to help businesses create a strong digital presence, attract the right audience,
            generate more opportunities, and achieve meaningful growth.
          </p>
          <p className="ab-goal__tagline">Build Better. Grow Faster. Reach The Top.</p>
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
              <img src="/images/digiontop-office.png" alt="DigionTop team at the office" loading="lazy" />
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
