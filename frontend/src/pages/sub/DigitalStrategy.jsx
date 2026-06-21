import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiCompass, FiTrendingUp, FiTarget, FiUsers, FiAward, FiCalendar, FiCheck } from 'react-icons/fi'
import '../../styles/SubService.css'

const SERVICES = [
  { icon: <FiTrendingUp />, t: 'Business Growth Strategy' }, { icon: <FiCompass />, t: 'Digital Marketing Planning' },
  { icon: <FiTarget />, t: 'Competitor Research' }, { icon: <FiUsers />, t: 'Customer Journey Mapping' },
  { icon: <FiAward />, t: 'Brand Strategy' }, { icon: <FiCalendar />, t: 'Campaign Planning' },
]

export default function DigitalStrategy() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      <section className="ss-hero">
        <span className="ss-hero__orb ss-hero__orb--1" /><span className="ss-hero__orb ss-hero__orb--2" />
        <div className="ss-container ds-hero" style={{ position: 'relative' }}>
          <div data-aos="fade-right">
            <span className="ss-tag"><FiCompass /> Digital Strategy</span>
            <h1 className="ss-hero__title">Strategic Solutions For <span>Sustainable Growth</span></h1>
            <p className="ss-hero__sub">Develop data-driven strategies that help your business reach the right audience, improve visibility, and achieve measurable results.</p>
            <div className="ss-hero__actions"><Link to="/contact" className="ss-btn ss-btn--primary">Build My Strategy <FiArrowRight /></Link><Link to="/contact" className="ss-btn ss-btn--ghost">Free Consultation</Link></div>
          </div>
          <div className="ds-stats" data-aos="fade-left">
            <div className="ds-stat"><b>2x</b><span>Avg Growth</span></div>
            <div className="ds-stat"><b>90d</b><span>Roadmap</span></div>
            <div className="ds-stat"><b>360°</b><span>Approach</span></div>
            <div className="ds-stat"><b>#1</b><span>Goal: Top</span></div>
          </div>
        </div>
      </section>

      <section className="ss-sec ss-sec--soft">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Services</span><h2 className="ss-h2">Strategy That Drives Results</h2></div>
          <div className="uiux-grid">
            {SERVICES.map((s) => <div className="uiux-card" key={s.t} data-aos="fade-up"><span className="uiux-card__icon">{s.icon}</span><h3>{s.t}</h3></div>)}
          </div>
        </div>
      </section>

      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <h2>Ready For A Winning Strategy?</h2>
          <p>Get a clear, data-driven roadmap that aligns your brand, marketing, and business goals.</p>
          <Link to="/contact" className="ss-btn">Get Your Strategy <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
