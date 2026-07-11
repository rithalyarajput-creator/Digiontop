import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiGitBranch, FiRefreshCw, FiActivity, FiShield, FiServer, FiZap, FiCheck, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
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

export default function DevOpsServices() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="dop">
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
      <section className="dop-band"><div className="dop-container dop-band__inner" data-aos="fade-up"><div><b>Minutes</b><span>Not Days to Deploy</span></div><div><b>24/7</b><span>Monitoring</span></div><div><b>Zero</b><span>Downtime Releases</span></div></div></section>
      <ServiceFaq service="DevOps Services" faqs={FAQS} />
      <section className="dop-cta"><div className="dop-container"><div className="dop-cta__box" data-aos="zoom-in"><FiGitBranch className="dop-cta__ic" /><h2>Ready to Ship With Confidence?</h2><p>Get a free DevOps audit — we'll show you how to deploy faster and safer.</p><Link to="/contact" className="dop-btn dop-btn--light">Get My Free Audit <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
