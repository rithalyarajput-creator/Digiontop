import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiStar, FiUsers, FiSearch, FiTrendingUp, FiVideo, FiAward,
  FiCheck, FiArrowRight, FiArrowUpRight, FiHeart,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/SmmPages.css'

const FAQS = [
  { q: 'How do you find the right influencers?', a: 'We vet by audience fit, engagement quality (not just follower count), and past performance — so your budget reaches real, relevant buyers.' },
  { q: 'Do you handle outreach and contracts?', a: 'Fully — from finding creators to negotiation, briefs, contracts and content approval. It\'s completely managed.' },
  { q: 'Micro or macro influencers — which is better?', a: 'Often micro & nano creators deliver higher engagement and better ROI. We build the right mix for your goals.' },
  { q: 'How do you measure results?', a: 'Reach, engagement, clicks and conversions are tracked with unique links and codes so you see real ROI, not vanity metrics.' },
  { q: 'What niches do you cover?', a: 'Fashion, beauty, food, tech, fitness, D2C and more — we source creators that match your brand and audience.' },
]

const STEPS = [
  { icon: <FiSearch />, t: 'Discover & Vet', d: 'We find creators whose real audience matches your ideal customer.' },
  { icon: <FiVideo />, t: 'Brief & Create', d: 'Clear briefs and content approval so posts stay on-brand and authentic.' },
  { icon: <FiTrendingUp />, t: 'Amplify & Track', d: 'Boost top posts and track clicks, codes and conversions for real ROI.' },
]

export default function InfluencerMarketing() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="im">
      <section className="im-hero">
        <div className="im-container im-hero__inner">
          <div className="im-hero__text" data-aos="fade-right">
            <span className="im-tag"><FiStar /> Influencer Marketing</span>
            <h1 className="im-hero__title">Real Creators.<br /><span>Real Trust. Real Sales.</span></h1>
            <p className="im-hero__sub">We connect your brand with the right creators — vetted for real, engaged audiences — and manage everything from outreach to results.</p>
            <div className="im-hero__cta">
              <Link to="/contact" className="im-btn im-btn--solid">Launch a Campaign <FiArrowRight /></Link>
              <Link to="/contact" className="im-btn im-btn--ghost">Free Creator Match</Link>
            </div>
          </div>
          {/* creator cards */}
          <div className="im-creators" data-aos="fade-left">
            {[{ f: '128k', e: '6.2%' }, { f: '54k', e: '8.1%' }, { f: '210k', e: '5.4%' }].map((c, i) => (
              <div className={`im-creator im-creator--${i + 1}`} key={i}>
                <span className="im-creator__ava" />
                <b>@creator{i + 1}</b>
                <div className="im-creator__stats"><span><FiUsers /> {c.f}</span><span><FiHeart /> {c.e}</span></div>
                <span className="im-creator__badge"><FiAward /> Vetted</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="im-steps">
        <div className="im-container">
          <div className="im-head" data-aos="fade-up">
            <span className="im-eyebrow">How It Works</span>
            <h2>From Match to Measurable ROI</h2>
          </div>
          <div className="im-steps__grid">
            {STEPS.map((s, i) => (
              <div className="im-step" key={s.t} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="im-step__n">0{i + 1}</span>
                <span className="im-step__icon">{s.icon}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="im-band">
        <div className="im-container im-band__inner" data-aos="fade-up">
          <div><b>Vetted</b><span>Real Engaged Audiences</span></div>
          <div><b>Managed</b><span>Outreach to Reporting</span></div>
          <div><b>Tracked</b><span>Codes & Conversions</span></div>
        </div>
      </section>

      <ServiceFaq service="Influencer Marketing" faqs={FAQS} />

      <section className="im-cta">
        <div className="im-container">
          <div className="im-cta__box" data-aos="zoom-in">
            <FiStar className="im-cta__ic" />
            <h2>Ready to Borrow Some Trust?</h2>
            <p>Get a free creator match — we'll show you the perfect influencers for your brand and budget.</p>
            <Link to="/contact" className="im-btn im-btn--light">Get My Creator Match <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
