import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiShoppingCart, FiCreditCard, FiTruck, FiTag, FiTrendingUp, FiGrid,
  FiCheck, FiArrowRight, FiArrowUpRight, FiPackage,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/WebDevPages.css'

const FAQS = [
  { q: 'Why WooCommerce?', a: 'It turns WordPress into a full online store — flexible, fully owned, no monthly platform fees, with endless customisation.' },
  { q: 'Can you set up payments & shipping?', a: 'Yes — Razorpay, Stripe, PayPal and shipping zones, taxes and delivery are all configured for you.' },
  { q: 'Is it good for large catalogues?', a: 'WooCommerce scales well — with the right hosting and optimisation it handles thousands of products.' },
  { q: 'Can I manage products myself?', a: 'Absolutely — an easy dashboard lets you add products, run sales and manage orders without a developer.' },
  { q: 'Will it be mobile-friendly and fast?', a: 'Every store is responsive and speed-optimised so shoppers buy smoothly on any device.' },
]

const FEATURES = [
  { icon: <FiGrid />, t: 'Custom Store Design', d: 'A branded, conversion-focused storefront — not a generic template.' },
  { icon: <FiCreditCard />, t: 'Payment Integration', d: 'Razorpay, Stripe, PayPal and more, set up and tested.' },
  { icon: <FiTruck />, t: 'Shipping & Tax Setup', d: 'Zones, rates, taxes and delivery configured correctly.' },
  { icon: <FiPackage />, t: 'Product Management', d: 'Easy catalogue, variants and inventory you control yourself.' },
  { icon: <FiTag />, t: 'Coupons & Sales', d: 'Run discounts, offers and campaigns to drive more orders.' },
  { icon: <FiTrendingUp />, t: 'SEO & Speed', d: 'Optimised for search rankings and fast checkout.' },
]

export default function WooCommerce() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="woo">
      <section className="woo-hero woo-hero--light">
        <div className="woo-container woo-hero__inner">
          <div className="woo-hero__text" data-aos="fade-right">
            <span className="woo-tag"><FiShoppingCart /> WooCommerce Development</span>
            <h1 className="woo-hero__title">Your Own Store,<br /><span>Fully Owned</span></h1>
            <p className="woo-hero__sub">Custom WooCommerce stores on WordPress — no monthly platform fees, full control, and everything you need to sell online and scale.</p>
            <div className="woo-hero__cta">
              <Link to="/contact" className="woo-btn woo-btn--solid">Launch My Store <FiArrowRight /></Link>
              <Link to="/contact" className="woo-btn woo-btn--ghost">Free Store Plan</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="woo-features">
        <div className="woo-container">
          <div className="woo-head" data-aos="fade-up">
            <span className="woo-eyebrow">What's Included</span>
            <h2>Everything to Sell Online</h2>
          </div>
          <div className="woo-features__grid">
            {FEATURES.map((f, i) => (
              <div className="woo-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="woo-feature__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="woo-band">
        <div className="woo-container woo-band__inner" data-aos="fade-up">
          <div><b>Zero</b><span>Monthly Platform Fees</span></div>
          <div><b>Full</b><span>Store Ownership</span></div>
          <div><b>Scalable</b><span>Catalogue & Traffic</span></div>
        </div>
      </section>

      <ServiceFaq service="WooCommerce Development" faqs={FAQS} />

      <section className="woo-cta">
        <div className="woo-container">
          <div className="woo-cta__box" data-aos="zoom-in">
            <FiShoppingCart className="woo-cta__ic" />
            <h2>Ready to Own Your Online Store?</h2>
            <p>Get a free store plan — we'll map the design, features and setup to get you selling.</p>
            <Link to="/contact" className="woo-btn woo-btn--light">Get My Free Plan <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
