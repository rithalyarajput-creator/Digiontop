import { useEffect } from 'react'
import { FaRocket } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiCheck } from 'react-icons/fi'
import RelatedServices from '../../components/RelatedServices'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/SubService.css'

/* Generic FAQs reused across service pages (SEO-friendly, conversion-focused). */
function buildFaqs(tag) {
  return [
    { q: `How soon will I see results from ${tag}?`, a: `Most ${tag.toLowerCase()} projects show first measurable results within 30–90 days, depending on your starting point, scope, and goals. We focus on real, trackable outcomes.` },
    { q: `How much does ${tag} cost?`, a: `Pricing depends on your needs and scope. After a free consultation we send a clear, custom quote, no hidden charges, no long lock-in contracts.` },
    { q: `Do I need a long-term contract?`, a: `No. We work in flexible engagements and earn your trust with results. You stay because it works, not because of a contract.` },
    { q: `Will I get regular updates and reports?`, a: `Yes, you get clear, honest progress reports so you always know what we did, what worked, and what's next.` },
    { q: `Why should I choose DigionTop for ${tag}?`, a: `A senior specialist owns your project, we focus on measurable business growth, and every solution is custom-built for your goals, not templated.` },
  ]
}

/* Reusable layout for the E-Commerce / Mobile / Social sub-service pages.
   Each page passes its own data — same animated structure, distinct content.

   SEO note: this component is never routed directly — it is always rendered by a
   routed wrapper (EcomServicePage / MobileServicePage / SocialServicePage). Only
   those wrappers know the real URL for the current slug, so each one renders its
   own <Seo> with a per-slug title, description and canonical. Deliberately no
   <Seo> here: a shared template has no single canonical URL of its own. */
export default function MarketplacePage({ tag, icon, titleA, titleB, intro, intro2, services, benefits, ctaTitle, ctaText, heroImg, category }) {
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

      {/* FAQs + lead form */}
      <ServiceFaq service={tag} faqs={buildFaqs(tag)} />

      {/* Related services in same category */}
      {category && <RelatedServices categoryHeading={category} />}

      {/* CTA */}
      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <FaRocket style={{ fontSize: '2.2rem', display: 'block', margin: '0 auto 8px', color: '#F5A800' }} />
          <h2>{ctaTitle}</h2>
          <p>{ctaText}</p>
          <Link to="/contact" className="ss-btn">Get Free Consultation <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
