import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiTrendingUp, FiTarget, FiActivity, FiBarChart2, FiCheck } from 'react-icons/fi'
import '../../styles/SubService.css'

const SERVICES = [
  { icon: <FiTarget />, t: 'Landing Page Optimization' }, { icon: <FiTrendingUp />, t: 'Funnel Optimization' },
  { icon: <FiActivity />, t: 'A/B Testing' }, { icon: <FiBarChart2 />, t: 'User Behavior Analysis' },
  { icon: <FiActivity />, t: 'Heatmap Analysis' }, { icon: <FiTarget />, t: 'Conversion Tracking' },
  { icon: <FiTrendingUp />, t: 'Performance Improvements' },
]
const BENEFITS = ['More Leads', 'Better Sales Performance', 'Higher ROI', 'Improved User Experience', 'Better Marketing Results']

export default function CroServices() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      <section className="ss-hero">
        <span className="ss-hero__orb ss-hero__orb--1" /><span className="ss-hero__orb ss-hero__orb--2" />
        <div className="ss-container ds-hero" style={{ position: 'relative' }}>
          <div data-aos="fade-right">
            <span className="ss-tag"><FiTrendingUp /> CRO Services</span>
            <h1 className="ss-hero__title">Turn More Visitors <span>Into Customers</span></h1>
            <p className="ss-hero__sub">Conversion Rate Optimization improves your website's performance and increases the percentage of visitors who take action.</p>
            <div className="ss-hero__actions"><Link to="/contact" className="ss-btn ss-btn--primary">Boost My Conversions <FiArrowRight /></Link><Link to="/contact" className="ss-btn ss-btn--ghost">Free Audit</Link></div>
          </div>
          <div className="ds-stats" data-aos="fade-left">
            <div className="ds-stat"><b>+CR</b><span>More Conversions</span></div>
            <div className="ds-stat"><b>A/B</b><span>Tested</span></div>
            <div className="ds-stat"><b>ROI</b><span>Focused</span></div>
            <div className="ds-stat"><b>Data</b><span>Driven</span></div>
          </div>
        </div>
      </section>

      <section className="ss-sec ss-sec--soft">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Services</span><h2 className="ss-h2">Optimize Every Step</h2></div>
          <div className="uiux-grid">
            {SERVICES.map((s) => <div className="uiux-card" key={s.t} data-aos="fade-up"><span className="uiux-card__icon">{s.icon}</span><h3>{s.t}</h3></div>)}
          </div>
        </div>
      </section>

      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Benefits</span><h2 className="ss-h2">Real Results, Measurable Growth</h2></div>
          <div className="ss-benefits">{BENEFITS.map((b) => <span className="ss-benefit" key={b} data-aos="zoom-in"><FiCheck /> {b}</span>)}</div>
        </div>
      </section>

      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <h2>Convert More, Earn More</h2>
          <p>Stop losing visitors — let's optimize your funnel to turn traffic into real customers.</p>
          <Link to="/contact" className="ss-btn">Start CRO Optimization <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
