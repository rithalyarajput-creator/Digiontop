import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiTrendingUp, FiTarget, FiActivity, FiBarChart2, FiCheck } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/SubService.css'

const SERVICES = [
  { icon: <FiTarget />, t: 'Landing Page Optimization' }, { icon: <FiTrendingUp />, t: 'Funnel Optimization' },
  { icon: <FiActivity />, t: 'A/B Testing' }, { icon: <FiBarChart2 />, t: 'User Behavior Analysis' },
  { icon: <FiActivity />, t: 'Heatmap Analysis' }, { icon: <FiTarget />, t: 'Conversion Tracking' },
  { icon: <FiTrendingUp />, t: 'Performance Improvements' },
]
const BENEFITS = ['More Leads', 'Better Sales Performance', 'Higher ROI', 'Improved User Experience', 'Better Marketing Results']

const CRO_MINI_STATS = [
  { v: '3-6', l: 'A/B tests run per quarter, each backed by statistical significance before we call a winner' },
  { v: '12+', l: 'Funnel drop-off points typically uncovered per audit across landing, cart, and checkout steps' },
  { v: '2-4wk', l: 'Average time to first validated test win after launching a new optimization sprint' },
]

const FAQS = [
  { q: 'What exactly does CRO (Conversion Rate Optimization) involve?', a: 'CRO is the process of systematically improving your website so more visitors take the action you want — buying, signing up, or requesting a quote. It combines funnel analysis, user behavior data (heatmaps, session recordings), and structured A/B testing to find and fix the exact points where people drop off.' },
  { q: 'How do you decide what to A/B test first?', a: 'We start with a funnel and heatmap audit to find the highest-drop-off, highest-traffic pages — usually landing pages, product pages, or checkout steps. Tests are prioritized by potential impact and traffic volume so we validate the biggest wins first instead of testing button colors.' },
  { q: 'How long does an A/B test need to run before we trust the result?', a: 'It depends on your traffic, but most tests need 2-4 weeks and enough conversions per variant to reach statistical significance (typically 95% confidence). We never call a winner early — a test stopped too soon is often just noise.' },
  { q: 'What is a landing page audit and what do I get from it?', a: 'We review your page against CRO best practices — headline clarity, page speed, form friction, trust signals, and mobile experience — combined with real user behavior data. You get a prioritized list of fixes ranked by expected conversion impact, not just a generic checklist.' },
  { q: 'Do you need a minimum amount of traffic to run CRO effectively?', a: 'A/B testing works best with meaningful monthly traffic to reach significance quickly, but lower-traffic sites still benefit from funnel analysis, heatmap reviews, and best-practice landing page fixes that lift conversions without needing a split test to prove it.' },
]

export default function CroServices() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      <section className="ss-hero">
        <span className="ss-hero__orb ss-hero__orb--1" /><span className="ss-hero__orb ss-hero__orb--2" />
        <div className="ss-container ds-hero" style={{ position: 'relative' }}>
          <div data-aos="fade-right">
            <span className="ss-tag"><FiTrendingUp /> CRO Services</span>
            <h1 className="ss-hero__title">Turn More Visitors <span>Into Customers</span></h1>
            <p className="ss-hero__sub">Conversion Rate Optimization improves your website's performance and increases the percentage of visitors who take action.</p>
            <div className="ss-hero__actions"><Link to="/contact" className="ss-btn ss-btn--primary">Boost My Conversions <FiArrowRight /></Link><Link to="/contact" className="ss-btn ss-btn--ghost">Free Audit</Link></div>
          </div>
          <div className="ds-stats" data-aos="fade-left">
            <div className="ds-stat"><b>+CR</b><span>More Conversions</span></div>
            <div className="ds-stat"><b>A/B</b><span>Tested</span></div>
            <div className="ds-stat"><b>ROI</b><span>Focused</span></div>
            <div className="ds-stat"><b>Data</b><span>Driven</span></div>
          </div>
        </div>
      </section>

      <section className="ss-sec ss-sec--soft">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Services</span><h2 className="ss-h2">Optimize Every Step</h2></div>
          <div className="uiux-grid">
            {SERVICES.map((s) => <div className="uiux-card" key={s.t} data-aos="fade-up"><span className="uiux-card__icon">{s.icon}</span><h3>{s.t}</h3></div>)}
          </div>
        </div>
      </section>

      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Benefits</span><h2 className="ss-h2">Real Results, Measurable Growth</h2></div>
          <div className="ss-benefits">{BENEFITS.map((b) => <span className="ss-benefit" key={b} data-aos="zoom-in"><FiCheck /> {b}</span>)}</div>
        </div>
      </section>

      <section className="cro-block">
        <div className="ss-container">
          <div className="cro-head" data-aos="fade-up">
            <span className="ss-eyebrow">Results That Compound</span>
            <h2 className="ss-h2">Every Test, Funnel Fix &amp; Redesign Is Measured</h2>
          </div>
          <div className="cro-strip" data-aos="fade-up">
            <div className="cro-strip__main">
              <span className="cro-strip__value">+38%</span>
              <span className="cro-strip__label">Avg. conversion lift</span>
              <p className="cro-strip__desc">Across client A/B tests on landing pages and checkout flows — measured against the original control, not vanity metrics.</p>
            </div>
            <div className="cro-strip__mini-list">
              {CRO_MINI_STATS.map((s) => (
                <div className="cro-strip__mini" key={s.v} data-aos="fade-left">
                  <span className="cro-strip__mini-value">{s.v}</span>
                  <span className="cro-strip__mini-label">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServiceFaq service="CRO Services" faqs={FAQS} />

      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <h2>Convert More, Earn More</h2>
          <p>Stop losing visitors — let's optimize your funnel to turn traffic into real customers.</p>
          <Link to="/contact" className="ss-btn">Start CRO Optimization <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
