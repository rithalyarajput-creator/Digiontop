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
      <WhyUsSection />
      <IndustriesSection />
      <TestimonialsSection />
      <CtaBanner />
    </main>
  );
};

export default Home;
