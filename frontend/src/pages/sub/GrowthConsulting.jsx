import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiTrendingUp, FiTarget, FiBarChart2, FiDollarSign, FiCompass, FiZap, FiCheck, FiArrowRight, FiArrowUpRight, FiSearch, FiPieChart, FiMap, FiShield } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/EcomPages.css'

const FAQS = [
  { q: 'What is e-commerce growth consulting?', a: 'Strategic guidance to scale your online business — analysing your data, finding opportunities and building a clear roadmap to more revenue.' },
  { q: 'Who is it for?', a: 'Sellers and brands who want to scale but aren\'t sure what\'s holding them back or where to invest next.' },
  { q: 'What do you actually deliver?', a: 'A data-backed audit, prioritised growth roadmap, channel strategy and hands-on guidance to execute it.' },
  { q: 'Do you look at ads and pricing?', a: 'Yes — ads, pricing, listings, catalogue and channel mix are all analysed for growth opportunities.' },
  { q: 'How is progress measured?', a: 'Clear KPIs and regular reviews tie every recommendation to real revenue impact.' },
]
const FEATURES = [
  { icon: <FiBarChart2 />, t: 'Data-Backed Audit', d: 'Deep analysis of your sales, listings and marketplace data.' },
  { icon: <FiCompass />, t: 'Growth Roadmap', d: 'A prioritised plan showing exactly what to do next.' },
  { icon: <FiTarget />, t: 'Channel Strategy', d: 'The right marketplace and channel mix for your goals.' },
  { icon: <FiDollarSign />, t: 'Pricing & Margin', d: 'Pricing strategy that grows revenue and protects margin.' },
  { icon: <FiZap />, t: 'Quick Wins', d: 'Immediate opportunities to lift sales right now.' },
  { icon: <FiTrendingUp />, t: 'Scaling Playbook', d: 'A repeatable system to keep growing month over month.' },
]
const PROCESS = [
  { n: '01', t: 'Audit & Benchmark', d: 'We pull sales, pricing and ad data across channels and benchmark it against category leaders to spot the gap.' },
  { n: '02', t: 'Pricing Strategy', d: 'We rework price ladders and margin floors per SKU so you compete on value, not just discounts.' },
  { n: '03', t: 'Ad Spend Optimisation', d: 'Budgets get reallocated toward the campaigns and channels with the strongest ROAS, cutting waste fast.' },
  { n: '04', t: 'Expansion Planning', d: 'We map the next marketplaces, categories or regions to enter, sequenced by revenue potential and risk.' },
]
const STACK = ['Price Elasticity Modelling', 'ROAS & CAC Tracking', 'Amazon Ads', 'Meta Ads Manager', 'Google Shopping', 'Contribution Margin Analysis', 'Market Expansion Mapping', 'Competitor Price Tracking', 'Inventory-to-Ad Sync', 'Cohort Revenue Analysis']
const WHY = [
  { icon: <FiSearch />, t: 'Full-Funnel Visibility', d: 'We connect pricing, ad spend and margin data into one view so decisions are never made in silos.' },
  { icon: <FiPieChart />, t: 'Spend That Pays Back', d: 'Every rupee of ad budget is tied to a ROAS target, reviewed weekly and reallocated the moment it underperforms.' },
  { icon: <FiMap />, t: 'Expansion With Evidence', d: 'New markets and categories are only recommended once the demand and margin numbers justify the move.' },
  { icon: <FiShield />, t: 'Margin-First Mindset', d: 'We chase growth that protects your bottom line, not vanity revenue that erodes profitability.' },
]

export default function GrowthConsulting() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="grw">
      <Seo
        title="E-Commerce Growth Consulting Services"
        description="Data-backed audits, pricing strategy and ad-spend optimisation that show online sellers exactly where the next rupee of revenue comes from. Book a free strategy call."
        path="/services/ecom/growth-consulting"
      />
      <section className="grw-hero grw-hero--dark">
        <div className="grw-container grw-hero__inner">
          <div className="grw-hero__text" data-aos="fade-right">
            <span className="grw-tag grw-tag--light"><FiTrendingUp /> E-Commerce Growth Consulting</span>
            <h1 className="grw-hero__title grw-hero__title--light">A Clear Roadmap to<br /><span>More Revenue</span></h1>
            <p className="grw-hero__sub grw-hero__sub--light">Data-backed strategy to scale your online business — we find what's holding you back, map the opportunities and give you a clear plan to grow.</p>
            <div className="grw-hero__cta">
              <Link to="/contact" className="grw-btn grw-btn--solid">Get My Growth Plan <FiArrowRight /></Link>
              <Link to="/contact" className="grw-btn grw-btn--ghost-l">Free Strategy Call</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="grw-features">
        <div className="grw-container">
          <div className="grw-head" data-aos="fade-up"><span className="grw-eyebrow">What You Get</span><h2>Strategy That Scales You</h2></div>
          <div className="grw-features__grid">
            {FEATURES.map((f, i) => (<div className="grw-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}><span className="grw-feature__icon">{f.icon}</span><h3>{f.t}</h3><p>{f.d}</p></div>))}
          </div>
        </div>
      </section>
      <section className="grw-process">
        <div className="grw-container">
          <div className="grw-head" data-aos="fade-up">
            <span className="grw-eyebrow">Our Process</span>
            <h2>How We Work</h2>
          </div>
          <div className="grw-process__track">
            {PROCESS.map((s, i) => (
              <div className="grw-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="grw-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="grw-stack">
        <div className="grw-container">
          <div className="grw-head" data-aos="fade-up">
            <span className="grw-eyebrow">What We Cover</span>
            <h2>Everything That Moves The Needle</h2>
          </div>
          <div className="grw-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="grw-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>
      <section className="grw-why">
        <div className="grw-container">
          <div className="grw-head" data-aos="fade-up">
            <span className="grw-eyebrow">Why Us</span>
            <h2>Why Sellers Choose Us</h2>
          </div>
          <div className="grw-why__grid">
            {WHY.map((w, i) => (
              <div className="grw-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="grw-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceFaq service="E-Commerce Growth Consulting" faqs={FAQS} />
      <section className="grw-cta"><div className="grw-container"><div className="grw-cta__box" data-aos="zoom-in"><FiTrendingUp className="grw-cta__ic" /><h2>Ready to Scale Your Store?</h2><p>Get a free strategy call — we'll show you the biggest opportunities to grow your revenue.</p><Link to="/contact" className="grw-btn grw-btn--light">Book Free Strategy Call <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
