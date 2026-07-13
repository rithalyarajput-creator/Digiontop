import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiSmartphone, FiZap, FiLayers, FiBell, FiLock, FiTrendingUp,
  FiCheck, FiArrowRight, FiArrowUpRight, FiGrid, FiHome,
  FiShield, FiUsers, FiUploadCloud,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/MobilePages.css'

const FAQS = [
  { q: 'Do you build for both iOS and Android?', a: 'Yes — native or cross-platform apps that run beautifully on both, tailored to your budget and goals.' },
  { q: 'How long does app development take?', a: 'A typical app takes 8–16 weeks depending on features. We share a clear roadmap and milestones upfront.' },
  { q: 'Will you publish it to the app stores?', a: 'Absolutely — we handle App Store and Play Store submission, guidelines and approval.' },
  { q: 'Can it integrate with my systems?', a: 'Yes — payments, APIs, CRMs and backend systems all integrate seamlessly.' },
  { q: 'Do you provide post-launch support?', a: 'We offer ongoing maintenance, updates and new features as your app grows.' },
]

const FEATURES = [
  { icon: <FiLayers />, t: 'Native & Cross-Platform', d: 'Apps that feel native on both iOS and Android.' },
  { icon: <FiZap />, t: 'Fast & Smooth', d: 'Optimised performance with buttery-smooth interactions.' },
  { icon: <FiBell />, t: 'Push Notifications', d: 'Re-engage users with timely, targeted notifications.' },
  { icon: <FiLock />, t: 'Secure by Design', d: 'Authentication, encryption and best-practice security.' },
  { icon: <FiGrid />, t: 'Custom Features', d: 'Any functionality your business needs, built to spec.' },
  { icon: <FiTrendingUp />, t: 'Scalable Backend', d: 'Cloud infrastructure that grows with your users.' },
]

const PROCESS = [
  { n: '01', t: 'Discovery & App Blueprint', d: 'We map your user journeys, define the MVP feature set and decide native vs cross-platform based on your budget, timeline and performance needs.' },
  { n: '02', t: 'UX Wireframes & UI Design', d: 'We design every screen to Apple Human Interface and Material Design standards, then hand you a clickable prototype to tap through before a line of code is written.' },
  { n: '03', t: 'Build, API & QA Testing', d: 'Sprint-based development with a secure backend and API layer, tested on real iPhone and Android devices across screen sizes, OS versions and offline states.' },
  { n: '04', t: 'Store Launch & Growth', d: 'We handle App Store and Play Store submission, review guidelines and ASO listing, then monitor crashes, analytics and ship updates after go-live.' },
]

const STACK = [
  'Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'React Native',
  'Flutter', 'Node.js', 'Firebase', 'GraphQL', 'App Store & Play Console',
]

const WHY = [
  { icon: <FiUsers />, t: 'One Codebase, Two Stores', d: 'Cross-platform builds in React Native or Flutter cut your cost and timeline roughly in half while still feeling native on iOS and Android.' },
  { icon: <FiZap />, t: 'Performance You Can Feel', d: 'We obsess over 60fps scrolling, sub-2-second cold starts and lean bundle sizes so your app never feels sluggish on mid-range Android phones.' },
  { icon: <FiShield />, t: 'Store-Approval Ready', d: 'Privacy manifests, permission prompts, data-safety forms and review guidelines are handled upfront — so your app gets approved, not rejected.' },
  { icon: <FiUploadCloud />, t: 'Support Beyond Launch', d: 'OS updates, crash monitoring, new features and store releases are covered by ongoing retainers — your app keeps improving after day one.' },
]

export default function MobileApp() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="mob">
      <Seo
        title="Mobile App Development Company"
        description="Native and cross-platform apps for iOS and Android with secure APIs, push notifications and full App Store and Play Store launch support. Get your app blueprint free."
        path="/services/mobile/mobile-app"
      />
      <section className="mob-hero mob-hero--dark">
        <div className="mob-hero__grid" />
        <div className="mob-container mob-hero__inner">
          <div className="mob-hero__text" data-aos="fade-right">
            <span className="mob-tag mob-tag--light"><FiSmartphone /> Mobile App Development</span>
            <h1 className="mob-hero__title mob-hero__title--light">Apps Your Customers<br /><span>Love to Use</span></h1>
            <p className="mob-hero__sub mob-hero__sub--light">Beautiful, fast mobile apps for iOS and Android — built to engage your users, grow your business and scale effortlessly.</p>
            <div className="mob-hero__cta">
              <Link to="/contact" className="mob-btn mob-btn--solid">Build My App <FiArrowRight /></Link>
              <Link to="/contact" className="mob-btn mob-btn--ghost-l">Discuss My Idea</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mob-features">
        <div className="mob-container">
          <div className="mob-head" data-aos="fade-up">
            <span className="mob-eyebrow">What You Get</span>
            <h2>Everything a Great App Needs</h2>
          </div>
          <div className="mob-features__grid">
            {FEATURES.map((f, i) => (
              <div className="mob-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="mob-feature__icon">{f.icon}</span><h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mob-process">
        <div className="mob-container">
          <div className="mob-head" data-aos="fade-up">
            <span className="mob-eyebrow">Our Process</span>
            <h2>How We Build</h2>
          </div>
          <div className="mob-process__track">
            {PROCESS.map((s, i) => (
              <div className="mob-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="mob-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mob-stack">
        <div className="mob-container">
          <div className="mob-head" data-aos="fade-up">
            <span className="mob-eyebrow">Tech Stack</span>
            <h2>Built With Modern Tech</h2>
          </div>
          <div className="mob-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="mob-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>

      <section className="mob-why">
        <div className="mob-container">
          <div className="mob-head" data-aos="fade-up">
            <span className="mob-eyebrow">Why Us</span>
            <h2>Why Businesses Choose Us</h2>
          </div>
          <div className="mob-why__grid">
            {WHY.map((w, i) => (
              <div className="mob-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="mob-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq service="Mobile App Development" faqs={FAQS} />

      <section className="mob-cta">
        <div className="mob-container">
          <div className="mob-cta__box" data-aos="zoom-in">
            <FiSmartphone className="mob-cta__ic" />
            <h2>Have an App Idea? Let's Build It.</h2>
            <p>Tell us your idea — we'll map the features, timeline and cost to bring your app to life.</p>
            <Link to="/contact" className="mob-btn mob-btn--light">Discuss My Project <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
