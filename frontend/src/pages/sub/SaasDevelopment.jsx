import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiLayers, FiCreditCard, FiUsers, FiTrendingUp, FiShield, FiZap, FiCheck, FiArrowRight, FiArrowUpRight, FiRepeat, FiBarChart2 } from 'react-icons/fi'
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
const PROCESS = [
  { n: '01', t: 'Product & Pricing Discovery', d: 'We map your core workflow, define the MVP feature set and shape the plan tiers, limits and trial that your pricing page will sell.' },
  { n: '02', t: 'Tenancy & Data Architecture', d: 'We design the multi-tenant model — shared schema with tenant IDs or isolated databases — plus roles, permissions and row-level access rules.' },
  { n: '03', t: 'Build: App, Billing & Dashboards', d: 'We ship the product in sprints — auth and org invites, subscription checkout with webhooks, usage metering, and the admin and customer dashboards.' },
  { n: '04', t: 'Launch, Monitor & Iterate', d: 'We deploy to cloud infrastructure with CI/CD, wire up churn and MRR tracking, then iterate on real usage data after go-live.' },
]
const STACK = ['React', 'Next.js', 'Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'Stripe', 'Razorpay', 'Docker', 'AWS']
const WHY = [
  { icon: <FiRepeat />, t: 'Recurring Revenue Focus', d: 'Plans, trials, upgrades, dunning and failed-payment recovery are built in — so subscriptions actually keep renewing.' },
  { icon: <FiShield />, t: 'True Tenant Isolation', d: 'Every query is scoped to a tenant, so one customer can never see another customer\'s data — audited before we ship.' },
  { icon: <FiBarChart2 />, t: 'Dashboards People Use', d: 'Clean, fast admin and customer dashboards with the metrics, filters and exports your users log in for every day.' },
  { icon: <FiZap />, t: 'MVP in Weeks, Not Years', d: 'We launch a lean, paying version of your product first, then scale features once real users tell us what matters.' },
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
      <section className="saas-process">
        <div className="saas-container">
          <div className="saas-head" data-aos="fade-up">
            <span className="saas-eyebrow">Our Process</span>
            <h2>How We Build</h2>
          </div>
          <div className="saas-process__track">
            {PROCESS.map((s, i) => (
              <div className="saas-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="saas-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="saas-stack">
        <div className="saas-container">
          <div className="saas-head" data-aos="fade-up">
            <span className="saas-eyebrow">Tech Stack</span>
            <h2>Built With Modern Tech</h2>
          </div>
          <div className="saas-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="saas-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>
      <section className="saas-why">
        <div className="saas-container">
          <div className="saas-head" data-aos="fade-up">
            <span className="saas-eyebrow">Why Us</span>
            <h2>Why Businesses Choose Us</h2>
          </div>
          <div className="saas-why__grid">
            {WHY.map((w, i) => (
              <div className="saas-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="saas-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceFaq service="SaaS Development" faqs={FAQS} />
      <section className="saas-cta"><div className="saas-container"><div className="saas-cta__box" data-aos="zoom-in"><FiLayers className="saas-cta__ic" /><h2>Have a SaaS Idea? Let's Build It.</h2><p>Tell us your idea — we'll map an MVP and a path to recurring revenue.</p><Link to="/contact" className="saas-btn saas-btn--light">Discuss My Project <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
