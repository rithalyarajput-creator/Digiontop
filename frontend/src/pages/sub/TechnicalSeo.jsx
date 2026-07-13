import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiTerminal, FiCode, FiZap, FiActivity, FiCheck, FiX, FiArrowRight,
  FiArrowUpRight, FiCpu, FiLayers, FiShield, FiRefreshCw,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/TechnicalSeo.css'

const FAQS = [
  { q: 'What is technical SEO exactly?', a: 'Technical SEO makes sure search engines can crawl, render and index your site without friction — covering speed, structure, mobile, security and code health.' },
  { q: 'How do you find technical issues?', a: 'We run a 150-point crawl using enterprise tools plus manual review, then hand you a prioritised list of fixes ranked by ranking impact.' },
  { q: 'Will fixes break my live site?', a: 'No — we test every change in staging where possible and deploy carefully, with rollback ready. Your site stays live and safe.' },
  { q: 'Do you fix Core Web Vitals?', a: 'Yes. LCP, CLS and INP are page-experience ranking signals — we optimise images, code, fonts and server response to pass all three.' },
  { q: 'How long does a technical fix cycle take?', a: 'An initial audit takes 3–5 days; critical fixes ship within the first 2–3 weeks, with ongoing monitoring after that.' },
]

const CHECKS = [
  { ok: true, t: 'Crawlability & indexation', s: 'Clean' },
  { ok: false, t: 'Core Web Vitals (LCP)', s: '3.9s — needs fix' },
  { ok: true, t: 'HTTPS & security', s: 'Secure' },
  { ok: false, t: 'Broken links & redirects', s: '14 found' },
  { ok: true, t: 'Mobile usability', s: 'Passed' },
  { ok: false, t: 'Structured data', s: 'Missing schema' },
]

const FIXES = [
  { icon: <FiZap />, t: 'Speed & Core Web Vitals', d: 'LCP, CLS & INP optimisation — image compression, code-splitting, caching & CDN.' },
  { icon: <FiLayers />, t: 'Crawl & Index Control', d: 'Robots, sitemaps, canonicals & indexation rules so Google reads only what matters.' },
  { icon: <FiCode />, t: 'Schema & Structured Data', d: 'Rich-result markup for products, FAQs, reviews & articles to win SERP features.' },
  { icon: <FiShield />, t: 'Security & HTTPS', d: 'SSL, mixed-content fixes & safe-browsing so trust signals stay green.' },
  { icon: <FiCpu />, t: 'Site Architecture', d: 'Logical URL structure & internal linking that passes authority to key pages.' },
  { icon: <FiRefreshCw />, t: 'Log & Render Analysis', d: 'Server-log and JS-render checks to see your site exactly as Googlebot does.' },
]

export default function TechnicalSeo() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="tseo">
      <Seo
        title="Technical SEO Services & Website Fixes"
        description="Crawl, indexation, Core Web Vitals, schema, site architecture and HTTPS issues found and fixed so your rankings compound. Get a free technical health scan."
        path="/services/technical-seo"
      />
      {/* HERO — terminal theme */}
      <section className="tseo-hero">
        <div className="tseo-hero__grid" />
        <div className="tseo-container tseo-hero__inner">
          <div className="tseo-hero__text" data-aos="fade-right">
            <span className="tseo-tag"><FiTerminal /> Technical SEO</span>
            <h1 className="tseo-hero__title">The Engine Under<br /><span>Your Rankings</span></h1>
            <p className="tseo-hero__sub">If Google can't crawl, render and trust your site, nothing else works. We fix the technical foundation so every other SEO effort compounds.</p>
            <div className="tseo-hero__cta">
              <Link to="/contact" className="tseo-btn tseo-btn--solid">Run My Site Scan <FiArrowRight /></Link>
              <Link to="/contact" className="tseo-btn tseo-btn--ghost">Talk to an Engineer</Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE FIX */}
      <section className="tseo-fixes">
        <div className="tseo-container">
          <div className="tseo-head" data-aos="fade-up">
            <span className="tseo-eyebrow">// what we fix</span>
            <h2>Every Technical Blocker, Handled</h2>
          </div>
          <div className="tseo-fixes__grid">
            {FIXES.map((f, i) => (
              <div className="tseo-fix" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="tseo-fix__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CWV meter band */}
      <section className="tseo-cwv">
        <div className="tseo-container tseo-cwv__inner">
          <div data-aos="fade-right">
            <span className="tseo-eyebrow tseo-eyebrow--light">// core web vitals</span>
            <h2>We Get You Into the Green</h2>
            <p>Page experience is a confirmed ranking factor. We push every metric past Google's threshold — measurably.</p>
          </div>
          <div className="tseo-meters" data-aos="fade-left">
            {[{ k: 'LCP', v: 'Largest Contentful Paint', p: 96 }, { k: 'CLS', v: 'Cumulative Layout Shift', p: 99 }, { k: 'INP', v: 'Interaction to Next Paint', p: 94 }].map((m) => (
              <div className="tseo-meter" key={m.k}>
                <div className="tseo-meter__top"><b>{m.k}</b><span>{m.p}</span></div>
                <div className="tseo-meter__track"><span style={{ width: `${m.p}%` }} /></div>
                <small>{m.v}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq service="Technical SEO" faqs={FAQS} />

      <section className="tseo-cta">
        <div className="tseo-container">
          <div className="tseo-cta__box" data-aos="zoom-in">
            <FiActivity className="tseo-cta__ic" />
            <h2>Get Your Free Technical Health Scan</h2>
            <p>We'll crawl your site and send a prioritised fix-list — no jargon, just what's costing you rankings.</p>
            <Link to="/contact" className="tseo-btn tseo-btn--light">Scan My Site Free <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
