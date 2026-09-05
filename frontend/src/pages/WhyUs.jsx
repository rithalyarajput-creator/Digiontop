import React from 'react';
import { Helmet } from 'react-helmet-async';
import Seo from '../components/Seo';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt, FaLayerGroup, FaChartBar, FaTags,
  FaUnlock, FaUserTie, FaBullseye, FaFlask,
  FaStar, FaArrowRight,
} from 'react-icons/fa';
import '../styles/WhyUs.css';

const reasons = [
  {
    icon: <FaMapMarkerAlt />, num: '01', title: 'Remote-First, Serving Clients Pan-India',
    description: (
      <>
        As a remote-first digital marketing company, DigionTop serves businesses across every corner of India, with no geographic limits. Whether you are in Mumbai, Jaipur, Delhi NCR, or a tier-3 city, you get the same high-quality <Link to="/services/seo-services">SEO</Link>, <Link to="/services/google-ads">Google Ads</Link>, and social media marketing.
      </>
    ),
  },
  {
    icon: <FaLayerGroup />, num: '02', title: 'One Team, Every Digital Marketing Service Under One Roof',
    description: (
      <>
        From <Link to="/services/seo-services">SEO</Link> and social media marketing to website development and <Link to="/services/ecommerce-solutions">e-commerce (Shopify)</Link>, DigionTop handles it all as a single unified team. No juggling five vendors, your entire digital marketing strategy is managed in-house by one agency.
      </>
    ),
  },
  {
    icon: <FaChartBar />, num: '03', title: 'Transparent SEO & Ads Reporting',
    description: 'Clarity builds trust. Every client gets detailed, easy-to-read performance reports on a fixed schedule, so you always know exactly where your ad spend and SEO budget is going, and what results it is driving.',
  },
  {
    icon: <FaTags />, num: '04', title: 'Affordable Digital Marketing Without Compromising Quality',
    description: 'Enterprise-level digital marketing strategy should not be reserved for big corporations. Our pricing is built for growing Indian businesses and startups, premium SEO, Google Ads, and branding at a cost that makes sense.',
  },
  {
    icon: <FaUnlock />, num: '05', title: 'No Long-Term Contracts or Lock-Ins',
    description: 'We earn your business every single month. Flexible, month-to-month engagement models mean you are never trapped in a lengthy agency contract, you stay for the results, not because you signed away your options.',
  },
  {
    icon: <FaUserTie />, num: '06', title: 'A Dedicated Account Manager for Every Client',
    description: 'Every client gets one point of contact who understands your goals, your brand, and your industry, coordinating SEO, ads, content, and web development so communication stays fast and aligned.',
  },
  {
    icon: <FaBullseye />, num: '07', title: 'Results-Oriented Digital Marketing, Not Vanity Metrics',
    description: 'Impressions do not pay bills. We focus on KPIs that move the needle, leads generated, conversions achieved, and revenue influenced, and build every SEO and ad campaign around what actually matters to your business.',
  },
  {
    icon: <FaFlask />, num: '08', title: 'Tested SEO & Marketing Strategies, Real Outcomes',
    description: 'Every SEO tactic and ad strategy we deploy has been refined through real campaigns across diverse industries in India. We combine data-backed best practices with continuous testing, so your digital marketing campaigns keep improving month after month.',
  },
];


const steps = [
  { number: '01', title: 'Discovery Call', description: 'A no-obligation consultation to understand your business, goals, target audience, and current digital footprint, including SEO, social, and website performance.' },
  { number: '02', title: 'Custom Digital Marketing Strategy', description: 'Our team builds a tailored SEO and marketing roadmap covering the right channels, messaging, timelines, and budgets specific to your growth objectives.' },
  { number: '03', title: 'Execution & Campaign Launch', description: 'We activate your SEO, Google Ads, and social media campaigns with precision, building assets, setting up tracking, and going live while keeping you informed at every milestone.' },
  { number: '04', title: 'Optimise & Scale', description: 'Using live performance data and regular SEO audits, we continuously refine what is working, cut what is not, and scale the channels delivering the best ROI.' },
];

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'DigionTop',
  url: 'https://www.digiontop.com',
  description: 'DigionTop is a full-service digital marketing agency in India offering SEO, Google Ads, Meta Ads, social media marketing, website development and e-commerce solutions.',
  areaServed: 'IN',
  priceRange: '$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '100',
  },
};

export default function WhyUs() {
  return (
    <main className="whyus">
      <Seo
        title="Why Choose DigionTop | Best Digital Marketing Agency in India"
        description="DigionTop is a results-driven digital marketing agency in India offering SEO, Ads & web dev with transparent reporting and no long-term lock-ins."
        path="/why-us"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(professionalServiceSchema)}</script>
      </Helmet>

      {/* ── Hero ── */}
      <section className="whyus__hero">
        <div className="whyus__hero-inner">
          <p className="whyus__hero-eyebrow">Our Difference</p>
          <h1 className="whyus__hero-title">Why Choose DigionTop — India's Results-Driven Digital Marketing Agency</h1>
          <p className="whyus__hero-subtitle">
            Hundreds of digital marketing agencies in India promise rankings and leads. DigionTop builds the systems, transparency,
            and partnerships that actually deliver them, for businesses of every size, in every city across India.
          </p>
          <div className="whyus__hero-actions">
            <Link to="/contact" className="whyus__cta-btn whyus__cta-btn--primary">Get Free Consultation <FaArrowRight /></Link>
            <Link to="/services" className="whyus__cta-btn whyus__cta-btn--outline">Explore Our Services</Link>
          </div>
        </div>
      </section>

      {/* ── Pinned sticky-note cards ── */}
      <section className="whyus__notes-section">
        <div className="whyus__container">
          <div className="whyus__section-header">
            <span className="whyus__badge">8 Reasons</span>
            <h2 className="whyus__section-title">What Sets DigionTop Apart as a Digital Marketing Agency</h2>
            <p className="whyus__section-sub">
              These are not talking points, they are the principles behind every SEO campaign, every ad account, and every
              client relationship at DigionTop, one of the fastest-growing full-service digital marketing agencies in India.
            </p>
          </div>

          <div className="whyus__notes">
            {reasons.map((r, i) => (
              <div className="whyus__note" key={i} data-aos="fade-up" data-aos-delay={(i % 4) * 70}>
                <span className="whyus__note-pin" />
                <div className="whyus__note-inner">
                  <div className="whyus__note-top">
                    <span className="whyus__note-num">{r.num}</span>
                    <span className="whyus__note-icon" aria-hidden="true">{r.icon}</span>
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
            <h2 className="whyus__section-title">How DigionTop Delivers Digital Marketing Results</h2>
            <p className="whyus__section-sub">
              A clear, repeatable digital marketing process means fewer surprises, faster SEO and ad results, and a partnership you can rely on.
            </p>
          </div>
          <div className="whyus__steps">
            {steps.map((step, idx) => (
              <div className="whyus__step" key={idx}>
                <div className="whyus__step-number-wrap">
                  <div className="whyus__step-number">{step.number}</div>
                </div>
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
        <div className="whyus__cta-card" data-aos="zoom-in">
          <span className="whyus__cta-orb whyus__cta-orb--1" aria-hidden="true" />
          <span className="whyus__cta-orb whyus__cta-orb--2" aria-hidden="true" />
          <span className="whyus__cta-grid" aria-hidden="true" />

          <div className="whyus__cta-inner">
            <span className="whyus__cta-eyebrow"><FaStar /> Book a Free Digital Marketing Strategy Call</span>
            <h2 className="whyus__cta-title">Ready to Experience the <span>DigionTop Difference?</span></h2>
            <p className="whyus__cta-sub">
              Book a free strategy call with a results-driven digital marketing agency in India and see exactly how we will
              grow your business online, no pressure, no jargon, just a clear SEO and marketing plan.
            </p>
            <div className="whyus__cta-actions">
              <Link to="/contact" className="whyus__cta-btn whyus__cta-btn--primary">Get Free Consultation <FaArrowRight /></Link>
              <Link to="/services" className="whyus__cta-btn whyus__cta-btn--outline">Explore Our Services</Link>
            </div>

            <div className="whyus__cta-trust">
              <div className="whyus__cta-trust-item"><FaStar className="whyus__cta-trust-star" /><b>5.0</b><span>Client Rating</span></div>
              <span className="whyus__cta-divider" />
              <div className="whyus__cta-trust-item"><b>100+</b><span>Projects Delivered</span></div>
              <span className="whyus__cta-divider" />
              <div className="whyus__cta-trust-item"><b>24h</b><span>Reply Time</span></div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
