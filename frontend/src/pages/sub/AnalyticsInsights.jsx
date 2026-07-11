import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiBarChart2, FiActivity, FiTarget, FiPieChart, FiTrendingUp, FiCheck } from 'react-icons/fi'
import '../../styles/SubService.css'
import ServiceFaq from '../../components/ServiceFaq'

const SERVICES = [
  { icon: <FiBarChart2 />, t: 'Google Analytics Setup' }, { icon: <FiTarget />, t: 'Conversion Tracking' },
  { icon: <FiActivity />, t: 'User Behavior Analysis' }, { icon: <FiPieChart />, t: 'Campaign Reporting' },
  { icon: <FiBarChart2 />, t: 'Performance Dashboards' }, { icon: <FiTrendingUp />, t: 'Growth Insights' },
]

const METRICS = [
  {
    big: true,
    label: 'Conversion Rate Tracking',
    value: '100%',
    sub: 'of funnel steps mapped',
    desc: 'Every form fill, checkout, call click, and sign-up wired to GA4 and Meta/Google Ads so you know exactly which channel, keyword, and creative drives real conversions — not just clicks.',
  },
  { value: '15+', label: 'Tracked Events', sub: 'Custom goals, scroll depth, button clicks & more' },
  { value: 'Weekly', label: 'Reporting Cadence', sub: 'Plain-language performance summaries, no jargon' },
  { value: '360°', label: 'Dashboard View', sub: 'Traffic, spend, leads & revenue in one screen' },
]

const FAQS = [
  { q: 'What analytics tools do you set up?', a: 'We configure Google Analytics 4, Google Tag Manager, Meta Pixel, and Google Ads/Search Console linking, plus call and WhatsApp tracking where relevant — so every lead source is captured accurately from day one.' },
  { q: 'How is tracking set up without slowing down my website?', a: 'We deploy everything through Google Tag Manager with asynchronous, lightweight tags and test load impact before going live, so tracking never adds noticeable page load time.' },
  { q: 'What kind of reports will I actually receive?', a: 'You get a plain-language weekly or monthly report covering traffic sources, conversion rate, cost per lead, and top-performing campaigns — plus a live dashboard you can check anytime, not just a spreadsheet dump.' },
  { q: 'Can you fix analytics that were set up incorrectly before?', a: 'Yes. We regularly audit and rebuild broken GA4 properties, duplicate tags, and misfiring conversion events left behind by previous agencies or DIY setups.' },
  { q: 'How do you turn data into actual decisions, not just charts?', a: 'Every report includes clear recommendations — which channels to scale, which pages are losing visitors, and what to test next — so the numbers translate directly into next steps for your budget and content.' },
]

export default function AnalyticsInsights() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      <section className="ss-hero" style={{ textAlign: 'center' }}>
        <span className="ss-hero__orb ss-hero__orb--1" /><span className="ss-hero__orb ss-hero__orb--2" />
        <div className="ss-container" style={{ position: 'relative' }} data-aos="fade-up">
          <span className="ss-tag"><FiBarChart2 /> Analytics &amp; Insights</span>
          <h1 className="ss-hero__title" style={{ maxWidth: 820, margin: '0 auto 18px' }}>Turn Data Into <span>Better Business Decisions</span></h1>
          <p className="ss-hero__sub" style={{ margin: '0 auto 28px' }}>Understand customer behaviour, track performance, and identify growth opportunities through advanced analytics and reporting.</p>
          <div className="ss-hero__actions" style={{ justifyContent: 'center' }}><Link to="/contact" className="ss-btn ss-btn--primary">Get My Insights <FiArrowRight /></Link></div>
        </div>
      </section>

      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Services</span><h2 className="ss-h2">Data That Drives Growth</h2></div>
          <div className="uiux-grid">
            {SERVICES.map((s) => <div className="uiux-card" key={s.t} data-aos="fade-up"><span className="uiux-card__icon">{s.icon}</span><h3>{s.t}</h3></div>)}
          </div>
        </div>
      </section>

      <section className="ai-block">
        <div className="ss-container">
          <div className="ai-head" data-aos="fade-up">
            <span className="ss-eyebrow">By The Numbers</span>
            <h2 className="ss-h2">What We Track, Every Single Day</h2>
          </div>
          <div className="ai-bento">
            {METRICS.map((m, i) => (
              <div className={`ai-bento__card${m.big ? ' ai-bento__card--big' : ''}`} key={m.label} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="ai-bento__value">{m.value}</span>
                <h3 className="ai-bento__label">{m.label}</h3>
                <p className="ai-bento__sub">{m.sub}</p>
                {m.desc && <p className="ai-bento__desc">{m.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq service="Analytics & Insights" faqs={FAQS} />

      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <h2>Make Smarter Decisions</h2>
          <p>Track what matters and turn your data into real, measurable business growth.</p>
          <Link to="/contact" className="ss-btn">Start With Analytics <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
