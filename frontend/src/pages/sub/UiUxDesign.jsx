import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiCheck, FiLayout, FiSmartphone, FiGrid, FiPenTool, FiSearch, FiMap, FiTarget, FiTrendingUp } from 'react-icons/fi'
import '../../styles/SubService.css'

const SERVICES = [
  { icon: <FiLayout />, t: 'Website UI Design' }, { icon: <FiSmartphone />, t: 'Mobile App UI Design' },
  { icon: <FiGrid />, t: 'Dashboard & Admin Panel Design' }, { icon: <FiPenTool />, t: 'Wireframing & Prototyping' },
  { icon: <FiSearch />, t: 'User Experience Research' }, { icon: <FiMap />, t: 'User Journey Mapping' },
  { icon: <FiTarget />, t: 'Landing Page Design' }, { icon: <FiTrendingUp />, t: 'Interface Optimization' },
]
const BENEFITS = ['Better User Experience', 'Higher Engagement', 'Improved Conversion Rates', 'Stronger Brand Perception', 'Reduced User Frustration', 'Increased Customer Retention']

export default function UiUxDesign() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      <section className="ss-hero" style={{ textAlign: 'center' }}>
        <span className="ss-hero__orb ss-hero__orb--1" /><span className="ss-hero__orb ss-hero__orb--2" />
        <div className="ss-container" style={{ position: 'relative' }} data-aos="fade-up">
          <span className="ss-tag"><FiLayout /> UI/UX Design</span>
          <h1 className="ss-hero__title" style={{ maxWidth: 820, margin: '0 auto 18px' }}>Design Experiences That <span>Users Love</span></h1>
          <p className="ss-hero__sub" style={{ margin: '0 auto 28px' }}>A great digital product isn't just about looks — it's about seamless experiences that help users find what they need quickly. We design intuitive interfaces that boost satisfaction and results.</p>
          <div className="ss-hero__actions" style={{ justifyContent: 'center' }}>
            <Link to="/contact" className="ss-btn ss-btn--primary">Design My Product <FiArrowRight /></Link>
            <Link to="/contact" className="ss-btn ss-btn--ghost">Free Consultation</Link>
          </div>
        </div>
      </section>

      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our UI/UX Services</span><h2 className="ss-h2">Interfaces Built Around Your Users</h2></div>
          <div className="uiux-grid">
            {SERVICES.map((s, i) => (
              <div className="uiux-card" key={s.t} data-aos="fade-up" data-aos-delay={(i % 4) * 60}>
                <span className="uiux-card__icon">{s.icon}</span><h3>{s.t}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ss-sec ss-sec--soft">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Benefits</span><h2 className="ss-h2">Why Professional UI/UX Pays Off</h2></div>
          <div className="ss-benefits">{BENEFITS.map((b) => <span className="ss-benefit" key={b} data-aos="zoom-in"><FiCheck /> {b}</span>)}</div>
        </div>
      </section>

      <section className="ss-sec">
        <div className="ss-container ss-head" data-aos="fade-up">
          <span className="ss-eyebrow">Our Approach</span>
          <h2 className="ss-h2">Beautiful Meets Functional</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 14 }}>We combine creativity, usability, and business strategy to design digital experiences that not only look beautiful but also perform effectively and drive growth.</p>
        </div>
      </section>

      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <h2>Create Better User Experiences</h2>
          <p>Transform your website or application into a powerful digital experience that keeps users engaged and drives growth.</p>
          <Link to="/contact" className="ss-btn">Start Your UI/UX Project <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
