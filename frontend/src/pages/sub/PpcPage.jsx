import { useEffect } from 'react'
import { FaRocket } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiArrowRight, FiArrowUpRight, FiCheck, FiTrendingUp,
  FiTarget, FiSearch, FiShare2, FiFacebook, FiLinkedin, FiYoutube,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import RelatedServices from '../../components/RelatedServices'
import '../../styles/SubService.css'

const FAQS = [
  { q: 'How soon do paid ads deliver results?', a: 'Paid ads can drive leads from day one. We optimize over the first 2–4 weeks to maximize ROI and lower cost-per-lead.' },
  { q: 'Which platforms do you run ads on?', a: 'Google Ads (search, display, shopping), Meta (Facebook/Instagram), LinkedIn, and YouTube.' },
  { q: 'Is ad spend included in your pricing?', a: 'Our management fee is separate from your ad budget. We help you set a budget that fits your goals.' },
  { q: 'Will I see where my money goes?', a: 'Yes — full transparency with clear reports on spend, leads, conversions, and ROAS.' },
  { q: 'Do you need a long contract?', a: 'No lock-in. We earn your trust with measurable campaign performance.' },
]

const SERVICES = [
  { icon: <FiTarget />, t: 'PPC Management', d: 'Full pay-per-click campaign management built to maximize every rupee of ad spend.' },
  { icon: <FiSearch />, t: 'Google Ads Management', d: 'Search, display & shopping campaigns that put you in front of ready-to-buy customers.' },
  { icon: <FiShare2 />, t: 'Social Media Advertising', d: 'High-converting paid social campaigns across Meta, LinkedIn & more.' },
  { icon: <FiFacebook />, t: 'Facebook & Instagram Ads', d: 'Creative-led Meta ad campaigns optimized for leads, sales & ROAS.' },
  { icon: <FiLinkedin />, t: 'LinkedIn Advertising', d: 'B2B lead generation campaigns targeting decision-makers that convert.' },
  { icon: <FiYoutube />, t: 'YouTube Advertising', d: 'Video ad campaigns that build awareness and drive measurable action.' },
]
const BENEFITS = ['Higher ROI On Ad Spend', 'More Qualified Leads', 'Faster Results Than Organic', 'Precise Audience Targeting', 'Full Performance Tracking', 'Scalable Campaigns']
const STEPS = ['Audit & Research', 'Strategy', 'Campaign Setup', 'Optimization', 'Scale & Report']

export default function PpcPage() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      <section className="ss-hero">
        <div className="ss-container ss-hero__center" data-aos="fade-up">
          <span className="ss-tag"><FiTrendingUp /> PPC &amp; Paid Advertising</span>
          <h1 className="ss-hero__title">High-ROI Paid Campaigns <span>Across Every Platform</span></h1>
          <p className="ss-hero__sub">Google Ads, Meta Ads, lead generation & retargeting campaigns that actually deliver customers — built around real KPIs and measurable ROI.</p>
          <div className="ss-hero__actions">
            <Link to="/contact" className="ss-btn ss-btn--primary">Launch My Campaign <FiArrowRight /></Link>
            <Link to="/contact" className="ss-btn ss-btn--ghost">Get Free Ad Audit</Link>
          </div>
        </div>
      </section>

      <section className="ss-sec ss-sec--soft">
        <div className="ss-container ss-head" data-aos="fade-up">
          <span className="ss-eyebrow">Overview</span>
          <h2 className="ss-h2">Paid Ads That Pay For Themselves</h2>
          <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginTop: 14 }}>
            We plan, launch, and optimize paid campaigns that put your brand in front of the right
            audience at the right time — turning ad spend into real, trackable business growth.
          </p>
        </div>
      </section>

      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Services</span><h2 className="ss-h2">Full-Funnel Paid Advertising</h2></div>
          <div className="uiux-grid">
            {SERVICES.map((s) => (
              <div className="uiux-card ec-card" key={s.t} data-aos="fade-up">
                <span className="uiux-card__icon">{s.icon}</span><h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ss-sec ss-sec--dark">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow ss-eyebrow--light">Benefits</span><h2 className="ss-h2 ss-h2--light">Why Paid Ads Work</h2></div>
          <div className="ec-achieve">{BENEFITS.map((b) => <div className="ec-achieve__item" key={b} data-aos="fade-up"><FiCheck /> {b}</div>)}</div>
        </div>
      </section>

      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Process</span><h2 className="ss-h2">From Audit to Scale</h2></div>
          <div className="ss-process" data-aos="fade-up">
            {STEPS.map((s, i) => (
              <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <span className="ss-process__step"><b>{i + 1}</b>{s}</span>
                {i < STEPS.length - 1 && <span className="ss-process__arrow">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq service="PPC & Paid Advertising" faqs={FAQS} />

      <RelatedServices categoryHeading="PPC & Paid Advertising" />

      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <FaRocket style={{ fontSize: '2.2rem', display: 'block', margin: '0 auto 8px', color: '#F5A800' }} />
          <h2>Ready To Scale With Paid Ads?</h2>
          <p>Get a free ad audit and a campaign strategy built to deliver real, measurable ROI.</p>
          <Link to="/contact" className="ss-btn">Get Free Consultation <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
