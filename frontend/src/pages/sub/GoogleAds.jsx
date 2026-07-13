import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiSearch, FiTarget, FiTrendingUp, FiDollarSign, FiShoppingBag, FiMonitor,
  FiCheck, FiArrowRight, FiArrowUpRight, FiBarChart2, FiMousePointer,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/GoogleAds.css'

const FAQS = [
  { q: 'How much should I spend on Google Ads?', a: 'Budgets are set to your goals — we help you start lean, prove ROI, then scale winning campaigns. Our management fee is separate from ad spend.' },
  { q: 'How fast will I see leads?', a: 'Search ads can drive qualified leads from day one; we then optimise over 2–4 weeks to lower cost-per-lead and raise conversion rates.' },
  { q: 'Which Google campaigns do you run?', a: 'Search, Performance Max, Shopping, Display, YouTube and Remarketing — chosen and combined for your specific objectives.' },
  { q: 'Do you handle landing pages too?', a: 'Yes — we optimise or advise on landing pages, because the best ad still fails on a weak page. Conversion is our focus.' },
  { q: 'Will I see where my budget goes?', a: 'Complete transparency — clear reports on spend, clicks, conversions, cost-per-lead and ROAS, every month.' },
]

const CAMPAIGNS = [
  { icon: <FiSearch />, t: 'Search Ads', d: 'Capture high-intent buyers the moment they search for what you sell.' },
  { icon: <FiShoppingBag />, t: 'Shopping & PMax', d: 'Showcase products with images & prices across Google\'s entire network.' },
  { icon: <FiMonitor />, t: 'Display & Remarketing', d: 'Stay in front of visitors who didn\'t convert and bring them back.' },
  { icon: <FiTarget />, t: 'Conversion Tracking', d: 'Full tracking setup so every rupee is tied to real leads and sales.' },
]

export default function GoogleAds() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="gads">
      <Seo
        title="Google Ads Management Services in India"
        description="Search, Shopping, Performance Max and remarketing campaigns managed to lower your cost-per-lead and lift ROAS, with full conversion tracking. Get a free ad account audit."
        path="/services/google-ads"
      />
      {/* HERO — google search mock */}
      <section className="gads-hero">
        <div className="gads-container gads-hero__inner">
          <div className="gads-hero__text" data-aos="fade-right">
            <span className="gads-tag"><FiMousePointer /> Google Ads Management</span>
            <h1 className="gads-hero__title">Be the First Thing They <span>Click</span></h1>
            <p className="gads-hero__sub">We put your business at the top of Google exactly when customers are searching to buy — and turn those clicks into leads and sales, profitably.</p>
            <div className="gads-hero__cta">
              <Link to="/contact" className="gads-btn gads-btn--solid">Launch My Campaign <FiArrowRight /></Link>
              <Link to="/contact" className="gads-btn gads-btn--ghost">Free Ad Account Audit</Link>
            </div>
            <div className="gads-hero__mini">
              <div><b>Day 1</b><span>Leads Flowing</span></div>
              <div><b>-42%</b><span>Cost Per Lead</span></div>
              <div><b>4.8x</b><span>Avg ROAS</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* campaigns */}
      <section className="gads-camps">
        <div className="gads-container">
          <div className="gads-head" data-aos="fade-up">
            <span className="gads-eyebrow">Campaigns We Run</span>
            <h2>Every Google Placement, Optimised</h2>
          </div>
          <div className="gads-camps__grid">
            {CAMPAIGNS.map((c, i) => (
              <div className="gads-camp" key={c.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="gads-camp__icon">{c.icon}</span>
                <h3>{c.t}</h3><p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI band */}
      <section className="gads-roi">
        <div className="gads-container gads-roi__inner">
          <div data-aos="fade-right">
            <span className="gads-eyebrow gads-eyebrow--light">Profit, Not Just Clicks</span>
            <h2>We Optimise for Revenue — Relentlessly</h2>
            <p>Bids, keywords, negatives, ad copy and landing pages are refined continuously so your cost-per-lead drops and your ROAS climbs, month after month.</p>
          </div>
          <div className="gads-roi__chart" data-aos="fade-left">
            <div className="gads-roi__labels"><span>ROAS</span><b>4.8x</b></div>
            <div className="gads-roi__bars">
              {[30, 42, 55, 68, 80, 96].map((h, i) => (<span key={i} style={{ height: `${h}%` }} />))}
            </div>
            <div className="gads-roi__foot">Month 1 → Month 6</div>
          </div>
        </div>
      </section>

      <ServiceFaq service="Google Ads Management" faqs={FAQS} />

      <section className="gads-cta">
        <div className="gads-container">
          <div className="gads-cta__box" data-aos="zoom-in">
            <FiDollarSign className="gads-cta__ic" />
            <h2>Stop Wasting Ad Spend</h2>
            <p>Get a free Google Ads audit — we'll show you exactly where your budget is leaking and how to fix it.</p>
            <Link to="/contact" className="gads-btn gads-btn--light">Get My Free Ad Audit <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
