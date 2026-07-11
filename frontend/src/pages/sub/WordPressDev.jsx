import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiEdit3, FiZap, FiLayers, FiShield, FiSettings, FiTrendingUp,
  FiCheck, FiArrowRight, FiArrowUpRight, FiGlobe,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/WebDevPages.css'

const FAQS = [
  { q: 'Why choose WordPress?', a: 'It powers 40%+ of the web — flexible, SEO-friendly and easy for you to update yourself, with endless plugins and themes.' },
  { q: 'Can I edit the site myself?', a: 'Yes — WordPress has a simple editor. We also give you a walkthrough so you can update content confidently.' },
  { q: 'Will it be fast and secure?', a: 'We optimise speed, add caching and CDN, and harden security so your WordPress site is fast and safe.' },
  { q: 'Do you build custom themes?', a: 'Yes — custom themes or premium theme customisation, tailored to your brand and needs.' },
  { q: 'Can you migrate my existing site?', a: 'Absolutely — we migrate to WordPress safely, keeping your content, SEO and rankings intact.' },
]

const FEATURES = [
  { icon: <FiEdit3 />, t: 'Easy to Edit', d: 'Update text, images and pages yourself with a simple editor.' },
  { icon: <FiLayers />, t: 'Custom Themes', d: 'Bespoke, on-brand designs — not generic off-the-shelf templates.' },
  { icon: <FiZap />, t: 'Speed Optimised', d: 'Caching, CDN and clean setup for fast load times.' },
  { icon: <FiShield />, t: 'Secure & Updated', d: 'Hardened security, backups and maintenance handled.' },
  { icon: <FiSettings />, t: 'Plugin Integrations', d: 'Any tool you need — forms, SEO, booking, e-commerce & more.' },
  { icon: <FiTrendingUp />, t: 'SEO-Friendly', d: 'Built with SEO best-practices so you rank on Google.' },
]

export default function WordPressDev() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="wp">
      <section className="wp-hero wp-hero--dark">
        <div className="wp-hero__grid" />
        <div className="wp-container wp-hero__inner">
          <div className="wp-hero__text" data-aos="fade-right">
            <span className="wp-tag wp-tag--light"><FiGlobe /> WordPress Development</span>
            <h1 className="wp-hero__title wp-hero__title--light">Powerful Sites You<br /><span>Can Update Yourself</span></h1>
            <p className="wp-hero__sub wp-hero__sub--light">Custom WordPress websites that are fast, secure and SEO-ready — with an easy editor so you stay in control of your content.</p>
            <div className="wp-hero__cta">
              <Link to="/contact" className="wp-btn wp-btn--solid">Build on WordPress <FiArrowRight /></Link>
              <Link to="/contact" className="wp-btn wp-btn--ghost-l">Free Quote</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="wp-features">
        <div className="wp-container">
          <div className="wp-head" data-aos="fade-up">
            <span className="wp-eyebrow">Why WordPress</span>
            <h2>Flexible, Fast &amp; Fully Yours</h2>
          </div>
          <div className="wp-features__grid">
            {FEATURES.map((f, i) => (
              <div className="wp-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="wp-feature__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wp-band">
        <div className="wp-container wp-band__inner" data-aos="fade-up">
          <div><b>40%+</b><span>Of the Web Runs WP</span></div>
          <div><b>Self</b><span>Editable Content</span></div>
          <div><b>SEO</b><span>Friendly Structure</span></div>
        </div>
      </section>

      <ServiceFaq service="WordPress Development" faqs={FAQS} />

      <section className="wp-cta">
        <div className="wp-container">
          <div className="wp-cta__box" data-aos="zoom-in">
            <FiGlobe className="wp-cta__ic" />
            <h2>Ready for a WordPress Site You Control?</h2>
            <p>Get a free quote — we'll build a fast, flexible WordPress site you can easily manage.</p>
            <Link to="/contact" className="wp-btn wp-btn--light">Get My Free Quote <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
