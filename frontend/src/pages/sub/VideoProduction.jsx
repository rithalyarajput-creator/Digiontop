import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiPlay, FiVideo, FiFilm, FiCheck } from 'react-icons/fi'
import ServiceWork from '../../components/ServiceWork'
import '../../styles/SubService.css'

const SERVICES = ['Promotional Videos', 'Product Videos', 'Social Media Reels', 'Corporate Videos', 'Motion Graphics', 'Advertisement Videos', 'Brand Story Videos']

export default function VideoProduction() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      {/* dark cinematic hero */}
      <section className="vp-hero">
        <div className="vp-hero__glow" />
        <div className="ss-container" style={{ position: 'relative', textAlign: 'center' }} data-aos="fade-up">
          <span className="ss-tag" style={{ background: 'rgba(245,168,0,0.15)', borderColor: 'rgba(245,168,0,0.4)', color: '#FFD874' }}><FiVideo /> Video Production</span>
          <h1 className="ss-hero__title" style={{ color: '#fff', maxWidth: 880, margin: '0 auto 18px' }}>Professional Videos That <span>Capture Attention &amp; Drive Results</span></h1>
          <p className="ss-hero__sub" style={{ color: 'rgba(255,255,255,0.7)', margin: '0 auto 28px' }}>High-quality video content designed to engage audiences, strengthen your brand, and improve marketing performance.</p>
          <div className="ss-hero__actions" style={{ justifyContent: 'center' }}>
            <Link to="/contact" className="ss-btn ss-btn--primary">Create My Video <FiArrowRight /></Link>
          </div>
          <div className="vp-play"><FiPlay /></div>
        </div>
      </section>

      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Services</span><h2 className="ss-h2">Video Content That Performs</h2></div>
          <div className="ss-list">
            {SERVICES.map((s) => <div className="ss-list__item" key={s} data-aos="fade-up"><span className="ss-list__dot"><FiFilm size={14} /></span>{s}</div>)}
          </div>
        </div>
      </section>

      <ServiceWork accent="#F5A800" accentSoft="#FFF3CC" heading="Reels & Videos We've Produced" subtitle="Real short-form video content we've created for brands." />

      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <h2>Let's Create Videos That Convert</h2>
          <p>Engage your audience with professional video content built to grow your brand.</p>
          <Link to="/contact" className="ss-btn">Start Your Video Project <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
