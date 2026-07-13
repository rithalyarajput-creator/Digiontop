import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiGrid, FiEdit3, FiRefreshCw, FiPackage, FiCheckCircle, FiTrendingUp, FiArrowRight, FiArrowUpRight, FiDatabase, FiUploadCloud, FiLayers, FiShield } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/EcomPages.css'

const FAQS = [
  { q: 'What is catalog management?', a: 'Keeping your entire product catalogue accurate, complete and up-to-date across marketplaces — listings, pricing, stock and content.' },
  { q: 'Can you manage large catalogues?', a: 'Yes — from dozens to thousands of SKUs, kept accurate and optimised across every platform.' },
  { q: 'Do you handle updates and pricing?', a: 'Absolutely — price changes, stock updates, new launches and content edits are all managed for you.' },
  { q: 'Which marketplaces do you cover?', a: 'Amazon, Flipkart, Meesho and your own store — a single, consistent catalogue everywhere.' },
  { q: 'Will this save me time?', a: 'Hugely — we take catalogue chaos off your plate so you can focus on growing sales.' },
]
const FEATURES = [
  { icon: <FiPackage />, t: 'Product Onboarding', d: 'Fast, accurate addition of new products across platforms.' },
  { icon: <FiEdit3 />, t: 'Content Updates', d: 'Keep titles, descriptions and images current and optimised.' },
  { icon: <FiRefreshCw />, t: 'Price & Stock Sync', d: 'Consistent pricing and inventory across every marketplace.' },
  { icon: <FiCheckCircle />, t: 'Quality Control', d: 'Every listing checked for accuracy and compliance.' },
  { icon: <FiDatabase />, t: 'Bulk Management', d: 'Efficient handling of large, complex catalogues.' },
  { icon: <FiTrendingUp />, t: 'Performance Review', d: 'Ongoing optimisation of underperforming listings.' },
]
const PROCESS = [
  { n: '01', t: 'Catalogue Audit', d: 'We map every SKU, attribute set and image against each marketplace’s listing rules to spot gaps and mismatches.' },
  { n: '02', t: 'Bulk Upload & Mapping', d: 'New products go live in bulk using category-specific templates, with variations (size, colour, pack) mapped correctly to each channel.' },
  { n: '03', t: 'Inventory Sync Setup', d: 'Stock and pricing are connected across Amazon, Flipkart, Meesho and your store so counts update in real time everywhere.' },
  { n: '04', t: 'Monitor & Reconcile', d: 'We track sync errors, suppressed listings and stock mismatches daily, fixing issues before they cost you sales.' },
]
const STACK = ['Bulk Upload Templates', 'Variation Mapping', 'Amazon Seller Central', 'Flipkart Seller Hub', 'Meesho Supplier Panel', 'Inventory Sync Feeds', 'SKU & Barcode Mapping', 'Price Parity Checks', 'Listing Error Alerts', 'Category Attribute Compliance']
const WHY = [
  { icon: <FiUploadCloud />, t: 'Faster Bulk Uploads', d: 'Hundreds of SKUs and variations go live in a single upload cycle, not one listing at a time.' },
  { icon: <FiLayers />, t: 'Accurate Variations', d: 'Size, colour and pack combinations map correctly so customers never land on the wrong variant.' },
  { icon: <FiRefreshCw />, t: 'Real-Time Stock Sync', d: 'Inventory stays consistent across every marketplace, cutting overselling and stockout cancellations.' },
  { icon: <FiShield />, t: 'Fewer Listing Errors', d: 'Daily checks catch suppressed listings, attribute mismatches and pricing conflicts before they hurt rankings.' },
]

export default function CatalogManagement() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="cat">
      <Seo
        title="E-Commerce Catalog Management Services"
        description="Bulk product uploads, variation mapping and real-time stock sync across Amazon, Flipkart and Meesho. We keep your catalogue accurate and error-free. Get a free consultation."
        path="/services/ecom/catalog-management"
      />
      <section className="cat-hero cat-hero--dark">
        <div className="cat-container cat-hero__inner">
          <div className="cat-hero__text" data-aos="fade-right">
            <span className="cat-tag cat-tag--light"><FiGrid /> Catalog Management</span>
            <h1 className="cat-hero__title cat-hero__title--light">Your Catalogue,<br /><span>Always Accurate</span></h1>
            <p className="cat-hero__sub cat-hero__sub--light">We keep your entire product catalogue accurate, optimised and up-to-date across every marketplace — so nothing is ever missed and everything sells.</p>
            <div className="cat-hero__cta">
              <Link to="/contact" className="cat-btn cat-btn--solid">Manage My Catalogue <FiArrowRight /></Link>
              <Link to="/contact" className="cat-btn cat-btn--ghost-l">Free Consultation</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="cat-features">
        <div className="cat-container">
          <div className="cat-head" data-aos="fade-up"><span className="cat-eyebrow">What We Manage</span><h2>Catalogue Chaos, Solved</h2></div>
          <div className="cat-features__grid">
            {FEATURES.map((f, i) => (<div className="cat-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}><span className="cat-feature__icon">{f.icon}</span><h3>{f.t}</h3><p>{f.d}</p></div>))}
          </div>
        </div>
      </section>
      <section className="cat-process">
        <div className="cat-container">
          <div className="cat-head" data-aos="fade-up">
            <span className="cat-eyebrow">Our Process</span>
            <h2>How We Work</h2>
          </div>
          <div className="cat-process__track">
            {PROCESS.map((s, i) => (
              <div className="cat-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="cat-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="cat-stack">
        <div className="cat-container">
          <div className="cat-head" data-aos="fade-up">
            <span className="cat-eyebrow">What We Cover</span>
            <h2>Everything That Moves The Needle</h2>
          </div>
          <div className="cat-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="cat-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>
      <section className="cat-why">
        <div className="cat-container">
          <div className="cat-head" data-aos="fade-up">
            <span className="cat-eyebrow">Why Us</span>
            <h2>Why Sellers Choose Us</h2>
          </div>
          <div className="cat-why__grid">
            {WHY.map((w, i) => (
              <div className="cat-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="cat-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceFaq service="Catalog Management" faqs={FAQS} />
      <section className="cat-cta"><div className="cat-container"><div className="cat-cta__box" data-aos="zoom-in"><FiGrid className="cat-cta__ic" /><h2>Take Catalogue Chaos Off Your Plate</h2><p>Get a free consultation — we'll keep your catalogue accurate so you can focus on selling.</p><Link to="/contact" className="cat-btn cat-btn--light">Get Started <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
