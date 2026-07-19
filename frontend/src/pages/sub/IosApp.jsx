import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiSmartphone, FiZap, FiShield, FiStar, FiTrendingUp, FiLayers, FiArrowRight, FiArrowUpRight, FiCheckCircle, FiUsers } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/MobilePages.css'

const FAQS = [
  { q: 'Do you build native iOS apps?', a: 'Yes, native Swift apps that feel right at home on iPhone and iPad, following Apple\'s design guidelines.' },
  { q: 'Will it pass App Store review?', a: 'We build to Apple\'s guidelines and handle submission, so your app gets approved smoothly.' },
  { q: 'Do you support the latest iOS?', a: 'Always, we build for current iOS versions and keep your app updated with new releases.' },
  { q: 'Can it use iPhone features?', a: 'Yes, camera, notifications, Face ID, Apple Pay, HealthKit and more integrate natively.' },
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
const PROCESS = [
  { n: '01', t: 'Discovery & App Store Fit', d: 'We map your user journeys, check your idea against Apple\'s App Review Guidelines early, and lock the feature set for v1.' },
  { n: '02', t: 'SwiftUI Design & Architecture', d: 'Screens designed to Apple\'s Human Interface Guidelines, then structured in SwiftUI with a clean MVVM and Swift Concurrency foundation.' },
  { n: '03', t: 'Swift Build & TestFlight', d: 'Native Swift development in two-week sprints, with each build shipped to TestFlight so you can tap through real progress on your own iPhone.' },
  { n: '04', t: 'Submission & Launch', d: 'App Store Connect setup, screenshots, ASO metadata and privacy nutrition labels, we handle review and stay on for post-launch updates.' },
]
const STACK = ['Swift', 'SwiftUI', 'UIKit', 'Xcode', 'Swift Concurrency', 'Core Data', 'CloudKit', 'TestFlight', 'App Store Connect', 'Firebase']
const WHY = [
  { icon: <FiStar />, t: 'Apple-Native Craft', d: 'Every screen is built in Swift and SwiftUI to Apple\'s HIG, so your app feels like it belongs on iOS, not like a wrapped website.' },
  { icon: <FiCheckCircle />, t: 'Approved First Time', d: 'We pre-check privacy labels, permissions and payment rules against App Review Guidelines, so submissions clear review without weeks of rejections.' },
  { icon: <FiUsers />, t: 'TestFlight Transparency', d: 'You get a working build on your iPhone every sprint via TestFlight, no black-box development, no surprises at handover.' },
  { icon: <FiTrendingUp />, t: 'Built to Rank & Retain', d: 'ASO-ready listings, App Store screenshots and in-app analytics that turn installs into active, paying users.' },
]

export default function IosApp() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ios">
      <Seo
        title="iOS App Development Company"
        description="Native Swift and SwiftUI apps for iPhone and iPad, built to Apple's HIG with TestFlight builds every sprint and full App Store submission. Book a free consultation."
        path="/services/mobile/ios"
      />
      <section className="ios-hero ios-hero--light">
        <div className="ios-container ios-hero__inner">
          <div className="ios-hero__text" data-aos="fade-right">
            <span className="ios-tag"><FiSmartphone /> iOS App Development</span>
            <h1 className="ios-hero__title">Premium Apps for<br /><span>iPhone &amp; iPad</span></h1>
            <p className="ios-hero__sub">Native iOS apps built in Swift, fast, secure and beautiful, following Apple's guidelines for a premium experience your users will love.</p>
            <div className="ios-hero__cta">
              <Link to="/contact" className="ios-btn ios-btn--solid">Build My iOS App <FiArrowRight /></Link>
              <Link to="/contact" className="ios-btn ios-btn--ghost">Free Consultation</Link>
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
      <section className="ios-process">
        <div className="ios-container">
          <div className="ios-head" data-aos="fade-up">
            <span className="ios-eyebrow">Our Process</span>
            <h2>How We Build</h2>
          </div>
          <div className="ios-process__track">
            {PROCESS.map((s, i) => (
              <div className="ios-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="ios-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="ios-stack">
        <div className="ios-container">
          <div className="ios-head" data-aos="fade-up">
            <span className="ios-eyebrow">Tech Stack</span>
            <h2>Built With Modern Tech</h2>
          </div>
          <div className="ios-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="ios-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>
      <section className="ios-why">
        <div className="ios-container">
          <div className="ios-head" data-aos="fade-up">
            <span className="ios-eyebrow">Why Us</span>
            <h2>Why Businesses Choose Us</h2>
          </div>
          <div className="ios-why__grid">
            {WHY.map((w, i) => (
              <div className="ios-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="ios-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceFaq service="iOS App Development" faqs={FAQS} />
      <section className="ios-cta"><div className="ios-container"><div className="ios-cta__box" data-aos="zoom-in"><FiSmartphone className="ios-cta__ic" /><h2>Ready to Launch on the App Store?</h2><p>Get a free consultation, we'll plan your iOS app from idea to approved launch.</p><Link to="/contact" className="ios-btn ios-btn--light">Book Free Consultation <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
