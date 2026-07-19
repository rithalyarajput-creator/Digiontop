import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiEdit3, FiZap, FiTarget, FiShoppingBag, FiMail, FiMonitor,
  FiCheck, FiArrowRight, FiArrowUpRight, FiFeather,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/SmmPages.css'

const FAQS = [
  { q: 'What is copywriting exactly?', a: 'Persuasive writing that sells, headlines, landing pages, ads and emails crafted to make people take action, not just read.' },
  { q: 'What can you write copy for?', a: 'Landing pages, websites, ads, emails, product descriptions, sales pages and social captions, anything that needs to convert.' },
  { q: 'How is this different from content writing?', a: 'Content writing builds trust over time; copywriting drives immediate action. We do both, this service focuses on conversion.' },
  { q: 'Will the copy match my brand voice?', a: 'Yes, we study your brand and audience so every word sounds like you and speaks to your customer.' },
  { q: 'Can better copy really increase sales?', a: 'Dramatically, the right headline or CTA can multiply conversions on the same traffic. Words are your cheapest growth lever.' },
]

const TYPES = [
  { icon: <FiMonitor />, t: 'Landing & Sales Pages', d: 'High-converting pages that turn visitors into buyers.' },
  { icon: <FiTarget />, t: 'Ad Copy', d: 'Scroll-stopping headlines and hooks for Google, Meta & more.' },
  { icon: <FiMail />, t: 'Email Copy', d: 'Subject lines and sequences that get opened and clicked.' },
  { icon: <FiShoppingBag />, t: 'Product Descriptions', d: 'Persuasive descriptions that make products irresistible.' },
]

export default function Copywriting() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="cp">
      <Seo
        title="Conversion Copywriting Services"
        description="Persuasive copy for landing pages, ads, emails and product descriptions, written in your brand voice to grab attention and drive action. Get a free copy review today."
        path="/services/social/copywriting"
      />
      <section className="cp-hero">
        <div className="cp-container cp-hero__inner">
          <div className="cp-hero__text" data-aos="fade-right">
            <span className="cp-tag"><FiFeather /> Copywriting Services</span>
            <h1 className="cp-hero__title">Words That<br /><span>Make People Buy</span></h1>
            <p className="cp-hero__sub">Persuasive copy for landing pages, ads and emails, crafted to grab attention, build desire and drive action. Your cheapest lever for more sales.</p>
            <div className="cp-hero__cta">
              <Link to="/contact" className="cp-btn cp-btn--solid">Get Copy That Converts <FiArrowRight /></Link>
              <Link to="/contact" className="cp-btn cp-btn--ghost">Free Copy Review</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="cp-types">
        <div className="cp-container">
          <div className="cp-head" data-aos="fade-up">
            <span className="cp-eyebrow">What We Write</span>
            <h2>Copy for Everything That Sells</h2>
          </div>
          <div className="cp-types__grid">
            {TYPES.map((t, i) => (
              <div className="cp-type" key={t.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="cp-type__icon">{t.icon}</span>
                <h3>{t.t}</h3><p>{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cp-band">
        <div className="cp-container cp-band__inner" data-aos="fade-up">
          <div><b>Persuasive</b><span>Built to Convert</span></div>
          <div><b>On-Brand</b><span>Sounds Like You</span></div>
          <div><b>Tested</b><span>Proven Frameworks</span></div>
        </div>
      </section>

      <ServiceFaq service="Copywriting Services" faqs={FAQS} />

      <section className="cp-cta">
        <div className="cp-container">
          <div className="cp-cta__box" data-aos="zoom-in">
            <FiEdit3 className="cp-cta__ic" />
            <h2>Ready to Sell With Words?</h2>
            <p>Get a free copy review, we'll show you exactly where your words are losing sales and how to fix them.</p>
            <Link to="/contact" className="cp-btn cp-btn--light">Get My Free Review <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
