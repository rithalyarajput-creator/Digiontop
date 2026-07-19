import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiCompass, FiTrendingUp, FiTarget, FiUsers, FiAward, FiCalendar, FiCheck } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/SubService.css'

const SERVICES = [
  { icon: <FiTrendingUp />, t: 'Business Growth Strategy' }, { icon: <FiCompass />, t: 'Digital Marketing Planning' },
  { icon: <FiTarget />, t: 'Competitor Research' }, { icon: <FiUsers />, t: 'Customer Journey Mapping' },
  { icon: <FiAward />, t: 'Brand Strategy' }, { icon: <FiCalendar />, t: 'Campaign Planning' },
]

const AUDIT_STRATEGY_EXECUTION = [
  {
    label: 'Audit',
    items: [
      'Market & competitor research to benchmark positioning, pricing, and share of voice',
      'Full digital footprint review, website, SEO, ads, social, and analytics tracking',
      'Customer journey mapping to find drop-off points and missed conversion opportunities',
    ],
  },
  {
    label: 'Strategy',
    items: [
      '90-day growth roadmap with prioritized initiatives tied to business goals',
      'Channel strategy, the right mix of SEO, paid, social, and email for your audience',
      'KPI framework covering CAC, ROAS, conversion rate, and revenue targets',
    ],
  },
  {
    label: 'Execution',
    items: [
      'Sprint-based rollout with clear owners, timelines, and budget allocation',
      'Monthly performance reviews against KPIs with course-correction built in',
      'Reporting dashboard so you always know what is working and what is next',
    ],
  },
]

const FAQS = [
  { q: 'What does the market research process actually cover?', a: 'We analyze your top 5-8 competitors, industry pricing trends, target audience behavior, and channel performance benchmarks. You get a clear picture of where you stand and where the real opportunities are before we build the roadmap.' },
  { q: 'How is the growth roadmap structured?', a: 'It is a 90-day plan broken into prioritized initiatives, what to fix first, what to launch next, and what to scale later. Each item is tied to a specific business goal and a KPI so progress is measurable, not vague.' },
  { q: 'How do you decide which channels to invest in?', a: 'We map your audience against channel strengths, SEO for intent-driven traffic, paid ads for speed, social for brand and retention, email for repeat revenue, then weight budget toward whichever combination gives the best return for your stage of growth.' },
  { q: 'What KPIs do you track and report on?', a: 'Typically CAC, ROAS, conversion rate, cost per lead, and revenue growth, but the exact mix is set during the audit based on your goals. You get a live dashboard plus a monthly review call to walk through the numbers.' },
  { q: 'How long before we see measurable results?', a: 'Quick wins from the audit phase (fixing leaks, targeting corrections) often show up within 2-4 weeks. Strategic growth from the full roadmap typically compounds over 90 days, which is why we plan and report in that cycle.' },
]

export default function DigitalStrategy() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      <Seo
        title="Digital Marketing Strategy Consulting"
        description="Competitor research, customer journey mapping and a 90-day growth roadmap with a KPI framework covering CAC, ROAS and revenue. Book a free strategy consultation."
        path="/services/digital-strategy"
      />
      <section className="ss-hero">
        <span className="ss-hero__orb ss-hero__orb--1" /><span className="ss-hero__orb ss-hero__orb--2" />
        <div className="ss-container ds-hero" style={{ position: 'relative' }}>
          <div data-aos="fade-right">
            <span className="ss-tag"><FiCompass /> Digital Strategy</span>
            <h1 className="ss-hero__title">Strategic Solutions For <span>Sustainable Growth</span></h1>
            <p className="ss-hero__sub">Develop data-driven strategies that help your business reach the right audience, improve visibility, and achieve measurable results.</p>
            <div className="ss-hero__actions"><Link to="/contact" className="ss-btn ss-btn--primary">Build My Strategy <FiArrowRight /></Link><Link to="/contact" className="ss-btn ss-btn--ghost">Free Consultation</Link></div>
          </div>
          <div className="ds-stats" data-aos="fade-left">
            <div className="ds-stat"><b>2x</b><span>Avg Growth</span></div>
            <div className="ds-stat"><b>90d</b><span>Roadmap</span></div>
            <div className="ds-stat"><b>360°</b><span>Approach</span></div>
            <div className="ds-stat"><b>#1</b><span>Goal: Top</span></div>
          </div>
        </div>
      </section>

      <section className="ss-sec ss-sec--soft">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Services</span><h2 className="ss-h2">Strategy That Drives Results</h2></div>
          <div className="uiux-grid">
            {SERVICES.map((s) => <div className="uiux-card" key={s.t} data-aos="fade-up"><span className="uiux-card__icon">{s.icon}</span><h3>{s.t}</h3></div>)}
          </div>
        </div>
      </section>

      <section className="ds-block">
        <div className="ss-container">
          <div className="ds-head" data-aos="fade-up">
            <span className="ss-eyebrow">Digital Strategy Consulting</span>
            <h2 className="ss-h2">From Audit To Execution, In One Roadmap</h2>
          </div>
          <div className="ds-ase">
            {AUDIT_STRATEGY_EXECUTION.map((col, i) => (
              <div className="ds-ase__col" key={col.label} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="ds-ase__head">
                  <span className="ds-ase__num">{String(i + 1).padStart(2, '0')}</span>
                  <h3>{col.label}</h3>
                </div>
                <ul className="ds-ase__list">
                  {col.items.map((item) => (
                    <li key={item}><FiCheck /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq service="Digital Strategy Consulting" faqs={FAQS} />

      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <h2>Ready For A Winning Strategy?</h2>
          <p>Get a clear, data-driven roadmap that aligns your brand, marketing, and business goals.</p>
          <Link to="/contact" className="ss-btn">Get Your Strategy <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
