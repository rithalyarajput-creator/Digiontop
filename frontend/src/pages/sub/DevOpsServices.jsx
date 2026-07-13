import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiGitBranch, FiRefreshCw, FiActivity, FiShield, FiServer, FiZap, FiCheck, FiArrowRight, FiArrowUpRight, FiClock, FiTrendingUp } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/MobilePages.css'

const FAQS = [
  { q: 'What is DevOps?', a: 'Practices and automation that ship code faster and more reliably — CI/CD pipelines, monitoring, and infrastructure-as-code.' },
  { q: 'Will it speed up our releases?', a: 'Dramatically — automated pipelines mean you deploy safely in minutes instead of days.' },
  { q: 'Do you set up CI/CD?', a: 'Yes — automated build, test and deploy pipelines so every release is fast and safe.' },
  { q: 'Can you improve our uptime?', a: 'Absolutely — monitoring, alerting and auto-recovery keep your systems reliable 24/7.' },
  { q: 'Do you do infrastructure-as-code?', a: 'Yes — reproducible, version-controlled infrastructure with Terraform and similar tools.' },
]
const FEATURES = [
  { icon: <FiRefreshCw />, t: 'CI/CD Pipelines', d: 'Automated build, test and deploy — ship safely in minutes.' },
  { icon: <FiServer />, t: 'Infrastructure as Code', d: 'Reproducible, version-controlled infrastructure.' },
  { icon: <FiActivity />, t: 'Monitoring & Alerts', d: '24/7 monitoring with instant alerts and auto-recovery.' },
  { icon: <FiShield />, t: 'Security Automation', d: 'Automated scanning and hardening across your stack.' },
  { icon: <FiZap />, t: 'Faster Releases', d: 'Deploy more often with far less risk.' },
  { icon: <FiGitBranch />, t: 'Cloud & Containers', d: 'Docker, Kubernetes and cloud-native best practices.' },
]
const PROCESS = [
  { n: '01', t: 'Pipeline & Infra Audit', d: 'We map your current build, release and hosting setup — measuring lead time, deploy frequency and failure rate before we change a thing.' },
  { n: '02', t: 'Containerise & Codify', d: 'We Dockerise your services and rewrite infrastructure as Terraform modules, so every environment is reproducible from a Git commit.' },
  { n: '03', t: 'Automate the Pipeline', d: 'We wire up CI/CD — build, test, scan and deploy to Kubernetes with blue-green or canary rollouts and one-click rollback.' },
  { n: '04', t: 'Observe & Harden', d: 'We ship Prometheus metrics, Grafana dashboards and on-call alerting, then tune autoscaling until releases are boring.' },
]
const STACK = ['Docker', 'Kubernetes', 'GitHub Actions', 'GitLab CI', 'Jenkins', 'Terraform', 'Ansible', 'Prometheus', 'Grafana', 'AWS & Azure']
const WHY = [
  { icon: <FiClock />, t: 'Deploys in Minutes', d: 'Automated pipelines replace manual release nights — teams typically go from monthly deploys to several a day.' },
  { icon: <FiShield />, t: 'Rollback, Not Panic', d: 'Canary releases and versioned container images mean a bad build is reverted in seconds, not firefought for hours.' },
  { icon: <FiTrendingUp />, t: 'Scales On Demand', d: 'Kubernetes autoscaling adds pods when traffic spikes and gives the capacity back when it drops — you pay for what you use.' },
  { icon: <FiCheck />, t: 'You Keep the Keys', d: 'Everything lives in your repos and your cloud account — documented pipelines, no lock-in, no black boxes.' },
]

export default function DevOpsServices() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="dop">
      <Seo
        title="DevOps Services & CI/CD Automation"
        description="CI/CD pipelines, Docker and Kubernetes, Terraform infrastructure-as-code and 24/7 monitoring — so your team deploys in minutes with one-click rollback. Get a free DevOps audit."
        path="/services/mobile/devops"
      />
      <section className="dop-hero dop-hero--dark">
        <div className="dop-hero__grid" />
        <div className="dop-container dop-hero__inner">
          <div className="dop-hero__text" data-aos="fade-right">
            <span className="dop-tag dop-tag--light"><FiGitBranch /> DevOps Services</span>
            <h1 className="dop-hero__title dop-hero__title--light">Ship Faster.<br /><span>Break Nothing.</span></h1>
            <p className="dop-hero__sub dop-hero__sub--light">CI/CD pipelines, monitoring and infrastructure automation that let your team deploy safely in minutes — with rock-solid reliability.</p>
            <div className="dop-hero__cta">
              <Link to="/contact" className="dop-btn dop-btn--solid">Automate My Pipeline <FiArrowRight /></Link>
              <Link to="/contact" className="dop-btn dop-btn--ghost-l">Free DevOps Audit</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="dop-features">
        <div className="dop-container">
          <div className="dop-head" data-aos="fade-up"><span className="dop-eyebrow">Capabilities</span><h2>Automation That Ships</h2></div>
          <div className="dop-features__grid">
            {FEATURES.map((f, i) => (<div className="dop-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}><span className="dop-feature__icon">{f.icon}</span><h3>{f.t}</h3><p>{f.d}</p></div>))}
          </div>
        </div>
      </section>
      <section className="dop-process">
        <div className="dop-container">
          <div className="dop-head" data-aos="fade-up">
            <span className="dop-eyebrow">Our Process</span>
            <h2>How We Build</h2>
          </div>
          <div className="dop-process__track">
            {PROCESS.map((s, i) => (
              <div className="dop-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="dop-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="dop-stack">
        <div className="dop-container">
          <div className="dop-head" data-aos="fade-up">
            <span className="dop-eyebrow">Tech Stack</span>
            <h2>Built With Modern Tech</h2>
          </div>
          <div className="dop-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="dop-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>
      <section className="dop-why">
        <div className="dop-container">
          <div className="dop-head" data-aos="fade-up">
            <span className="dop-eyebrow">Why Us</span>
            <h2>Why Businesses Choose Us</h2>
          </div>
          <div className="dop-why__grid">
            {WHY.map((w, i) => (
              <div className="dop-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="dop-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceFaq service="DevOps Services" faqs={FAQS} />
      <section className="dop-cta"><div className="dop-container"><div className="dop-cta__box" data-aos="zoom-in"><FiGitBranch className="dop-cta__ic" /><h2>Ready to Ship With Confidence?</h2><p>Get a free DevOps audit — we'll show you how to deploy faster and safer.</p><Link to="/contact" className="dop-btn dop-btn--light">Get My Free Audit <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
