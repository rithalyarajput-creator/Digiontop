import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiCpu, FiDatabase, FiLock, FiZap, FiRefreshCw, FiLayers,
  FiCheck, FiArrowRight, FiArrowUpRight, FiGrid,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/WebDevPages.css'

const FAQS = [
  { q: 'What is a custom web application?', a: 'Software that runs in the browser — dashboards, portals, booking systems, CRMs — built specifically to automate and power your business.' },
  { q: 'What tech do you build with?', a: 'Modern stacks — React, Node, and scalable databases — chosen for performance, security and long-term maintainability.' },
  { q: 'Can it integrate with our tools?', a: 'Yes — payment gateways, CRMs, APIs and third-party services all integrate seamlessly.' },
  { q: 'Is it secure and scalable?', a: 'Built with authentication, role management and cloud scalability so it grows safely with your business.' },
  { q: 'Do you maintain it after launch?', a: 'Yes — we offer ongoing support, updates and feature additions as your needs evolve.' },
]

const FEATURES = [
  { icon: <FiGrid />, t: 'Custom Dashboards', d: 'Real-time dashboards and portals tailored to your workflow.' },
  { icon: <FiDatabase />, t: 'Scalable Databases', d: 'Robust data architecture that handles growth without slowing down.' },
  { icon: <FiLock />, t: 'Auth & Roles', d: 'Secure login, permissions and role management built in.' },
  { icon: <FiRefreshCw />, t: 'API Integrations', d: 'Connect any tool — payments, CRMs, third-party services.' },
  { icon: <FiZap />, t: 'Fast & Reliable', d: 'Optimised performance so your app stays quick under load.' },
  { icon: <FiLayers />, t: 'Cloud Ready', d: 'Deployed on scalable cloud infrastructure with monitoring.' },
]

export default function WebApp() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="cwa">
      <section className="cwa-hero cwa-hero--dark">
        <div className="cwa-hero__grid" />
        <div className="cwa-container cwa-hero__inner">
          <div className="cwa-hero__text" data-aos="fade-right">
            <span className="cwa-tag cwa-tag--light"><FiCpu /> Custom Web Application</span>
            <h1 className="cwa-hero__title cwa-hero__title--light">Software That Runs<br /><span>Your Business</span></h1>
            <p className="cwa-hero__sub cwa-hero__sub--light">Custom web apps, dashboards and portals built to automate your operations, delight your users and scale with your growth.</p>
            <div className="cwa-hero__cta">
              <Link to="/contact" className="cwa-btn cwa-btn--solid">Build My App <FiArrowRight /></Link>
              <Link to="/contact" className="cwa-btn cwa-btn--ghost-l">Discuss My Idea</Link>
            </div>
          </div>
          {/* app dashboard mock */}
          <div className="cwa-app" data-aos="fade-left">
            <div className="cwa-app__top"><b>Dashboard</b><span className="cwa-app__live">● Online</span></div>
            <div className="cwa-app__kpis"><div><span>Users</span><b>12.4k</b></div><div><span>Revenue</span><b>₹8.2L</b></div><div><span>Uptime</span><b>99.9%</b></div></div>
            <div className="cwa-app__chart">{[40, 58, 50, 72, 66, 88, 80].map((h, i) => <span key={i} style={{ height: `${h}%` }} />)}</div>
            <div className="cwa-app__foot"><FiCheck /> Secure · Scalable · Real-time</div>
          </div>
        </div>
      </section>

      <section className="cwa-features">
        <div className="cwa-container">
          <div className="cwa-head" data-aos="fade-up">
            <span className="cwa-eyebrow">Capabilities</span>
            <h2>Everything Your App Needs</h2>
          </div>
          <div className="cwa-features__grid">
            {FEATURES.map((f, i) => (
              <div className="cwa-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="cwa-feature__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cwa-band">
        <div className="cwa-container cwa-band__inner" data-aos="fade-up">
          <div><b>99.9%</b><span>Uptime</span></div>
          <div><b>Secure</b><span>Auth & Roles</span></div>
          <div><b>Cloud</b><span>Scalable</span></div>
        </div>
      </section>

      <ServiceFaq service="Custom Web Application" faqs={FAQS} />

      <section className="cwa-cta">
        <div className="cwa-container">
          <div className="cwa-cta__box" data-aos="zoom-in">
            <FiCpu className="cwa-cta__ic" />
            <h2>Have an App Idea? Let's Build It.</h2>
            <p>Tell us your idea — we'll map the tech, timeline and cost to bring your web app to life.</p>
            <Link to="/contact" className="cwa-btn cwa-btn--light">Discuss My Project <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
