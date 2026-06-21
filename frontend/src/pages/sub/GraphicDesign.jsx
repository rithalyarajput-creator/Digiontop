import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiImage, FiCheck } from 'react-icons/fi'
import ServiceWork from '../../components/ServiceWork'
import '../../styles/SubService.css'

const SERVICES = ['Social Media Creatives', 'Advertising Banners', 'Brochure Design', 'Flyer Design', 'Business Cards', 'Marketing Materials', 'Presentation Design']

export default function GraphicDesign() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      <section className="ss-hero" style={{ textAlign: 'center' }}>
        <span className="ss-hero__orb ss-hero__orb--1" /><span className="ss-hero__orb ss-hero__orb--2" />
        <div className="ss-container" style={{ position: 'relative' }} data-aos="fade-up">
          <span className="ss-tag"><FiImage /> Graphic Design</span>
          <h1 className="ss-hero__title" style={{ maxWidth: 820, margin: '0 auto 18px' }}>Creative Designs That <span>Strengthen Your Brand</span></h1>
          <p className="ss-hero__sub" style={{ margin: '0 auto 28px' }}>Professional graphics designed to attract attention, communicate effectively, and support your marketing goals.</p>
          <div className="ss-hero__actions" style={{ justifyContent: 'center' }}><Link to="/contact" className="ss-btn ss-btn--primary">Get Designs <FiArrowRight /></Link></div>
        </div>
      </section>

      <section className="ss-sec ss-sec--soft">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Services</span><h2 className="ss-h2">Designs For Every Need</h2></div>
          <div className="ss-list">
            {SERVICES.map((s) => <div className="ss-list__item" key={s} data-aos="fade-up"><span className="ss-list__dot"><FiCheck size={14} /></span>{s}</div>)}
          </div>
        </div>
      </section>

      <ServiceWork accent="#F5A800" accentSoft="#FFF3CC" heading="Creative Posts We've Designed" subtitle="A glimpse of the creative graphics and posts we produce for brands." />

      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <h2>Make Your Brand Look Premium</h2>
          <p>Professional, on-brand graphics that get noticed and drive engagement.</p>
          <Link to="/contact" className="ss-btn">Start Your Design Project <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
