import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiArrowRight, FiArrowUpRight, FiCheck,
  FiAward, FiLayout, FiVideo, FiCompass, FiBarChart2, FiPenTool, FiImage, FiTrendingUp,
  FiHeart, FiEye, FiStar, FiUsers, FiTarget, FiZap,
} from 'react-icons/fi'
import ServiceWork from '../components/ServiceWork'
import '../styles/CreativeBranding.css'

const OFFER = [
  { icon: <FiAward />, title: 'Branding & Identity', desc: 'A memorable, professional brand identity that reflects your values and stands out from competitors.' },
  { icon: <FiLayout />, title: 'UI/UX Design', desc: 'Seamless, visually engaging digital experiences that improve satisfaction and drive conversions.' },
  { icon: <FiVideo />, title: 'Video Production', desc: 'Promotional videos, product showcases, ads, and social content designed to capture attention.' },
  { icon: <FiCompass />, title: 'Digital Strategy', desc: 'Growth-focused strategies that align your brand, marketing, and business objectives.' },
  { icon: <FiBarChart2 />, title: 'Analytics & Insights', desc: 'Track performance, understand customer behaviour, and make data-driven decisions.' },
  { icon: <FiPenTool />, title: 'Logo Design', desc: 'Custom logo designs that create a strong first impression and a recognisable brand.' },
  { icon: <FiImage />, title: 'Graphic Design', desc: 'Professional visuals for social media, campaigns, business materials, and marketing.' },
  { icon: <FiTrendingUp />, title: 'CRO Services', desc: 'Optimise your website & funnels to increase engagement, leads, and conversions.' },
]

const MATTERS = [
  { icon: <FiHeart />, text: 'Build Customer Trust' },
  { icon: <FiEye />, text: 'Improve Brand Recognition' },
  { icon: <FiAward />, text: 'Create Professional Credibility' },
  { icon: <FiUsers />, text: 'Increase Customer Engagement' },
  { icon: <FiStar />, text: 'Strengthen Market Position' },
  { icon: <FiTrendingUp />, text: 'Drive Long-Term Growth' },
]

const APPROACH = [
  { n: '01', title: 'Strategy First', desc: 'Every project begins with understanding your business goals, audience, and market position.' },
  { n: '02', title: 'Design With Purpose', desc: 'We create visuals that are attractive and aligned with your business objectives.' },
  { n: '03', title: 'Consistent Brand Experience', desc: 'From logos to websites & campaigns — consistency across every customer touchpoint.' },
  { n: '04', title: 'Growth-Focused Execution', desc: 'Every creative asset is designed to support visibility, engagement, and growth.' },
]

const INDUSTRIES = [
  'E-Commerce Brands', 'Startups', 'Healthcare Businesses', 'Educational Institutions',
  'Real Estate Companies', 'Local Businesses', 'Technology Companies', 'Service-Based Businesses',
]

const WHY = [
  'Creative & Strategic Thinking', 'Professional Design Standards', 'Customized Solutions',
  'Business-Focused Approach', 'Modern Branding Techniques', 'Dedicated Support', 'Results-Oriented Execution',
]

export default function CreativeBranding() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 })
  }, [])

  return (
    <main className="cb-page">
      {/* ── HERO ── */}
      <section className="cbp-hero">
        <div className="cbp-hero__blob cbp-hero__blob--1" />
        <div className="cbp-hero__blob cbp-hero__blob--2" />
        <div className="cbp-hero__blob cbp-hero__blob--3" />
        <div className="cbp-container cbp-hero__inner">
          <span className="cbp-tag"><FiPenTool /> Creative &amp; Branding</span>
          <h1 className="cbp-hero__title">
            Creative Solutions That Help <span>Brands Stand Out</span>
          </h1>
          <p className="cbp-hero__sub">
            Your brand needs a strong identity, professional visuals, and a clear message that captures
            attention and builds trust. We help you look professional and leave a lasting impression.
          </p>
          <div className="cbp-hero__actions">
            <Link to="/contact" className="cbp-btn cbp-btn--primary">Start Your Branding Project <FiArrowRight /></Link>
            <Link to="/contact" className="cbp-btn cbp-btn--ghost">Get Free Consultation</Link>
          </div>
          <div className="cbp-hero__chips">
            <span><FiAward /> Brand Identity</span>
            <span><FiVideo /> Video Content</span>
            <span><FiPenTool /> Logo &amp; Design</span>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="cbp-intro">
        <div className="cbp-container">
          <h2 className="cbp-h2" data-aos="fade-up">Powerful Brand Experiences, Built to Last</h2>
          <div className="cbp-intro__grid">
            <p data-aos="fade-up">
              At DigionTop Agency, we help businesses create powerful brand experiences through strategic
              design, creative content, and performance-driven branding solutions — so your business looks
              professional, communicates effectively, and leaves a lasting impression.
            </p>
            <p data-aos="fade-up" data-aos-delay="100">
              Whether you're building a new brand, improving your online presence, or scaling your marketing,
              our creative and branding solutions are designed to support long-term business growth.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER ── */}
      <section className="cbp-offer">
        <div className="cbp-container">
          <div className="cbp-head" data-aos="fade-up">
            <span className="cbp-eyebrow">What We Offer</span>
            <h2 className="cbp-h2">Complete Creative &amp; Branding Solutions</h2>
          </div>
          <div className="cbp-offer__grid">
            {OFFER.map((o, i) => (
              <div className="cbp-card" key={o.title} data-aos="fade-up" data-aos-delay={(i % 4) * 60}>
                <span className="cbp-card__icon">{o.icon}</span>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY IT MATTERS ── */}
      <section className="cbp-matters">
        <div className="cbp-container">
          <div className="cbp-head" data-aos="fade-up">
            <span className="cbp-eyebrow cbp-eyebrow--light">Why Creative Branding Matters</span>
            <h2 className="cbp-h2 cbp-h2--light">A Strong Brand Helps Your Business</h2>
          </div>
          <div className="cbp-matters__grid">
            {MATTERS.map((m, i) => (
              <div className="cbp-matters__item" key={m.text} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="cbp-matters__icon">{m.icon}</span>{m.text}
              </div>
            ))}
          </div>
          <p className="cbp-matters__note" data-aos="fade-up">
            Your brand is often the first thing customers notice — and the reason they remember your business.
          </p>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section className="cbp-approach">
        <div className="cbp-container">
          <div className="cbp-head" data-aos="fade-up">
            <span className="cbp-eyebrow">Our Creative Approach</span>
            <h2 className="cbp-h2">How We Build Brands That Win</h2>
          </div>
          <div className="cbp-approach__grid">
            {APPROACH.map((a, i) => (
              <div className="cbp-approach__card" key={a.n} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="cbp-approach__num">{a.n}</span>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="cbp-industries">
        <div className="cbp-container">
          <div className="cbp-head" data-aos="fade-up">
            <span className="cbp-eyebrow">Industries We Serve</span>
            <h2 className="cbp-h2">Creative Solutions for Every Industry</h2>
          </div>
          <div className="cbp-industries__grid">
            {INDUSTRIES.map((it, i) => (
              <span className="cbp-pill" key={it} data-aos="zoom-in" data-aos-delay={i * 35}>{it}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <ServiceWork
        accent="#7C3AED"
        accentSoft="#F3EEFF"
        heading="Creative Work We've Produced"
        subtitle="A look at the reels, posts and creatives we design for brands we partner with."
      />

      {/* ── WHY CHOOSE ── */}
      <section className="cbp-why">
        <div className="cbp-container">
          <div className="cbp-head" data-aos="fade-up">
            <span className="cbp-eyebrow">Why Choose DigionTop?</span>
            <h2 className="cbp-h2">Design That Means Business</h2>
          </div>
          <div className="cbp-why__grid">
            {WHY.map((w, i) => (
              <div className="cbp-why__item" key={w} data-aos="fade-up" data-aos-delay={(i % 4) * 50}>
                <FiCheck /> {w}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cbp-cta">
        <div className="cbp-container">
          <div className="cbp-cta__box" data-aos="zoom-in">
            <span className="cbp-cta__emoji">🚀</span>
            <h2>Build A Brand People Trust</h2>
            <p>
              Your brand deserves more than ordinary design. We help businesses create impactful brand
              identities, engaging experiences, and creative solutions that support real business growth.
            </p>
            <div className="cbp-cta__actions">
              <Link to="/contact" className="cbp-btn cbp-btn--light">Start Your Branding Project <FiArrowUpRight /></Link>
              <Link to="/contact" className="cbp-btn cbp-btn--outline">Get Free Consultation</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
