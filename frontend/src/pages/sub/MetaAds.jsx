import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiInstagram,
  FiTarget, FiCheck, FiArrowRight, FiArrowUpRight, FiUsers, FiZap,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/MetaAds.css'

const FAQS = [
  { q: 'Do Facebook & Instagram ads still work?', a: 'Absolutely — with the right creative and targeting, Meta ads deliver some of the cheapest, highest-quality leads and sales available today.' },
  { q: 'Do you make the ad creatives?', a: 'Yes — scroll-stopping images, carousels and reels are part of the service. Great targeting fails without great creative.' },
  { q: 'How do you target the right people?', a: 'Interest, lookalike, retargeting and custom audiences — refined continuously using real performance data.' },
  { q: 'What budget do I need to start?', a: 'We can start lean, prove what works, then scale. Our fee is separate from your ad spend and scales with results.' },
  { q: 'Can you retarget my website visitors?', a: 'Yes — we set up the Meta Pixel and run retargeting campaigns that bring back visitors who didn\'t convert.' },
]

const FORMATS = [
  { icon: <FiZap />, t: 'Reels & Video Ads', d: 'Short-form video built to stop the scroll and drive action in the first second.' },
  { icon: <FiInstagram />, t: 'Story & Carousel Ads', d: 'Immersive full-screen and swipeable formats that showcase products beautifully.' },
  { icon: <FiTarget />, t: 'Lead-Gen Campaigns', d: 'Instant forms that capture leads without leaving the app — lower cost, higher volume.' },
  { icon: <FiUsers />, t: 'Retargeting & Lookalikes', d: 'Re-engage warm visitors and find new buyers who look just like your best customers.' },
]

export default function MetaAds() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="meta">
      {/* HERO */}
      <section className="meta-hero">
        <div className="meta-container meta-hero__inner">
          <div className="meta-hero__text" data-aos="fade-right">
            <span className="meta-tag"><FiInstagram /> Facebook &amp; Instagram Ads</span>
            <h1 className="meta-hero__title">Ads That Stop the <span>Scroll</span></h1>
            <p className="meta-hero__sub">Creative-led Meta ad campaigns across Facebook &amp; Instagram — built to grab attention, capture leads and drive sales at a cost that makes sense.</p>
            <div className="meta-hero__cta">
              <Link to="/contact" className="meta-btn meta-btn--solid">Run My Meta Ads <FiArrowRight /></Link>
              <Link to="/contact" className="meta-btn meta-btn--ghost">Free Ad Review</Link>
            </div>
            <div className="meta-hero__trust">
              <span><FiCheck /> Creative Included</span>
              <span><FiCheck /> Pixel & Retargeting</span>
              <span><FiCheck /> Daily Optimisation</span>
            </div>
          </div>
        </div>
      </section>

      {/* formats */}
      <section className="meta-formats">
        <div className="meta-container">
          <div className="meta-head" data-aos="fade-up">
            <span className="meta-eyebrow">Ad Formats We Master</span>
            <h2>The Right Creative for Every Goal</h2>
          </div>
          <div className="meta-formats__grid">
            {FORMATS.map((f, i) => (
              <div className="meta-format" key={f.t} data-aos="fade-up" data-aos-delay={(i % 2) * 90}>
                <span className="meta-format__icon">{f.icon}</span>
                <div><h3>{f.t}</h3><p>{f.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* funnel band */}
      <section className="meta-band">
        <div className="meta-container meta-band__inner" data-aos="fade-up">
          <div><b>₹8</b><span>Avg cost per lead</span></div>
          <div><b>3.2x</b><span>Return on ad spend</span></div>
          <div><b>5M+</b><span>Impressions delivered</span></div>
        </div>
      </section>

      <ServiceFaq service="Facebook & Instagram Ads" faqs={FAQS} />

      <section className="meta-cta">
        <div className="meta-container">
          <div className="meta-cta__box" data-aos="zoom-in">
            <FiInstagram className="meta-cta__ic" />
            <h2>Ready to Turn Scrolls Into Sales?</h2>
            <p>Get a free Meta ads review — we'll show you what's working, what's wasting money, and how to scale.</p>
            <Link to="/contact" className="meta-btn meta-btn--light">Get My Free Ad Review <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
