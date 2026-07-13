import { useEffect } from 'react'
import Seo from '../../components/Seo'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiCode, FiLink, FiShield, FiZap, FiRefreshCw, FiDatabase, FiCheck, FiArrowRight, FiArrowUpRight, FiLock, FiActivity, FiFileText } from 'react-icons/fi'
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
const PROCESS = [
  { n: '01', t: 'Contract & Discovery', d: 'We map every consumer, payload and third-party system, then agree the endpoints, resources and error shapes up front in an OpenAPI or GraphQL schema.' },
  { n: '02', t: 'Architecture & Auth', d: 'We choose REST or GraphQL per use case and design the data model, versioning strategy, OAuth 2.0 / JWT flows, scopes and rate limits before a line of code ships.' },
  { n: '03', t: 'Build & Integrate', d: 'Endpoints are built test-first and wired to your payment gateways, CRMs and messaging providers, with retries, idempotency keys and webhooks for anything that can fail.' },
  { n: '04', t: 'Document & Launch', d: 'We ship interactive Swagger or GraphQL playground docs, load-test the hot paths, then deploy behind a gateway with logging, monitoring and alerting live from day one.' },
]
const STACK = ['Node.js', 'Express', 'NestJS', 'GraphQL', 'Apollo Server', 'OpenAPI / Swagger', 'PostgreSQL', 'MongoDB', 'Redis', 'OAuth 2.0 / JWT', 'Docker', 'Postman']
const WHY = [
  { icon: <FiFileText />, t: 'Contract-First, Not Guesswork', d: 'Your frontend and mobile teams get a signed-off schema on day one, so they can build in parallel instead of waiting on the backend.' },
  { icon: <FiLock />, t: 'Auth Done Properly', d: 'OAuth 2.0, JWT rotation, scoped API keys and per-client rate limits — not an afterthought bolted on before launch.' },
  { icon: <FiActivity />, t: 'Integrations That Survive Failure', d: 'Every third-party call gets timeouts, retries with backoff, idempotency and webhook replay, so one flaky vendor never takes your product down.' },
  { icon: <FiZap />, t: 'Built to Scale Cheaply', d: 'Query batching, caching layers and indexed data models keep responses under 80ms as your traffic — and your bill — grows.' },
]

export default function ApiDevelopment() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="api">
      <Seo
        title="API Development & Integration Services"
        description="Contract-first REST and GraphQL APIs with OAuth 2.0 security, third-party integrations, Swagger docs and monitoring built in from day one. Talk to us about your API."
        path="/services/mobile/api"
      />
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
      <section className="api-process">
        <div className="api-container">
          <div className="api-head" data-aos="fade-up">
            <span className="api-eyebrow">Our Process</span>
            <h2>How We Build</h2>
          </div>
          <div className="api-process__track">
            {PROCESS.map((s, i) => (
              <div className="api-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="api-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="api-stack">
        <div className="api-container">
          <div className="api-head" data-aos="fade-up">
            <span className="api-eyebrow">Tech Stack</span>
            <h2>Built With Modern Tech</h2>
          </div>
          <div className="api-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="api-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>
      <section className="api-why">
        <div className="api-container">
          <div className="api-head" data-aos="fade-up">
            <span className="api-eyebrow">Why Us</span>
            <h2>Why Businesses Choose Us</h2>
          </div>
          <div className="api-why__grid">
            {WHY.map((w, i) => (
              <div className="api-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="api-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceFaq service="API Development" faqs={FAQS} />
      <section className="api-cta"><div className="api-container"><div className="api-cta__box" data-aos="zoom-in"><FiCode className="api-cta__ic" /><h2>Need APIs That Just Work?</h2><p>Tell us what you're building — we'll design secure, fast APIs your product can rely on.</p><Link to="/contact" className="api-btn api-btn--light">Discuss My Project <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
