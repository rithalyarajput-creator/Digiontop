import React, { useEffect } from "react";
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

const HeroSection = () => (
  <section className="hero">
    <div className="hero__inner">
      {/* Left content */}
      <div className="hero__content" data-aos="fade-right">
        <h1 className="hero__headline">
          India's Remote-First Digital Marketing Agency That Puts Your Business
          on Top of Google, Social Media, and Every Marketplace.
        </h1>
        <p className="hero__subheadline">
          We design stunning websites, run powerful SEO campaigns, manage your
          social media, and optimize your presence on Amazon, Flipkart, and
          Meesho — all from one trusted team.
        </p>
        <div className="hero__ctas">
          <a href="/contact" className="btn btn--yellow">
            Get a Free Strategy Call
          </a>
          <a href="/services" className="btn btn--outline">
            View Our Services
          </a>
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

    {/* Stats bar */}
    <div className="hero__stats">
      {stats.map((stat, i) => (
        <div className="hero__stat" key={i} data-aos="fade-up" data-aos-delay={i * 80}>
          <span className="hero__stat-value">{stat.value}</span>
          <span className="hero__stat-label">{stat.label}</span>
        </div>
      ))}
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

// ─── PAGE COMPONENT ───────────────────────────────────────────────────────────

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-cubic", once: true });
  }, []);

  return (
    <main className="home-page">
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <IndustriesSection />
      <CtaBanner />
    </main>
  );
};

export default Home;
