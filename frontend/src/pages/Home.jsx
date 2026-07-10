import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import SocialReelsSection from "../components/SocialReelsSection";
import ServiceFaq from "../components/ServiceFaq";
import Seo from "../components/Seo";
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
  FaComments,
  FaPencilRuler,
  FaRocket,
  FaChartBar,
  FaTrophy,
  FaThumbsUp,
  FaMobileAlt,
  FaPalette,
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
    image: "/images/service-web.webp",
  },
  {
    icon: <FaSearch />,
    title: "SEO Services",
    description:
      "Data-driven on-page, off-page and technical SEO that pushes your brand to the top of Google search results and keeps it there.",
    link: "/services/seo-services",
    image: "/images/service-seo.webp",
  },
  {
    icon: <FaBullhorn />,
    title: "Social Media Marketing",
    description:
      "Strategic content, paid ads and community management across Instagram, Facebook, LinkedIn and more — built to grow your audience.",
    link: "/services/social-media-marketing",
    image: "/images/service-social.webp",
  },
  {
    icon: <FaShoppingCart />,
    title: "E-Commerce Solutions",
    description:
      "End-to-end marketplace management on Amazon, Flipkart and Meesho — from listing optimisation to sponsored ads and account health.",
    link: "/services/ecommerce-solutions",
    image: "/images/service-ecommerce.webp",
  },
  {
    icon: <FaBullhorn />,
    title: "Ads & Campaigns",
    description:
      "Run high-converting Google Ads & Meta Ads, boost your reels for maximum reach, and turn clicks into real sales with data-driven ad campaigns.",
    link: "/contact",
    image: "/images/service-ads.webp",
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
  { label: "Retail & E-Commerce", icon: <FaStore />, desc: "Online stores that turn browsers into buyers." },
  { label: "Restaurants & Food", icon: <FaUtensils />, desc: "Menus, orders & local reach that fill tables." },
  { label: "Healthcare & Clinics", icon: <FaHeartbeat />, desc: "Trust-building sites that book more patients." },
  { label: "Education & Coaching", icon: <FaGraduationCap />, desc: "Enroll more students with a strong presence." },
  { label: "Fashion & Beauty", icon: <FaTshirt />, desc: "Scroll-stopping brand visuals that convert." },
  { label: "Real Estate", icon: <FaBuilding />, desc: "Lead-driven sites that showcase properties." },
];

const processSteps = [
  { icon: <FaComments />, title: "Discovery Call", desc: "We learn your business, goals and audience — then map the fastest path to growth." },
  { icon: <FaPencilRuler />, title: "Strategy & Design", desc: "A tailored plan plus designs built to convert — approved by you before we build." },
  { icon: <FaRocket />, title: "Build & Launch", desc: "We develop, test and launch — websites, campaigns and content that go live fast." },
  { icon: <FaChartBar />, title: "Grow & Optimise", desc: "We track real KPIs and keep improving — more traffic, leads and revenue every month." },
];

const stats = [
  { value: "200+", label: "Clients Served" },
  { value: "500+", label: "Projects Delivered" },
  { value: "5+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
];

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

const heroStats = [
  { value: "500+", label: "Happy Clients", icon: <FaHandshake /> },
  { value: "2X+", label: "Average Growth", icon: <FaChartLine /> },
  { value: "#1", label: "Client Satisfaction", icon: <FaTrophy /> },
];

const HeroSection = () => (
  <section className="hero hero--bgimg">
    {/* full designed image as the background */}
    <img src="/images/home-banner.webp" alt="DigionTop — #1 Digital Marketing Agency in India" className="hero__bgimg" />
    <div className="hero__bgimg-shade" aria-hidden="true" />

    {/* Animated orbit overlay — desktop only */}
    <div className="hero__orbit-overlay">
      <div className="hero__orbit-ring">
        {ORBIT_ITEMS.map((item, i) => (
          <div
            key={i}
            className="hero__orbit-dot"
            style={{ '--i': i, '--total': ORBIT_ITEMS.length }}
          >
            <div className="hero__orbit-dot__circle">
              {item.svg}
            </div>
            <span className="hero__orbit-dot__label">
              {item.label.split('\n').map((ln, j) => <span key={j}>{ln}{j < item.label.split('\n').length - 1 && <br />}</span>)}
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="container hero__bgimg-inner">
      {/* text + buttons on the LEFT (dark) area of the image */}
      <div className="hero__bgimg-text" data-aos="fade-right">
        <div className="hero__badge">
          <span className="hero__badge-star">★</span> #1 Digital Marketing Agency
        </div>
        <h1 className="hero__headline">
          Stay On <span className="hero__headline--yellow">Top.</span>
        </h1>
        <p className="hero__subheadline">
          We Help Brands Rank Higher, Grow Faster &amp; Generate{' '}
          <span className="hero__subheadline--yellow">More Revenue.</span>
        </p>
        <p className="hero__lead">
          From websites and SEO to social media, ads and e-commerce — one full-service
          digital agency that puts your brand #1 on Google and across social media.
        </p>
        <div className="hero__ctas">
          <Link to="/contact" className="btn btn--yellow hero__btn-call">
            Get Free Consultation
          </Link>
          <Link to="/portfolio" className="btn btn--outline hero__btn-services">
            <span className="hero__btn-arrow">↗</span> View Our Work
          </Link>
        </div>

        <div className="hero__stats-row">
          {heroStats.map((s, i) => (
            <div className="hero__stat-item" key={i}>
              {s.icon && <span className="hero__stat-icon">{s.icon}</span>}
              <span className="hero__stat-val">{s.value}</span>
              <span className="hero__stat-lbl">{s.label}</span>
            </div>
          ))}
        </div>
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
  <section className="inds" id="industries">
    <div className="inds__bg" aria-hidden="true" />
    <div className="container inds__inner">
      <div className="inds__head" data-aos="fade-up">
        <span className="inds__eyebrow"><span className="inds__eyebrow-dot" /> Industries We Serve</span>
        <h2 className="inds__title">Built for Businesses Across <span>Every Sector</span></h2>
        <p className="inds__sub">Whatever your field, we craft a digital strategy that fits it — and helps you outgrow the competition.</p>
      </div>

      <div className="inds__grid">
        {industries.map((ind, i) => (
          <article
            className="inds__card"
            key={i}
            data-aos="fade-up"
            data-aos-delay={(i % 3) * 90}
          >
            <span className="inds__card-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="inds__card-icon">{ind.icon}</span>
            <h3 className="inds__card-title">{ind.label}</h3>
            <p className="inds__card-desc">{ind.desc}</p>
            <span className="inds__card-arrow"><FaArrowRight /></span>
          </article>
        ))}
      </div>

      <div className="inds__foot" data-aos="fade-up">
        <span>Don’t see your industry?</span>
        <Link to="/contact" className="inds__foot-link">We work with all of them — let’s talk <FaArrowRight /></Link>
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="proc" id="how-we-work">
    <div className="container">
      <div className="proc__head" data-aos="fade-up">
        <span className="proc__eyebrow"><span className="proc__eyebrow-dot" /> How We Work</span>
        <h2 className="proc__title">From Idea to Impact in <span>4 Simple Steps</span></h2>
        <p className="proc__sub">A clear, proven process — no confusion, no surprises. Just results you can measure.</p>
      </div>

      <div className="proc__track">
        {processSteps.map((step, i) => (
          <div className="proc__step" key={i} data-aos="fade-up" data-aos-delay={i * 110}>
            <div className="proc__step-top">
              <span className="proc__step-num">{String(i + 1).padStart(2, '0')}</span>
              <span className="proc__step-icon">{step.icon}</span>
            </div>
            <h3 className="proc__step-title">{step.title}</h3>
            <p className="proc__step-desc">{step.desc}</p>
            {i < processSteps.length - 1 && <span className="proc__connector" aria-hidden="true" />}
          </div>
        ))}
      </div>

      <div className="proc__cta" data-aos="zoom-in">
        <div>
          <h3>Ready to start your growth journey?</h3>
          <p>Book a free strategy call — we’ll show you exactly where to begin.</p>
        </div>
        <Link to="/contact" className="proc__cta-btn">Get Started Free <FaArrowRight /></Link>
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
    label: 'SEO &\nSearch Marketing',
    svg: <FaSearch />,
  },
  {
    label: 'PPC &\nPaid Advertising',
    svg: <FaRocket />,
  },
  {
    label: 'Social Media &\nContent',
    svg: <FaThumbsUp />,
  },
  {
    label: 'Web\nDevelopment',
    svg: <FaCode />,
  },
  {
    label: 'Mobile &\nSoftware',
    svg: <FaMobileAlt />,
  },
  {
    label: 'E-Commerce\nSolutions',
    svg: <FaShoppingCart />,
  },
  {
    label: 'Creative &\nBranding',
    svg: <FaPalette />,
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
              <div className="orbit-dot__connector" aria-hidden="true" />
              <span className="orbit-dot__label">
                {item.label.split('\n').map((ln, j) => <span key={j}>{ln}{j < item.label.split('\n').length - 1 && <br />}</span>)}
              </span>
            </div>
          ))}
        </div>

        {/* Center astronaut area */}
        <div className="orbit-center">
          <p className="orbit-center__line1">OUR</p>
          <p className="orbit-center__line2">SERVICES</p>
        </div>
      </div>
    </div>
  </section>
);

// SocialReelsSection is now a shared component (imported at top)

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
    image: "/images/work/amshine-jewels.webp",
  },
  {
    key: "stressless",
    title: "Stressless Learner",
    tag: "Education Platform",
    url: "stresslesslearner.com",
    image: "/images/work/stressless-learner.webp",
  },
  {
    key: "rithala",
    title: "Rithala Village",
    tag: "Information & Community",
    url: "",
    image: "/images/work/rithala-village.webp",
  },
];

const showcasePosts = [
  { key: 'p1', title: 'Jhumka Collection', tag: 'Product Creative', image: '/images/work/creative-jhumka.webp' },
  { key: 'p2', title: 'Sunscreen Awareness', tag: 'Creative Post', image: '/images/work/post-1.webp' },
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

const HOME_FAQS = [
  { q: 'What services does DigionTop offer?', a: 'We are a full-service digital marketing agency — websites & Shopify stores, social media & reels, SEO, paid ads (Google/Meta), branding, and e-commerce marketplace management. One team handles your entire digital presence.' },
  { q: 'How soon can we get started?', a: 'Usually within 2–3 days of your consultation. We start with a discovery call, map a custom strategy, and begin execution — keeping you updated at every milestone.' },
  { q: 'Do you work with small businesses and startups?', a: 'Absolutely. From new startups to growing brands, we tailor our plans to your budget and goals. No project is too small — we grow with you.' },
  { q: 'How much do your services cost?', a: 'Pricing depends on your goals and the services you need. We offer flexible, transparent packages with no long-term lock-ins. Book a free consultation and we\'ll share a clear quote.' },
  { q: 'Will I get regular reports on results?', a: 'Yes — you receive clear, plain-language reports so you always know exactly where your budget goes and what results it\'s driving. Full transparency, always.' },
  { q: 'Do you offer a free consultation?', a: 'Yes! We offer a free, no-obligation strategy consultation. Fill the form and we\'ll reply within one business day with a clear plan to grow your business.' },
];

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-out-cubic", once: true });
  }, []);

  return (
    <main className="home-page">
      <Seo
        title="DigionTop — #1 Digital Marketing Agency in India"
        description="Rank higher & grow faster with DigionTop — India's full-service digital marketing agency. Websites, SEO, social media, ads & e-commerce. Get a free strategy call today!"
        path="/"
      />
      <HeroSection />
      <ServicesSection />
      <WhyUsSection />
      <OurWorkSection />
      <IndustriesSection />
      <ProcessSection />
      <TestimonialsSection />
      <ServiceFaq service="Digital Marketing" faqs={HOME_FAQS} />
      <CtaBanner />
    </main>
  );
};

export default Home;
