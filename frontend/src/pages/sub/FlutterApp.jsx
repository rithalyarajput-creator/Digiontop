import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiSmartphone, FiZap, FiCode, FiDollarSign, FiLayers, FiTrendingUp, FiArrowRight, FiArrowUpRight, FiRefreshCw, FiShield, FiUsers } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/MobilePages.css'

const FAQS = [
  { q: 'What is Flutter?', a: 'Google\'s framework that builds one codebase running on both iOS and Android — faster to build and cheaper to maintain.' },
  { q: 'Is Flutter as good as native?', a: 'For most apps, yes — near-native performance with a beautiful, consistent UI on both platforms.' },
  { q: 'Will it save me money?', a: 'Significantly — one codebase for both platforms means less development time and lower maintenance cost.' },
  { q: 'Can it access device features?', a: 'Yes — camera, GPS, notifications, payments and more all work through Flutter plugins.' },
  { q: 'How fast can you build it?', a: 'Flutter speeds things up — typical apps ship in 6–12 weeks for both platforms.' },
]
const FEATURES = [
  { icon: <FiCode />, t: 'One Codebase', d: 'Build once, run on iOS and Android — no duplicate work.' },
  { icon: <FiDollarSign />, t: 'Cost-Effective', d: 'Lower development and maintenance costs than two native apps.' },
  { icon: <FiZap />, t: 'Fast Performance', d: 'Compiled to native code for smooth, responsive apps.' },
  { icon: <FiLayers />, t: 'Beautiful UI', d: 'Pixel-perfect, expressive interfaces on every platform.' },
  { icon: <FiSmartphone />, t: 'Both Platforms', d: 'Launch on iOS and Android at the same time.' },
  { icon: <FiTrendingUp />, t: 'Quick to Market', d: 'Faster builds mean you launch and iterate sooner.' },
]
const PROCESS = [
  { n: '01', t: 'Scope & Platform Audit', d: 'We map your feature list against Flutter\'s widget set and plugin ecosystem, flagging anything that needs native iOS or Android channel code before a line of Dart is written.' },
  { n: '02', t: 'Dart Architecture', d: 'We set up the single codebase with a clean layered structure — Riverpod or Bloc state management, repository pattern, and separate dev/staging/prod flavours.' },
  { n: '03', t: 'Widget Build & Hot Reload', d: 'Screens are built as reusable Flutter widgets and reviewed with you weekly, with hot reload letting us apply your feedback live in the same session.' },
  { n: '04', t: 'Dual-Store Release', d: 'We run the same build through integration tests, then ship signed releases to the App Store and Google Play together — and keep both updated from one repo.' },
]
const STACK = ['Flutter', 'Dart', 'Riverpod', 'Bloc', 'Firebase', 'Dio / REST', 'GraphQL', 'Hive', 'Melos', 'Codemagic CI/CD']
const WHY = [
  { icon: <FiCode />, t: 'One Team, Two Stores', d: 'A single Dart codebase means one team, one backlog and one release cycle instead of separate iOS and Android squads drifting apart.' },
  { icon: <FiRefreshCw />, t: 'Pixel-Identical Updates', d: 'Flutter draws its own UI, so a design tweak lands the same way on an iPhone 15 and a three-year-old Android — no per-platform patching.' },
  { icon: <FiShield />, t: 'Production-Grade Quality', d: 'Widget, unit and integration tests run on every commit through Codemagic, so what reaches the stores is the build we actually tested.' },
  { icon: <FiUsers />, t: 'Code You Can Keep', d: 'Documented, modular Dart with clear state management — your in-house team can pick it up without reverse-engineering our shortcuts.' },
]

export default function FlutterApp() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="flt">
      <section className="flt-hero flt-hero--light">
        <div className="flt-container flt-hero__inner">
          <div className="flt-hero__text" data-aos="fade-right">
            <span className="flt-tag"><FiCode /> Flutter App Development</span>
            <h1 className="flt-hero__title">One Codebase.<br /><span>Both Platforms.</span></h1>
            <p className="flt-hero__sub">Flutter apps that run beautifully on iOS and Android from a single codebase — faster to build, cheaper to maintain, gorgeous everywhere.</p>
            <div className="flt-hero__cta">
              <Link to="/contact" className="flt-btn flt-btn--solid">Build with Flutter <FiArrowRight /></Link>
              <Link to="/contact" className="flt-btn flt-btn--ghost">Free Consultation</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="flt-features">
        <div className="flt-container">
          <div className="flt-head" data-aos="fade-up"><span className="flt-eyebrow">Why Flutter</span><h2>Two Apps for the Price of One</h2></div>
          <div className="flt-features__grid">
            {FEATURES.map((f, i) => (<div className="flt-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}><span className="flt-feature__icon">{f.icon}</span><h3>{f.t}</h3><p>{f.d}</p></div>))}
          </div>
        </div>
      </section>
      <section className="flt-process">
        <div className="flt-container">
          <div className="flt-head" data-aos="fade-up">
            <span className="flt-eyebrow">Our Process</span>
            <h2>How We Build</h2>
          </div>
          <div className="flt-process__track">
            {PROCESS.map((s, i) => (
              <div className="flt-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="flt-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flt-stack">
        <div className="flt-container">
          <div className="flt-head" data-aos="fade-up">
            <span className="flt-eyebrow">Tech Stack</span>
            <h2>Built With Modern Tech</h2>
          </div>
          <div className="flt-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="flt-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>
      <section className="flt-why">
        <div className="flt-container">
          <div className="flt-head" data-aos="fade-up">
            <span className="flt-eyebrow">Why Us</span>
            <h2>Why Businesses Choose Us</h2>
          </div>
          <div className="flt-why__grid">
            {WHY.map((w, i) => (
              <div className="flt-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="flt-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceFaq service="Flutter App Development" faqs={FAQS} />
      <section className="flt-cta"><div className="flt-container"><div className="flt-cta__box" data-aos="zoom-in"><FiCode className="flt-cta__ic" /><h2>Launch on Both Platforms — Faster</h2><p>Get a free consultation — we'll show you how Flutter gets you to market sooner and cheaper.</p><Link to="/contact" className="flt-btn flt-btn--light">Book Free Consultation <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
