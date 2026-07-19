import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiClipboard, FiSearch, FiZap, FiLink, FiFileText, FiSmartphone,
  FiCheck, FiArrowRight, FiArrowUpRight, FiPieChart, FiAlertTriangle,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import SeoAuditTool from '../../components/SeoAuditTool'
import Seo from '../../components/Seo'
import '../../styles/SeoAudit.css'

const FAQS = [
  { q: 'What does the SEO audit cover?', a: 'Technical health, on-page, content, backlinks, Core Web Vitals, mobile, indexation and competitor gaps, a full 150-point review.' },
  { q: 'How long does an audit take?', a: 'A complete audit is delivered in 3–5 business days, with a walkthrough call to explain findings and priorities.' },
  { q: 'Do I get a prioritised action plan?', a: 'Yes, not just problems, but a ranked fix-list showing what to do first for the biggest ranking impact.' },
  { q: 'Is the audit really free?', a: 'We offer a free starter audit that highlights your biggest issues. A full deep-dive audit is a paid, in-depth deliverable.' },
  { q: 'Can you also fix what you find?', a: 'Absolutely, we can hand off the report to your team or implement every fix ourselves as an ongoing engagement.' },
]

const AREAS = [
  { icon: <FiZap />, t: 'Technical Health', score: 64, color: 'bad' },
  { icon: <FiFileText />, t: 'On-Page & Content', score: 78, color: 'mid' },
  { icon: <FiLink />, t: 'Backlink Profile', score: 82, color: 'good' },
  { icon: <FiSmartphone />, t: 'Mobile & Speed', score: 58, color: 'bad' },
  { icon: <FiSearch />, t: 'Keyword Coverage', score: 71, color: 'mid' },
  { icon: <FiPieChart />, t: 'Competitor Gap', score: 66, color: 'mid' },
]

export default function SeoAudit() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="aud">
      <Seo
        title="SEO Audit Services, 150-Point Site Audit"
        description="A 150-point SEO audit of your technical health, content, backlinks, Core Web Vitals and competitor gaps, with a prioritised fix list. Get a free starter audit."
        path="/services/seo-audit"
      />
      {/* HERO — scorecard */}
      <section className="aud-hero">
        <div className="aud-container aud-hero__inner">
          <div className="aud-hero__text" data-aos="fade-right">
            <span className="aud-tag"><FiClipboard /> SEO Audit Services</span>
            <h1 className="aud-hero__title">Know Exactly Why<br /><span>You're Not Ranking</span></h1>
            <p className="aud-hero__sub">A 150-point deep-dive into your site's SEO, technical, content, links and competitors, with a clear, prioritised action plan you can actually act on.</p>
            <div className="aud-hero__cta">
              <a href="#free-seo-audit" className="aud-btn aud-btn--solid">Run My Free Audit <FiArrowRight /></a>
              <Link to="/contact" className="aud-btn aud-btn--ghost">Talk to an Expert</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FREE INSTANT AUDIT TOOL */}
      <div id="free-seo-audit">
        <SeoAuditTool />
      </div>

      {/* area scores */}
      <section className="aud-areas">
        <div className="aud-container">
          <div className="aud-head" data-aos="fade-up">
            <span className="aud-eyebrow">What We Score</span>
            <h2>Every Angle, Graded Honestly</h2>
          </div>
          <div className="aud-areas__grid">
            {AREAS.map((a, i) => (
              <div className="aud-area" key={a.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <div className="aud-area__top">
                  <span className="aud-area__icon">{a.icon}</span>
                  <span className={`aud-area__score ${a.color}`}>{a.score}</span>
                </div>
                <h3>{a.t}</h3>
                <div className="aud-area__bar"><span className={a.color} style={{ width: `${a.score}%` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* deliverable */}
      <section className="aud-deliver">
        <div className="aud-container aud-deliver__inner">
          <div data-aos="fade-right">
            <span className="aud-eyebrow aud-eyebrow--light">What You Get</span>
            <h2>Not Just Problems, a Plan</h2>
            <p>Every audit ends with a prioritised roadmap: what to fix first, the expected impact, and exactly how to do it.</p>
            <Link to="/contact" className="aud-btn aud-btn--solid">Request Full Audit <FiArrowUpRight /></Link>
          </div>
          <ul className="aud-deliver__list" data-aos="fade-left">
            {['150-point technical review', 'Prioritised fix roadmap', 'Core Web Vitals report', 'Backlink & toxicity analysis', 'Competitor gap findings', 'Live walkthrough call'].map((x) => (
              <li key={x}><FiCheck /> {x}</li>
            ))}
          </ul>
        </div>
      </section>

      <ServiceFaq service="SEO Audit Services" faqs={FAQS} />

      <section className="aud-cta">
        <div className="aud-container">
          <div className="aud-cta__box" data-aos="zoom-in">
            <FiAlertTriangle className="aud-cta__ic" />
            <h2>Find Out What's Holding You Back</h2>
            <p>Get a free starter SEO audit, we'll reveal your biggest ranking issues and how to fix them.</p>
            <Link to="/contact" className="aud-btn aud-btn--light">Get My Free Audit <FiArrowRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
