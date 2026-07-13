import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiPenTool, FiCheck } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/SubService.css'

const SERVICES = ['Custom Logo Design', 'Modern Logo Concepts', 'Brand Marks', 'Icon Design', 'Typography Logos', 'Logo Usage Guidelines']

const DELIVERABLES = [
  { t: 'Concept Sketches', d: 'Multiple hand-drawn and digital concept directions exploring different visual ideas for your brand before we commit to pixels.' },
  { t: 'Unlimited Revisions*', d: 'Rounds of refinement on your chosen concept — adjusting shape, spacing, weight and detail until it feels exactly right.' },
  { t: 'Final Vector Files', d: 'Print- and web-ready files in AI, EPS, SVG and PDF — fully scalable from a favicon to a billboard with no quality loss.' },
  { t: 'Brand Mark Variations', d: 'Primary logo, icon-only mark, horizontal lockup and monochrome/reversed versions for every placement you\'ll need.' },
  { t: 'Colour & File Formats', d: 'PNG and JPG exports in full colour, black and white, and transparent background, plus your exact brand colour codes.' },
]

const FAQS = [
  { q: 'How many concept sketches will I see?', a: 'We typically present 3-4 distinct concept directions in the first round, each exploring a different visual approach to your brand — so you\'re choosing a direction, not just a colour.' },
  { q: 'How many revisions are included?', a: 'Our standard logo packages include multiple rounds of revisions on your chosen concept. We refine shape, spacing, typography and colour together until you\'re fully satisfied.' },
  { q: 'What final files will I actually receive?', a: 'You get scalable vector files (AI, EPS, SVG, PDF) plus PNG/JPG exports in full colour, black and white, and transparent background — everything needed for print and digital use.' },
  { q: 'What are brand mark variations and do I need them?', a: 'These are alternate versions of your logo — an icon-only mark, a horizontal lockup, and reversed/monochrome versions — so your logo works cleanly on a website favicon, a business card or a dark background alike.' },
  { q: 'How long does the logo design process take?', a: 'Most logo projects are completed in 7-10 working days from concept sketches to final files, depending on the number of revision rounds and how quickly feedback is shared.' },
]

export default function LogoDesign() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      <Seo
        title="Custom Logo Design Services"
        description="Distinct logo concepts refined over multiple revision rounds, delivered as scalable vector files with icon, horizontal and monochrome marks in 7-10 days. Design my logo."
        path="/services/logo-design"
      />
      <section className="ss-hero">
        <span className="ss-hero__orb ss-hero__orb--1" /><span className="ss-hero__orb ss-hero__orb--2" />
        <div className="ss-container bi-hero" style={{ position: 'relative' }}>
          <div data-aos="fade-right">
            <span className="ss-tag"><FiPenTool /> Logo Design</span>
            <h1 className="ss-hero__title">Logo Design That <span>Represents Your Brand</span></h1>
            <p className="ss-hero__sub">Your logo is the face of your business. We create unique, memorable logos that strengthen your identity and make a powerful first impression.</p>
            <div className="ss-hero__actions"><Link to="/contact" className="ss-btn ss-btn--primary">Design My Logo <FiArrowRight /></Link><Link to="/contact" className="ss-btn ss-btn--ghost">Free Consultation</Link></div>
          </div>
          <div className="bi-hero__visual" data-aos="fade-left">
            <div className="logo-grid">
              <span>A</span><span>B</span><span className="logo-grid--hi">D</span><span>M</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ss-sec ss-sec--soft">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Services</span><h2 className="ss-h2">Logos That Make An Impression</h2></div>
          <div className="ss-list">
            {SERVICES.map((s) => <div className="ss-list__item" key={s} data-aos="fade-up"><span className="ss-list__dot"><FiCheck size={14} /></span>{s}</div>)}
          </div>
        </div>
      </section>

      <section className="ld-block">
        <div className="ss-container">
          <div className="ld-head" data-aos="fade-up">
            <span className="ss-eyebrow">What's Included</span>
            <h2 className="ss-h2">Everything You Get With Your Logo</h2>
          </div>
          <div className="ld-list">
            {DELIVERABLES.map((item, i) => (
              <div className="ld-row" key={item.t} data-aos="fade-up" data-aos-delay={i * 60}>
                <span className="ld-row__check"><FiCheck size={15} /></span>
                <div className="ld-row__text">
                  <h3>{item.t}</h3>
                  <p>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="ld-note">*Revision rounds are generous but scoped to your package — ask us for exact details during your free consultation.</p>
        </div>
      </section>

      <ServiceFaq service="Logo Design" faqs={FAQS} />

      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <h2>Get A Logo You'll Love</h2>
          <p>A unique, professional logo that becomes the recognizable face of your brand.</p>
          <Link to="/contact" className="ss-btn">Start Your Logo <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
