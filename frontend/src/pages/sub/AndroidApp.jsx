import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiSmartphone, FiZap, FiUsers, FiShield, FiTrendingUp, FiLayers, FiArrowRight, FiArrowUpRight, FiCode, FiCheckCircle, FiClock } from 'react-icons/fi'
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
const PROCESS = [
  { n: '01', t: 'Discovery & Device Strategy', d: 'We map your user journeys, pick a minSdk that covers your real audience and agree the Android version and form-factor matrix we will support.' },
  { n: '02', t: 'Architecture & Compose UI', d: 'We set up a Kotlin MVVM + Clean Architecture base with Hilt, Coroutines and Flow, then design the screens in Jetpack Compose against Material 3.' },
  { n: '03', t: 'Build, Test & Instrument', d: 'Feature sprints ship to Firebase App Distribution with unit, Compose UI and Espresso tests plus Crashlytics and Analytics wired in from day one.' },
  { n: '04', t: 'Play Store Launch & Iterate', d: 'We prepare the signed App Bundle, store listing and data-safety form, run a staged rollout on Play Console, then tune with Vitals and ASO data.' },
]
const STACK = ['Kotlin', 'Jetpack Compose', 'Material 3', 'Coroutines & Flow', 'Hilt', 'Room', 'Retrofit', 'Firebase', 'Play Console', 'Android Studio']
const WHY = [
  { icon: <FiCode />, t: '100% Kotlin & Compose', d: 'No legacy XML layouts or Java debt — a modern declarative codebase your next developer will actually enjoy inheriting.' },
  { icon: <FiCheckCircle />, t: 'Play Policy Handled', d: 'Data safety, target API levels, permissions and billing rules are handled for you, so your release is not rejected at the last hurdle.' },
  { icon: <FiZap />, t: 'Fast on Cheap Phones', d: 'We profile with Baseline Profiles and Android Vitals so the app stays smooth on the low-end devices most of your users actually own.' },
  { icon: <FiClock />, t: 'Ship Every Sprint', d: 'You get a working build on your own phone every two weeks — no black box, no six-month wait to see progress.' },
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
      <section className="and-process">
        <div className="and-container">
          <div className="and-head" data-aos="fade-up">
            <span className="and-eyebrow">Our Process</span>
            <h2>How We Build</h2>
          </div>
          <div className="and-process__track">
            {PROCESS.map((s, i) => (
              <div className="and-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="and-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="and-stack">
        <div className="and-container">
          <div className="and-head" data-aos="fade-up">
            <span className="and-eyebrow">Tech Stack</span>
            <h2>Built With Modern Tech</h2>
          </div>
          <div className="and-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="and-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>
      <section className="and-why">
        <div className="and-container">
          <div className="and-head" data-aos="fade-up">
            <span className="and-eyebrow">Why Us</span>
            <h2>Why Businesses Choose Us</h2>
          </div>
          <div className="and-why__grid">
            {WHY.map((w, i) => (
              <div className="and-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="and-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceFaq service="Android App Development" faqs={FAQS} />
      <section className="and-cta"><div className="and-container"><div className="and-cta__box" data-aos="zoom-in"><FiSmartphone className="and-cta__ic" /><h2>Ready to Reach Millions?</h2><p>Get a free consultation — we'll plan your Android app from idea to Play Store launch.</p><Link to="/contact" className="and-btn and-btn--light">Discuss My Project <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
