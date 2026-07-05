import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiLink, FiTrendingUp, FiEdit3, FiMail, FiAward, FiCheck,
  FiArrowRight, FiArrowUpRight, FiGlobe, FiFileText, FiUsers,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/LinkBuilding.css'

const FAQS = [
  { q: 'Are your links safe / white-hat?', a: 'Completely. We only earn editorial links from real, relevant, high-authority sites — no PBNs, no link farms, no penalties.' },
  { q: 'How many links will I get?', a: 'Quality over quantity. Depending on your plan we secure a set number of high-DA links per month, each manually vetted for relevance.' },
  { q: 'How do you get the links?', a: 'Guest posting, digital PR, HARO journalist pitching, broken-link reclamation and brand-mention outreach — all done manually by our outreach team.' },
  { q: 'Do backlinks still matter in 2026?', a: 'Yes — authoritative backlinks remain one of Google\'s strongest ranking signals. They build trust and topical authority that content alone can\'t.' },
  { q: 'Will you share the links you build?', a: 'Absolutely. You get a full report of every live link, its authority score and the anchor used — total transparency.' },
]

const TACTICS = [
  { icon: <FiEdit3 />, t: 'Guest Posting', d: 'Editorial articles on relevant, high-DA blogs with a natural, contextual link back to you.' },
  { icon: <FiMail />, t: 'Digital PR & HARO', d: 'We pitch journalists and reporters to earn mentions and links from news and industry sites.' },
  { icon: <FiLink />, t: 'Broken Link Building', d: 'Find dead links on authority sites and offer your page as the perfect replacement.' },
  { icon: <FiUsers />, t: 'Brand Mention Reclaim', d: 'Turn unlinked mentions of your brand into powerful, live backlinks.' },
]

const TIERS = [
  { da: '90+', label: 'News & Media', c: 3 },
  { da: '70+', label: 'Industry Authority', c: 8 },
  { da: '50+', label: 'Niche Blogs', c: 14 },
]

export default function LinkBuilding() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="lb">
      {/* HERO — network of nodes */}
      <section className="lb-hero">
        <div className="lb-container lb-hero__inner">
          <div className="lb-hero__text" data-aos="fade-right">
            <span className="lb-tag"><FiLink /> Link Building & Digital PR</span>
            <h1 className="lb-hero__title">Authority That<br /><span>Moves Rankings</span></h1>
            <p className="lb-hero__sub">Google trusts sites other trusted sites link to. We earn you real, editorial backlinks from high-authority domains — the safe, white-hat way.</p>
            <div className="lb-hero__cta">
              <Link to="/contact" className="lb-btn lb-btn--solid">Build My Authority <FiArrowRight /></Link>
              <Link to="/contact" className="lb-btn lb-btn--ghost">See Sample Links</Link>
            </div>
          </div>
          {/* node graph */}
          <div className="lb-graph" data-aos="fade-left">
            <span className="lb-node lb-node--center"><FiGlobe /><b>You</b></span>
            {['DA 92', 'DA 78', 'DA 84', 'DA 71', 'DA 66'].map((n, i) => (
              <span key={n} className={`lb-node lb-node--${i + 1}`}>{n}</span>
            ))}
            <svg className="lb-lines" viewBox="0 0 400 340" preserveAspectRatio="none">
              <path d="M200,170 L70,60" /><path d="M200,170 L340,70" /><path d="M200,170 L50,250" />
              <path d="M200,170 L350,260" /><path d="M200,170 L200,30" />
            </svg>
          </div>
        </div>
      </section>

      {/* DA tiers */}
      <section className="lb-tiers">
        <div className="lb-container lb-tiers__inner">
          {TIERS.map((t, i) => (
            <div className="lb-tier" key={t.label} data-aos="fade-up" data-aos-delay={i * 80}>
              <span className="lb-tier__da">DA {t.da}</span>
              <span className="lb-tier__label">{t.label}</span>
              <span className="lb-tier__c"><b>{t.c}</b> avg links / mo</span>
            </div>
          ))}
        </div>
      </section>

      {/* tactics */}
      <section className="lb-tactics">
        <div className="lb-container">
          <div className="lb-head" data-aos="fade-up">
            <span className="lb-eyebrow">How We Earn Links</span>
            <h2>White-Hat Tactics That Actually Work</h2>
          </div>
          <div className="lb-tactics__grid">
            {TACTICS.map((t, i) => (
              <div className="lb-tactic" key={t.t} data-aos="fade-up" data-aos-delay={(i % 2) * 90}>
                <span className="lb-tactic__icon">{t.icon}</span>
                <div><h3>{t.t}</h3><p>{t.d}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* trust band */}
      <section className="lb-trust">
        <div className="lb-container lb-trust__inner" data-aos="fade-up">
          <div><FiAward /><b>100%</b><span>White-Hat, Zero Penalties</span></div>
          <div><FiFileText /><b>Full</b><span>Link Reporting & Anchors</span></div>
          <div><FiTrendingUp /><b>High-DA</b><span>Manually Vetted Domains</span></div>
        </div>
      </section>

      <ServiceFaq service="Link Building" faqs={FAQS} />

      <section className="lb-cta">
        <div className="lb-container">
          <div className="lb-cta__box" data-aos="zoom-in">
            <FiLink className="lb-cta__ic" />
            <h2>Ready to Build Real Authority?</h2>
            <p>Get a free backlink gap analysis — see who links to your competitors and how we get you those links too.</p>
            <Link to="/contact" className="lb-btn lb-btn--light">Get Free Link Analysis <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
