import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiLayers, FiCreditCard, FiUsers, FiTrendingUp, FiShield, FiZap, FiCheck, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/MobilePages.css'

const FAQS = [
  { q: 'What is SaaS development?', a: 'Building subscription-based software products — with user accounts, billing, dashboards and multi-tenancy — that customers pay for monthly.' },
  { q: 'Do you handle subscriptions & billing?', a: 'Yes — recurring billing, plans, trials and payment integration (Stripe, Razorpay) are all built in.' },
  { q: 'Can it support many customers?', a: 'Absolutely — multi-tenant architecture keeps each customer\'s data separate and secure at scale.' },
  { q: 'Do you build the MVP first?', a: 'Often the smart move — we can launch a lean MVP fast, then expand based on real user feedback.' },
  { q: 'Will it scale as we grow?', a: 'Yes — cloud infrastructure and clean architecture mean your SaaS scales smoothly with your user base.' },
]
const FEATURES = [
  { icon: <FiUsers />, t: 'Multi-Tenant', d: 'Secure, isolated accounts for every customer at scale.' },
  { icon: <FiCreditCard />, t: 'Subscriptions & Billing', d: 'Recurring billing, plans, trials and payment gateways.' },
  { icon: <FiLayers />, t: 'Dashboards & Admin', d: 'Powerful user and admin panels tailored to your product.' },
  { icon: <FiShield />, t: 'Secure & Compliant', d: 'Auth, roles and data protection built in from day one.' },
  { icon: <FiZap />, t: 'MVP to Scale', d: 'Launch lean, then expand based on real usage.' },
  { icon: <FiTrendingUp />, t: 'Analytics Built In', d: 'Usage and revenue insights to grow your SaaS.' },
]

export default function SaasDevelopment() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="saas">
      <section className="saas-hero saas-hero--light">
        <div className="saas-container saas-hero__inner">
          <div className="saas-hero__text" data-aos="fade-right">
            <span className="saas-tag"><FiLayers /> SaaS Development</span>
            <h1 className="saas-hero__title">Software People<br /><span>Pay For, Monthly</span></h1>
            <p className="saas-hero__sub">We build subscription software products — accounts, billing, dashboards and multi-tenancy — engineered to launch fast and scale into real recurring revenue.</p>
            <div className="saas-hero__cta">
              <Link to="/contact" className="saas-btn saas-btn--solid">Build My SaaS <FiArrowRight /></Link>
              <Link to="/contact" className="saas-btn saas-btn--ghost">Discuss My Idea</Link>
            </div>
          </div>
          <div className="mv-card" data-aos="fade-left" style={{ background: '#111' }}>
            <div className="mv-card__top"><b>SaaS Dashboard</b><span className="mv-card__live">● Live</span></div>
            <div className="mv-row"><FiUsers /> active subscribers <b>1,284</b></div>
            <div className="mv-row"><FiCreditCard /> MRR <b className="g">₹6.4L</b></div>
            <div className="mv-row"><FiTrendingUp /> churn <b>2.1%</b></div>
            <div className="mv-card__foot"><FiCheck /> Multi-tenant · billing · analytics</div>
          </div>
        </div>
      </section>
      <section className="saas-features">
        <div className="saas-container">
          <div className="saas-head" data-aos="fade-up"><span className="saas-eyebrow">What We Build</span><h2>Everything a SaaS Needs</h2></div>
          <div className="saas-features__grid">
            {FEATURES.map((f, i) => (<div className="saas-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}><span className="saas-feature__icon">{f.icon}</span><h3>{f.t}</h3><p>{f.d}</p></div>))}
          </div>
        </div>
      </section>
      <section className="saas-band"><div className="saas-container saas-band__inner" data-aos="fade-up"><div><b>MVP</b><span>Launch Fast</span></div><div><b>Billing</b><span>Built In</span></div><div><b>Scales</b><span>With Your Users</span></div></div></section>
      <ServiceFaq service="SaaS Development" faqs={FAQS} />
      <section className="saas-cta"><div className="saas-container"><div className="saas-cta__box" data-aos="zoom-in"><FiLayers className="saas-cta__ic" /><h2>Have a SaaS Idea? Let's Build It.</h2><p>Tell us your idea — we'll map an MVP and a path to recurring revenue.</p><Link to="/contact" className="saas-btn saas-btn--light">Discuss My Project <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
