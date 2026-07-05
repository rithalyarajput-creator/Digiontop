import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiSmartphone, FiZap, FiShield, FiStar, FiTrendingUp, FiLayers, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/MobilePages.css'

const FAQS = [
  { q: 'Do you build native iOS apps?', a: 'Yes — native Swift apps that feel right at home on iPhone and iPad, following Apple\'s design guidelines.' },
  { q: 'Will it pass App Store review?', a: 'We build to Apple\'s guidelines and handle submission, so your app gets approved smoothly.' },
  { q: 'Do you support the latest iOS?', a: 'Always — we build for current iOS versions and keep your app updated with new releases.' },
  { q: 'Can it use iPhone features?', a: 'Yes — camera, notifications, Face ID, Apple Pay, HealthKit and more integrate natively.' },
  { q: 'How long does an iOS app take?', a: 'Typically 8–14 weeks depending on features, with clear milestones along the way.' },
]
const FEATURES = [
  { icon: <FiSmartphone />, t: 'Native Swift', d: 'True native performance and feel on every Apple device.' },
  { icon: <FiStar />, t: 'Apple Guidelines', d: 'Designed to Apple\'s HIG for a premium, approved app.' },
  { icon: <FiZap />, t: 'Silky Performance', d: '60fps interactions and instant, responsive UI.' },
  { icon: <FiShield />, t: 'Face ID & Secure', d: 'Biometric auth and encrypted, privacy-first design.' },
  { icon: <FiLayers />, t: 'iPhone + iPad', d: 'Adaptive layouts that shine on every screen size.' },
  { icon: <FiTrendingUp />, t: 'App Store Ready', d: 'Full submission, ASO and launch support.' },
]

export default function IosApp() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ios">
      <section className="ios-hero ios-hero--light">
        <div className="ios-container ios-hero__inner">
          <div className="ios-hero__text" data-aos="fade-right">
            <span className="ios-tag"><FiSmartphone /> iOS App Development</span>
            <h1 className="ios-hero__title">Premium Apps for<br /><span>iPhone &amp; iPad</span></h1>
            <p className="ios-hero__sub">Native iOS apps built in Swift — fast, secure and beautiful, following Apple's guidelines for a premium experience your users will love.</p>
            <div className="ios-hero__cta">
              <Link to="/contact" className="ios-btn ios-btn--solid">Build My iOS App <FiArrowRight /></Link>
              <Link to="/contact" className="ios-btn ios-btn--ghost">Free Consultation</Link>
            </div>
          </div>
          <div className="mp-phone" data-aos="fade-left">
            <span className="mp-phone__notch" />
            <div className="mp-phone__screen">
              <div className="mp-phone__top"><span className="mp-phone__logo" /><b>iOS App</b></div>
              <div className="mp-phone__hero"><FiSmartphone /></div>
              <div className="mp-phone__cards"><span /><span /><span /><span /></div>
              <div className="mp-phone__nav"><i /><i /><i /><i /></div>
            </div>
          </div>
        </div>
      </section>
      <section className="ios-features">
        <div className="ios-container">
          <div className="ios-head" data-aos="fade-up"><span className="ios-eyebrow">Why Native iOS</span><h2>Crafted for Apple Users</h2></div>
          <div className="ios-features__grid">
            {FEATURES.map((f, i) => (<div className="ios-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}><span className="ios-feature__icon">{f.icon}</span><h3>{f.t}</h3><p>{f.d}</p></div>))}
          </div>
        </div>
      </section>
      <section className="ios-band"><div className="ios-container ios-band__inner" data-aos="fade-up"><div><b>Native</b><span>Swift Performance</span></div><div><b>Approved</b><span>App Store Ready</span></div><div><b>Secure</b><span>Face ID & Privacy</span></div></div></section>
      <ServiceFaq service="iOS App Development" faqs={FAQS} />
      <section className="ios-cta"><div className="ios-container"><div className="ios-cta__box" data-aos="zoom-in"><FiSmartphone className="ios-cta__ic" /><h2>Ready to Launch on the App Store?</h2><p>Get a free consultation — we'll plan your iOS app from idea to approved launch.</p><Link to="/contact" className="ios-btn ios-btn--light">Book Free Consultation <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
