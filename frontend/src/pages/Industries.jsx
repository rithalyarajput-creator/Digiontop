import React from 'react';
import Seo from '../components/Seo';
import { Link } from 'react-router-dom';
import {
  FiShoppingCart,
  FiCoffee,
  FiHeart,
  FiBookOpen,
  FiStar,
  FiHome,
  FiBriefcase,
  FiCpu,
  FiTool,
  FiUser,
} from 'react-icons/fi';
import '../styles/Industries.css';

/* ─── Industry Data ─── */
const industries = [
  {
    icon: <FiShoppingCart size={32} />,
    title: 'Retail & E-Commerce',
    description:
      'From Amazon and Flipkart listings to full-stack Shopify stores, we help retail and e-commerce brands stand out, convert more visitors, and scale profitably across every major platform.',
  },
  {
    icon: <FiCoffee size={32} />,
    title: 'Restaurants & Food',
    description:
      'We grow restaurants, cloud kitchens, and food brands through mouth-watering social media content, local SEO, Swiggy/Zomato visibility strategies, and targeted digital campaigns that fill tables and drive orders.',
  },
  {
    icon: <FiHeart size={32} />,
    title: 'Healthcare & Wellness',
    description:
      'Clinics, hospitals, yoga studios, and wellness coaches trust us to build credible online presences. We handle patient-friendly content, local search visibility, and compliant digital marketing that earns genuine trust.',
  },
  {
    icon: <FiBookOpen size={32} />,
    title: 'Education & Coaching',
    description:
      'Schools, ed-tech platforms, tutors, and coaching institutes rely on us for lead generation, course promotion, social media growth, and website solutions that convert enquiries into enrolled students.',
  },
  {
    icon: <FiStar size={32} />,
    title: 'Fashion & Beauty',
    description:
      'We craft compelling brand stories for fashion labels, beauty studios, and personal care brands, from Instagram-worthy content and influencer tie-ups to Myntra-optimised listings and D2C website design.',
  },
  {
    icon: <FiHome size={32} />,
    title: 'Real Estate',
    description:
      'Builders, developers, and agents use our services to generate qualified buyer leads, showcase properties with stunning digital assets, dominate local search results, and reduce dependency on expensive portals.',
  },
  {
    icon: <FiBriefcase size={32} />,
    title: 'Professional Services',
    description:
      'CA firms, law practices, HR consultancies, and financial advisors grow their client base with our authority-building content, LinkedIn marketing, local SEO, and professional website development.',
  },
  {
    icon: <FiCpu size={32} />,
    title: 'Technology & SaaS',
    description:
      'Startups and SaaS companies rely on us for product-led content marketing, technical SEO, demo-driving paid campaigns, and growth-focused website builds that reduce CAC and improve trial conversions.',
  },
  {
    icon: <FiTool size={32} />,
    title: 'Home Services',
    description:
      'Plumbers, electricians, interior designers, and home renovation businesses use our local SEO and Google Business strategies to dominate hyperlocal search and generate consistent service enquiries.',
  },
  {
    icon: <FiUser size={32} />,
    title: 'Personal Brands',
    description:
      'Coaches, speakers, consultants, and creators trust us to build powerful personal brands, with polished websites, strategic social media presence, content that positions them as authorities, and funnels that convert followers into paying clients.',
  },
];

export default function Industries() {
  return (
    <main className="industries-page">
      <Seo
        title="Industries We Serve, Digital Marketing by Sector"
        description="Retail, restaurants, healthcare, education, real estate, SaaS and more, see how DigionTop tailors websites, SEO and social campaigns to your industry. Find yours."
        path="/industries"
      />
      {/* ══════════════════════════════════════
          1. PAGE HERO
      ══════════════════════════════════════ */}
      <section className="industries-hero">
        <div className="industries-hero__overlay" />
        <div className="industries-hero__content">
          <span className="industries-hero__badge">Industry Expertise</span>
          <h1 className="industries-hero__heading">
            Digital Growth, Tailored to <span>Your Industry</span>
          </h1>
          <p className="industries-hero__sub">
            Sector-specific digital strategies built for the way your business
            actually works, not generic templates.
          </p>
          <div className="industries-hero__stats">
            <div className="industries-hero__stat"><b>10+</b><span>Industries Served</span></div>
            <div className="industries-hero__stat"><b>50+</b><span>Brands Grown</span></div>
            <div className="industries-hero__stat"><b>100%</b><span>Custom Strategy</span></div>
          </div>
          <nav className="industries-hero__breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="industries-hero__breadcrumb-link">Home</Link>
            <span className="industries-hero__breadcrumb-sep" aria-hidden="true">/</span>
            <span className="industries-hero__breadcrumb-current">Industries</span>
          </nav>
        </div>
      </section>

      {/* ══════════════════════════════════════
          2. INDUSTRIES GRID
      ══════════════════════════════════════ */}
      <section className="industries-grid-section">
        <div className="industries-container">
          <div className="industries-section-header">
            <span className="industries-label">Who We Help</span>
            <h2 className="industries-section-heading">
              10 Industries. One Trusted Partner.
            </h2>
            <p className="industries-section-sub">
              Every industry has its own audience, its own platform dynamics,
              and its own definition of growth. We understand yours.
            </p>
          </div>

          <div className="industries-grid">
            {industries.map((ind, i) => (
              <div key={ind.title} className="industry-card">
                <span className="industry-card__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="industry-card__icon">{ind.icon}</div>
                <h3 className="industry-card__title">{ind.title}</h3>
                <p className="industry-card__desc">{ind.description}</p>
                <span className="industry-card__arrow" aria-hidden="true">→</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          3. CTA BANNER
      ══════════════════════════════════════ */}
      <section className="industries-cta">
        <div className="industries-container">
          <div className="industries-cta__inner">
            <div className="industries-cta__text">
              <h2 className="industries-cta__heading">
                Don't See Your Industry? We've Got You Covered.
              </h2>
              <p className="industries-cta__sub">
                We work with businesses across dozens of categories. Tell us
                what you do and we'll tell you exactly how we can help you grow
, with a free, no-obligation consultation.
              </p>
            </div>
            <Link to="/contact" className="industries-cta__btn">
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
