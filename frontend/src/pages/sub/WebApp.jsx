import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiCpu, FiDatabase, FiLock, FiZap, FiRefreshCw, FiLayers,
  FiCheck, FiArrowRight, FiArrowUpRight, FiGrid,
  FiShield, FiTrendingUp, FiUsers,
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

const PROCESS = [
  { n: '01', t: 'Workflow Discovery', d: 'We map the exact processes, user roles and data your team touches daily, then define the screens and permissions the app must cover.' },
  { n: '02', t: 'Architecture & UX Blueprint', d: 'We design the data model, API contracts and clickable dashboard flows so structure and screens are agreed before a line of code is written.' },
  { n: '03', t: 'Agile Build & Integrations', d: 'We ship working modules in two-week sprints, wiring in authentication, payments, CRMs and third-party APIs as we go.' },
  { n: '04', t: 'Deploy, Monitor & Iterate', d: 'We launch on scalable cloud infrastructure with logging and uptime monitoring, then add features as your usage grows.' },
]

const STACK = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS']

const WHY = [
  { icon: <FiUsers />, t: 'Built Around Your Workflow', d: 'No forced templates — every dashboard, portal and role is modelled on how your team actually works.' },
  { icon: <FiShield />, t: 'Security From Day One', d: 'Role-based access, encrypted data and audited authentication are engineered in, not bolted on later.' },
  { icon: <FiTrendingUp />, t: 'Scales With Your Users', d: 'Cloud-native architecture and tuned queries keep the app fast whether you have 50 users or 50,000.' },
  { icon: <FiCheck />, t: 'You Own The Code', d: 'Clean, documented repositories handed to you in full — no vendor lock-in, no licence traps.' },
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

      <section className="cwa-process">
        <div className="cwa-container">
          <div className="cwa-head" data-aos="fade-up">
            <span className="cwa-eyebrow">Our Process</span>
            <h2>How We Build</h2>
          </div>
          <div className="cwa-process__track">
            {PROCESS.map((s, i) => (
              <div className="cwa-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="cwa-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cwa-stack">
        <div className="cwa-container">
          <div className="cwa-head" data-aos="fade-up">
            <span className="cwa-eyebrow">Tech Stack</span>
            <h2>Built With Modern Tech</h2>
          </div>
          <div className="cwa-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="cwa-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>

      <section className="cwa-why">
        <div className="cwa-container">
          <div className="cwa-head" data-aos="fade-up">
            <span className="cwa-eyebrow">Why Us</span>
            <h2>Why Businesses Choose Us</h2>
          </div>
          <div className="cwa-why__grid">
            {WHY.map((w, i) => (
              <div className="cwa-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="cwa-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
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
