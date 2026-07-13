import { useEffect } from 'react'
import Seo from '../components/Seo'
import { FaRocket } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiArrowRight, FiArrowUpRight, FiCheck,
  FiShoppingBag, FiLayout, FiSmartphone, FiGrid, FiCreditCard, FiTruck,
  FiTrendingUp, FiZap, FiSearch, FiActivity,
  FiTarget, FiPenTool, FiUsers, FiMaximize, FiHeadphones,
} from 'react-icons/fi'
import ServiceWork from '../components/ServiceWork'
import ServiceFaq from '../components/ServiceFaq'
import RelatedServices from '../components/RelatedServices'
import '../styles/ShopifyDevelopment.css'

const FAQS = [
  { q: 'How long does a Shopify store take to build?', a: 'A complete Shopify store typically takes 2–4 weeks depending on products, features, and design needs.' },
  { q: 'Do you set up payments and shipping?', a: 'Yes — secure payment gateways (Razorpay, Stripe & more), shipping zones, and delivery integrations are all handled.' },
  { q: 'Will my store be mobile-friendly?', a: 'Absolutely. Every Shopify store we build is fully responsive and optimized for mobile shopping.' },
  { q: 'Can you redesign my existing Shopify store?', a: 'Yes, we redesign and optimize existing stores to improve conversions and speed.' },
  { q: 'Do I own the store fully?', a: 'Yes — full ownership of your Shopify store, theme, and content.' },
]

const OFFER = [
  { icon: <FiShoppingBag />, title: 'Custom Shopify Store Development', desc: 'Professionally designed Shopify stores tailored to your brand identity and business requirements.' },
  { icon: <FiLayout />, title: 'Premium Store Design', desc: 'Modern and visually appealing store layouts that build trust and enhance customer experience.' },
  { icon: <FiSmartphone />, title: 'Mobile Responsive Design', desc: 'Optimized for smartphones, tablets, and desktops to ensure a seamless shopping experience.' },
  { icon: <FiGrid />, title: 'Product & Collection Setup', desc: 'Professional organization of products, collections, categories, and navigation.' },
  { icon: <FiCreditCard />, title: 'Payment Gateway Integration', desc: 'Secure integration of Razorpay, PayU, Cashfree, Stripe, and more.' },
  { icon: <FiTruck />, title: 'Shipping & Delivery Setup', desc: 'Configuration of shipping rates, delivery zones, and logistics integrations.' },
  { icon: <FiTrendingUp />, title: 'Conversion-Focused Design', desc: 'Store layouts strategically designed to increase product visibility and improve sales.' },
  { icon: <FiActivity />, title: 'Shopify App Integration', desc: 'Reviews, chat support, email marketing, analytics, and automation apps.' },
  { icon: <FiSearch />, title: 'SEO-Friendly Store Structure', desc: 'Optimized Shopify setup to improve search engine visibility and organic traffic.' },
  { icon: <FiZap />, title: 'Speed Optimization', desc: 'Fast-loading Shopify stores that improve experience and reduce bounce rates.' },
]

const FEATURES = [
  'Premium Homepage Design', 'Product Page Design', 'Collection Page Design', 'About Us Page',
  'Contact Page', 'FAQ Page', 'Privacy Policy Setup', 'Terms & Conditions Setup',
  'Mobile Optimization', 'WhatsApp Integration', 'Social Media Integration', 'Google Analytics Setup',
  'Basic Shopify SEO Setup', 'Store Launch Support',
]

const WHY = [
  { icon: <FiTarget />, title: 'Built For Sales', desc: 'Every store is designed with one goal: helping your business generate more orders and revenue.' },
  { icon: <FiPenTool />, title: 'Custom Design Approach', desc: 'No generic templates. Every store is tailored to match your brand identity and objectives.' },
  { icon: <FiUsers />, title: 'User-Friendly Experience', desc: 'Simple navigation, clear product presentation, and a seamless checkout process.' },
  { icon: <FiMaximize />, title: 'Scalable Solutions', desc: 'Your Shopify store will be ready to grow as your business expands.' },
  { icon: <FiHeadphones />, title: 'Ongoing Support', desc: 'We provide assistance, updates, and guidance even after your store goes live.' },
]

const IDEAL = [
  'Fashion Brands', 'Beauty & Cosmetics', 'Electronics Stores', 'Home & Lifestyle',
  'D2C Brands', 'Food & Beverage', 'Startups & New Businesses', 'Growing E-Commerce',
]

export default function ShopifyDevelopment() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 })
  }, [])

  return (
    <main className="sf">
      <Seo
        title="Shopify Development Company — Custom Store Design"
        description="Custom Shopify stores built to sell: premium design, product setup, payment gateways, shipping, apps and SEO — launched in 2 to 4 weeks. Start your Shopify project."
        path="/services/shopify-development"
      />
      {/* ── HERO ── */}
      <section className="sf-hero">
        <div className="sf-hero__glow" />
        <div className="sf-container sf-hero__inner">
          <div className="sf-hero__content" data-aos="fade-up">
            <span className="sf-tag"><FiShoppingBag /> Shopify Store Development</span>
            <h1 className="sf-hero__title">
              Shopify Stores Designed to <span>Sell, Scale &amp; Grow</span>
            </h1>
            <p className="sf-hero__sub">
              Custom Shopify websites built for brands that want a professional online presence,
              better customer experience, and higher sales.
            </p>
            <div className="sf-hero__actions">
              <Link to="/contact" className="sf-btn sf-btn--primary">Start Your Shopify Project <FiArrowRight /></Link>
              <a href="#sf-offer" className="sf-btn sf-btn--ghost">What We Offer</a>
            </div>
            <div className="sf-hero__chips">
              <span><FiZap /> Fast Loading</span>
              <span><FiSmartphone /> Mobile First</span>
              <span><FiTrendingUp /> Conversion Focused</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── INTRO — statement card with stat highlights ── */}
      <section className="sf-intro">
        <div className="sf-container">
          <div className="sf-intro__card" data-aos="fade-up">
            <span className="sf-intro__quote" aria-hidden="true">&ldquo;</span>
            <span className="sf-eyebrow">Why It Matters</span>
            <h2 className="sf-h2">High-Converting Shopify Stores <span>Built for Modern Brands</span></h2>
            <p className="sf-intro__lead">
              Your Shopify store is more than just a website — it's the foundation of your online business.
              We design and develop professional Shopify stores that help brands create a strong online
              presence, improve customer experience, and increase sales.
            </p>
            <p className="sf-intro__lead">
              From custom storefront design to complete store setup, whether you're launching a new brand
              or upgrading an existing one, we build fast, mobile-friendly, conversion-focused stores made
              for growth.
            </p>
            <div className="sf-intro__stats">
              <div><b>2.4s</b><span>Avg. Load Time</span></div>
              <div><b>100%</b><span>Mobile Optimised</span></div>
              <div><b>Zero</b><span>Template Lock-In</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER ── */}
      <section className="sf-offer" id="sf-offer">
        <div className="sf-container">
          <div className="sf-head" data-aos="fade-up">
            <span className="sf-eyebrow">What We Offer</span>
            <h2 className="sf-h2">Complete Shopify Store Solutions</h2>
          </div>
          <div className="sf-offer__grid">
            {OFFER.map((o, i) => (
              <div className="sf-card" key={o.title} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="sf-card__icon">{o.icon}</span>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES INCLUDED ── */}
      <section className="sf-features">
        <div className="sf-container">
          <div className="sf-head" data-aos="fade-up">
            <span className="sf-eyebrow sf-eyebrow--light">Features Included</span>
            <h2 className="sf-h2 sf-h2--light">Everything Your Store Needs to Launch</h2>
          </div>
          <div className="sf-features__grid">
            {FEATURES.map((f, i) => (
              <div className="sf-feature" key={f} data-aos="fade-up" data-aos-delay={(i % 4) * 50}>
                <FiCheck /> {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="sf-why">
        <div className="sf-container">
          <div className="sf-head" data-aos="fade-up">
            <span className="sf-eyebrow">Why Choose DigionTop?</span>
            <h2 className="sf-h2">Shopify Stores That Actually Sell</h2>
          </div>
          <div className="sf-why__grid">
            {WHY.map((w, i) => (
              <div className="sf-why__card" key={w.title} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="sf-why__icon">{w.icon}</span>
                <h3>{w.title}</h3>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IDEAL FOR ── */}
      <section className="sf-ideal">
        <div className="sf-container">
          <div className="sf-head" data-aos="fade-up">
            <span className="sf-eyebrow">Ideal For</span>
            <h2 className="sf-h2">Perfect for Every Kind of Brand</h2>
          </div>
          <div className="sf-ideal__grid">
            {IDEAL.map((it, i) => (
              <span className="sf-pill" key={it} data-aos="zoom-in" data-aos-delay={i * 40}>{it}</span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + lead form */}
      <ServiceFaq service="Shopify Store Development" faqs={FAQS} />

      {/* Related services */}
      <RelatedServices categoryHeading="Web Development" />

      {/* ── GOAL + CTA ── */}
      <section className="sf-cta">
        <div className="sf-container">
          <div className="sf-cta__box" data-aos="zoom-in">
            <span className="sf-cta__rocket"><FaRocket /></span>
            <h2>Ready to Launch Your Shopify Store?</h2>
            <p>
              We don't just create Shopify websites — we build e-commerce experiences that help businesses
              attract customers, strengthen their brand image, and achieve sustainable online growth.
            </p>
            <Link to="/contact" className="sf-btn sf-btn--light">Start Your Shopify Project Today <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
