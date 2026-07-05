import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiGrid, FiEdit3, FiRefreshCw, FiPackage, FiCheckCircle, FiTrendingUp, FiCheck, FiArrowRight, FiArrowUpRight, FiDatabase } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
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

export default function CatalogManagement() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="cat">
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
          <div className="ec-dark" data-aos="fade-left">
            <div className="ec-dark__top"><b>Catalogue Health</b><span className="ec-dark__up">● 98% complete</span></div>
            <div className="ec-dark__kpis"><div><span>SKUs</span><b>1,240</b></div><div><span>Live</span><b>1,216</b></div><div><span>Issues</span><b>24</b></div></div>
            <div className="ec-dark__chart">{[60, 72, 68, 84, 80, 92, 96].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div>
            <div className="ec-dark__top" style={{ marginBottom: 0, marginTop: 4 }}><FiCheck style={{ color: '#FFD874' }} /><span style={{ fontSize: 11, color: '#aaa', marginLeft: 8 }}>Synced across Amazon · Flipkart · Meesho</span></div>
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
      <section className="cat-band"><div className="cat-container cat-band__inner" data-aos="fade-up"><div><b>1000s</b><span>Of SKUs Managed</span></div><div><b>Synced</b><span>Every Marketplace</span></div><div><b>Zero</b><span>Listing Errors</span></div></div></section>
      <ServiceFaq service="Catalog Management" faqs={FAQS} />
      <section className="cat-cta"><div className="cat-container"><div className="cat-cta__box" data-aos="zoom-in"><FiGrid className="cat-cta__ic" /><h2>Take Catalogue Chaos Off Your Plate</h2><p>Get a free consultation — we'll keep your catalogue accurate so you can focus on selling.</p><Link to="/contact" className="cat-btn cat-btn--light">Get Started <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
