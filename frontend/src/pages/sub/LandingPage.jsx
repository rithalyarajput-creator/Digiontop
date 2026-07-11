import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiTarget, FiZap, FiMousePointer, FiTrendingUp, FiEdit3, FiSmartphone,
  FiCheck, FiArrowRight, FiArrowUpRight, FiChevronRight,
  FiClock, FiBarChart2, FiDollarSign, FiRepeat,
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

const PROCESS = [
  { n: '01', t: 'Offer & Audience Brief', d: 'We map the exact ad, keyword or audience the traffic comes from, then define the one action the page must win.' },
  { n: '02', t: 'Wireframe & Message Match', d: 'We structure the hero, proof, objections and CTA so the page echoes your ad promise word-for-word and keeps the scent.' },
  { n: '03', t: 'Design & Build', d: 'Conversion-focused visuals, persuasive copy and a fast, mobile-first build with the form or checkout wired up.' },
  { n: '04', t: 'Track, Test & Improve', d: 'Pixels, conversion events and heatmaps go live, then we A/B test headlines, offers and CTAs to lift conversion rates.' },
]

const STACK = ['React', 'Next.js', 'Tailwind CSS', 'Figma', 'Google Tag Manager', 'GA4', 'Meta Pixel', 'Hotjar', 'Google Optimize / VWO', 'Vercel']

const WHY = [
  { icon: <FiClock />, t: 'Live in Days, Not Weeks', d: 'Campaign-ready pages in 3–7 days so your ad budget never waits on a build.' },
  { icon: <FiBarChart2 />, t: 'Conversion Tracking Built In', d: 'Every form, call and checkout fires a clean event, so you know exactly which ad made the money.' },
  { icon: <FiDollarSign />, t: 'Lower Cost Per Lead', d: 'Tight message match and a faster page mean better Quality Scores and cheaper clicks that actually convert.' },
  { icon: <FiRepeat />, t: 'Built for Testing', d: 'Modular sections and variant-ready layouts let us test headlines and offers without rebuilding the page.' },
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

      <section className="lp-process">
        <div className="lp-container">
          <div className="lp-head" data-aos="fade-up">
            <span className="lp-eyebrow">Our Process</span>
            <h2>How We Build</h2>
          </div>
          <div className="lp-process__track">
            {PROCESS.map((s, i) => (
              <div className="lp-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="lp-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lp-stack">
        <div className="lp-container">
          <div className="lp-head" data-aos="fade-up">
            <span className="lp-eyebrow">Tech Stack</span>
            <h2>Built With Modern Tech</h2>
          </div>
          <div className="lp-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="lp-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>

      <section className="lp-why">
        <div className="lp-container">
          <div className="lp-head" data-aos="fade-up">
            <span className="lp-eyebrow">Why Us</span>
            <h2>Why Businesses Choose Us</h2>
          </div>
          <div className="lp-why__grid">
            {WHY.map((w, i) => (
              <div className="lp-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="lp-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
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
