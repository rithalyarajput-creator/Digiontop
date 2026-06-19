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
    image: "/images/service-web.png",
  },
  {
    icon: <FaSearch />,
    title: "SEO Services",
    description:
      "Data-driven on-page, off-page and technical SEO that pushes your brand to the top of Google search results and keeps it there.",
    link: "/services/seo-services",
    image: "/images/service-seo.png",
  },
  {
    icon: <FaBullhorn />,
    title: "Social Media Marketing",
    description:
      "Strategic content, paid ads and community management across Instagram, Facebook, LinkedIn and more — built to grow your audience.",
    link: "/services/social-media-marketing",
    image: "/images/service-social.png",
  },
  {
    icon: <FaShoppingCart />,
    title: "E-Commerce Solutions",
    description:
      "End-to-end marketplace management on Amazon, Flipkart and Meesho — from listing optimisation to sponsored ads and account health.",
    link: "/services/ecommerce-solutions",
    image: "/images/service-ecommerce.png",
  },
  {
    icon: <FaBullhorn />,
    title: "Ads & Campaigns",
    description:
      "Run high-converting Google Ads & Meta Ads, boost your reels for maximum reach, and turn clicks into real sales with data-driven ad campaigns.",
    link: "/contact",
    image: "/images/service-ads.png",
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
          <Link
            to={service.link}
            className="service-card"
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 80}
          >
            {service.image && (
              <img src={service.image} alt={service.title} className="service-card__float-img" />
            )}
            <h3 className="service-card__title">{service.title}</h3>
            <p className="service-card__desc">{service.description}</p>
          </Link>
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

const ORBIT_ITEMS = [
  {
    label: 'Website\nMarketing',
    svg: <svg viewBox="0 0 24 24" fill="#fff" width="26" height="26"><rect x="2" y="3" width="20" height="14" rx="2" stroke="#fff" strokeWidth="1.8" fill="none"/><path d="M8 21h8M12 17v4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/><path d="M6 8h4M6 11h8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/><circle cx="17" cy="9.5" r="2.5" stroke="#fff" strokeWidth="1.5" fill="none"/><path d="M15.5 14l1.5-2 1.5 2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>,
  },
  {
    label: 'SEO',
    svg: <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="1.6"/><ellipse cx="12" cy="12" rx="4" ry="10" stroke="#fff" strokeWidth="1.4"/><path d="M2 12h20M12 2C9 6 9 18 12 22M12 2c3 4 3 16 0 20" stroke="#fff" strokeWidth="1.4"/><text x="7.5" y="14" fill="#fff" fontSize="5" fontWeight="bold">SEO</text></svg>,
  },
  {
    label: 'Social Media\nMarketing',
    svg: <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><path d="M21 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zM21 18.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" stroke="#fff" strokeWidth="1.6"/><path d="M8.5 10.5l7-3.5M8.5 13.5l7 3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  },
  {
    label: 'PPC\nMarketing',
    svg: <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/><path d="M2 17l10 5 10-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12l10 5 10-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    label: 'Content\nMarketing',
    svg: <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><rect x="4" y="2" width="12" height="16" rx="2" stroke="#fff" strokeWidth="1.6"/><path d="M8 6h6M8 9h6M8 12h4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/><path d="M14 14l5 5M17.5 17.5l1.5 1.5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/><circle cx="17" cy="17" r="3" stroke="#fff" strokeWidth="1.4"/></svg>,
  },
  {
    label: 'Email\nMarketing',
    svg: <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><rect x="2" y="5" width="20" height="14" rx="2" stroke="#fff" strokeWidth="1.6"/><path d="M2 8l10 7 10-7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    label: 'Affiliate\nMarketing',
    svg: <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><circle cx="12" cy="5" r="2.5" stroke="#fff" strokeWidth="1.5"/><circle cx="5" cy="19" r="2.5" stroke="#fff" strokeWidth="1.5"/><circle cx="19" cy="19" r="2.5" stroke="#fff" strokeWidth="1.5"/><path d="M12 7.5v4M12 11.5L5 16.5M12 11.5L19 16.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  },
  {
    label: 'Video\nMarketing',
    svg: <svg viewBox="0 0 24 24" fill="none" width="26" height="26"><rect x="2" y="5" width="15" height="14" rx="2" stroke="#fff" strokeWidth="1.6"/><path d="M17 9l5-3v12l-5-3V9z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round"/><path d="M8 10l4 2.5-4 2.5V10z" fill="#fff"/></svg>,
  },
];

const DigitalOrbitSection = () => (
  <section className="orbit-section" data-aos="fade-up">
    <div className="orbit-section__inner">
      <p className="section-label" style={{ textAlign: 'center' }}>WHAT WE DO</p>
      <div className="orbit-wrap">
        {/* Rotating ring with icons */}
        <div className="orbit-ring">
          {ORBIT_ITEMS.map((item, i) => (
            <div
              key={i}
              className="orbit-dot"
              style={{ '--i': i, '--total': ORBIT_ITEMS.length }}
            >
              <div className="orbit-dot__circle">
                {item.svg}
              </div>
              <span className="orbit-dot__label">
                {item.label.split('\n').map((ln, j) => <span key={j}>{ln}<br /></span>)}
              </span>
            </div>
          ))}
        </div>

        {/* Center text */}
        <div className="orbit-center">
          <p className="orbit-center__line1">DIGITAL</p>
          <p className="orbit-center__line2">MARKETING</p>
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
          {display.map((t) => (
            <div key={t.id} className="tcard">
              {/* Blue ribbon banner with name */}
              <div className="tcard__ribbon">
                <span className="tcard__ribbon-name">{t.client_name}</span>
              </div>
              {/* Quote icon */}
              <div className="tcard__quote">”</div>
              {/* Stars */}
              <div className="tcard__stars">{'★'.repeat(t.rating || 5)}</div>
              {/* Text */}
              <p className="tcard__text">{t.testimonial_text}</p>
              {/* Role (small, below) */}
              {t.client_role && (
                <p className="tcard__role">{t.client_role}{t.client_location ? `, ${t.client_location}` : ''}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── OUR WORK ────────────────────────────────────────────────────────────────
const workCategories = [
  {
    key: "websites",
    label: "Websites & Web Apps",
    tag: "Web Development",
    title: "High-converting websites that sell",
    desc: "From eCommerce to business sites — we design custom, mobile-first websites that turn visitors into customers.",
    image: "/images/work/smile-dental.png",
  },
  {
    key: "ecommerce",
    label: "E-Commerce Stores",
    tag: "Online Stores",
    title: "Online stores built to grow",
    desc: "Shopify & WooCommerce stores with high-converting product pages, optimised for sales and scale.",
    image: "/images/work/blameless-skincare.png",
  },
  {
    key: "reels",
    label: "Reels & Video Content",
    tag: "Social Media",
    title: "Reels that stop the scroll",
    desc: "Short-form video content crafted to grab attention, build trust and drive real engagement.",
    image: "/images/work/post-1.jpg",
  },
  {
    key: "branding",
    label: "Finance & Branding",
    tag: "Branding & Design",
    title: "Brands people remember",
    desc: "Strong identities, landing pages and campaigns for finance, healthcare and growing businesses.",
    image: "/images/work/baid-finance.png",
  },
];

const OurWorkSection = () => {
  const [active, setActive] = useState(0);
  const cat = workCategories[active];

  return (
    <section className="ourwork" id="our-work">
      <div className="ourwork__inner">
        <div className="ourwork__head" data-aos="fade-up">
          <p className="section-label">OUR WORK</p>
          <h2 className="section-title">Brands We've Helped Grow</h2>
          <p className="section-subtitle">
            Pick a category to see the kind of results we deliver for our clients.
          </p>
        </div>

        <div className="ourwork__body">
          {/* LEFT — category buttons */}
          <div className="ourwork__tabs" data-aos="fade-right">
            {workCategories.map((c, i) => (
              <button
                key={c.key}
                className={`ourwork__tab${i === active ? " ourwork__tab--active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span>{c.label}</span>
                <span className="ourwork__tab-arrow">→</span>
              </button>
            ))}
          </div>

          {/* RIGHT — preview image + content */}
          <div className="ourwork__preview" data-aos="fade-left">
            <div className="ourwork__preview-media">
              <img src={cat.image} alt={cat.title} key={cat.key} />
              <span className="ourwork__preview-tag">{cat.tag}</span>
            </div>
            <div className="ourwork__preview-body">
              <h3 className="ourwork__preview-title">{cat.title}</h3>
              <p className="ourwork__preview-desc">{cat.desc}</p>
            </div>
          </div>
        </div>

        {/* Explore More → portfolio */}
        <div className="ourwork__cta" data-aos="fade-up">
          <Link to="/portfolio" className="ourwork__explore">
            Explore More Projects <span>→</span>
          </Link>
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
      <OurWorkSection />
      <IndustriesSection />
      <SocialReelsSection />
      <TestimonialsSection />
      <CtaBanner />
    </main>
  );
};

export default Home;
