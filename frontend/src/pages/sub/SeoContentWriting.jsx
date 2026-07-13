import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiFileText, FiSearch, FiTrendingUp, FiTarget, FiEdit3, FiCheckCircle,
  FiCheck, FiArrowRight, FiArrowUpRight, FiHash,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/SmmPages.css'

const FAQS = [
  { q: 'How is SEO content different from normal writing?', a: 'It\'s written to rank AND read well — keyword-researched, structured for search intent, and optimised so Google and humans both love it.' },
  { q: 'Do you do keyword research?', a: 'Yes — every piece starts with intent-based keyword and competitor research so you target terms that actually drive traffic.' },
  { q: 'Will the content sound robotic?', a: 'Never — our writers craft natural, engaging copy. SEO is the foundation, not the voice.' },
  { q: 'How many words per article?', a: 'We match length to search intent and competition — usually 800–2,000+ words for pieces built to rank.' },
  { q: 'Do you optimise existing content too?', a: 'Absolutely — we refresh and re-optimise old pages to recover and grow rankings.' },
]

const INCLUDES = [
  { icon: <FiSearch />, t: 'Keyword & Intent Research', d: 'We target the terms your buyers actually search — mapped to intent.' },
  { icon: <FiHash />, t: 'On-Page Optimisation', d: 'Titles, headings, meta and internal links tuned to rank.' },
  { icon: <FiEdit3 />, t: 'Natural, Engaging Copy', d: 'Content people actually want to read — not keyword-stuffed filler.' },
  { icon: <FiTarget />, t: 'Conversion-Focused', d: 'Clear CTAs and structure that turn readers into leads.' },
]

export default function SeoContentWriting() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="cw">
      <Seo
        title="SEO Content Writing Services for Websites"
        description="Keyword-researched blogs, landing pages and product copy written to rank on Google and convert readers into leads. Request a free SEO content sample today."
        path="/services/social/seo-content-writing"
      />
      <section className="cw-hero">
        <div className="cw-container cw-hero__inner">
          <div className="cw-hero__text" data-aos="fade-right">
            <span className="cw-tag"><FiFileText /> SEO Content Writing</span>
            <h1 className="cw-hero__title">Words That <span>Rank &amp; Convert</span></h1>
            <p className="cw-hero__sub">Keyword-researched, reader-friendly content that climbs Google, pulls in qualified traffic and turns visitors into customers.</p>
            <div className="cw-hero__cta">
              <Link to="/contact" className="cw-btn cw-btn--solid">Get Content That Ranks <FiArrowRight /></Link>
              <Link to="/contact" className="cw-btn cw-btn--ghost">Free Sample</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cw-inc">
        <div className="cw-container">
          <div className="cw-head" data-aos="fade-up">
            <span className="cw-eyebrow">What You Get</span>
            <h2>Content Engineered to Rank</h2>
          </div>
          <div className="cw-inc__grid">
            {INCLUDES.map((c, i) => (
              <div className="cw-inc__card" key={c.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="cw-inc__icon">{c.icon}</span>
                <h3>{c.t}</h3><p>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cw-band">
        <div className="cw-container cw-band__inner" data-aos="fade-up">
          <div><b>Keyword</b><span>Researched</span></div>
          <div><b>Human</b><span>Natural to Read</span></div>
          <div><b>Ranks</b><span>Built for Page 1</span></div>
        </div>
      </section>

      <ServiceFaq service="SEO Content Writing" faqs={FAQS} />

      <section className="cw-cta">
        <div className="cw-container">
          <div className="cw-cta__box" data-aos="zoom-in">
            <FiFileText className="cw-cta__ic" />
            <h2>Ready to Rank Higher?</h2>
            <p>Get a free content sample — see the quality and SEO structure that gets our clients to Page 1.</p>
            <Link to="/contact" className="cw-btn cw-btn--light">Get My Free Sample <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
