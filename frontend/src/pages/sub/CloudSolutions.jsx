import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiCloud, FiServer, FiShield, FiZap, FiRefreshCw, FiTrendingUp, FiCheck, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/MobilePages.css'

const FAQS = [
  { q: 'What are cloud solutions?', a: 'Hosting, storage and infrastructure on cloud platforms like AWS, Azure and Google Cloud — scalable, reliable and cost-efficient.' },
  { q: 'Will it reduce my costs?', a: 'Usually — you pay only for what you use, with no expensive hardware, and we optimise resources to cut waste.' },
  { q: 'Is the cloud secure?', a: 'Yes — with proper configuration, encryption and access control, cloud is more secure than most on-premise setups.' },
  { q: 'Can you migrate my existing systems?', a: 'Absolutely — we plan and execute safe cloud migrations with zero data loss and minimal downtime.' },
  { q: 'Which providers do you work with?', a: 'AWS, Google Cloud and Azure — we recommend the best fit for your needs and budget.' },
]
const FEATURES = [
  { icon: <FiServer />, t: 'Cloud Hosting', d: 'Fast, reliable hosting on AWS, GCP or Azure.' },
  { icon: <FiTrendingUp />, t: 'Auto-Scaling', d: 'Resources that scale up and down with your demand.' },
  { icon: <FiShield />, t: 'Secure & Compliant', d: 'Encryption, access control and compliance built in.' },
  { icon: <FiRefreshCw />, t: 'Cloud Migration', d: 'Safe, zero-downtime migration of your systems.' },
  { icon: <FiZap />, t: 'High Performance', d: 'Global CDN and optimised infrastructure for speed.' },
  { icon: <FiCloud />, t: 'Backup & Recovery', d: 'Automated backups and disaster recovery.' },
]

export default function CloudSolutions() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="cld">
      <section className="cld-hero cld-hero--dark">
        <div className="cld-hero__grid" />
        <div className="cld-container cld-hero__inner">
          <div className="cld-hero__text" data-aos="fade-right">
            <span className="cld-tag cld-tag--light"><FiCloud /> Cloud Solutions</span>
            <h1 className="cld-hero__title cld-hero__title--light">Infrastructure That<br /><span>Scales Instantly</span></h1>
            <p className="cld-hero__sub cld-hero__sub--light">Reliable, secure, cost-efficient cloud hosting and migration on AWS, Google Cloud and Azure — infrastructure that grows exactly as fast as you do.</p>
            <div className="cld-hero__cta">
              <Link to="/contact" className="cld-btn cld-btn--solid">Move to the Cloud <FiArrowRight /></Link>
              <Link to="/contact" className="cld-btn cld-btn--ghost-l">Free Cloud Audit</Link>
            </div>
          </div>
          <div className="mv-card" data-aos="fade-left">
            <div className="mv-card__top"><b>Cloud Infrastructure</b><span className="mv-card__live">● Healthy</span></div>
            <div className="mv-row"><FiServer /> app-server-01 <b className="g">running</b></div>
            <div className="mv-row"><FiTrendingUp /> auto-scaling <b className="g">active</b></div>
            <div className="mv-row"><FiShield /> ssl / firewall <b className="g">secure</b></div>
            <div className="mv-card__foot"><FiCheck /> 99.99% uptime · auto-backup on</div>
          </div>
        </div>
      </section>
      <section className="cld-features">
        <div className="cld-container">
          <div className="cld-head" data-aos="fade-up"><span className="cld-eyebrow">Capabilities</span><h2>Cloud, Done Right</h2></div>
          <div className="cld-features__grid">
            {FEATURES.map((f, i) => (<div className="cld-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}><span className="cld-feature__icon">{f.icon}</span><h3>{f.t}</h3><p>{f.d}</p></div>))}
          </div>
        </div>
      </section>
      <section className="cld-band"><div className="cld-container cld-band__inner" data-aos="fade-up"><div><b>99.99%</b><span>Uptime</span></div><div><b>Auto</b><span>Scaling</span></div><div><b>Zero</b><span>Downtime Migration</span></div></div></section>
      <ServiceFaq service="Cloud Solutions" faqs={FAQS} />
      <section className="cld-cta"><div className="cld-container"><div className="cld-cta__box" data-aos="zoom-in"><FiCloud className="cld-cta__ic" /><h2>Ready to Scale Without Limits?</h2><p>Get a free cloud audit — we'll show you how to cut costs and scale reliably.</p><Link to="/contact" className="cld-btn cld-btn--light">Get My Free Audit <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
