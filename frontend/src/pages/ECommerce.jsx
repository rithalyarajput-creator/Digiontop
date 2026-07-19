// ECommerce.jsx
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
  FiShoppingCart,
  FiCreditCard,
  FiPackage,
  FiTrendingUp,
  FiBarChart2,
  FiSearch,
  FiMail,
  FiSettings,
  FiArrowRight,
  FiZap,
  FiCheck,
  FiStar,
  FiRefreshCw,
  FiShield,
} from 'react-icons/fi'
import {
  HiOutlineTag,
  HiOutlineDeviceMobile,
  HiOutlineLightningBolt,
} from 'react-icons/hi'
import { RiStore2Line, RiShoppingBag3Line } from 'react-icons/ri'
import { MdOutlineAutoGraph, MdOutlineInventory2 } from 'react-icons/md'
import { SiShopify, SiWoocommerce } from 'react-icons/si'
import ServiceWork from '../components/ServiceWork'
import '../styles/Services.css'

/* ── E-Commerce Service Types ── */
const ECOMMERCE_SERVICES = [
  {
    icon: <RiStore2Line size={26} />,
    iconBg: '#FEF3C7',
    iconColor: '#D97706',
    title: 'Custom E-Commerce Store Development',
    desc: 'Fully bespoke online stores designed from scratch around your brand, product catalogue, and customer journey, no cookie-cutter templates.',
    features: ['Custom UI/UX design', 'Scalable product catalogue', 'Wishlist & comparison features', 'Multi-currency & multi-lingual'],
  },
  {
    icon: <SiShopify size={26} />,
    iconBg: '#F0FDF4',
    iconColor: '#96bf48',
    title: 'Shopify Development & Migration',
    desc: 'Expert Shopify store builds, theme customisation, and seamless migrations from any platform, with zero downtime and full data integrity.',
    features: ['Custom Shopify theme development', 'App integration & customisation', 'Platform migration (WooCommerce, Magento)', 'Shopify Plus solutions'],
  },
  {
    icon: <SiWoocommerce size={26} />,
    iconBg: '#F5F3FF',
    iconColor: '#7C3AED',
    title: 'WooCommerce Development',
    desc: 'Powerful WooCommerce stores on WordPress with custom plugins, advanced product types, and full control over every feature.',
    features: ['Custom WooCommerce theme', 'Variable & subscription products', 'Custom checkout & cart flows', 'Bulk product import/export'],
  },
  {
    icon: <FiCreditCard size={26} />,
    iconBg: '#EBF2FF',
    iconColor: '#1A56DB',
    title: 'Payment Gateway Integration',
    desc: 'Seamless, secure payment setup with every major gateway, Razorpay, Stripe, PayPal, UPI, BNPL, reducing friction at checkout.',
    features: ['Razorpay & Stripe setup', 'UPI & net banking (India)', 'Buy Now Pay Later (BNPL)', 'Auto-refund & webhook config'],
  },
  {
    icon: <FiSearch size={26} />,
    iconBg: '#F0F9FF',
    iconColor: '#0891B2',
    title: 'E-Commerce SEO',
    desc: 'Rank product and category pages for high-intent buyer keywords, driving organic traffic that converts without ongoing ad spend.',
    features: ['Product schema & rich snippets', 'Category page optimisation', 'Faceted URL management', 'Keyword-to-page mapping'],
  },
  {
    icon: <HiOutlineDeviceMobile size={26} />,
    iconBg: '#FFF0F6',
    iconColor: '#DB2777',
    title: 'Mobile Commerce Optimisation',
    desc: 'Mobile-first shopping experience with thumb-friendly navigation, one-tap checkout, and Google Core Web Vitals compliance on all devices.',
    features: ['Mobile-first checkout flow', 'One-tap payment (Google/Apple Pay)', 'PWA / app-like experience', 'AMP product pages'],
  },
  {
    icon: <FiMail size={26} />,
    iconBg: '#FFF8F0',
    iconColor: '#F97316',
    title: 'E-Commerce Email & Automation',
    desc: 'Revenue-generating email flows, abandoned cart recovery, post-purchase sequences, back-in-stock alerts, and VIP loyalty campaigns.',
    features: ['Abandoned cart recovery series', 'Welcome & onboarding flows', 'Win-back campaigns', 'Klaviyo / Mailchimp integration'],
  },
  {
    icon: <MdOutlineAutoGraph size={26} />,
    iconBg: '#F0FDF4',
    iconColor: '#059669',
    title: 'Conversion Rate Optimisation (CRO)',
    desc: 'Data-driven testing of product pages, CTAs, checkout steps, and trust signals to squeeze more revenue from your existing traffic.',
    features: ['Heatmap & session recording analysis', 'A/B & multivariate testing', 'Checkout funnel optimisation', 'Trust signal implementation'],
  },
  {
    icon: <MdOutlineInventory2 size={26} />,
    iconBg: '#F0F9FF',
    iconColor: '#0891B2',
    title: 'Inventory & Order Management',
    desc: 'Integrate your store with ERPs, WMS, or fulfilment partners for real-time stock sync, automated order routing, and returns processing.',
    features: ['ERP / WMS integration', 'Real-time inventory sync', 'Multi-warehouse routing', 'Returns & refund management'],
  },
  {
    icon: <FiBarChart2 size={26} />,
    iconBg: '#F5F3FF',
    iconColor: '#7C3AED',
    title: 'E-Commerce Analytics & Reporting',
    desc: 'GA4 enhanced e-commerce setup, custom dashboards, ROAS tracking, and monthly revenue reports so you always know what is driving growth.',
    features: ['GA4 enhanced e-commerce', 'Meta & Google Ads ROAS tracking', 'Custom Looker Studio dashboards', 'Monthly revenue review calls'],
  },
]

/* ── Platform badges ── */
const PLATFORMS = [
  { name: 'Shopify', icon: <SiShopify size={22} />, color: '#96bf48' },
  { name: 'WooCommerce', icon: <SiWoocommerce size={22} />, color: '#7C3AED' },
  { name: 'Razorpay', icon: <FiCreditCard size={22} />, color: '#3395FF' },
  { name: 'Stripe', icon: <FiShield size={22} />, color: '#5851EA' },
  { name: 'Klaviyo', icon: <FiMail size={22} />, color: '#F97316' },
  { name: 'GA4', icon: <FiBarChart2 size={22} />, color: '#E37400' },
]

/* ── Component ── */
export default function ECommerce() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 })
  }, [])

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="svc-hero svc-hero--green">
        <div
          className="svc-hero__blob"
          style={{ background: '#059669', width: '380px', height: '380px', top: '-100px', left: '-80px', opacity: 0.07 }}
        />
        <div
          className="svc-hero__blob"
          style={{ background: '#F59E0B', width: '280px', height: '280px', bottom: '-60px', right: '-60px', opacity: 0.07 }}
        />

        <div className="container">
          <div className="svc-hero__inner" data-aos="fade-up">
            <div className="svc-hero__tag svc-hero__tag--green">
              <RiShoppingBag3Line size={14} /> E-Commerce Solutions
            </div>

            <h1 className="svc-hero__title svc-hero__title--dark">
              Build an Online Store That{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg,#059669,#0891B2)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Sells While You Sleep
              </span>
            </h1>

            <p className="svc-hero__subtitle svc-hero__subtitle--slate">
              From store build to SEO to email automation, we design, develop, and market
              high-converting e-commerce experiences that turn browsers into buyers and buyers
              into loyal repeat customers.
            </p>

            <div className="svc-hero__actions">
              <Link
                to="/contact"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '13px 26px', borderRadius: '12px',
                  background: 'linear-gradient(135deg,#059669,#0891B2)',
                  color: '#fff', fontWeight: 700, fontSize: '15px', textDecoration: 'none',
                  boxShadow: '0 6px 24px rgba(5,150,105,0.35)',
                }}
              >
                Start Your Store <FiArrowRight size={16} />
              </Link>
              <Link to="/portfolio" className="btn btn-outline" style={{ borderColor: '#059669', color: '#059669' }}>
                See E-Commerce Work
              </Link>
            </div>

            {/* Platform badges */}
            <div
              style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid #E2E8F0' }}
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <p style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                Platforms &amp; Tools We Work With
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                {PLATFORMS.map((p, i) => (
                  <div
                    key={p.name}
                    data-aos="zoom-in"
                    data-aos-delay={i * 55}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '7px',
                      padding: '8px 16px', borderRadius: '100px',
                      background: '#fff', border: '1.5px solid #E2E8F0',
                      fontSize: '13px', fontWeight: 600, color: '#374151',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}
                  >
                    <span style={{ color: p.color }}>{p.icon}</span>
                    {p.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div
              style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginTop: '40px', paddingTop: '32px', borderTop: '1px solid #E2E8F0' }}
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {[
                { num: '180+', label: 'Stores Launched' },
                { num: '₹50Cr+', label: 'Revenue Generated' },
                { num: '3.8x', label: 'Avg ROAS' },
                { num: '40%', label: 'Avg Conversion Lift' },
              ].map((s) => (
                <div key={s.num} style={{ textAlign: 'center' }}>
                  <div className="svc-hero__stat-num svc-hero__stat-num--dark" style={{ color: '#059669' }}>
                    {s.num}
                  </div>
                  <div className="svc-hero__stat-label svc-hero__stat-label--dark">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 10 E-Commerce Services ────────────────────────── */}
      <section className="section svc-section--white">
        <div className="container">
          <div className="svc-section-header" data-aos="fade-up">
            <span className="section-tag" style={{ background: '#F0FDF4', color: '#059669' }}>
              Our E-Commerce Services
            </span>
            <div className="divider divider-center" style={{ background: 'linear-gradient(90deg,#059669,#0891B2)' }} />
            <h2 className="h2" style={{ marginTop: '20px', marginBottom: '14px' }}>
              End-to-End E-Commerce, Done for You
            </h2>
            <p className="body-md" style={{ maxWidth: '560px', margin: '0 auto' }}>
              Everything your online store needs to launch, grow, and dominate your category, 
              under one roof, with one accountable team.
            </p>
          </div>

          <div className="svc-cards-grid">
            {ECOMMERCE_SERVICES.map((item, i) => (
              <div
                key={item.title}
                className="svc-card"
                data-aos="fade-up"
                data-aos-delay={i * 50}
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
                        size={13}
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

      {/* ── Why Choose Us for E-Commerce ─────────────────── */}
      <section className="section svc-section--dark">
        <div className="container">
          <div className="svc-section-header" data-aos="fade-up">
            <span className="section-tag" style={{ background: '#F0FDF4', color: '#059669' }}>
              Our Advantage
            </span>
            <div className="divider divider-center" style={{ background: 'linear-gradient(90deg,#059669,#0891B2)' }} />
            <h2 className="h2" style={{ marginTop: '20px', marginBottom: '14px' }}>
              Why Brands Choose DigionTop for E-Commerce
            </h2>
            <p className="body-md" style={{ maxWidth: '560px', margin: '0 auto' }}>
              We are not just developers, we are growth partners who understand product,
              marketing, and customer psychology.
            </p>
          </div>

          <div className="svc-checklist-grid">
            {[
              {
                icon: <FiShoppingCart size={20} />,
                label: 'Conversion-First Design',
                detail: 'Every layout decision is made with one question: will this help more people buy?',
              },
              {
                icon: <HiOutlineLightningBolt size={20} />,
                label: 'Speed-Optimised by Default',
                detail: 'Sub-2-second load times on mobile, because 53% of shoppers abandon slow sites.',
              },
              {
                icon: <FiSearch size={20} />,
                label: 'SEO Architecture Built-In',
                detail: 'Your store ranks from day one with proper URL structures, schema, and on-page signals.',
              },
              {
                icon: <FiStar size={20} />,
                label: 'Proven Track Record',
                detail: '180+ stores launched across fashion, FMCG, electronics, and D2C brands with measurable revenue results.',
              },
              {
                icon: <FiRefreshCw size={20} />,
                label: 'Full Lifecycle Support',
                detail: 'We stay with you post-launch, ongoing CRO, email flows, and performance monitoring included.',
              },
              {
                icon: <FiPackage size={20} />,
                label: 'Seamless Third-Party Integrations',
                detail: 'CRMs, ERPs, shipping partners, analytics tools, we connect everything so your store runs on autopilot.',
              },
            ].map((item, i) => (
              <div
                key={item.label}
                className="svc-checklist-item"
                data-aos="fade-up"
                data-aos-delay={i * 70}
              >
                <div className="svc-checklist-icon" style={{ background: '#F0FDF4' }}>
                  <span style={{ color: '#059669' }}>{item.icon}</span>
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

      {/* ── Our Work (real reels + posts) ────────────────── */}
      <ServiceWork
        accent="#059669"
        accentSoft="#F0FDF4"
        heading="Stores & Content We've Delivered"
        subtitle="Real reels and creative posts we've produced to drive sales for our clients."
      />

      {/* ── CTA Banner ───────────────────────────────────── */}
      <section className="svc-cta">
        <div className="container">
          <div
            className="svc-cta__inner"
            data-aos="zoom-in"
            style={{ background: 'linear-gradient(145deg,#0F172A 0%,#0a2d20 55%,#059669 100%)' }}
          >
            <div className="svc-cta__blob svc-cta__blob--1" style={{ background: 'rgba(5,150,105,0.15)' }} />
            <div className="svc-cta__blob svc-cta__blob--2" />
            <div className="svc-cta__content">
              <div className="svc-cta__badge" style={{ background: 'linear-gradient(135deg,#059669,#0891B2)' }}>
                <FiShoppingCart size={12} /> Free Store Audit
              </div>
              <h2 className="svc-cta__title">
                Ready to Build an E-Commerce<br />Store That Actually Sells?
              </h2>
              <p className="svc-cta__subtitle">
                Get a free e-commerce audit, we will review your current store (or brief),
                identify conversion blockers, and outline a custom growth plan with projected revenue impact.
              </p>
              <div className="svc-cta__actions">
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '14px 30px', borderRadius: '12px',
                    background: 'linear-gradient(135deg,#059669,#0891B2)',
                    color: '#fff', fontWeight: 700, fontSize: '15px', textDecoration: 'none',
                    boxShadow: '0 6px 20px rgba(5,150,105,0.4)',
                  }}
                >
                  Get Free Store Audit <FiArrowRight size={17} />
                </Link>
                <Link to="/portfolio" className="btn btn-ghost" style={{ fontSize: '15px', padding: '14px 30px' }}>
                  View E-Commerce Work
                </Link>
              </div>
              <div className="svc-cta__trust">
                <span>No commitment</span>
                <span>100% Free</span>
                <span>Shopify & WooCommerce experts</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
