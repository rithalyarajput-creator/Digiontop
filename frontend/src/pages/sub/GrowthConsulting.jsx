import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiTrendingUp, FiTarget, FiBarChart2, FiDollarSign, FiCompass, FiZap, FiCheck, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
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

export default function GrowthConsulting() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="grw">
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
          <div className="ec-dark" data-aos="fade-left">
            <div className="ec-dark__top"><b>Growth Forecast</b><span className="ec-dark__up"><FiTrendingUp /> +2.4x projected</span></div>
            <div className="ec-dark__chart">{[30, 40, 46, 58, 66, 80, 100].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div>
            <div className="ec-dark__kpis"><div><span>Revenue</span><b>↑ 2.4x</b></div><div><span>Margin</span><b>+8%</b></div><div><span>Channels</span><b>4</b></div></div>
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
      <section className="grw-band"><div className="grw-container grw-band__inner" data-aos="fade-up"><div><b>Data</b><span>Backed Strategy</span></div><div><b>Clear</b><span>Growth Roadmap</span></div><div><b>Real</b><span>Revenue Impact</span></div></div></section>
      <ServiceFaq service="E-Commerce Growth Consulting" faqs={FAQS} />
      <section className="grw-cta"><div className="grw-container"><div className="grw-cta__box" data-aos="zoom-in"><FiTrendingUp className="grw-cta__ic" /><h2>Ready to Scale Your Store?</h2><p>Get a free strategy call — we'll show you the biggest opportunities to grow your revenue.</p><Link to="/contact" className="grw-btn grw-btn--light">Book Free Strategy Call <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
