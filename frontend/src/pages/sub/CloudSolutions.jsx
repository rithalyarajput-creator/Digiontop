import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiCloud, FiServer, FiShield, FiZap, FiRefreshCw, FiTrendingUp, FiCheck, FiArrowRight, FiArrowUpRight, FiDollarSign, FiActivity } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/MobilePages.css'

const FAQS = [
  { q: 'What are cloud solutions?', a: 'Hosting, storage and infrastructure on cloud platforms like AWS, Azure and Google Cloud, scalable, reliable and cost-efficient.' },
  { q: 'Will it reduce my costs?', a: 'Usually, you pay only for what you use, with no expensive hardware, and we optimise resources to cut waste.' },
  { q: 'Is the cloud secure?', a: 'Yes, with proper configuration, encryption and access control, cloud is more secure than most on-premise setups.' },
  { q: 'Can you migrate my existing systems?', a: 'Absolutely, we plan and execute safe cloud migrations with zero data loss and minimal downtime.' },
  { q: 'Which providers do you work with?', a: 'AWS, Google Cloud and Azure, we recommend the best fit for your needs and budget.' },
]
const FEATURES = [
  { icon: <FiServer />, t: 'Cloud Hosting', d: 'Fast, reliable hosting on AWS, GCP or Azure.' },
  { icon: <FiTrendingUp />, t: 'Auto-Scaling', d: 'Resources that scale up and down with your demand.' },
  { icon: <FiShield />, t: 'Secure & Compliant', d: 'Encryption, access control and compliance built in.' },
  { icon: <FiRefreshCw />, t: 'Cloud Migration', d: 'Safe, zero-downtime migration of your systems.' },
  { icon: <FiZap />, t: 'High Performance', d: 'Global CDN and optimised infrastructure for speed.' },
  { icon: <FiCloud />, t: 'Backup & Recovery', d: 'Automated backups and disaster recovery.' },
]
const PROCESS = [
  { n: '01', t: 'Cloud Readiness Audit', d: 'We inventory your servers, databases and dependencies, then benchmark current spend and downtime to decide what moves, what gets rebuilt and what stays.' },
  { n: '02', t: 'Architecture & Landing Zone', d: 'We design the target architecture on AWS, Azure or GCP, VPC networking, IAM roles, environments and cost guardrails, before a single workload moves.' },
  { n: '03', t: 'Migration & Automation', d: 'Workloads move in waves with replication and dry runs, while Terraform and CI/CD pipelines make every environment reproducible instead of hand-built.' },
  { n: '04', t: 'Scale, Monitor & Optimise', d: 'We switch on auto-scaling, alerting and backups, then tune instance sizes and reserved capacity every month so your bill drops as traffic grows.' },
]
const STACK = ['AWS', 'Microsoft Azure', 'Google Cloud', 'Kubernetes', 'Docker', 'Terraform', 'AWS Lambda', 'Cloudflare CDN', 'Amazon RDS', 'Prometheus & Grafana']
const WHY = [
  { icon: <FiRefreshCw />, t: 'Zero-Downtime Migration', d: 'Live replication and staged cutovers mean your customers never see a maintenance page while we move you to the cloud.' },
  { icon: <FiDollarSign />, t: 'Lower Monthly Bills', d: 'Right-sizing, autoscaling and reserved instances typically cut cloud spend by 30-40% versus a lift-and-shift setup.' },
  { icon: <FiShield />, t: 'Security & Compliance', d: 'Least-privilege IAM, encryption at rest and in transit, and audit logging configured to pass real security reviews.' },
  { icon: <FiActivity />, t: '24/7 Monitoring', d: 'Dashboards, alerts and automated backups so failures are caught and recovered long before they reach your users.' },
]

export default function CloudSolutions() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="cld">
      <Seo
        title="Cloud Migration & Hosting Solutions"
        description="Zero-downtime cloud migration, auto-scaling and secure hosting on AWS, Azure and Google Cloud, with right-sizing that cuts your monthly bill. Book a free cloud audit."
        path="/services/mobile/cloud"
      />
      <section className="cld-hero cld-hero--dark">
        <div className="cld-hero__grid" />
        <div className="cld-container cld-hero__inner">
          <div className="cld-hero__text" data-aos="fade-right">
            <span className="cld-tag cld-tag--light"><FiCloud /> Cloud Solutions</span>
            <h1 className="cld-hero__title cld-hero__title--light">Infrastructure That<br /><span>Scales Instantly</span></h1>
            <p className="cld-hero__sub cld-hero__sub--light">Reliable, secure, cost-efficient cloud hosting and migration on AWS, Google Cloud and Azure, infrastructure that grows exactly as fast as you do.</p>
            <div className="cld-hero__cta">
              <Link to="/contact" className="cld-btn cld-btn--solid">Move to the Cloud <FiArrowRight /></Link>
              <Link to="/contact" className="cld-btn cld-btn--ghost-l">Free Cloud Audit</Link>
            </div>
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
      <section className="cld-process">
        <div className="cld-container">
          <div className="cld-head" data-aos="fade-up">
            <span className="cld-eyebrow">Our Process</span>
            <h2>How We Build</h2>
          </div>
          <div className="cld-process__track">
            {PROCESS.map((s, i) => (
              <div className="cld-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="cld-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="cld-stack">
        <div className="cld-container">
          <div className="cld-head" data-aos="fade-up">
            <span className="cld-eyebrow">Tech Stack</span>
            <h2>Built With Modern Tech</h2>
          </div>
          <div className="cld-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="cld-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>
      <section className="cld-why">
        <div className="cld-container">
          <div className="cld-head" data-aos="fade-up">
            <span className="cld-eyebrow">Why Us</span>
            <h2>Why Businesses Choose Us</h2>
          </div>
          <div className="cld-why__grid">
            {WHY.map((w, i) => (
              <div className="cld-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="cld-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceFaq service="Cloud Solutions" faqs={FAQS} />
      <section className="cld-cta"><div className="cld-container"><div className="cld-cta__box" data-aos="zoom-in"><FiCloud className="cld-cta__ic" /><h2>Ready to Scale Without Limits?</h2><p>Get a free cloud audit, we'll show you how to cut costs and scale reliably.</p><Link to="/contact" className="cld-btn cld-btn--light">Get My Free Audit <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
