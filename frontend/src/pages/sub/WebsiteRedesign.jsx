import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiRefreshCw, FiZap, FiSmartphone, FiTrendingUp, FiEye, FiThumbsUp,
  FiCheck, FiArrowRight, FiArrowUpRight, FiX, FiShield, FiClock,
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

const PROCESS = [
  { n: '01', t: 'Audit The Old Site', d: 'We benchmark your current Core Web Vitals, crawl every URL and study heatmaps to pinpoint exactly where visitors drop off.' },
  { n: '02', t: 'Rearchitect For Conversion', d: 'New sitemap, sharper messaging and wireframes that push offers, proof and CTAs above the fold instead of burying them.' },
  { n: '03', t: 'Rebuild Lean & Fast', d: 'A ground-up mobile-first build with compressed media, lazy loading and clean code — no bloated legacy themes or plugin sprawl.' },
  { n: '04', t: 'Migrate & Measure', d: 'We map 301 redirects for every old URL, launch without ranking loss, then track conversion lift and tune what the data shows.' },
]

const STACK = ['React', 'Next.js', 'WordPress', 'Tailwind CSS', 'Core Web Vitals', 'Cloudflare CDN', 'WebP / AVIF', 'Google Analytics 4', 'Hotjar', 'Screaming Frog']

const WHY = [
  { icon: <FiZap />, t: 'Speed Is The Priority', d: 'We rebuild for sub-2-second loads, because every extra second of wait quietly costs you paying customers.' },
  { icon: <FiShield />, t: 'Rankings Stay Safe', d: 'A full URL map and 301 redirect plan means your hard-won Google positions survive the move intact.' },
  { icon: <FiTrendingUp />, t: 'Designed To Convert', d: 'Every page is restructured around one clear action, so the new site earns leads instead of just looking prettier.' },
  { icon: <FiClock />, t: 'Live In Weeks, Not Months', d: 'Fixed milestones and weekly demos get most redesigns launched in 2–5 weeks with zero guesswork.' },
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

      <section className="rd-process">
        <div className="rd-container">
          <div className="rd-head" data-aos="fade-up">
            <span className="rd-eyebrow">Our Process</span>
            <h2>How We Build</h2>
          </div>
          <div className="rd-process__track">
            {PROCESS.map((s, i) => (
              <div className="rd-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="rd-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rd-stack">
        <div className="rd-container">
          <div className="rd-head" data-aos="fade-up">
            <span className="rd-eyebrow">Tech Stack</span>
            <h2>Built With Modern Tech</h2>
          </div>
          <div className="rd-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="rd-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>

      <section className="rd-why">
        <div className="rd-container">
          <div className="rd-head" data-aos="fade-up">
            <span className="rd-eyebrow">Why Us</span>
            <h2>Why Businesses Choose Us</h2>
          </div>
          <div className="rd-why__grid">
            {WHY.map((w, i) => (
              <div className="rd-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="rd-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
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
