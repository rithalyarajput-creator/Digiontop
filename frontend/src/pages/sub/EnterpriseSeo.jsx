import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiLayers, FiTrendingUp, FiUsers, FiGlobe, FiShield, FiGitBranch,
  FiCheck, FiArrowRight, FiArrowUpRight, FiBarChart2, FiDatabase,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/EnterpriseSeo.css'

const FAQS = [
  { q: 'What counts as "enterprise" SEO?', a: 'Large sites (10k+ pages), multiple teams or stakeholders, complex tech stacks, or multi-region/brand operations that need SEO at scale with governance.' },
  { q: 'Can you work with our dev and content teams?', a: 'Yes — we integrate into your workflow with clear specs, tickets and documentation so your internal teams can execute confidently.' },
  { q: 'Do you handle multi-region / multi-language?', a: 'Absolutely — hreflang, international targeting, and localised content strategy are core to enterprise engagements.' },
  { q: 'How do you prove ROI at scale?', a: 'Executive dashboards tie rankings and traffic to revenue and pipeline, with forecasting so leadership sees the business impact.' },
  { q: 'How do you manage large-scale changes safely?', a: 'Prioritised roadmaps, staging tests, phased rollouts and monitoring — so big changes ship without risking traffic.' },
]

const CAPS = [
  { icon: <FiDatabase />, t: 'Scalable Site Architecture', d: 'Templated, crawl-efficient structures that keep 100k+ pages indexable and organised.' },
  { icon: <FiGlobe />, t: 'International & Multi-Region', d: 'Hreflang, geo-targeting and localisation strategy across markets and languages.' },
  { icon: <FiGitBranch />, t: 'Process & Governance', d: 'SEO playbooks, QA gates and workflows so quality holds across large teams.' },
  { icon: <FiBarChart2 />, t: 'Executive Reporting', d: 'Revenue-tied dashboards and forecasting built for leadership decisions.' },
  { icon: <FiShield />, t: 'Risk-Managed Migrations', d: 'Replatforms and redesigns without losing rankings — phased and monitored.' },
  { icon: <FiUsers />, t: 'Cross-Team Enablement', d: 'We upskill your content, dev and product teams to execute SEO at scale.' },
]

export default function EnterpriseSeo() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ent">
      <Seo
        title="Enterprise SEO Services for Large Websites"
        description="SEO at scale for 10k+ page sites — crawl-efficient architecture, hreflang and multi-region targeting, risk-managed migrations and revenue-tied reporting. Request a proposal."
        path="/services/enterprise-seo"
      />
      {/* HERO — dashboard theme */}
      <section className="ent-hero">
        <div className="ent-container ent-hero__inner">
          <div className="ent-hero__text" data-aos="fade-right">
            <span className="ent-tag"><FiLayers /> Enterprise SEO</span>
            <h1 className="ent-hero__title">SEO That Scales With <span>Your Business</span></h1>
            <p className="ent-hero__sub">For large sites, multiple teams and complex stacks — we bring the strategy, governance and reporting to grow organic revenue at enterprise scale.</p>
            <div className="ent-hero__cta">
              <Link to="/contact" className="ent-btn ent-btn--solid">Book a Strategy Call <FiArrowRight /></Link>
              <Link to="/contact" className="ent-btn ent-btn--ghost">Request a Proposal</Link>
            </div>
          </div>
        </div>
      </section>

      {/* capabilities */}
      <section className="ent-caps">
        <div className="ent-container">
          <div className="ent-head" data-aos="fade-up">
            <span className="ent-eyebrow">Enterprise Capabilities</span>
            <h2>Built for Complexity &amp; Scale</h2>
          </div>
          <div className="ent-caps__grid">
            {CAPS.map((c, i) => (
              <div className="ent-cap" key={c.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="ent-cap__num">0{i + 1}</span>
                <span className="ent-cap__icon">{c.icon}</span>
                <h3>{c.t}</h3><p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* logos-style trust band */}
      <section className="ent-band">
        <div className="ent-container ent-band__inner" data-aos="fade-up">
          <h2>One Partner. Every Stakeholder Aligned.</h2>
          <div className="ent-band__row">
            <span>C-Suite</span><span>Marketing</span><span>Product</span><span>Engineering</span><span>Content</span>
          </div>
          <p>From boardroom forecasts to developer tickets — we speak every team's language and keep SEO moving.</p>
        </div>
      </section>

      <ServiceFaq service="Enterprise SEO" faqs={FAQS} />

      <section className="ent-cta">
        <div className="ent-container">
          <div className="ent-cta__box" data-aos="zoom-in">
            <FiLayers className="ent-cta__ic" />
            <h2>Scale Organic Growth Across Your Business</h2>
            <p>Let's map an enterprise SEO strategy tied to real revenue — starting with a free opportunity assessment.</p>
            <Link to="/contact" className="ent-btn ent-btn--light">Get an Enterprise Assessment <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
