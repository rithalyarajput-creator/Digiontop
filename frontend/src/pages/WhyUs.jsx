import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt, FaLayerGroup, FaChartBar, FaTags,
  FaUnlock, FaUserTie, FaBullseye, FaFlask,
} from 'react-icons/fa';
import '../styles/WhyUs.css';

const reasons = [
  { icon: <FaMapMarkerAlt />, num: '01', title: 'Remote-First, India-Wide', description: 'We serve clients across every corner of India without geographic limits. Our fully remote team delivers the same high-quality digital marketing whether you are in Mumbai, Jaipur, or a tier-3 city.' },
  { icon: <FaLayerGroup />, num: '02', title: 'One Team, All Services', description: 'From SEO and social media to web development and e-commerce, we handle it all under one roof. No need to juggle multiple vendors — your entire digital strategy is managed by a single unified team.' },
  { icon: <FaChartBar />, num: '03', title: 'Transparent Reporting', description: 'We believe clarity builds trust. You receive detailed, easy-to-read reports on a regular schedule so you always know where your budget is going and what results it is driving.' },
  { icon: <FaTags />, num: '04', title: 'Affordable Without Compromise', description: 'Premium digital marketing should not be reserved for big corporations. Our pricing is structured to give growing businesses enterprise-level strategy at a cost that makes sense.' },
  { icon: <FaUnlock />, num: '05', title: 'No Long-Term Lock-Ins', description: 'We earn your business every month. Our flexible engagement models mean you are never trapped in a lengthy contract — you stay because of the results, not because you signed away your options.' },
  { icon: <FaUserTie />, num: '06', title: 'Dedicated Account Manager', description: 'Every client gets a single point of contact who understands your goals, your brand, and your industry. Your account manager coordinates everything so communication is always fast and aligned.' },
  { icon: <FaBullseye />, num: '07', title: 'Results-Oriented Approach', description: 'Vanity metrics do not pay bills. We focus on KPIs that move the needle — leads generated, conversions achieved, revenue influenced — and align our efforts around what actually matters.' },
  { icon: <FaFlask />, num: '08', title: 'Tested Strategies, Real Outcomes', description: 'Every tactic we deploy has been refined through real campaigns across diverse industries. We combine data-backed best practices with continuous testing so your campaigns improve over time.' },
];


const steps = [
  { number: '01', title: 'Discovery Call', description: 'We begin with a no-obligation consultation to understand your business, goals, target audience, and current digital footprint.' },
  { number: '02', title: 'Custom Strategy', description: 'Our team builds a tailored roadmap covering the right channels, messaging, timelines, and budgets specific to your growth objectives.' },
  { number: '03', title: 'Execution & Launch', description: 'We activate your campaigns with precision — building assets, setting up tracking, and going live while keeping you informed at every milestone.' },
  { number: '04', title: 'Optimise & Scale', description: 'Using live data and regular audits, we continuously refine performance, cut what does not work, and scale what delivers the best returns.' },
];

export default function WhyUs() {
  return (
    <main className="whyus">

      {/* ── Hero ── */}
      <section className="whyus__hero">
        <div className="whyus__hero-inner">
          <p className="whyus__hero-eyebrow">Our Difference</p>
          <h1 className="whyus__hero-title">Why Choose DigionTop?</h1>
          <p className="whyus__hero-subtitle">
            Hundreds of agencies promise results. We build the systems, transparency, and
            partnerships that actually deliver them — for businesses of every size, across India.
          </p>
        </div>
      </section>

      {/* ── Pinned sticky-note cards ── */}
      <section className="whyus__notes-section">
        <div className="whyus__container">
          <div className="whyus__section-header">
            <span className="whyus__badge">8 Reasons</span>
            <h2 className="whyus__section-title">What Sets Us Apart</h2>
            <p className="whyus__section-sub">
              These are not talking points — they are the principles that shape every project,
              every report, and every client relationship at DigionTop.
            </p>
          </div>

          <div className="whyus__notes">
            {reasons.map((r, i) => (
              <div className="whyus__note" key={i} data-aos="fade-up" data-aos-delay={(i % 4) * 70}>
                <span className="whyus__note-pin" />
                <div className="whyus__note-inner">
                  <div className="whyus__note-top">
                    <span className="whyus__note-num">{r.num}</span>
                    <span className="whyus__note-icon">{r.icon}</span>
                  </div>
                  <h3 className="whyus__note-title">{r.title}</h3>
                  <p className="whyus__note-desc">{r.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process Steps ── */}
      <section className="whyus__process">
        <div className="whyus__container">
          <div className="whyus__section-header">
            <span className="whyus__badge">Our Process</span>
            <h2 className="whyus__section-title">How We Work</h2>
            <p className="whyus__section-sub">
              A clear, repeatable process means fewer surprises, faster results, and a partnership you can rely on.
            </p>
          </div>
          <div className="whyus__steps">
            {steps.map((step, idx) => (
              <div className="whyus__step" key={idx}>
                <div className="whyus__step-number">{step.number}</div>
                <div className="whyus__step-body">
                  <h3 className="whyus__step-title">{step.title}</h3>
                  <p className="whyus__step-desc">{step.description}</p>
                </div>
                {idx < steps.length - 1 && <div className="whyus__step-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="whyus__cta">
        <div className="whyus__cta-inner">
          <h2 className="whyus__cta-title">Ready to Experience the DigionTop Difference?</h2>
          <p className="whyus__cta-sub">Book a free strategy call and let us show you exactly how we will grow your business.</p>
          <div className="whyus__cta-actions">
            <Link to="/contact" className="whyus__cta-btn whyus__cta-btn--primary">Get Free Consultation</Link>
            <Link to="/services" className="whyus__cta-btn whyus__cta-btn--outline">Explore Our Services</Link>
          </div>
        </div>
      </section>

    </main>
  );
}
