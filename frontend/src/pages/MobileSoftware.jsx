import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiArrowRight, FiArrowUpRight, FiCheck, FiSmartphone,
  FiTablet, FiCloud, FiCode, FiBox, FiLayers, FiServer, FiTrendingUp,
} from 'react-icons/fi'
import '../styles/SubService.css'

const SERVICES = [
  { icon: <FiSmartphone />, t: 'Mobile App Development', d: 'Custom mobile apps that deliver seamless experiences and support business growth.' },
  { icon: <FiTablet />, t: 'iOS App Development', d: 'High-performance iPhone & iPad apps built to Apple\'s latest standards.' },
  { icon: <FiSmartphone />, t: 'Android App Development', d: 'Scalable Android apps designed for performance, usability & long-term success.' },
  { icon: <FiLayers />, t: 'Flutter App Development', d: 'Cross-platform apps built with Flutter for faster delivery and lower maintenance.' },
  { icon: <FiCloud />, t: 'Cloud Solutions', d: 'Secure, scalable cloud infrastructure for modern business operations.' },
  { icon: <FiCode />, t: 'API Development', d: 'Custom APIs & integrations that connect platforms and automate workflows.' },
  { icon: <FiBox />, t: 'SaaS Development', d: 'Subscription-based SaaS platforms built to launch and scale.' },
  { icon: <FiServer />, t: 'DevOps Services', d: 'Deployment, automation, monitoring & infrastructure management.' },
]
const WHY = ['Improve Operational Efficiency', 'Automate Business Processes', 'Enhance Customer Experience', 'Increase Productivity', 'Support Business Scalability', 'Improve Data Management', 'Generate New Revenue', 'Stay Competitive Digitally']
const INDUSTRIES = ['E-Commerce', 'Healthcare', 'Education', 'Finance', 'Logistics', 'Real Estate', 'Startups', 'Enterprise Businesses']
const APPROACH = [
  { n: '01', t: 'Strategy & Planning', d: 'Understanding business objectives and technical requirements.' },
  { n: '02', t: 'UI/UX Design', d: 'Creating intuitive and user-friendly experiences.' },
  { n: '03', t: 'Development', d: 'Building scalable and high-performance applications.' },
  { n: '04', t: 'Testing & QA', d: 'Ensuring reliability, security, and performance.' },
  { n: '05', t: 'Deployment & Support', d: 'Launching solutions and providing ongoing maintenance.' },
]
const CHOOSE = [
  { t: 'Business-Focused Development', d: 'We build technology that solves real business challenges.' },
  { t: 'Scalable Architecture', d: 'Every application is designed to support future growth.' },
  { t: 'Modern Technologies', d: 'Industry-leading frameworks, tools & development standards.' },
  { t: 'Dedicated Support', d: 'Continuous assistance before, during & after deployment.' },
  { t: 'Custom-Built Solutions', d: 'No templates — every project is tailored to your business.' },
]

export default function MobileSoftware() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      {/* HERO */}
      <section className="ss-hero ss-hero--white">
        <div className="ss-container ds-hero" style={{ position: 'relative' }}>
          <div data-aos="fade-right">
            <span className="ss-tag"><FiSmartphone /> Mobile &amp; Software</span>
            <h1 className="ss-hero__title">Powerful Apps &amp; Software <span>Built For Growth</span></h1>
            <p className="ss-hero__sub">We design and develop custom mobile apps, SaaS platforms, APIs, and cloud solutions that improve efficiency, enhance experiences, and help you scale faster — secure, scalable & future-ready.</p>
            <div className="ss-hero__actions">
              <Link to="/contact" className="ss-btn ss-btn--primary">Start Your Project <FiArrowRight /></Link>
              <Link to="/contact" className="ss-btn ss-btn--ghost">Get Free Consultation</Link>
            </div>
          </div>
          <div className="ec-hero__media" data-aos="fade-left">
            <img src="/images/mobile-hero.png" alt="Mobile & software solutions" loading="eager" />
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="ss-sec ss-sec--soft">
        <div className="ss-container ss-head" data-aos="fade-up">
          <span className="ss-eyebrow">Overview</span>
          <h2 className="ss-h2">Software That Transforms Your Business</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 14 }}>
            Whether you're launching a startup, automating operations, or creating a digital platform, the
            right software can transform how your business operates. From mobile apps to enterprise systems,
            we build solutions that are secure, scalable, and future-ready.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Solutions</span><h2 className="ss-h2">Everything You Need to Build & Scale</h2></div>
          <div className="uiux-grid">
            {SERVICES.map((s) => (
              <div className="uiux-card ec-card" key={s.t} data-aos="fade-up">
                <span className="uiux-card__icon">{s.icon}</span><h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY INVEST (dark) */}
      <section className="ss-sec ss-sec--dark">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow ss-eyebrow--light">Why Invest In Software</span><h2 className="ss-h2 ss-h2--light">Technology That Pays Off</h2></div>
          <div className="ec-achieve">{WHY.map((w) => <div className="ec-achieve__item" key={w} data-aos="fade-up"><FiCheck /> {w}</div>)}</div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Industries We Serve</span><h2 className="ss-h2">Solutions For Every Industry</h2></div>
          <div className="ss-benefits">{INDUSTRIES.map((i) => <span className="ss-benefit" key={i} data-aos="zoom-in"><FiCheck /> {i}</span>)}</div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="ss-sec ss-sec--soft">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Development Approach</span><h2 className="ss-h2">From Idea to Launch</h2></div>
          <div className="uiux-grid">
            {APPROACH.map((a) => (
              <div className="uiux-card" key={a.n} data-aos="fade-up">
                <span className="ms-num">{a.n}</span><h3 style={{ marginTop: 12 }}>{a.t}</h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--muted)', marginTop: 6 }}>{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Why Choose DigionTop</span><h2 className="ss-h2">Your Technology Partner</h2></div>
          <div className="ss-list">
            {CHOOSE.map((c) => (
              <div className="ss-list__item ec-why" key={c.t} data-aos="fade-up">
                <span className="ss-list__dot"><FiCheck size={14} /></span>
                <span><b style={{ display: 'block', color: 'var(--ink)' }}>{c.t}</b><span style={{ color: 'var(--muted)', fontWeight: 500, fontSize: '0.86rem' }}>{c.d}</span></span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: 8 }}>🚀</span>
          <h2>Ready To Build Your Next Digital Product?</h2>
          <p>Whether you need a mobile app, SaaS platform, cloud infrastructure, or custom software — we'll bring your vision to life.</p>
          <Link to="/contact" className="ss-btn">Start Your Project <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
