import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiImage, FiCrop, FiLayers, FiZap, FiStar, FiTrendingUp, FiCheck, FiArrowRight, FiArrowUpRight, FiCamera } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/EcomPages.css'

const FAQS = [
  { q: 'Why do product images matter?', a: 'Images are the #1 driver of conversions online — great visuals and infographics build trust and dramatically lift sales.' },
  { q: 'What do you create?', a: 'Clean product shots, lifestyle images, infographics, comparison charts and A+ / EBC content for marketplaces.' },
  { q: 'Do the images meet marketplace rules?', a: 'Yes — every image follows Amazon, Flipkart and Meesho guidelines so they\'re accepted and rank well.' },
  { q: 'Can you edit my existing photos?', a: 'Absolutely — background removal, retouching, resizing and enhancement of your existing images.' },
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

export default function ProductImage() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="pim">
      <section className="pim-hero pim-hero--light">
        <div className="pim-container pim-hero__inner">
          <div className="pim-hero__text" data-aos="fade-right">
            <span className="pim-tag"><FiImage /> Product Image &amp; Infographics</span>
            <h1 className="pim-hero__title">Visuals That<br /><span>Sell Themselves</span></h1>
            <p className="pim-hero__sub">Scroll-stopping product images and infographics — marketplace-compliant, conversion-focused visuals that build trust and drive more orders.</p>
            <div className="pim-hero__cta">
              <Link to="/contact" className="pim-btn pim-btn--solid">Upgrade My Images <FiArrowRight /></Link>
              <Link to="/contact" className="pim-btn pim-btn--ghost">See Samples</Link>
            </div>
          </div>
          <div className="ec-imggrid" data-aos="fade-left">
            <div className="ec-imggrid__main"><FiImage /></div>
            <div className="ec-imggrid__side"><span><FiLayers /></span><span><FiCrop /></span><span><FiStar /></span></div>
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
      <section className="pim-band"><div className="pim-container pim-band__inner" data-aos="fade-up"><div><b>Compliant</b><span>Marketplace Ready</span></div><div><b>Infographics</b><span>That Sell</span></div><div><b>Higher</b><span>Conversions</span></div></div></section>
      <ServiceFaq service="Product Image & Infographics" faqs={FAQS} />
      <section className="pim-cta"><div className="pim-container"><div className="pim-cta__box" data-aos="zoom-in"><FiImage className="pim-cta__ic" /><h2>Make Your Products Irresistible</h2><p>Get sample visuals — see how better images will lift your conversions.</p><Link to="/contact" className="pim-btn pim-btn--light">Get Free Samples <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
