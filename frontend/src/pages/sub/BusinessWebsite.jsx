import { useEffect } from 'react'
import Seo from '../../components/Seo'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiBriefcase, FiPhone, FiUsers, FiAward, FiTrendingUp, FiStar,
  FiCheck, FiArrowRight, FiArrowUpRight, FiMapPin,
  FiShield, FiZap, FiCheckCircle,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/WebDevPages.css'

const FAQS = [
  { q: 'What is a business website?', a: 'A professional online presence that builds trust, showcases your services and turns visitors into enquiries — your 24/7 digital storefront.' },
  { q: 'How many pages will it have?', a: 'Typically Home, About, Services, Contact and more — we tailor the structure to your business and goals.' },
  { q: 'Will it generate leads?', a: 'Yes — clear calls-to-action, contact forms and WhatsApp integration are built in to capture enquiries.' },
  { q: 'Can customers find me on Google?', a: 'Absolutely — local SEO and Google Business setup help nearby customers discover you.' },
  { q: 'How soon can it go live?', a: 'Most business sites are ready in 2–4 weeks, fully responsive and lead-ready.' },
]

const FEATURES = [
  { icon: <FiBriefcase />, t: 'Professional Design', d: 'A polished, credible presence that builds instant trust with visitors.' },
  { icon: <FiPhone />, t: 'Lead Capture Built-In', d: 'Contact forms, click-to-call and WhatsApp so enquiries never slip away.' },
  { icon: <FiMapPin />, t: 'Local SEO Ready', d: 'Get found by nearby customers on Google Search and Maps.' },
  { icon: <FiUsers />, t: 'Clear Service Pages', d: 'Present what you do so customers understand and choose you.' },
  { icon: <FiStar />, t: 'Reviews & Trust', d: 'Showcase testimonials and credentials that convert visitors.' },
  { icon: <FiTrendingUp />, t: 'Room to Grow', d: 'Easily add pages, blogs and features as your business scales.' },
]

const PROCESS = [
  { n: '01', t: 'Business Discovery', d: 'We map your services, ideal customer and the questions that stop them from enquiring — so every page has a job to do.' },
  { n: '02', t: 'Structure & Wireframes', d: 'We plan the sitemap, service pages and enquiry paths, then wireframe each screen around a single clear call-to-action.' },
  { n: '03', t: 'Design & Build', d: 'Your brand becomes a fast, responsive site with trust signals, service detail and forms wired to your inbox and WhatsApp.' },
  { n: '04', t: 'Launch & Lead Tracking', d: 'We ship with local SEO, Google Business and analytics in place, then track which pages actually produce enquiries.' },
]

const STACK = ['React', 'Next.js', 'WordPress', 'Tailwind CSS', 'Node.js', 'Google Business Profile', 'Google Analytics 4', 'Schema.org Markup', 'HubSpot Forms', 'Cloudflare']

const WHY = [
  { icon: <FiTrendingUp />, t: 'Designed for Enquiries', d: 'Every layout decision is made to move a visitor toward a call, form or WhatsApp message.' },
  { icon: <FiZap />, t: 'Fast on Every Device', d: 'Lightweight pages that load in under two seconds, because slow sites lose leads before they load.' },
  { icon: <FiShield />, t: 'Credibility First', d: 'Reviews, credentials and real case detail so a first-time visitor trusts you enough to reach out.' },
  { icon: <FiCheckCircle />, t: 'You Stay in Control', d: 'An editor you can actually use, so updating services, prices and contact details never needs a developer.' },
]

export default function BusinessWebsite() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="biz">
      <Seo
        title="Business Website Development Services in India"
        description="Professional business websites built to win enquiries — clear service pages, contact forms, WhatsApp and click-to-call, local SEO ready, live in 2 to 4 weeks. Get started."
        path="/services/business-website"
      />
      <section className="biz-hero biz-hero--light">
        <div className="biz-container biz-hero__inner">
          <div className="biz-hero__text" data-aos="fade-right">
            <span className="biz-tag"><FiBriefcase /> Business Website Development</span>
            <h1 className="biz-hero__title">Your 24/7 <span>Digital Storefront</span></h1>
            <p className="biz-hero__sub">A professional business website that builds trust, showcases your services and turns visitors into real enquiries — working for you around the clock.</p>
            <div className="biz-hero__cta">
              <Link to="/contact" className="biz-btn biz-btn--solid">Build My Business Site <FiArrowRight /></Link>
              <Link to="/contact" className="biz-btn biz-btn--ghost">Free Consultation</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="biz-features">
        <div className="biz-container">
          <div className="biz-head" data-aos="fade-up">
            <span className="biz-eyebrow">What You Get</span>
            <h2>Built to Win Customers</h2>
          </div>
          <div className="biz-features__grid">
            {FEATURES.map((f, i) => (
              <div className="biz-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="biz-feature__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="biz-process">
        <div className="biz-container">
          <div className="biz-head" data-aos="fade-up">
            <span className="biz-eyebrow">Our Process</span>
            <h2>How We Build</h2>
          </div>
          <div className="biz-process__track">
            {PROCESS.map((s, i) => (
              <div className="biz-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="biz-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="biz-stack">
        <div className="biz-container">
          <div className="biz-head" data-aos="fade-up">
            <span className="biz-eyebrow">Tech Stack</span>
            <h2>Built With Modern Tech</h2>
          </div>
          <div className="biz-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="biz-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>

      <section className="biz-why">
        <div className="biz-container">
          <div className="biz-head" data-aos="fade-up">
            <span className="biz-eyebrow">Why Us</span>
            <h2>Why Businesses Choose Us</h2>
          </div>
          <div className="biz-why__grid">
            {WHY.map((w, i) => (
              <div className="biz-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="biz-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq service="Business Website Development" faqs={FAQS} />

      <section className="biz-cta">
        <div className="biz-container">
          <div className="biz-cta__box" data-aos="zoom-in">
            <FiBriefcase className="biz-cta__ic" />
            <h2>Ready to Look Professional Online?</h2>
            <p>Get a free consultation — we'll plan a business website that builds trust and brings you leads.</p>
            <Link to="/contact" className="biz-btn biz-btn--light">Book Free Consultation <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
