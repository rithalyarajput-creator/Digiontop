import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaCode,
  FaSearch,
  FaBullhorn,
  FaShoppingCart,
  FaMapMarkerAlt,
  FaChartLine,
  FaHandshake,
  FaStore,
  FaUtensils,
  FaHeartbeat,
  FaGraduationCap,
  FaTshirt,
  FaBuilding,
} from "react-icons/fa";
import "../styles/Home.css";

// ─── DATA ────────────────────────────────────────────────────────────────────

const services = [
  {
    icon: <FaCode />,
    title: "Website Development",
    description:
      "We build fast, modern, mobile-first websites and landing pages that convert visitors into customers — on every device.",
    link: "/services/website-development",
  },
  {
    icon: <FaSearch />,
    title: "SEO Services",
    description:
      "Data-driven on-page, off-page and technical SEO that pushes your brand to the top of Google search results and keeps it there.",
    link: "/services/seo-services",
  },
  {
    icon: <FaBullhorn />,
    title: "Social Media Marketing",
    description:
      "Strategic content, paid ads and community management across Instagram, Facebook, LinkedIn and more — built to grow your audience.",
    link: "/services/social-media-marketing",
  },
  {
    icon: <FaShoppingCart />,
    title: "E-Commerce Solutions",
    description:
      "End-to-end marketplace management on Amazon, Flipkart and Meesho — from listing optimisation to sponsored ads and account health.",
    link: "/services/ecommerce-solutions",
  },
];

const whyUs = [
  {
    icon: <FaMapMarkerAlt />,
    title: "Remote-First India-Wide",
    description:
      "Our distributed team of specialists works across India, so you get top-tier talent without location constraints or overhead costs.",
  },
  {
    icon: <FaChartLine />,
    title: "Transparent Reporting",
    description:
      "Real-time dashboards and monthly reports in plain language — you always know exactly where your budget is going and what it's delivering.",
  },
  {
    icon: <FaHandshake />,
    title: "No Long-Term Lock-Ins",
    description:
      "Month-to-month engagements that earn your loyalty through results, not contracts. Scale up, down or pause — on your terms.",
  },
];

const industries = [
  { label: "Retail", icon: <FaStore /> },
  { label: "Restaurants", icon: <FaUtensils /> },
  { label: "Healthcare", icon: <FaHeartbeat /> },
  { label: "Education", icon: <FaGraduationCap /> },
  { label: "Fashion", icon: <FaTshirt /> },
  { label: "Real Estate", icon: <FaBuilding /> },
];

const stats = [
  { value: "200+", label: "Clients Served" },
  { value: "500+", label: "Projects Delivered" },
  { value: "5+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const heroStats = [
  { value: "500+", label: "Happy Clients" },
  { value: "2X+", label: "Average Growth" },
  { value: "#1", label: "Client Satisfaction" },
  { value: "Result", label: "Driven Approach" },
];

const HeroSection = () => (
  <section className="hero">
    <div className="hero__inner">
      {/* Left content */}
      <div className="hero__content" data-aos="fade-right">
        <div className="hero__badge">
          <span className="hero__badge-star">★</span> #1 Digital Marketing Agency
        </div>
        <h1 className="hero__headline">
          Stay On <span className="hero__headline--yellow">Top.</span>
        </h1>
        <p className="hero__subheadline">
          We Help Brands Rank Higher, Grow Faster<br />
          &amp; Generate <span className="hero__subheadline--yellow">More Revenue.</span>
        </p>
        <div className="hero__ctas">
          <a href="/contact" className="btn btn--yellow hero__btn-call">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
            Get a Free Strategy Call
          </a>
          <a href="/services" className="btn btn--outline hero__btn-services">
            <span className="hero__btn-arrow">↗</span> View Our Services
          </a>
        </div>

        {/* Stats row */}
        <div className="hero__stats-row">
          {heroStats.map((s, i) => (
            <div className="hero__stat-item" key={i}>
              <span className="hero__stat-val">{s.value}</span>
              <span className="hero__stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right graphic */}
      <div className="hero__graphic" data-aos="fade-left">
        <img
          src="/images/hero-banner.png"
          alt="DigionTop — Business Growth"
          className="hero__banner-img"
        />
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section className="services" id="services">
    <div className="container">
      <p className="section-label" data-aos="fade-up">OUR SERVICES</p>
      <h2 className="section-title" data-aos="fade-up" data-aos-delay="60">
        Everything Your Business Needs to Grow Online
      </h2>
      <p className="section-subtitle" data-aos="fade-up" data-aos-delay="120">
        From building your website to ranking it on Google — we handle it all.
      </p>
      <div className="services__grid">
        {services.map((service, i) => (
          <div
            className="service-card"
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <div className="service-card__icon">{service.icon}</div>
            <h3 className="service-card__title">{service.title}</h3>
            <p className="service-card__desc">{service.description}</p>
            <Link to={service.link} className="service-card__link">
              Learn More &rarr;
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const WhyUsSection = () => (
  <section className="why-us">
    <div className="container">
      <p className="section-label" data-aos="fade-up">WHY CHOOSE US</p>
      <h2 className="section-title" data-aos="fade-up" data-aos-delay="60">
        The DigionTop Difference
      </h2>
      <div className="why-us__grid">
        {whyUs.map((item, i) => (
          <div
            className="why-us__card"
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <div className="why-us__icon">{item.icon}</div>
            <h3 className="why-us__title">{item.title}</h3>
            <p className="why-us__desc">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const IndustriesSection = () => (
  <section className="industries" id="industries">
    <div className="container">
      <p className="section-label" data-aos="fade-up">INDUSTRIES WE SERVE</p>
      <h2 className="section-title" data-aos="fade-up" data-aos-delay="60">
        Built for Businesses Across Every Sector
      </h2>
      <div className="industries__pills">
        {industries.map((ind, i) => (
          <div
            className="industries__pill"
            key={i}
            data-aos="zoom-in"
            data-aos-delay={i * 80}
          >
            <span className="industries__pill-icon">{ind.icon}</span>
            <span className="industries__pill-label">{ind.label}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CtaBanner = () => (
  <section className="cta-banner" data-aos="fade-up">
    <div className="container cta-banner__inner">
      <div className="cta-banner__text">
        <h2 className="cta-banner__title">Ready to Grow Your Business?</h2>
        <p className="cta-banner__subtitle">
          Book a free 30-minute strategy session with our digital experts.
        </p>
      </div>
      <a href="/contact" className="btn btn--black">
        Book Free Consultation
      </a>
    </div>
  </section>
);

// ─── DIGITAL ORBIT SECTION ───────────────────────────────────────────────────

/* Real brand logos as inline SVGs / img tags */
const BRAND_LOGOS = [
  {
    label: 'Instagram',
    bg: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
    svg: (
      <svg viewBox="0 0 24 24" fill="#fff" width="28" height="28"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
    ),
  },
  {
    label: 'Facebook',
    bg: '#1877F2',
    svg: (
      <svg viewBox="0 0 24 24" fill="#fff" width="28" height="28"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    ),
  },
  {
    label: 'Google',
    bg: '#fff',
    svg: (
      <svg viewBox="0 0 24 24" width="28" height="28"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
    ),
  },
  {
    label: 'YouTube',
    bg: '#FF0000',
    svg: (
      <svg viewBox="0 0 24 24" fill="#fff" width="28" height="28"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    ),
  },
  {
    label: 'WhatsApp',
    bg: '#25D366',
    svg: (
      <svg viewBox="0 0 24 24" fill="#fff" width="28" height="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
    ),
  },
  {
    label: 'Shopify',
    bg: '#96BF48',
    svg: (
      <svg viewBox="0 0 24 24" fill="#fff" width="28" height="28"><path d="M15.337.108c-.07-.007-.14 0-.196.028-.04.02-.612.469-1.148.926C13.42.434 12.384 0 11.077 0 8.205 0 7.31 3.584 7.035 5.408c-.797.247-1.565.485-1.565.485L3.836 6.44C3.347 6.59 3.33 6.61 3.27 7.073L.03 22.964 17.906 24 24 22.455 21.05 1.04s-5.644-.924-5.713-.932zM13.4 1.86c.456-.355.868-.66 1.155-.858.212.56.45 1.407.574 2.558-.504.155-1.05.323-1.61.497-.215-1.04-.512-1.873-.12-2.197zm-2.323-.225c.944 0 1.63.25 2.157.718-.4.316-.851.658-1.31 1.01-.307-1.163-.777-2.17-1.25-2.668.142-.04.267-.06.403-.06zm-1.77.652c.524.584 1.007 1.61 1.247 2.773-.663.204-1.34.412-1.984.61C8.88 4.185 9.563 2.82 9.307 2.287zM11.076 1.3c.04 0 .078.003.118.007-.357.383-.7.959-.968 1.674-.307-.138-.49-.347-.46-.603.073-.61.705-1.078 1.31-1.078zm7.888 21.225L17.906 24 .03 22.964 3.27 7.073c.06-.463.077-.483.566-.633l1.634-.507c-.02.275-.037.534-.037.79 0 4.94 4.036 7.337 4.036 7.337s1.006.607 2.25.607c1.245 0 2.25-.607 2.25-.607s4.036-2.397 4.036-7.337c0-.255-.016-.515-.037-.79l2.258-.698 1.728 14.29z"/></svg>
    ),
  },
  {
    label: 'WordPress',
    bg: '#21759B',
    svg: (
      <svg viewBox="0 0 24 24" fill="#fff" width="28" height="28"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM1.893 12c0-1.902.418-3.706 1.157-5.324L7.53 19.338C4.206 17.72 1.893 15.11 1.893 12zM12 22.107c-1.28 0-2.513-.198-3.674-.563l3.9-11.337 3.994 10.945c.026.063.057.123.09.18A10.108 10.108 0 0 1 12 22.107zm1.35-14.447l3.315 9.867.915 3.057A10.11 10.11 0 0 0 22.107 12c0-1.74-.443-3.38-1.218-4.81l-7.539 4.47zm-1.35-5.66c2.162 0 4.148.714 5.752 1.904-.042.02-.085.04-.127.064L12 7.447 6.373 3.963A10.073 10.073 0 0 1 12 1.893z"/></svg>
    ),
  },
  {
    label: 'LinkedIn',
    bg: '#0A66C2',
    svg: (
      <svg viewBox="0 0 24 24" fill="#fff" width="28" height="28"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    ),
  },
];

const DigitalOrbitSection = () => (
  <section className="orbit-section">
    <div className="orbit-section__inner">

      {/* LEFT — text content */}
      <div className="orbit-section__text" data-aos="fade-right">
        <p className="section-label">PLATFORMS WE WORK ON</p>
        <h2 className="orbit-section__title">
          We Market Your Brand<br />
          <span className="orbit-section__yellow">Everywhere Online</span>
        </h2>
        <p className="orbit-section__sub">
          From Instagram reels to Google ads, WordPress sites to Shopify stores —
          DigionTop handles every platform that matters for your growth.
        </p>
        <ul className="orbit-section__list">
          <li><span className="orbit-section__tick">✓</span> Social Media Management</li>
          <li><span className="orbit-section__tick">✓</span> Google & Meta Ads</li>
          <li><span className="orbit-section__tick">✓</span> E-Commerce (Shopify / WooCommerce)</li>
          <li><span className="orbit-section__tick">✓</span> SEO & Content Marketing</li>
        </ul>
        <a href="/contact" className="orbit-section__btn">Get Free Consultation →</a>
      </div>

      {/* RIGHT — orbit animation */}
      <div className="orbit-section__right" data-aos="fade-left" data-aos-delay="150">
        <div className="orbit-wrap">

          {/* Outer ring — 8 logos */}
          <div className="orbit-ring orbit-ring--outer">
            {BRAND_LOGOS.map((b, i) => (
              <div key={i} className="orbit-dot" style={{ '--i': i, '--total': 8 }}>
                <div className="orbit-dot__pill" style={{ background: b.bg === '#fff' ? '#fff' : b.bg, boxShadow: `0 4px 20px ${b.bg === '#fff' ? 'rgba(0,0,0,0.15)' : b.bg}55` }}>
                  {b.svg}
                </div>
                <span className="orbit-dot__label">{b.label}</span>
              </div>
            ))}
          </div>

          {/* Center logo / text */}
          <div className="orbit-center">
            <div className="orbit-center__glow" />
            <p className="orbit-center__line1">DIGITAL</p>
            <p className="orbit-center__line2">MARKETING</p>
          </div>

        </div>
      </div>
    </div>
  </section>
);

// ─── SOCIAL REELS SECTION ────────────────────────────────────────────────────

const REELS = [
  { id: 1, label: 'Brand Reel', video: '/reel2.mp4', views: '12K', tag: 'Instagram' },
  { id: 2, label: 'Product Shoot', thumb: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=200&h=356&fit=crop', views: '8.4K', tag: 'Reels' },
  { id: 3, label: 'Client Story', thumb: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=356&fit=crop', views: '21K', tag: 'YouTube' },
  { id: 4, label: 'UGC Content', thumb: 'https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=200&h=356&fit=crop', views: '5.6K', tag: 'Facebook' },
];

const SocialReelsSection = () => (
  <section className="home-reels">
    <div className="home-reels__inner">

      {/* LEFT text */}
      <div className="home-reels__text" data-aos="fade-right">
        <p className="section-label">SOCIAL MEDIA</p>
        <h2 className="home-reels__heading">
          We Create Reels<br />
          <span className="home-reels__heading-yellow">That Go Viral</span>
        </h2>
        <p className="home-reels__sub">
          From brand storytelling to UGC content and influencer reels — we produce
          short-form videos that stop the scroll, grow your audience, and drive
          real engagement across Instagram, YouTube & Facebook.
        </p>
        <ul className="home-reels__list">
          <li><span className="home-reels__tick">✓</span> Platform Handling & Scheduling</li>
          <li><span className="home-reels__tick">✓</span> Reels & Video Production</li>
          <li><span className="home-reels__tick">✓</span> Influencer & UGC Content</li>
          <li><span className="home-reels__tick">✓</span> Social Media Strategy</li>
        </ul>
        <a href="/services/social-media-marketing" className="home-reels__btn">
          See Our Social Work →
        </a>
      </div>

      {/* CENTER — phone mockup */}
      <div className="home-reels__phone-wrap" data-aos="fade-up">
        <div className="home-reels__phone">
          <div className="home-reels__phone-notch" />
          <div className="home-reels__phone-screen">
            <video
              className="home-reels__phone-video"
              src="/reel.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>

      {/* RIGHT — reel thumbnails grid */}
      <div className="home-reels__grid" data-aos="fade-left">
        {REELS.map(r => (
          <div key={r.id} className="home-reels__thumb">
            {r.video
              ? <video src={r.video} autoPlay loop muted playsInline className="home-reels__thumb-video" />
              : <img src={r.thumb} alt={r.label} />
            }
            <div className="home-reels__thumb-overlay">
              <span className="home-reels__thumb-tag">{r.tag}</span>
              <span className="home-reels__thumb-views">▶ {r.views}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  </section>
);

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

/* ── Testimonials Section ── */
const TCOLORS = ['#F5A800', '#0d5c63', '#1a1a1a'];

const TestimonialsSection = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(r => r.json())
      .then(d => setItems(Array.isArray(d) ? d.slice(0, 3) : []))
      .catch(() => {});
  }, []);

  const display = items.length > 0 ? items : [
    { id: 1, client_name: 'Rajesh Sharma', client_role: 'E-Commerce Seller', client_location: 'Delhi', testimonial_text: 'DigionTop completely transformed our Amazon listings. Within three months our products were ranking on page one and organic sales doubled!', rating: 5 },
    { id: 2, client_name: 'Priya Mehta', client_role: 'Wellness Studio Owner', client_location: 'Bangalore', testimonial_text: 'Within four months we were ranking for every major keyword. New client enquiries went up by over 60% — incredible results!', rating: 5 },
    { id: 3, client_name: 'Ankur Gupta', client_role: 'Restaurant Owner', client_location: 'Jaipur', testimonial_text: 'In six months we crossed 4,200 Instagram followers and customers started walking in specifically because they found us online.', rating: 5 },
  ];

  return (
    <section className="home-testimonials" data-aos="fade-up">
      <div className="container">
        <p className="section-label">CLIENT STORIES</p>
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Real results from real Indian businesses.</p>
        <div className="home-testimonials__grid">
          {display.map((t, i) => (
            <div key={t.id} className="home-tcard" style={{ '--accent': TCOLORS[i % 3] }}>
              {/* Top accent bar */}
              <div className="home-tcard__bar" />
              {/* Quote icon */}
              <div className="home-tcard__quote-icon">"</div>
              {/* Stars */}
              <div className="home-tcard__stars">{'★'.repeat(t.rating || 5)}</div>
              {/* Text */}
              <p className="home-tcard__text">{t.testimonial_text}</p>
              {/* Person row */}
              <div className="home-tcard__person">
                <div className="home-tcard__avatar">{t.client_name.charAt(0)}</div>
                <div>
                  <p className="home-tcard__name">{t.client_name}</p>
                  <p className="home-tcard__role">{t.client_role}{t.client_location ? `, ${t.client_location}` : ''}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-cubic", once: true });
  }, []);

  return (
    <main className="home-page">
      <HeroSection />
      <ServicesSection />
      <DigitalOrbitSection />
      <WhyUsSection />
      <IndustriesSection />
      <SocialReelsSection />
      <TestimonialsSection />
      <CtaBanner />
    </main>
  );
};

export default Home;
