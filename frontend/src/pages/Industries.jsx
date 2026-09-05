import React from 'react';
import { Helmet } from 'react-helmet-async';
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
    title: 'Digital Marketing for Retail & E-Commerce Brands',
    description:
      'From Amazon and Flipkart listing optimization to full-stack Shopify store development, DigionTop helps retail and e-commerce brands in India stand out, convert more visitors, and scale profitably across every major platform.',
  },
  {
    icon: <FiCoffee size={32} />,
    title: 'Digital Marketing for Restaurants & Food Brands',
    description:
      'DigionTop grows restaurants, cloud kitchens, and food brands through mouth-watering social media content, local SEO, Swiggy and Zomato visibility strategies, and targeted digital campaigns that fill tables and drive online orders.',
  },
  {
    icon: <FiHeart size={32} />,
    title: 'Digital Marketing for Healthcare & Wellness Businesses',
    description:
      'Clinics, hospitals, yoga studios, and wellness coaches trust DigionTop to build credible online presences, with patient-friendly content, local search visibility, and compliant healthcare digital marketing that earns genuine trust.',
  },
  {
    icon: <FiBookOpen size={32} />,
    title: 'Digital Marketing for Education & Coaching Institutes',
    description:
      'Schools, ed-tech platforms, tutors, and coaching institutes rely on DigionTop for lead generation, course promotion, social media growth, and website solutions that convert enquiries into enrolled students.',
  },
  {
    icon: <FiStar size={32} />,
    title: 'Digital Marketing for Fashion & Beauty Brands',
    description:
      'DigionTop crafts compelling brand stories for fashion labels, beauty studios, and personal care brands, from Instagram-worthy content and influencer tie-ups to Myntra-optimised listings and D2C website design.',
  },
  {
    icon: <FiHome size={32} />,
    title: 'Digital Marketing for Real Estate',
    description:
      'Builders, developers, and real estate agents use DigionTop to generate qualified buyer leads, showcase properties with stunning digital assets, dominate local search results, and reduce dependency on expensive property portals.',
  },
  {
    icon: <FiBriefcase size={32} />,
    title: 'Digital Marketing for Professional Services',
    description:
      'CA firms, law practices, HR consultancies, and financial advisors grow their client base with DigionTop authority-building content, LinkedIn marketing, local SEO, and professional website development.',
  },
  {
    icon: <FiCpu size={32} />,
    title: 'Digital Marketing for Technology & SaaS Companies',
    description:
      'Startups and SaaS companies rely on DigionTop for product-led content marketing, technical SEO, demo-driving paid campaigns, and growth-focused website builds that reduce CAC and improve trial conversions.',
  },
  {
    icon: <FiTool size={32} />,
    title: 'Digital Marketing for Home Services Businesses',
    description:
      'Plumbers, electricians, interior designers, and home renovation businesses use DigionTop local SEO and Google Business Profile strategies to dominate hyperlocal search and generate consistent service enquiries.',
  },
  {
    icon: <FiUser size={32} />,
    title: 'Digital Marketing for Personal Brands',
    description:
      'Coaches, speakers, consultants, and creators trust DigionTop to build powerful personal brands, with polished websites, strategic social media presence, authority-building content, and funnels that convert followers into paying clients.',
  },
];

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: industries.map((ind, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: ind.title,
  })),
};

export default function Industries() {
  return (
    <main className="industries-page">
      <Seo
        title="Industries We Serve | DigionTop Digital Marketing"
        description="DigionTop delivers industry-specific digital marketing for retail, real estate, healthcare, education, SaaS & more across India. See how we grow your sector."
        path="/industries"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>

      {/* ══════════════════════════════════════
          1. PAGE HERO
      ══════════════════════════════════════ */}
      <section className="industries-hero">
        <div className="industries-hero__overlay" />
        <div className="industries-hero__content">
          <span className="industries-hero__badge">Industry Expertise</span>
          <h1 className="industries-hero__heading">
            Digital Marketing Strategies Built for <span>Your Sector</span>
          </h1>
          <p className="industries-hero__sub">
            Sector-specific digital marketing strategies, built for the way your industry actually works, not generic
            templates. As a full-service digital marketing agency in India, DigionTop tailors SEO, social media, and ad
            campaigns to how your customers actually search, browse, and buy.
          </p>
          <div className="industries-hero__cta">
            <Link to="/contact" className="industries-cta__btn">Book Free Consultation</Link>
          </div>
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
              10 Industries. One Trusted Digital Marketing Partner.
            </h2>
            <p className="industries-section-sub">
              Every industry has its own audience, its own platform dynamics, and its own definition of growth.
              DigionTop understands yours, and builds digital marketing strategies around it, not a one-size-fits-all template.
            </p>
          </div>

          <div className="industries-grid">
            {industries.map((ind, i) => (
              <div key={ind.title} className="industry-card">
                <span className="industry-card__num">{String(i + 1).padStart(2, '0')}</span>
                <div className="industry-card__icon" aria-hidden="true">{ind.icon}</div>
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
                DigionTop works with businesses across dozens of categories beyond the ones listed here. Tell us what
                you do, and we will show you exactly how our digital marketing agency can help you grow, with a free,
                no-obligation consultation.
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
