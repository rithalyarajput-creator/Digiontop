import React, { useEffect, useState, useRef } from "react";
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
  FaArrowRight,
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
];

const HeroSection = () => (
  <section className="hero hero--banner">
    {/* Full-width banner image with text + buttons overlaid on top */}
    <img src="/images/home-banner.png" alt="DigionTop — Business Growth" className="hero__bg-img" />
    <div className="hero__overlay" />
    <div className="hero__banner-content" data-aos="fade-up">
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

      <div className="hero__stats-row">
        {heroStats.map((s, i) => (
          <div className="hero__stat-item" key={i}>
            <span className="hero__stat-val">{s.value}</span>
            <span className="hero__stat-lbl">{s.label}</span>
          </div>
        ))}
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
  <section className="whyx">
    <div className="container whyx__inner">
      {/* LEFT — sticky intro */}
      <div className="whyx__left" data-aos="fade-right">
        <p className="section-label">WHY CHOOSE US</p>
        <h2 className="whyx__title">The DigionTop Difference</h2>
        <p className="whyx__lead">
          We don't just run campaigns — we build a transparent, results-first
          partnership your business can actually rely on.
        </p>
        <Link to="/why-us" className="whyx__cta">
          See all 8 reasons <FaArrowRight />
        </Link>
        <div className="whyx__badge-row">
          <div className="whyx__badge"><b>5.0★</b><span>Client Rating</span></div>
          <div className="whyx__badge"><b>100+</b><span>Projects</span></div>
        </div>
      </div>

      {/* RIGHT — numbered reason list */}
      <div className="whyx__list">
        {whyUs.map((item, i) => (
          <div className="whyx__row" key={i} data-aos="fade-up" data-aos-delay={i * 90}>
            <div className="whyx__num">{String(i + 1).padStart(2, '0')}</div>
            <div className="whyx__icon">{item.icon}</div>
            <div className="whyx__body">
              <h3 className="whyx__row-title">{item.title}</h3>
              <p className="whyx__row-desc">{item.description}</p>
            </div>
            <FaArrowRight className="whyx__arrow" />
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

const FALLBACK_TESTIMONIALS = [
  { id: 1, client_name: 'Rajesh Sharma', client_role: 'E-Commerce Seller', client_location: 'Delhi', testimonial_text: 'DigionTop completely transformed our Amazon listings. Within three months our products were ranking on page one and organic sales doubled!', rating: 5 },
  { id: 2, client_name: 'Priya Mehta', client_role: 'Wellness Studio Owner', client_location: 'Bangalore', testimonial_text: 'Within four months we were ranking for every major keyword. New client enquiries went up by over 60% — incredible results!', rating: 5 },
  { id: 3, client_name: 'Ankur Gupta', client_role: 'Restaurant Owner', client_location: 'Jaipur', testimonial_text: 'In six months we crossed 4,200 Instagram followers and customers started walking in specifically because they found us online.', rating: 5 },
  { id: 4, client_name: 'Sneha Reddy', client_role: 'Boutique Founder', client_location: 'Hyderabad', testimonial_text: 'Their team built us a stunning Shopify store that loads fast and converts. Our online orders tripled within the first quarter!', rating: 5 },
  { id: 5, client_name: 'Vikram Singh', client_role: 'Real Estate Agency', client_location: 'Mumbai', testimonial_text: 'The paid ad campaigns brought us qualified leads at half the cost we used to pay. Genuinely the best marketing partner we have worked with.', rating: 5 },
  { id: 6, client_name: 'Meera Iyer', client_role: 'D2C Brand Owner', client_location: 'Chennai', testimonial_text: 'From branding to social media, they handled everything. Our Instagram engagement is up 5x and our brand finally looks premium.', rating: 5 },
];

const TestimonialsSection = () => {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);
  const pauseRef = useRef(false);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(r => r.json())
      .then(d => setItems(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  const display = items.length > 0 ? items : FALLBACK_TESTIMONIALS;

  // how many cards fit per "page" (matches CSS: 3 desktop / 2 / 1)
  const perPage = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  };
  const pageCount = Math.max(1, Math.ceil(display.length / perPage()));

  const goTo = (page) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('.tcard');
    const step = card ? (card.offsetWidth + 28) * perPage() : el.clientWidth;
    el.scrollTo({ left: step * page, behavior: 'smooth' });
    setActive(page);
  };

  // Auto-slide every 4s (pauses on hover)
  useEffect(() => {
    const id = setInterval(() => {
      if (pauseRef.current) return;
      setActive((prev) => {
        const next = (prev + 1) % pageCount;
        const el = trackRef.current;
        if (el) {
          const card = el.querySelector('.tcard');
          const step = card ? (card.offsetWidth + 28) * perPage() : el.clientWidth;
          el.scrollTo({ left: step * next, behavior: 'smooth' });
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(id);
  }, [pageCount]);

  // Keep active dot in sync when user swipes manually
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('.tcard');
    const step = card ? (card.offsetWidth + 28) * perPage() : el.clientWidth;
    setActive(Math.round(el.scrollLeft / step));
  };

  return (
    <section className="home-testimonials" data-aos="fade-up">
      <div className="container">
        <p className="section-label">CLIENT STORIES</p>
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Real results from real Indian businesses.</p>

        <div
          className="home-testimonials__track"
          ref={trackRef}
          onScroll={onScroll}
          onMouseEnter={() => { pauseRef.current = true; }}
          onMouseLeave={() => { pauseRef.current = false; }}
        >
          {display.map((t) => (
            <div key={t.id} className="tcard">
              <div className="tcard__ribbon">
                <span className="tcard__ribbon-name">{t.client_name}</span>
              </div>
              <div className="tcard__quote">”</div>
              <div className="tcard__stars">{'★'.repeat(t.rating || 5)}</div>
              <p className="tcard__text">{t.testimonial_text}</p>
              {t.client_role && (
                <p className="tcard__role">{t.client_role}{t.client_location ? `, ${t.client_location}` : ''}</p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom-center dots */}
        <div className="tslide__dots">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              className={`tslide__dot${i === active ? ' tslide__dot--active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── OUR WORK ────────────────────────────────────────────────────────────────
const showcaseSites = [
  {
    key: "amshine",
    title: "Amshine Jewels",
    tag: "Jewellery E-Commerce",
    url: "amshinejewels.com",
    image: "/images/work/amshine-jewels.png",
  },
  {
    key: "stressless",
    title: "Stressless Learner",
    tag: "Education Platform",
    url: "stresslesslearner.com",
    image: "/images/work/stressless-learner.png",
  },
  {
    key: "toreto",
    title: "Toreto",
    tag: "Electronics E-Commerce",
    url: "toreto.in",
    image: "/images/work/toreto.png",
  },
];

const showcasePosts = [
  { key: 'p1', title: 'Jhumka Collection', tag: 'Product Creative', image: '/images/work/creative-jhumka.jpg' },
  { key: 'p2', title: 'Sunscreen Awareness', tag: 'Creative Post', image: '/images/work/blameless-post.png' },
  { key: 'p3', title: 'Maha Vir Jayanti', tag: 'Festival Reel', video: '/images/work/mahavir-jayanti.mp4' },
];

const showcaseReels = [
  { key: 'r1', video: '/images/work/reel-1.mp4' },
  { key: 'r2', video: '/images/work/reel-2.mp4' },
];

const WORK_TABS = [
  { key: 'websites', label: 'Websites' },
  { key: 'graphics', label: 'Graphics' },
  { key: 'reels', label: 'Reels' },
];

const OurWorkSection = () => {
  const [tab, setTab] = useState('websites');

  return (
    <section className="showcase" id="our-work">
      <div className="container">
        <div className="showcase__head" data-aos="fade-up">
          <p className="section-label showcase__label">OUR WORK</p>
          <h2 className="section-title showcase__title-h">Work We're Proud Of</h2>
          <p className="section-subtitle showcase__sub">
            Websites, creatives and reels — real projects we've delivered for real brands.
          </p>
        </div>

        {/* Tabs */}
        <div className="showcase__tabs" data-aos="fade-up">
          {WORK_TABS.map((t) => (
            <button
              key={t.key}
              className={`showcase__tab${tab === t.key ? ' showcase__tab--active' : ''}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* WEBSITES */}
        {tab === 'websites' && (
          <div className="showcase__grid">
            {showcaseSites.map((s, i) => (
              <div className="showcase__card" key={s.key} data-aos="fade-up" data-aos-delay={(i % 3) * 90}>
                <div className="showcase__window">
                  <img src={s.image} alt={s.title} className="showcase__shot" loading="lazy" />
                </div>
                <div className="showcase__caption">
                  <div>
                    <span className="showcase__title">{s.title}</span>
                    <span className="showcase__tag">{s.tag}</span>
                  </div>
                  <span className="showcase__arrow"><FaArrowRight /></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* GRAPHICS / POSTS */}
        {tab === 'graphics' && (
          <div className="showcase__grid showcase__grid--posts">
            {showcasePosts.map((p, i) => (
              <div className="showcase__card" key={p.key} data-aos="fade-up" data-aos-delay={(i % 3) * 90}>
                <div className="showcase__post">
                  {p.video
                    ? <video src={p.video} muted loop playsInline autoPlay preload="metadata" />
                    : <img src={p.image} alt={p.title} loading="lazy" />}
                  <span className="showcase__shine" />
                </div>
                <div className="showcase__caption">
                  <div>
                    <span className="showcase__title">{p.title}</span>
                    <span className="showcase__tag">{p.tag}</span>
                  </div>
                  <span className="showcase__arrow"><FaArrowRight /></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* REELS */}
        {tab === 'reels' && (
          <div className="showcase__grid showcase__grid--reels">
            {showcaseReels.map((r, i) => (
              <div className="showcase__reel" key={r.key} data-aos="fade-up" data-aos-delay={(i % 3) * 90}>
                <video src={r.video} muted loop playsInline autoPlay preload="metadata" />
              </div>
            ))}
          </div>
        )}

        <div className="showcase__cta" data-aos="fade-up">
          <Link to="/portfolio" className="showcase__explore">
            View All Projects <FaArrowRight />
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
