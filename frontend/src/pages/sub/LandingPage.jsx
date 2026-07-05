import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiTarget, FiZap, FiMousePointer, FiTrendingUp, FiEdit3, FiSmartphone,
  FiCheck, FiArrowRight, FiArrowUpRight, FiChevronRight,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/WebDevPages.css'

const FAQS = [
  { q: 'What is a landing page?', a: 'A single, focused page built for one goal — a lead or sale. No distractions, just persuasion and a clear call-to-action.' },
  { q: 'Why not just use my homepage?', a: 'Homepages have many goals. A dedicated landing page focused on one offer converts far better for ads and campaigns.' },
  { q: 'How fast can it be built?', a: 'Most landing pages are ready in 3–7 days — perfect for launching a campaign quickly.' },
  { q: 'Will it work with my ads?', a: 'Yes — it\'s designed to match your ad message and maximise conversions from paid traffic.' },
  { q: 'Do you write the copy too?', a: 'We can — persuasive, conversion-focused copy and design together for the best results.' },
]

const FEATURES = [
  { icon: <FiTarget />, t: 'Single Focused Goal', d: 'One clear objective — no distractions, maximum conversions.' },
  { icon: <FiMousePointer />, t: 'Strong CTAs', d: 'Compelling calls-to-action placed exactly where they convert.' },
  { icon: <FiZap />, t: 'Fast Loading', d: 'Lightning-fast pages so you never lose a click to slow speed.' },
  { icon: <FiSmartphone />, t: 'Mobile Optimised', d: 'Perfect on phones where most paid traffic lands.' },
  { icon: <FiEdit3 />, t: 'Persuasive Copy', d: 'Conversion-focused messaging that drives action.' },
  { icon: <FiTrendingUp />, t: 'A/B Ready', d: 'Built to test and improve conversion rates over time.' },
]

export default function LandingPage() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="lp">
      <section className="lp-hero lp-hero--dark">
        <div className="lp-hero__grid" />
        <div className="lp-container lp-hero__inner">
          <div className="lp-hero__text" data-aos="fade-right">
            <span className="lp-tag lp-tag--light"><FiTarget /> Landing Page Design</span>
            <h1 className="lp-hero__title lp-hero__title--light">Pages Built to<br /><span>Convert</span></h1>
            <p className="lp-hero__sub lp-hero__sub--light">High-converting landing pages designed for one goal — turning your ad clicks and campaign traffic into leads and sales.</p>
            <div className="lp-hero__cta">
              <Link to="/contact" className="lp-btn lp-btn--solid">Build My Landing Page <FiArrowRight /></Link>
              <Link to="/contact" className="lp-btn lp-btn--ghost-l">See Examples</Link>
            </div>
          </div>
          {/* landing page mock */}
          <div className="lp-mock" data-aos="fade-left">
            <div className="lp-mock__hero">
              <span className="lp-mock__badge">Limited Offer</span>
              <b>Get 40% Off Today</b>
              <span className="lp-mock__sub">One clear message. One clear action.</span>
              <span className="lp-mock__cta2">Claim My Offer <FiChevronRight /></span>
            </div>
            <div className="lp-mock__trust"><span>★★★★★</span><small>Trusted by 200+ brands</small></div>
            <div className="lp-mock__conv"><FiTrendingUp /> 4.9% conversion rate</div>
          </div>
        </div>
      </section>

      <section className="lp-features">
        <div className="lp-container">
          <div className="lp-head" data-aos="fade-up">
            <span className="lp-eyebrow">What Makes It Convert</span>
            <h2>Every Element Earns Its Place</h2>
          </div>
          <div className="lp-features__grid">
            {FEATURES.map((f, i) => (
              <div className="lp-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="lp-feature__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-band">
        <div className="lp-container lp-band__inner" data-aos="fade-up">
          <div><b>1 Goal</b><span>Zero Distractions</span></div>
          <div><b>3-7 Days</b><span>Fast Turnaround</span></div>
          <div><b>A/B</b><span>Test Ready</span></div>
        </div>
      </section>

      <ServiceFaq service="Landing Page Design" faqs={FAQS} />

      <section className="lp-cta">
        <div className="lp-container">
          <div className="lp-cta__box" data-aos="zoom-in">
            <FiTarget className="lp-cta__ic" />
            <h2>Ready to Convert More Clicks?</h2>
            <p>Get a high-converting landing page for your next campaign — request a free quote today.</p>
            <Link to="/contact" className="lp-btn lp-btn--light">Get My Free Quote <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
