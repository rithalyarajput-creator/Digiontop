import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiShare2, FiInstagram, FiFacebook, FiLinkedin, FiYoutube, FiTarget,
  FiTrendingUp, FiCheck, FiArrowRight, FiArrowUpRight, FiLayers,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/SocialAds.css'

const FAQS = [
  { q: 'Which platforms do you advertise on?', a: 'Meta (Facebook/Instagram), LinkedIn, YouTube, X and more — we choose the mix where your audience actually spends time.' },
  { q: 'How do you decide the platform mix?', a: 'By your goal and audience — B2B leans LinkedIn, B2C leans Meta & YouTube. We test and shift budget to the best performers.' },
  { q: 'Do you handle creative for each platform?', a: 'Yes — each platform gets native creative sized and written for its format and audience behaviour.' },
  { q: 'Can you run one campaign across platforms?', a: 'We run coordinated, cross-platform campaigns with unified tracking so you see total ROI, not siloed numbers.' },
  { q: 'How soon will I see results?', a: 'Paid social can drive leads within days; we then optimise across platforms over the first few weeks to maximise ROAS.' },
]

const PLATFORMS = [
  { icon: <FiInstagram />, t: 'Meta Ads', d: 'Facebook & Instagram — the highest-volume, most cost-effective paid social.' },
  { icon: <FiLinkedin />, t: 'LinkedIn Ads', d: 'Precision B2B targeting by job title, company and industry.' },
  { icon: <FiYoutube />, t: 'YouTube Ads', d: 'Video that builds brand and drives action across YouTube & Shorts.' },
  { icon: <FiShare2 />, t: 'X & Emerging', d: 'Reach audiences on X and new platforms as they grow.' },
]

export default function SocialAds() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="sa">
      <Seo
        title="Social Media Advertising Agency in India"
        description="Paid social campaigns across Meta, LinkedIn, YouTube and X, with native creative, unified tracking and budget shifted to winners. Get a free paid-social audit."
        path="/services/social-advertising"
      />
      {/* HERO — orbiting platforms */}
      <section className="sa-hero">
        <div className="sa-container sa-hero__inner">
          <div className="sa-hero__text" data-aos="fade-right">
            <span className="sa-tag"><FiShare2 /> Social Media Advertising</span>
            <h1 className="sa-hero__title">One Strategy.<br /><span>Every Platform.</span></h1>
            <p className="sa-hero__sub">Coordinated paid social campaigns across Meta, LinkedIn, YouTube and more — creative, targeting and budget managed as one, for maximum ROI.</p>
            <div className="sa-hero__cta">
              <Link to="/contact" className="sa-btn sa-btn--solid">Scale My Reach <FiArrowRight /></Link>
              <Link to="/contact" className="sa-btn sa-btn--ghost">Free Paid-Social Audit</Link>
            </div>
          </div>
        </div>
      </section>

      {/* platforms */}
      <section className="sa-platforms">
        <div className="sa-container">
          <div className="sa-head" data-aos="fade-up">
            <span className="sa-eyebrow">Where We Advertise</span>
            <h2>Your Audience, Wherever They Are</h2>
          </div>
          <div className="sa-platforms__grid">
            {PLATFORMS.map((p, i) => (
              <div className="sa-platform" key={p.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="sa-platform__icon">{p.icon}</span>
                <h3>{p.t}</h3><p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* band */}
      <section className="sa-band">
        <div className="sa-container sa-band__inner" data-aos="fade-up">
          <div><FiLayers /><b>Cross-Platform</b><span>Unified strategy & tracking</span></div>
          <div><FiTrendingUp /><b>Budget Shifting</b><span>Money follows performance</span></div>
          <div><FiCheck /><b>Native Creative</b><span>Built for each platform</span></div>
        </div>
      </section>

      <ServiceFaq service="Social Media Advertising" faqs={FAQS} />

      <section className="sa-cta">
        <div className="sa-container">
          <div className="sa-cta__box" data-aos="zoom-in">
            <FiShare2 className="sa-cta__ic" />
            <h2>Ready to Dominate Every Feed?</h2>
            <p>Get a free paid-social audit — we'll show you the platform mix and creative to maximise your return.</p>
            <Link to="/contact" className="sa-btn sa-btn--light">Get My Free Audit <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
