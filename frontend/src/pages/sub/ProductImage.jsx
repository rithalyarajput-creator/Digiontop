import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiImage, FiCrop, FiLayers, FiZap, FiStar, FiTrendingUp, FiCheck, FiArrowRight, FiArrowUpRight, FiCamera, FiClock, FiRefreshCw, FiShield, FiAperture } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/EcomPages.css'

const FAQS = [
  { q: 'Why do product images matter?', a: 'Images are the #1 driver of conversions online, great visuals and infographics build trust and dramatically lift sales.' },
  { q: 'What do you create?', a: 'Clean product shots, lifestyle images, infographics, comparison charts and A+ / EBC content for marketplaces.' },
  { q: 'Do the images meet marketplace rules?', a: 'Yes, every image follows Amazon, Flipkart and Meesho guidelines so they\'re accepted and rank well.' },
  { q: 'Can you edit my existing photos?', a: 'Absolutely, background removal, retouching, resizing and enhancement of your existing images.' },
  { q: 'Will it increase conversions?', a: 'Strong visuals and infographics consistently lift click-through and conversion rates.' },
]
const FEATURES = [
  { icon: <FiCrop />, t: 'Clean Product Shots', d: 'Crisp, marketplace-compliant images that build trust.' },
  { icon: <FiLayers />, t: 'Infographics', d: 'Feature callouts and benefit graphics that sell.' },
  { icon: <FiCamera />, t: 'Lifestyle Images', d: 'Products in context so buyers picture using them.' },
  { icon: <FiStar />, t: 'A+ / EBC Content', d: 'Enhanced brand content that boosts conversions.' },
  { icon: <FiZap />, t: 'Editing & Retouch', d: 'Background removal, retouching and enhancement.' },
  { icon: <FiTrendingUp />, t: 'Conversion Focused', d: 'Every visual designed to turn views into orders.' },
]
const PROCESS = [
  { n: '01', t: 'Product Audit & Brief', d: 'We study your catalog, competitors and category rules to plan the exact shot list and infographic angles needed.' },
  { n: '02', t: 'Studio Shoot & Styling', d: 'Professional studio photography with proper lighting, angles and props for lifestyle and white-background shots.' },
  { n: '03', t: 'Retouch & Infographic Design', d: 'Colour correction, background cleanup and feature-callout infographics or A+ content layouts are built out.' },
  { n: '04', t: 'Review & Marketplace Upload', d: 'Final visuals are checked against platform image specs and delivered ready to upload across listings.' },
]
const STACK = ['Studio Photography', 'Lifestyle Shoots', 'Infographic Design', 'A+ / EBC Content', 'Background Removal', 'Photo Retouching', '360° Product Spins', 'Size Charts', 'Comparison Graphics', 'Image SEO Compliance']
const WHY = [
  { icon: <FiAperture />, t: 'In-House Studio', d: 'Dedicated studio setup for consistent lighting and true-to-product colour across every shoot.' },
  { icon: <FiClock />, t: 'Fast Turnaround', d: 'Shoot-to-delivery in days, not weeks, so new listings launch without delay.' },
  { icon: <FiShield />, t: 'Platform-Safe Specs', d: 'Every image and infographic matches Amazon, Flipkart and Meesho size and content rules.' },
  { icon: <FiRefreshCw />, t: 'Unlimited Revisions', d: 'We refine crops, colours and layouts until every visual matches your brand exactly.' },
]

export default function ProductImage() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="pim">
      <Seo
        title="Product Photography & Infographics"
        description="Studio product shots, lifestyle images, feature infographics and A+ content built to Amazon, Flipkart and Meesho specs so listings convert. See samples of our work."
        path="/services/ecom/product-image"
      />
      <section className="pim-hero pim-hero--light">
        <div className="pim-container pim-hero__inner">
          <div className="pim-hero__text" data-aos="fade-right">
            <span className="pim-tag"><FiImage /> Product Image &amp; Infographics</span>
            <h1 className="pim-hero__title">Visuals That<br /><span>Sell Themselves</span></h1>
            <p className="pim-hero__sub">Scroll-stopping product images and infographics, marketplace-compliant, conversion-focused visuals that build trust and drive more orders.</p>
            <div className="pim-hero__cta">
              <Link to="/contact" className="pim-btn pim-btn--solid">Upgrade My Images <FiArrowRight /></Link>
              <Link to="/contact" className="pim-btn pim-btn--ghost">See Samples</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="pim-features">
        <div className="pim-container">
          <div className="pim-head" data-aos="fade-up"><span className="pim-eyebrow">What We Create</span><h2>Every Visual You Need to Convert</h2></div>
          <div className="pim-features__grid">
            {FEATURES.map((f, i) => (<div className="pim-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}><span className="pim-feature__icon">{f.icon}</span><h3>{f.t}</h3><p>{f.d}</p></div>))}
          </div>
        </div>
      </section>
      <section className="pim-process">
        <div className="pim-container">
          <div className="pim-head" data-aos="fade-up">
            <span className="pim-eyebrow">Our Process</span>
            <h2>How We Work</h2>
          </div>
          <div className="pim-process__track">
            {PROCESS.map((s, i) => (
              <div className="pim-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="pim-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="pim-stack">
        <div className="pim-container">
          <div className="pim-head" data-aos="fade-up">
            <span className="pim-eyebrow">What We Cover</span>
            <h2>Everything That Moves The Needle</h2>
          </div>
          <div className="pim-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="pim-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>
      <section className="pim-why">
        <div className="pim-container">
          <div className="pim-head" data-aos="fade-up">
            <span className="pim-eyebrow">Why Us</span>
            <h2>Why Sellers Choose Us</h2>
          </div>
          <div className="pim-why__grid">
            {WHY.map((w, i) => (
              <div className="pim-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="pim-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceFaq service="Product Image & Infographics" faqs={FAQS} />
      <section className="pim-cta"><div className="pim-container"><div className="pim-cta__box" data-aos="zoom-in"><FiImage className="pim-cta__ic" /><h2>Make Your Products Irresistible</h2><p>Get sample visuals, see how better images will lift your conversions.</p><Link to="/contact" className="pim-btn pim-btn--light">Get Free Samples <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
