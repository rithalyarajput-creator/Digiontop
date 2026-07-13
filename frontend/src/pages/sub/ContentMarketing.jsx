import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiFileText, FiEdit3, FiVideo, FiMic, FiTrendingUp, FiTarget,
  FiCheck, FiArrowRight, FiArrowUpRight, FiLayers,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/SmmPages.css'

const FAQS = [
  { q: 'What is content marketing exactly?', a: 'Creating valuable content — blogs, videos, guides — that attracts, educates and converts your ideal customers over time, building trust and authority.' },
  { q: 'How long until content drives results?', a: 'Content compounds. You\'ll see early traction in 6–10 weeks, with authority and organic traffic growing steadily from there.' },
  { q: 'Do you handle SEO for the content?', a: 'Yes — every piece is keyword-researched and SEO-optimised so it ranks and pulls in qualified traffic.' },
  { q: 'What content formats do you produce?', a: 'Blogs, pillar pages, guides, infographics, video scripts and social content — a full multi-format strategy.' },
  { q: 'Can content really generate leads?', a: 'Absolutely — with the right topics, CTAs and lead magnets, content becomes a compounding lead-gen engine.' },
]

const TYPES = [
  { icon: <FiEdit3 />, t: 'Blogs & Pillar Pages', d: 'Authority content that ranks, educates and drives organic traffic.' },
  { icon: <FiLayers />, t: 'Guides & Lead Magnets', d: 'Downloadable assets that capture leads and nurture them to buy.' },
  { icon: <FiVideo />, t: 'Video & Script Content', d: 'Story-driven scripts and formats built for reels and YouTube.' },
  { icon: <FiTarget />, t: 'Content Strategy', d: 'A topic and funnel map aligned to your business goals.' },
]

export default function ContentMarketing() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="cm">
      <Seo
        title="Content Marketing Services in India"
        description="SEO-driven blogs, pillar pages, lead magnets and video scripts that build authority and turn readers into leads month after month. Get your free content plan today."
        path="/services/social/content-marketing"
      />
      <section className="cm-hero">
        <div className="cm-container cm-hero__inner">
          <div className="cm-hero__text" data-aos="fade-right">
            <span className="cm-tag"><FiFileText /> Content Marketing</span>
            <h1 className="cm-hero__title">Content That <span>Compounds</span></h1>
            <p className="cm-hero__sub">Strategic, SEO-driven content that attracts your ideal customers, builds authority and turns readers into leads — month after month.</p>
            <div className="cm-hero__cta">
              <Link to="/contact" className="cm-btn cm-btn--solid">Build My Content Engine <FiArrowRight /></Link>
              <Link to="/contact" className="cm-btn cm-btn--ghost">Free Content Plan</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cm-types">
        <div className="cm-container">
          <div className="cm-head" data-aos="fade-up">
            <span className="cm-eyebrow">What We Create</span>
            <h2>Every Format That Grows You</h2>
          </div>
          <div className="cm-types__grid">
            {TYPES.map((t, i) => (
              <div className="cm-type" key={t.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="cm-type__icon">{t.icon}</span>
                <h3>{t.t}</h3><p>{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cm-band">
        <div className="cm-container cm-band__inner" data-aos="fade-up">
          <h2>One Content Engine. Endless Compounding Traffic.</h2>
          <div className="cm-band__stats">
            <div><b>SEO</b><span>Optimised Every Piece</span></div>
            <div><b>Multi</b><span>Format Coverage</span></div>
            <div><b>Lead</b><span>Magnets Built In</span></div>
          </div>
        </div>
      </section>

      <ServiceFaq service="Content Marketing" faqs={FAQS} />

      <section className="cm-cta">
        <div className="cm-container">
          <div className="cm-cta__box" data-aos="zoom-in">
            <FiFileText className="cm-cta__ic" />
            <h2>Ready to Own Your Topic?</h2>
            <p>Get a free content plan — we'll map the exact topics and formats to grow your traffic and leads.</p>
            <Link to="/contact" className="cm-btn cm-btn--light">Get My Free Plan <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
