// WebsiteDevelopment.jsx
// Install deps if not present:
//   npm install react-icons aos
// Then in main.jsx/main.tsx add:
//   import 'aos/dist/aos.css'
//   import AOS from 'aos'; AOS.init({ duration: 700, once: true });

import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

import {
  FiMonitor,
  FiShoppingCart,
  FiZap,
  FiSmartphone,
  FiCode,
  FiLayout,
  FiSettings,
  FiCheck,
  FiArrowRight,
} from 'react-icons/fi'
import {
  HiOutlineChartBar,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineSearchCircle,
  HiOutlineColorSwatch,
  HiOutlineCursorClick,
} from 'react-icons/hi'
import { RiRocketLine } from 'react-icons/ri'
import { BsSpeedometer2 } from 'react-icons/bs'
import { MdOutlineAutoGraph } from 'react-icons/md'
import '../styles/Services.css'

/* ── Data ── */
const WHAT_WE_BUILD = [
  {
    icon: <FiMonitor size={26} />,
    iconBg: '#EBF2FF',
    iconColor: '#1A56DB',
    title: 'Corporate & Business Websites',
    desc: 'Professional, trust-building websites that position your brand as the authority in your niche and convert visitors into enquiries.',
    features: ['Custom UI/UX design', 'Brand-aligned visual language', 'Lead-capture forms & live chat', 'Multi-language support'],
  },
  {
    icon: <FiShoppingCart size={26} />,
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
    title: 'E-Commerce Stores',
    desc: 'High-converting online stores with streamlined checkout flows, inventory management, and payment gateway integration.',
    features: ['WooCommerce / Shopify builds', 'Product filtering & search', 'Abandoned cart recovery', 'Payment gateway setup'],
  },
  {
    icon: <FiLayout size={26} />,
    iconBg: '#F5F3FF',
    iconColor: '#7C3AED',
    title: 'Landing Pages & Funnels',
    desc: 'Laser-focused landing pages engineered for one goal — maximum conversion — whether it is leads, sign-ups, or sales.',
    features: ['A/B test-ready architecture', 'Heatmap & analytics ready', 'CRM integration', 'Fast load < 2s'],
  },
  {
    icon: <FiSmartphone size={26} />,
    iconBg: '#F0FDF4',
    iconColor: '#059669',
    title: 'Progressive Web Apps (PWA)',
    desc: 'App-like experiences on the web — offline-capable, installable, and blazing fast across every device and connection speed.',
    features: ['Service worker setup', 'Push notification support', 'Offline first architecture', 'App-store quality UX'],
  },
  {
    icon: <FiCode size={26} />,
    iconBg: '#FFF0F6',
    iconColor: '#DB2777',
    title: 'Custom Web Applications',
    desc: 'Tailor-made web platforms — dashboards, portals, SaaS tools, booking systems — built to your exact workflow.',
    features: ['React / Next.js front-end', 'Node.js / Python back-end', 'REST & GraphQL APIs', 'Role-based access control'],
  },
  {
    icon: <FiSettings size={26} />,
    iconBg: '#F0F9FF',
    iconColor: '#0891B2',
    title: 'WordPress & CMS Sites',
    desc: 'Flexible, easy-to-manage WordPress sites with custom themes, plugins, and full SEO readiness out of the box.',
    features: ['Custom theme development', 'Plugin configuration & hardening', 'Elementor / Gutenberg ready', 'Staff training included'],
  },
  {
    icon: <BsSpeedometer2 size={26} />,
    iconBg: '#FFF8F0',
    iconColor: '#F97316',
    title: 'Website Redesign & Speed Optimisation',
    desc: 'Transform slow, outdated websites into lightning-fast, modern experiences that Google loves and users trust.',
    features: ['Core Web Vitals audit & fix', 'Image & asset optimisation', 'CDN & caching setup', 'Code splitting & lazy loading'],
  },
]

const WHY_RANK_CONVERT = [
  {
    icon: <HiOutlineLightningBolt size={20} />,
    label: 'Core Web Vitals Pass',
    detail: 'LCP < 2.5s, CLS < 0.1, FID < 100ms on every page we ship.',
  },
  {
    icon: <HiOutlineSearchCircle size={20} />,
    label: 'SEO Architecture Built-In',
    detail: 'Semantic HTML, schema markup, sitemap, robots.txt, and canonical tags configured from day one.',
  },
  {
    icon: <FiSmartphone size={20} />,
    label: 'Mobile-First by Default',
    detail: 'Designed on the smallest screen first — every breakpoint is pixel-perfect on any device.',
  },
  {
    icon: <HiOutlineShieldCheck size={20} />,
    label: 'HTTPS & Security Hardened',
    detail: 'SSL, HSTS, CSP headers, input sanitisation, and regular dependency audits keep your site safe.',
  },
  {
    icon: <HiOutlineChartBar size={20} />,
    label: 'Conversion-Optimised UX',
    detail: 'CTA placement, colour psychology, and trust signals are engineered to push visitors toward action.',
  },
  {
    icon: <HiOutlineColorSwatch size={20} />,
    label: 'Brand-Consistent Design',
    detail: 'Every pixel reflects your brand guidelines — typography, colours, and tone of voice stay cohesive.',
  },
  {
    icon: <HiOutlineCursorClick size={20} />,
    label: 'Analytics & Tracking Ready',
    detail: 'GA4, Meta Pixel, LinkedIn Insight, and GTM containers configured before launch.',
  },
  {
    icon: <MdOutlineAutoGraph size={20} />,
    label: 'Scalable & Maintainable Code',
    detail: 'Component-based architecture means adding pages or features never breaks existing functionality.',
  },
]

/* ── Component ── */
export default function WebsiteDevelopment() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 })
  }, [])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="svc-hero svc-hero--dark">
        <div className="svc-hero__blob svc-hero__blob--1" />
        <div className="svc-hero__blob svc-hero__blob--2" />

        <div className="container">
          <div className="svc-hero__inner" data-aos="fade-up">
            <div className="svc-hero__tag">
              <RiRocketLine size={13} /> Web Design & Development
            </div>

            <h1 className="svc-hero__title svc-hero__title--white">
              Websites That{' '}
              <span className="gradient-text">Rank, Convert</span>
              <br />& Scale With You
            </h1>

            <p className="svc-hero__subtitle svc-hero__subtitle--muted-white">
              We design and develop high-performance websites that attract organic traffic,
              build trust in seconds, and turn every visitor into a paying customer.
            </p>

            <div className="svc-hero__actions">
              <Link to="/contact" className="btn btn-yellow">
                Start Your Project <FiArrowRight size={16} />
              </Link>
              <Link to="/portfolio" className="btn btn-ghost">
                View Our Work
              </Link>
            </div>

            {/* Stats */}
            <div className="svc-hero__stats" data-aos="fade-up" data-aos-delay="150">
              {[
                { num: '300+', label: 'Sites Delivered' },
                { num: '< 2s', label: 'Avg Load Time' },
                { num: '98%', label: 'Client Satisfaction' },
                { num: '5x', label: 'Avg Conversion Lift' },
              ].map((s) => (
                <div key={s.num} style={{ textAlign: 'center' }}>
                  <div className="svc-hero__stat-num">{s.num}</div>
                  <div className="svc-hero__stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Build ────────────────────────────────── */}
      <section className="section svc-section--white">
        <div className="container">
          <div className="svc-section-header" data-aos="fade-up">
            <span className="section-tag">What We Build</span>
            <div className="divider divider-center" />
            <h2 className="h2" style={{ marginTop: '20px', marginBottom: '14px' }}>
              Every Type of Web Presence, Done Right
            </h2>
            <p className="body-md" style={{ maxWidth: '560px', margin: '0 auto' }}>
              From simple brochure sites to complex SaaS platforms — we build digital products
              that are fast, accessible, and built to grow.
            </p>
          </div>

          <div className="svc-cards-grid">
            {WHAT_WE_BUILD.map((item, i) => (
              <div
                key={item.title}
                className="svc-card"
                data-aos="fade-up"
                data-aos-delay={i * 60}
              >
                <div
                  className="svc-card__icon-wrap"
                  style={{ background: item.iconBg, color: item.iconColor }}
                >
                  {item.icon}
                </div>
                <h3 className="svc-card__title">{item.title}</h3>
                <p className="svc-card__desc">{item.desc}</p>
                <ul className="svc-card__features">
                  {item.features.map((f) => (
                    <li key={f} className="svc-card__feature">
                      <FiCheck
                        className="svc-card__feature-icon"
                        size={14}
                        color={item.iconColor}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Our Websites Rank & Convert ─────────────── */}
      <section className="section svc-section--dark">
        <div className="container">
          <div className="svc-section-header" data-aos="fade-up">
            <span className="section-tag" style={{ background: '#EBF2FF', color: '#1A56DB' }}>
              Our Advantage
            </span>
            <div className="divider divider-center" />
            <h2 className="h2" style={{ marginTop: '20px', marginBottom: '14px' }}>
              Why Our Websites Rank &amp; Convert
            </h2>
            <p className="body-md" style={{ maxWidth: '540px', margin: '0 auto' }}>
              Beautiful design is just the start. Every site we ship is optimised for search
              engines, speed, and conversions from the first line of code.
            </p>
          </div>

          <div className="svc-checklist-grid">
            {WHY_RANK_CONVERT.map((item, i) => (
              <div
                key={item.label}
                className="svc-checklist-item"
                data-aos="fade-up"
                data-aos-delay={i * 70}
              >
                <div className="svc-checklist-icon">
                  <span style={{ color: '#1A56DB' }}>{item.icon}</span>
                </div>
                <div className="svc-checklist-text">
                  <strong>{item.label}</strong>
                  <span>{item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────────────── */}
      <section className="svc-cta">
        <div className="container">
          <div className="svc-cta__inner" data-aos="zoom-in">
            <div className="svc-cta__blob svc-cta__blob--1" />
            <div className="svc-cta__blob svc-cta__blob--2" />
            <div className="svc-cta__content">
              <div className="svc-cta__badge">
                <FiZap size={12} /> Limited Project Slots
              </div>
              <h2 className="svc-cta__title">
                Ready to Launch a Website<br />That Actually Works?
              </h2>
              <p className="svc-cta__subtitle">
                Book a free 30-minute discovery call. We will audit your current site,
                identify quick wins, and outline a custom build plan — no obligation.
              </p>
              <div className="svc-cta__actions">
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '14px 30px', borderRadius: '12px', background: '#F97316',
                    color: '#fff', fontWeight: 700, fontSize: '15px', textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(249,115,22,0.4)', transition: 'background 0.2s',
                  }}
                >
                  Get a Free Website Audit <FiArrowRight size={17} />
                </Link>
                <Link to="/portfolio" className="btn btn-ghost" style={{ fontSize: '15px', padding: '14px 30px' }}>
                  See Past Projects
                </Link>
              </div>
              <div className="svc-cta__trust">
                <span>No commitment</span>
                <span>100% Free</span>
                <span>Reply within 24 hrs</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
