import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiRefreshCw, FiZap, FiSmartphone, FiTrendingUp, FiEye, FiThumbsUp,
  FiCheck, FiArrowRight, FiArrowUpRight, FiX,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/WebDevPages.css'

const FAQS = [
  { q: 'When should I redesign my website?', a: 'If it looks dated, loads slowly, isn\'t mobile-friendly, or isn\'t converting — a redesign modernises it and boosts results.' },
  { q: 'Will I lose my Google rankings?', a: 'No — we preserve SEO, set up proper redirects and migrate content carefully so rankings stay safe and often improve.' },
  { q: 'How long does a redesign take?', a: 'Typically 2–5 weeks depending on size — with a clear plan and milestones shared upfront.' },
  { q: 'Can you keep my content?', a: 'Yes — we retain and improve your existing content, or refresh it as part of the redesign.' },
  { q: 'Will it convert better?', a: 'That\'s the goal — modern design, faster speed and clear CTAs are proven to lift conversions.' },
]

const FEATURES = [
  { icon: <FiEye />, t: 'Modern Look', d: 'A fresh, current design that builds instant credibility.' },
  { icon: <FiZap />, t: 'Faster Speed', d: 'Rebuilt for performance — no more slow, clunky pages.' },
  { icon: <FiSmartphone />, t: 'Mobile-First', d: 'Perfect on every device, where most visitors are today.' },
  { icon: <FiTrendingUp />, t: 'Higher Conversions', d: 'Clear structure and CTAs that turn visitors into customers.' },
  { icon: <FiThumbsUp />, t: 'SEO Preserved', d: 'Rankings kept safe with proper redirects and migration.' },
  { icon: <FiRefreshCw />, t: 'Easy to Manage', d: 'A clean CMS so you can update content effortlessly.' },
]

export default function WebsiteRedesign() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="rd">
      <section className="rd-hero rd-hero--light">
        <div className="rd-container rd-hero__inner">
          <div className="rd-hero__text" data-aos="fade-right">
            <span className="rd-tag"><FiRefreshCw /> Website Redesign</span>
            <h1 className="rd-hero__title">From Outdated to <span>Outstanding</span></h1>
            <p className="rd-hero__sub">Transform your old, slow website into a modern, fast, high-converting site — without losing your Google rankings.</p>
            <div className="rd-hero__cta">
              <Link to="/contact" className="rd-btn rd-btn--solid">Redesign My Site <FiArrowRight /></Link>
              <Link to="/contact" className="rd-btn rd-btn--ghost">Free Site Review</Link>
            </div>
          </div>
          {/* before/after */}
          <div className="rd-ba" data-aos="fade-left">
            <div className="rd-ba__col rd-ba__col--before">
              <span className="rd-ba__tag rd-ba__tag--old"><FiX /> Before</span>
              <div className="rd-ba__old"><span /><span className="s" /><span /><span className="s" /></div>
              <small>Slow · Dated · 1.4% convert</small>
            </div>
            <div className="rd-ba__arrow"><FiRefreshCw /></div>
            <div className="rd-ba__col rd-ba__col--after">
              <span className="rd-ba__tag rd-ba__tag--new"><FiCheck /> After</span>
              <div className="rd-ba__new"><div className="rd-ba__band" /><span /><span className="s" /></div>
              <small>Fast · Modern · 4.6% convert</small>
            </div>
          </div>
        </div>
      </section>

      <section className="rd-features">
        <div className="rd-container">
          <div className="rd-head" data-aos="fade-up">
            <span className="rd-eyebrow">What Changes</span>
            <h2>A Website That Finally Works</h2>
          </div>
          <div className="rd-features__grid">
            {FEATURES.map((f, i) => (
              <div className="rd-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="rd-feature__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rd-band">
        <div className="rd-container rd-band__inner" data-aos="fade-up">
          <div><b>+230%</b><span>Avg Conversion Lift</span></div>
          <div><b>Zero</b><span>SEO Ranking Loss</span></div>
          <div><b>Modern</b><span>Mobile-First Design</span></div>
        </div>
      </section>

      <ServiceFaq service="Website Redesign" faqs={FAQS} />

      <section className="rd-cta">
        <div className="rd-container">
          <div className="rd-cta__box" data-aos="zoom-in">
            <FiRefreshCw className="rd-cta__ic" />
            <h2>Ready for a Website Glow-Up?</h2>
            <p>Get a free site review — we'll show you exactly what to improve and how a redesign will pay off.</p>
            <Link to="/contact" className="rd-btn rd-btn--light">Get My Free Review <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
