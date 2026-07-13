import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiShare2, FiHeart, FiMessageCircle, FiTrendingUp, FiUsers, FiTarget,
  FiCheck, FiArrowRight, FiArrowUpRight, FiCalendar, FiBarChart2,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/SmmPages.css'

const FAQS = [
  { q: 'Which platforms do you manage?', a: 'Instagram, Facebook, LinkedIn, YouTube and X — we focus on where your audience actually is and where growth is fastest.' },
  { q: 'Do you create the content too?', a: 'Yes — strategy, posts, reels, captions and a content calendar are all included. We handle end-to-end.' },
  { q: 'How fast will my followers grow?', a: 'Organic growth compounds — most brands see meaningful engagement lifts in 4–8 weeks with consistent, strategic content.' },
  { q: 'Do you run paid ads too?', a: 'We can — organic + a smart paid boost is often the fastest route. It\'s tailored to your goals and budget.' },
  { q: 'Will I get performance reports?', a: 'Absolutely — clear monthly reports on reach, engagement, growth and what\'s driving results.' },
]

const PILLARS = [
  { icon: <FiCalendar />, t: 'Content Strategy & Calendar', d: 'A planned, on-brand posting schedule mapped to your goals and audience.' },
  { icon: <FiShare2 />, t: 'Reels, Posts & Stories', d: 'Scroll-stopping creative produced consistently across every format.' },
  { icon: <FiUsers />, t: 'Community Management', d: 'We engage, reply and build a real community around your brand.' },
  { icon: <FiTarget />, t: 'Growth Campaigns', d: 'Organic + paid tactics that grow followers who actually convert.' },
]

export default function SocialMediaMarketing() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="smm">
      <Seo
        title="Social Media Marketing Agency in India"
        description="Strategy, reels, posts and community management that grow your following and turn engagement into paying customers across every platform. Free social audit."
        path="/services/social/social-media-marketing"
      />
      {/* HERO — engagement counters */}
      <section className="smm-hero">
        <div className="smm-container smm-hero__inner">
          <div className="smm-hero__text" data-aos="fade-right">
            <span className="smm-tag"><FiShare2 /> Social Media Marketing</span>
            <h1 className="smm-hero__title">Turn Followers Into <span>Customers</span></h1>
            <p className="smm-hero__sub">Strategy, content and community management that grows your audience and turns engagement into real business — across every platform.</p>
            <div className="smm-hero__cta">
              <Link to="/contact" className="smm-btn smm-btn--solid">Grow My Socials <FiArrowRight /></Link>
              <Link to="/contact" className="smm-btn smm-btn--ghost">Free Social Audit</Link>
            </div>
          </div>
        </div>
      </section>

      {/* pillars */}
      <section className="smm-pillars">
        <div className="smm-container">
          <div className="smm-head" data-aos="fade-up">
            <span className="smm-eyebrow">What We Handle</span>
            <h2>End-to-End Social, Done for You</h2>
          </div>
          <div className="smm-pillars__grid">
            {PILLARS.map((p, i) => (
              <div className="smm-pillar" key={p.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="smm-pillar__icon">{p.icon}</span>
                <h3>{p.t}</h3><p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* band */}
      <section className="smm-band">
        <div className="smm-container smm-band__inner" data-aos="fade-up">
          <div><b>5.4x</b><span>Avg Engagement Lift</span></div>
          <div><b>+250%</b><span>Follower Growth</span></div>
          <div><b>Daily</b><span>Community Management</span></div>
        </div>
      </section>

      <ServiceFaq service="Social Media Marketing" faqs={FAQS} />

      <section className="smm-cta">
        <div className="smm-container">
          <div className="smm-cta__box" data-aos="zoom-in">
            <FiShare2 className="smm-cta__ic" />
            <h2>Ready to Grow Your Audience?</h2>
            <p>Get a free social media audit — we'll show you exactly how to grow and convert your following.</p>
            <Link to="/contact" className="smm-btn smm-btn--light">Get My Free Audit <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
