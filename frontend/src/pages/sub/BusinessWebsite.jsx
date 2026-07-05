import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiBriefcase, FiPhone, FiUsers, FiAward, FiTrendingUp, FiStar,
  FiCheck, FiArrowRight, FiArrowUpRight, FiMapPin,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/WebDevPages.css'

const FAQS = [
  { q: 'What is a business website?', a: 'A professional online presence that builds trust, showcases your services and turns visitors into enquiries — your 24/7 digital storefront.' },
  { q: 'How many pages will it have?', a: 'Typically Home, About, Services, Contact and more — we tailor the structure to your business and goals.' },
  { q: 'Will it generate leads?', a: 'Yes — clear calls-to-action, contact forms and WhatsApp integration are built in to capture enquiries.' },
  { q: 'Can customers find me on Google?', a: 'Absolutely — local SEO and Google Business setup help nearby customers discover you.' },
  { q: 'How soon can it go live?', a: 'Most business sites are ready in 2–4 weeks, fully responsive and lead-ready.' },
]

const FEATURES = [
  { icon: <FiBriefcase />, t: 'Professional Design', d: 'A polished, credible presence that builds instant trust with visitors.' },
  { icon: <FiPhone />, t: 'Lead Capture Built-In', d: 'Contact forms, click-to-call and WhatsApp so enquiries never slip away.' },
  { icon: <FiMapPin />, t: 'Local SEO Ready', d: 'Get found by nearby customers on Google Search and Maps.' },
  { icon: <FiUsers />, t: 'Clear Service Pages', d: 'Present what you do so customers understand and choose you.' },
  { icon: <FiStar />, t: 'Reviews & Trust', d: 'Showcase testimonials and credentials that convert visitors.' },
  { icon: <FiTrendingUp />, t: 'Room to Grow', d: 'Easily add pages, blogs and features as your business scales.' },
]

export default function BusinessWebsite() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="biz">
      <section className="biz-hero biz-hero--light">
        <div className="biz-container biz-hero__inner">
          <div className="biz-hero__text" data-aos="fade-right">
            <span className="biz-tag"><FiBriefcase /> Business Website Development</span>
            <h1 className="biz-hero__title">Your 24/7 <span>Digital Storefront</span></h1>
            <p className="biz-hero__sub">A professional business website that builds trust, showcases your services and turns visitors into real enquiries — working for you around the clock.</p>
            <div className="biz-hero__cta">
              <Link to="/contact" className="biz-btn biz-btn--solid">Build My Business Site <FiArrowRight /></Link>
              <Link to="/contact" className="biz-btn biz-btn--ghost">Free Consultation</Link>
            </div>
          </div>
          {/* business site mock */}
          <div className="biz-mock" data-aos="fade-left">
            <div className="biz-mock__bar"><span /><span /><span /></div>
            <div className="biz-mock__hero">
              <div className="biz-mock__nav"><b>YourBusiness</b><span>Home · About · Services · Contact</span></div>
              <div className="biz-mock__band"><b>Trusted Local Experts</b><span className="biz-mock__cta2">Get a Quote</span></div>
              <div className="biz-mock__cards"><span /><span /><span /></div>
            </div>
            <div className="biz-mock__badge"><FiAward /> Trust Building</div>
          </div>
        </div>
      </section>

      <section className="biz-features">
        <div className="biz-container">
          <div className="biz-head" data-aos="fade-up">
            <span className="biz-eyebrow">What You Get</span>
            <h2>Built to Win Customers</h2>
          </div>
          <div className="biz-features__grid">
            {FEATURES.map((f, i) => (
              <div className="biz-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="biz-feature__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="biz-band">
        <div className="biz-container biz-band__inner" data-aos="fade-up">
          <div><b>24/7</b><span>Working For You</span></div>
          <div><b>Lead</b><span>Capture Built In</span></div>
          <div><b>Local</b><span>SEO Ready</span></div>
        </div>
      </section>

      <ServiceFaq service="Business Website Development" faqs={FAQS} />

      <section className="biz-cta">
        <div className="biz-container">
          <div className="biz-cta__box" data-aos="zoom-in">
            <FiBriefcase className="biz-cta__ic" />
            <h2>Ready to Look Professional Online?</h2>
            <p>Get a free consultation — we'll plan a business website that builds trust and brings you leads.</p>
            <Link to="/contact" className="biz-btn biz-btn--light">Book Free Consultation <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
