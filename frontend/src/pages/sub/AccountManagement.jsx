import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiSettings, FiShield, FiTrendingUp, FiDollarSign, FiActivity, FiHeadphones, FiCheck, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/EcomPages.css'

const FAQS = [
  { q: 'What is marketplace account management?', a: 'End-to-end management of your seller account — listings, ads, pricing, health, cases and growth — so you sell more with less hassle.' },
  { q: 'Do you handle account health issues?', a: 'Yes — we monitor and resolve policy warnings, suppressed listings and performance metrics to keep your account safe.' },
  { q: 'Will you run ads too?', a: 'We manage sponsored ads and promotions alongside listings for a complete growth strategy.' },
  { q: 'Which marketplaces do you manage?', a: 'Amazon, Flipkart, Meesho and more — a dedicated manager handles it all.' },
  { q: 'How do I stay updated?', a: 'Regular reports and reviews keep you informed on sales, health and growth.' },
]
const FEATURES = [
  { icon: <FiActivity />, t: 'Account Health', d: 'Monitor and protect your metrics, cases and standing.' },
  { icon: <FiTrendingUp />, t: 'Sales Growth', d: 'Strategy, ads and optimisation to grow your revenue.' },
  { icon: <FiDollarSign />, t: 'Pricing & Promotions', d: 'Competitive pricing and offers that win the sale.' },
  { icon: <FiShield />, t: 'Case Handling', d: 'Resolve policy, suppression and support issues fast.' },
  { icon: <FiSettings />, t: 'Listing Management', d: 'Keep every listing optimised and performing.' },
  { icon: <FiHeadphones />, t: 'Dedicated Manager', d: 'A single point of contact who knows your business.' },
]

export default function AccountManagement() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="acc">
      <section className="acc-hero acc-hero--dark">
        <div className="acc-container acc-hero__inner">
          <div className="acc-hero__text" data-aos="fade-right">
            <span className="acc-tag acc-tag--light"><FiSettings /> Marketplace Account Management</span>
            <h1 className="acc-hero__title acc-hero__title--light">Your Seller Account,<br /><span>Fully Managed</span></h1>
            <p className="acc-hero__sub acc-hero__sub--light">End-to-end management of your Amazon, Flipkart and Meesho accounts — health, listings, ads and growth handled by a dedicated expert, so you just watch sales grow.</p>
            <div className="acc-hero__cta">
              <Link to="/contact" className="acc-btn acc-btn--solid">Manage My Account <FiArrowRight /></Link>
              <Link to="/contact" className="acc-btn acc-btn--ghost-l">Free Account Review</Link>
            </div>
          </div>
          <div className="ec-dark" data-aos="fade-left">
            <div className="ec-dark__top"><b>Account Dashboard</b><span className="ec-dark__up"><FiTrendingUp /> +42% sales</span></div>
            <div className="ec-dark__kpis"><div><span>Health</span><b>Good</b></div><div><span>Orders</span><b>3.2k</b></div><div><span>Rating</span><b>4.8★</b></div></div>
            <div className="ec-dark__chart">{[44, 56, 52, 70, 66, 82, 94].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div>
            <div className="ec-dark__top" style={{ marginBottom: 0, marginTop: 4 }}><FiCheck style={{ color: '#FFD874' }} /><span style={{ fontSize: 11, color: '#aaa', marginLeft: 8 }}>Health protected · ads optimised</span></div>
          </div>
        </div>
      </section>
      <section className="acc-features">
        <div className="acc-container">
          <div className="acc-head" data-aos="fade-up"><span className="acc-eyebrow">What We Handle</span><h2>Complete Account Care</h2></div>
          <div className="acc-features__grid">
            {FEATURES.map((f, i) => (<div className="acc-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}><span className="acc-feature__icon">{f.icon}</span><h3>{f.t}</h3><p>{f.d}</p></div>))}
          </div>
        </div>
      </section>
      <section className="acc-band"><div className="acc-container acc-band__inner" data-aos="fade-up"><div><b>Protected</b><span>Account Health</span></div><div><b>+42%</b><span>Avg Sales Growth</span></div><div><b>Dedicated</b><span>Account Manager</span></div></div></section>
      <ServiceFaq service="Marketplace Account Management" faqs={FAQS} />
      <section className="acc-cta"><div className="acc-container"><div className="acc-cta__box" data-aos="zoom-in"><FiSettings className="acc-cta__ic" /><h2>Let Us Run Your Marketplace</h2><p>Get a free account review — we'll show you exactly how to grow and protect your seller account.</p><Link to="/contact" className="acc-btn acc-btn--light">Get My Free Review <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
