import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiPenTool, FiCheck } from 'react-icons/fi'
import '../../styles/SubService.css'

const SERVICES = ['Custom Logo Design', 'Modern Logo Concepts', 'Brand Marks', 'Icon Design', 'Typography Logos', 'Logo Usage Guidelines']

export default function LogoDesign() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      <section className="ss-hero">
        <span className="ss-hero__orb ss-hero__orb--1" /><span className="ss-hero__orb ss-hero__orb--2" />
        <div className="ss-container bi-hero" style={{ position: 'relative' }}>
          <div data-aos="fade-right">
            <span className="ss-tag"><FiPenTool /> Logo Design</span>
            <h1 className="ss-hero__title">Logo Design That <span>Represents Your Brand</span></h1>
            <p className="ss-hero__sub">Your logo is the face of your business. We create unique, memorable logos that strengthen your identity and make a powerful first impression.</p>
            <div className="ss-hero__actions"><Link to="/contact" className="ss-btn ss-btn--primary">Design My Logo <FiArrowRight /></Link><Link to="/contact" className="ss-btn ss-btn--ghost">Free Consultation</Link></div>
          </div>
          <div className="bi-hero__visual" data-aos="fade-left">
            <div className="logo-grid">
              <span>A</span><span>B</span><span className="logo-grid--hi">D</span><span>M</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ss-sec ss-sec--soft">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Services</span><h2 className="ss-h2">Logos That Make An Impression</h2></div>
          <div className="ss-list">
            {SERVICES.map((s) => <div className="ss-list__item" key={s} data-aos="fade-up"><span className="ss-list__dot"><FiCheck size={14} /></span>{s}</div>)}
          </div>
        </div>
      </section>

      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <h2>Get A Logo You'll Love</h2>
          <p>A unique, professional logo that becomes the recognizable face of your brand.</p>
          <Link to="/contact" className="ss-btn">Start Your Logo <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
