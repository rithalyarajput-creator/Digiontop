import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiCheck, FiAward } from 'react-icons/fi'
import '../../styles/SubService.css'

const SERVICES = [
  'Brand Identity Development', 'Brand Positioning Strategy', 'Brand Guidelines',
  'Visual Identity Systems', 'Typography & Color Strategy', 'Marketing Asset Design',
  'Business Stationery Design', 'Brand Consistency Management',
]
const WHY = ['Creates Trust & Credibility', 'Improves Brand Recognition', 'Helps Differentiate From Competitors', 'Builds Customer Loyalty', 'Supports Long-Term Growth']
const STEPS = ['Research', 'Strategy', 'Design', 'Refinement', 'Delivery']

export default function BrandingIdentity() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      {/* HERO — split */}
      <section className="ss-hero">
        <span className="ss-hero__orb ss-hero__orb--1" /><span className="ss-hero__orb ss-hero__orb--2" />
        <div className="ss-container bi-hero" style={{ position: 'relative' }}>
          <div data-aos="fade-right">
            <span className="ss-tag"><FiAward /> Branding &amp; Identity</span>
            <h1 className="ss-hero__title">Build A Brand That <span>People Remember</span></h1>
            <p className="ss-hero__sub">Your brand is more than a logo — it's the personality, reputation, and experience customers associate with your business. We create memorable identities that build trust and recognition.</p>
            <div className="ss-hero__actions">
              <Link to="/contact" className="ss-btn ss-btn--primary">Build My Brand <FiArrowRight /></Link>
              <Link to="/contact" className="ss-btn ss-btn--ghost">Free Consultation</Link>
            </div>
          </div>
          <div className="bi-hero__visual" data-aos="fade-left">
            <div className="bi-badge bi-badge--big">B</div>
            <div className="bi-chip bi-chip--1">Logo</div>
            <div className="bi-chip bi-chip--2">Colors</div>
            <div className="bi-chip bi-chip--3">Typography</div>
            <div className="bi-chip bi-chip--4">Guidelines</div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="ss-sec ss-sec--soft">
        <div className="ss-container ss-head" data-aos="fade-up">
          <span className="ss-eyebrow">Overview</span>
          <h2 className="ss-h2">Powerful, Memorable Brand Identities</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 14 }}>
            From visual identity to brand positioning, we create branding solutions designed to help your
            business stand out, build trust, and establish a strong market presence.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">What We Offer</span><h2 className="ss-h2">Complete Branding Services</h2></div>
          <div className="ss-list">
            {SERVICES.map((s) => (
              <div className="ss-list__item" key={s} data-aos="fade-up"><span className="ss-list__dot"><FiCheck size={14} /></span>{s}</div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="ss-sec ss-sec--soft">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Why Branding Matters</span><h2 className="ss-h2">A Strong Brand Pays Off</h2></div>
          <div className="ss-benefits">
            {WHY.map((w) => <span className="ss-benefit" key={w} data-aos="zoom-in"><FiCheck /> {w}</span>)}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Process</span><h2 className="ss-h2">How We Build Your Brand</h2></div>
          <div className="ss-process" data-aos="fade-up">
            {STEPS.map((s, i) => (
              <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span className="ss-process__step"><b>{i + 1}</b>{s}</span>
                {i < STEPS.length - 1 && <span className="ss-process__arrow">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ss-cta">
        <div className="ss-container">
          <div className="ss-cta__box" data-aos="zoom-in">
            <h2>Ready To Build A Stronger Brand?</h2>
            <p>Create a professional brand identity that leaves a lasting impression and drives business growth.</p>
            <Link to="/contact" className="ss-btn">Start Your Branding Project <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
