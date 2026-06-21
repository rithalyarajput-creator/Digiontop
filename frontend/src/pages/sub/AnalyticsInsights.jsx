import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiBarChart2, FiActivity, FiTarget, FiPieChart, FiTrendingUp, FiCheck } from 'react-icons/fi'
import '../../styles/SubService.css'

const SERVICES = [
  { icon: <FiBarChart2 />, t: 'Google Analytics Setup' }, { icon: <FiTarget />, t: 'Conversion Tracking' },
  { icon: <FiActivity />, t: 'User Behavior Analysis' }, { icon: <FiPieChart />, t: 'Campaign Reporting' },
  { icon: <FiBarChart2 />, t: 'Performance Dashboards' }, { icon: <FiTrendingUp />, t: 'Growth Insights' },
]

export default function AnalyticsInsights() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      <section className="ss-hero" style={{ textAlign: 'center' }}>
        <span className="ss-hero__orb ss-hero__orb--1" /><span className="ss-hero__orb ss-hero__orb--2" />
        <div className="ss-container" style={{ position: 'relative' }} data-aos="fade-up">
          <span className="ss-tag"><FiBarChart2 /> Analytics &amp; Insights</span>
          <h1 className="ss-hero__title" style={{ maxWidth: 820, margin: '0 auto 18px' }}>Turn Data Into <span>Better Business Decisions</span></h1>
          <p className="ss-hero__sub" style={{ margin: '0 auto 28px' }}>Understand customer behaviour, track performance, and identify growth opportunities through advanced analytics and reporting.</p>
          <div className="ss-hero__actions" style={{ justifyContent: 'center' }}><Link to="/contact" className="ss-btn ss-btn--primary">Get My Insights <FiArrowRight /></Link></div>
        </div>
      </section>

      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Services</span><h2 className="ss-h2">Data That Drives Growth</h2></div>
          <div className="uiux-grid">
            {SERVICES.map((s) => <div className="uiux-card" key={s.t} data-aos="fade-up"><span className="uiux-card__icon">{s.icon}</span><h3>{s.t}</h3></div>)}
          </div>
        </div>
      </section>

      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <h2>Make Smarter Decisions</h2>
          <p>Track what matters and turn your data into real, measurable business growth.</p>
          <Link to="/contact" className="ss-btn">Start With Analytics <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
