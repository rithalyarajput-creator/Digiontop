import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiSmartphone, FiZap, FiUsers, FiShield, FiTrendingUp, FiLayers, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/MobilePages.css'

const FAQS = [
  { q: 'Do you build native Android apps?', a: 'Yes — native Kotlin apps optimised for the huge range of Android devices and versions.' },
  { q: 'Will it work on all Android phones?', a: 'We build responsive, adaptive apps tested across screen sizes and Android versions for wide reach.' },
  { q: 'Do you publish to Play Store?', a: 'Absolutely — we handle Play Store submission, policies and approval.' },
  { q: 'Can it use device features?', a: 'Yes — camera, GPS, notifications, biometrics, payments and more integrate natively.' },
  { q: 'How long does an Android app take?', a: 'Typically 8–14 weeks depending on features, with a clear roadmap shared upfront.' },
]
const FEATURES = [
  { icon: <FiSmartphone />, t: 'Native Kotlin', d: 'Modern, performant apps built the right way for Android.' },
  { icon: <FiUsers />, t: 'Widest Reach', d: 'Android powers billions of devices — reach them all.' },
  { icon: <FiZap />, t: 'Optimised Performance', d: 'Smooth, fast apps across the full device range.' },
  { icon: <FiShield />, t: 'Secure & Compliant', d: 'Best-practice security and Play policy compliance.' },
  { icon: <FiLayers />, t: 'Material Design', d: 'Clean, intuitive UI following Google\'s design system.' },
  { icon: <FiTrendingUp />, t: 'Play Store Ready', d: 'Full submission, ASO and launch support.' },
]

export default function AndroidApp() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="and">
      <section className="and-hero and-hero--dark">
        <div className="and-hero__grid" />
        <div className="and-container and-hero__inner">
          <div className="and-hero__text" data-aos="fade-right">
            <span className="and-tag and-tag--light"><FiSmartphone /> Android App Development</span>
            <h1 className="and-hero__title and-hero__title--light">Reach Billions on<br /><span>Android</span></h1>
            <p className="and-hero__sub and-hero__sub--light">Native Kotlin Android apps — fast, secure and Material-designed, built to reach the widest possible audience and scale with you.</p>
            <div className="and-hero__cta">
              <Link to="/contact" className="and-btn and-btn--solid">Build My Android App <FiArrowRight /></Link>
              <Link to="/contact" className="and-btn and-btn--ghost-l">Discuss My Idea</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="and-features">
        <div className="and-container">
          <div className="and-head" data-aos="fade-up"><span className="and-eyebrow">Why Native Android</span><h2>Built for the Whole Market</h2></div>
          <div className="and-features__grid">
            {FEATURES.map((f, i) => (<div className="and-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}><span className="and-feature__icon">{f.icon}</span><h3>{f.t}</h3><p>{f.d}</p></div>))}
          </div>
        </div>
      </section>
      <section className="and-band"><div className="and-container and-band__inner" data-aos="fade-up"><div><b>Kotlin</b><span>Modern Native</span></div><div><b>Billions</b><span>Of Devices</span></div><div><b>Play</b><span>Store Ready</span></div></div></section>
      <ServiceFaq service="Android App Development" faqs={FAQS} />
      <section className="and-cta"><div className="and-container"><div className="and-cta__box" data-aos="zoom-in"><FiSmartphone className="and-cta__ic" /><h2>Ready to Reach Millions?</h2><p>Get a free consultation — we'll plan your Android app from idea to Play Store launch.</p><Link to="/contact" className="and-btn and-btn--light">Discuss My Project <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
