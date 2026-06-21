import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiArrowRight, FiArrowUpRight, FiCheck, FiShoppingBag,
  FiShoppingCart, FiSearch, FiImage, FiGrid, FiUserCheck, FiTrendingUp, FiPackage,
} from 'react-icons/fi'
import ServiceWork from '../components/ServiceWork'
import '../styles/SubService.css'

const SERVICES = [
  { icon: <FiShoppingCart />, t: 'Amazon Product Listing', d: 'Optimized Amazon listings for visibility, engagement, and higher conversions.' },
  { icon: <FiShoppingBag />, t: 'Flipkart Product Listing', d: 'Well-structured Flipkart listings designed to improve discoverability and sales.' },
  { icon: <FiPackage />, t: 'Meesho Product Listing', d: 'Professional product listings tailored for Meesho\'s marketplace ecosystem.' },
  { icon: <FiSearch />, t: 'Product SEO Optimization', d: 'Keyword-focused optimization to improve ranking and visibility across marketplaces.' },
  { icon: <FiImage />, t: 'Product Image & Infographics', d: 'High-quality images & infographics that build trust and improve conversions.' },
  { icon: <FiGrid />, t: 'Catalog Management', d: 'Catalog organization, product updates, inventory & listing maintenance.' },
  { icon: <FiUserCheck />, t: 'Marketplace Account Management', d: 'Complete account handling — uploads, optimization, updates & support.' },
  { icon: <FiTrendingUp />, t: 'E-Commerce Growth Consulting', d: 'Strategic guidance to improve sales, optimize operations, and scale.' },
]
const WHY = [
  { t: 'Marketplace Expertise', d: 'We know how leading platforms operate and what improves product visibility.' },
  { t: 'Conversion-Focused Approach', d: 'Every listing, image & strategy is designed to convert visitors into customers.' },
  { t: 'Professional Presentation', d: 'From titles & descriptions to premium visuals, your products stand out.' },
  { t: 'Growth-Oriented Strategies', d: 'We help build scalable e-commerce operations for long-term growth.' },
]
const PLATFORMS = ['Amazon', 'Flipkart', 'Meesho', 'Shopify', 'WooCommerce', 'Independent Stores']
const ACHIEVE = ['Better Product Visibility', 'Higher Search Rankings', 'Improved Presentation', 'Increased Customer Trust', 'Better Conversion Rates', 'More Sales Opportunities', 'Scalable Growth']
const STEPS = ['Product Analysis', 'Listing Optimization', 'Creative Enhancement', 'Marketplace Management', 'Growth Strategy']

export default function EcommercePage() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      {/* HERO */}
      <section className="ss-hero ss-hero--white">
        <div className="ss-container ds-hero" style={{ position: 'relative' }}>
          <div data-aos="fade-right">
            <span className="ss-tag"><FiShoppingBag /> E-Commerce Solutions</span>
            <h1 className="ss-hero__title">Sell More. Scale Faster. <span>Grow Across Every Marketplace.</span></h1>
            <p className="ss-hero__sub">Listing products online isn't enough. We help businesses build, manage, and grow on Amazon, Flipkart, Meesho & Shopify — more visibility, more conversions, more sales.</p>
            <div className="ss-hero__actions">
              <Link to="/contact" className="ss-btn ss-btn--primary">Grow My Marketplace Sales <FiArrowRight /></Link>
              <Link to="/contact" className="ss-btn ss-btn--ghost">Get Free Consultation</Link>
            </div>
          </div>
          <div className="ec-hero__media" data-aos="fade-left">
            <img src="/images/ecom-hero.png" alt="E-Commerce across marketplaces" loading="eager" />
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="ss-sec ss-sec--soft">
        <div className="ss-container ss-head" data-aos="fade-up">
          <span className="ss-eyebrow">Overview</span>
          <h2 className="ss-h2">Built, Managed & Optimized for Sales</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 14 }}>
            Whether you're launching your first product or managing a large catalog, we provide the
            expertise and support needed to increase visibility, improve conversions, and drive
            sustainable sales growth across every platform.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our E-Commerce Solutions</span><h2 className="ss-h2">Everything You Need to Sell Online</h2></div>
          <div className="uiux-grid">
            {SERVICES.map((s) => (
              <div className="uiux-card ec-card" key={s.t} data-aos="fade-up">
                <span className="uiux-card__icon">{s.icon}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="ss-sec ss-sec--soft">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Why Choose DigionTop</span><h2 className="ss-h2">Marketplace Growth Partners</h2></div>
          <div className="ss-list">
            {WHY.map((w) => (
              <div className="ss-list__item ec-why" key={w.t} data-aos="fade-up">
                <span className="ss-list__dot"><FiCheck size={14} /></span>
                <span><b style={{ display: 'block', color: 'var(--ink)' }}>{w.t}</b><span style={{ color: 'var(--muted)', fontWeight: 500, fontSize: '0.86rem' }}>{w.d}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Platforms We Support</span><h2 className="ss-h2">Sell Everywhere Your Customers Are</h2></div>
          <div className="ss-benefits">{PLATFORMS.map((p) => <span className="ss-benefit" key={p} data-aos="zoom-in"><FiShoppingCart /> {p}</span>)}</div>
        </div>
      </section>

      {/* ACHIEVE (dark) */}
      <section className="ss-sec ss-sec--dark">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow ss-eyebrow--light">What We Help You Achieve</span><h2 className="ss-h2 ss-h2--light">Results That Move Your Business</h2></div>
          <div className="ec-achieve">
            {ACHIEVE.map((a) => <div className="ec-achieve__item" key={a} data-aos="fade-up"><FiCheck /> {a}</div>)}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Process</span><h2 className="ss-h2">From Listing to Growth</h2></div>
          <div className="ss-process" data-aos="fade-up">
            {STEPS.map((s, i) => (
              <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span className="ss-process__step"><b>{i + 1}</b>{s}</span>
                {i < STEPS.length - 1 && <span className="ss-process__arrow">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <ServiceWork variant="websites" accent="#F5A800" accentSoft="#FFF3CC" heading="Stores We've Worked On" subtitle="A look at the e-commerce stores and websites we've delivered for clients." />

      {/* CTA */}
      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: 8 }}>🚀</span>
          <h2>Ready To Grow Your E-Commerce Business?</h2>
          <p>Whether you sell on Amazon, Flipkart, Meesho, Shopify, or multiple marketplaces — we'll help you build a stronger online presence and achieve sustainable growth.</p>
          <Link to="/contact" className="ss-btn">Start Selling Smarter <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
