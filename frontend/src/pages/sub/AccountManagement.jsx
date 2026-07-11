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
const PROCESS = [
  { n: '01', t: 'Account Audit', d: 'We review your health metrics, policy strikes, listing status and case history to map every risk.' },
  { n: '02', t: 'Health & Compliance Fix', d: 'Open cases resolved, suppressed listings reinstated and policy violations corrected before they escalate.' },
  { n: '03', t: 'Order & Returns Handling', d: 'Daily monitoring of order defect rate, cancellations and returns to keep performance metrics on target.' },
  { n: '04', t: 'Ongoing Monitoring', d: 'Continuous tracking of account health dashboards with weekly reports so issues get caught before they hurt you.' },
]
const STACK = ['Account Health Rating', 'Order Defect Rate', 'Policy Compliance', 'Late Shipment Rate', 'Return & Refund Handling', 'A-to-Z Claims', 'Listing Suppression Recovery', 'Buyer-Seller Messaging', 'Seller Performance Dashboard', 'Inventory Policy Adherence']
const WHY = [
  { icon: <FiShield />, t: 'Proactive Health Protection', d: 'We catch policy warnings and metric dips early, before they turn into suspensions.' },
  { icon: <FiActivity />, t: 'Fast Case Resolution', d: 'Suppressed listings, A-to-Z claims and support tickets handled quickly to limit lost sales.' },
  { icon: <FiCheck />, t: 'Clean Compliance Record', d: 'Every listing and process is checked against current marketplace policies to keep your account in good standing.' },
  { icon: <FiHeadphones />, t: 'One Accountable Manager', d: 'A dedicated specialist owns your account end-to-end, not a rotating support queue.' },
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
      <section className="acc-process">
        <div className="acc-container">
          <div className="acc-head" data-aos="fade-up">
            <span className="acc-eyebrow">Our Process</span>
            <h2>How We Work</h2>
          </div>
          <div className="acc-process__track">
            {PROCESS.map((s, i) => (
              <div className="acc-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="acc-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="acc-stack">
        <div className="acc-container">
          <div className="acc-head" data-aos="fade-up">
            <span className="acc-eyebrow">What We Cover</span>
            <h2>Everything That Moves The Needle</h2>
          </div>
          <div className="acc-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="acc-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>
      <section className="acc-why">
        <div className="acc-container">
          <div className="acc-head" data-aos="fade-up">
            <span className="acc-eyebrow">Why Us</span>
            <h2>Why Sellers Choose Us</h2>
          </div>
          <div className="acc-why__grid">
            {WHY.map((w, i) => (
              <div className="acc-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="acc-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceFaq service="Marketplace Account Management" faqs={FAQS} />
      <section className="acc-cta"><div className="acc-container"><div className="acc-cta__box" data-aos="zoom-in"><FiSettings className="acc-cta__ic" /><h2>Let Us Run Your Marketplace</h2><p>Get a free account review — we'll show you exactly how to grow and protect your seller account.</p><Link to="/contact" className="acc-btn acc-btn--light">Get My Free Review <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
