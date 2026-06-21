import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiCheck } from 'react-icons/fi'
import '../../styles/SubService.css'

/* Reusable layout for the 8 E-Commerce sub-service pages.
   Each page passes its own data — same animated structure, distinct content. */
export default function MarketplacePage({ tag, icon, titleA, titleB, intro, intro2, services, benefits, ctaTitle, ctaText, heroImg }) {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      {/* HERO — split with image */}
      <section className="ss-hero">
        <span className="ss-hero__orb ss-hero__orb--1" /><span className="ss-hero__orb ss-hero__orb--2" />
        <div className="ss-container ds-hero" style={{ position: 'relative' }}>
          <div data-aos="fade-right">
            <span className="ss-tag">{icon} {tag}</span>
            <h1 className="ss-hero__title">{titleA} <span>{titleB}</span></h1>
            <p className="ss-hero__sub">{intro}</p>
            <div className="ss-hero__actions">
              <Link to="/contact" className="ss-btn ss-btn--primary">Get Started <FiArrowRight /></Link>
              <Link to="/contact" className="ss-btn ss-btn--ghost">Free Consultation</Link>
            </div>
          </div>
          {heroImg && (
            <div className="ec-hero__media" data-aos="fade-left">
              <img src={heroImg} alt={tag} loading="eager" />
            </div>
          )}
        </div>
      </section>

      {/* OVERVIEW */}
      {intro2 && (
        <section className="ss-sec ss-sec--soft">
          <div className="ss-container ss-head" data-aos="fade-up">
            <span className="ss-eyebrow">Overview</span>
            <h2 className="ss-h2">{tag}</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 14 }}>{intro2}</p>
          </div>
        </section>
      )}

      {/* SERVICES INCLUDE */}
      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Services Include</span><h2 className="ss-h2">What We Deliver</h2></div>
          <div className="ss-list">
            {services.map((s) => (
              <div className="ss-list__item" key={s} data-aos="fade-up"><span className="ss-list__dot"><FiCheck size={14} /></span>{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS (dark) */}
      <section className="ss-sec ss-sec--dark">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow ss-eyebrow--light">Benefits</span><h2 className="ss-h2 ss-h2--light">Why It Works</h2></div>
          <div className="ec-achieve">
            {benefits.map((b) => <div className="ec-achieve__item" key={b} data-aos="fade-up"><FiCheck /> {b}</div>)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: 8 }}>🚀</span>
          <h2>{ctaTitle}</h2>
          <p>{ctaText}</p>
          <Link to="/contact" className="ss-btn">Get Free Consultation <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
