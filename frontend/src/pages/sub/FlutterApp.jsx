import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiSmartphone, FiZap, FiCode, FiDollarSign, FiLayers, FiTrendingUp, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
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
      <section className="flt-band"><div className="flt-container flt-band__inner" data-aos="fade-up"><div><b>1</b><span>Codebase, 2 Platforms</span></div><div><b>~40%</b><span>Lower Cost</span></div><div><b>Faster</b><span>Time to Market</span></div></div></section>
      <ServiceFaq service="Flutter App Development" faqs={FAQS} />
      <section className="flt-cta"><div className="flt-container"><div className="flt-cta__box" data-aos="zoom-in"><FiCode className="flt-cta__ic" /><h2>Launch on Both Platforms — Faster</h2><p>Get a free consultation — we'll show you how Flutter gets you to market sooner and cheaper.</p><Link to="/contact" className="flt-btn flt-btn--light">Book Free Consultation <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
