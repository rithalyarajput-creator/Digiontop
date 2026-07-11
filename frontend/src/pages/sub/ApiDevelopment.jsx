import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiCode, FiLink, FiShield, FiZap, FiRefreshCw, FiDatabase, FiCheck, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/MobilePages.css'

const FAQS = [
  { q: 'What is API development?', a: 'Building the connections that let your apps, websites and third-party systems talk to each other securely and reliably.' },
  { q: 'Do you build REST and GraphQL?', a: 'Yes — REST, GraphQL or custom APIs, chosen for what fits your product best.' },
  { q: 'Can you integrate third-party APIs?', a: 'Absolutely — payments, maps, CRMs, messaging and any external service you need.' },
  { q: 'Are the APIs secure?', a: 'Yes — authentication, rate-limiting, encryption and best-practice security are standard.' },
  { q: 'Will you document the API?', a: 'Fully — clear documentation so your team (or ours) can build against it confidently.' },
]
const FEATURES = [
  { icon: <FiCode />, t: 'REST & GraphQL', d: 'Robust, well-structured APIs built the modern way.' },
  { icon: <FiLink />, t: 'Third-Party Integration', d: 'Connect payments, maps, CRMs and any external service.' },
  { icon: <FiShield />, t: 'Secure by Default', d: 'Auth, rate-limiting and encryption baked in.' },
  { icon: <FiZap />, t: 'Fast & Reliable', d: 'Optimised endpoints that stay quick under load.' },
  { icon: <FiDatabase />, t: 'Data Architecture', d: 'Clean, scalable data models behind every endpoint.' },
  { icon: <FiRefreshCw />, t: 'Full Documentation', d: 'Clear docs so any team can integrate easily.' },
]

export default function ApiDevelopment() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="api">
      <section className="api-hero api-hero--dark">
        <div className="api-hero__grid" />
        <div className="api-container api-hero__inner">
          <div className="api-hero__text" data-aos="fade-right">
            <span className="api-tag api-tag--light"><FiCode /> API Development</span>
            <h1 className="api-hero__title api-hero__title--light">The Connections That<br /><span>Power Your Product</span></h1>
            <p className="api-hero__sub api-hero__sub--light">Secure, fast, well-documented APIs that connect your apps, websites and third-party systems — the reliable backbone your product runs on.</p>
            <div className="api-hero__cta">
              <Link to="/contact" className="api-btn api-btn--solid">Build My API <FiArrowRight /></Link>
              <Link to="/contact" className="api-btn api-btn--ghost-l">Discuss My Project</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="api-features">
        <div className="api-container">
          <div className="api-head" data-aos="fade-up"><span className="api-eyebrow">Capabilities</span><h2>APIs Built to Last</h2></div>
          <div className="api-features__grid">
            {FEATURES.map((f, i) => (<div className="api-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}><span className="api-feature__icon">{f.icon}</span><h3>{f.t}</h3><p>{f.d}</p></div>))}
          </div>
        </div>
      </section>
      <section className="api-band"><div className="api-container api-band__inner" data-aos="fade-up"><div><b>&lt;80ms</b><span>Avg Response</span></div><div><b>Secure</b><span>Auth & Limits</span></div><div><b>Full</b><span>Documentation</span></div></div></section>
      <ServiceFaq service="API Development" faqs={FAQS} />
      <section className="api-cta"><div className="api-container"><div className="api-cta__box" data-aos="zoom-in"><FiCode className="api-cta__ic" /><h2>Need APIs That Just Work?</h2><p>Tell us what you're building — we'll design secure, fast APIs your product can rely on.</p><Link to="/contact" className="api-btn api-btn--light">Discuss My Project <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
