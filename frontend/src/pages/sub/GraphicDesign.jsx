import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiArrowRight, FiArrowUpRight, FiImage, FiCheck, FiInstagram, FiLayout, FiFileText, FiPrinter, FiMonitor, FiCreditCard } from 'react-icons/fi'
import '../../styles/SubService.css'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'

const SERVICES = ['Social Media Creatives', 'Advertising Banners', 'Brochure Design', 'Flyer Design', 'Business Cards', 'Marketing Materials', 'Presentation Design']

const GALLERY = [
  '/images/work/post-1.webp',
  '/images/work/post-2.webp',
  '/images/work/creative-jhumka.webp',
  '/images/work/creative-2.webp',
  '/images/work/creative-hairclip.webp',
  '/images/work/creative-tradition.webp',
]

const DESIGN_TILES = [
  { icon: <FiInstagram />, label: 'Social Posts' },
  { icon: <FiLayout />, label: 'Ad Creatives' },
  { icon: <FiFileText />, label: 'Brochures' },
  { icon: <FiPrinter />, label: 'Print Design' },
  { icon: <FiMonitor />, label: 'Digital Design' },
  { icon: <FiCreditCard />, label: 'Business Cards' },
]

const FAQS = [
  { q: 'What types of graphic design do you offer?', a: 'We design social media posts and reels covers, paid ad creatives for Meta and Google, brochures, flyers, business cards, packaging, and both print-ready and digital-format artwork tailored to your brand guidelines.' },
  { q: 'How many social media creatives do I get per month?', a: 'Packages typically include a set number of post and story creatives per month based on your posting calendar — commonly 12 to 30 designs — with revisions included so every post matches your brand look.' },
  { q: 'Can you design ad creatives for Meta and Google campaigns?', a: 'Yes. We create scroll-stopping ad creatives sized correctly for Facebook, Instagram, and Google Display placements, including static banners, carousel sets, and A/B variants to test what converts best.' },
  { q: 'Do you handle print-ready files for brochures and flyers?', a: 'Yes. We deliver print-ready files with correct bleed, CMYK color profiles, and resolution for offline printing, along with matching digital versions (PDF/JPG) for email and web use.' },
  { q: 'What is the typical turnaround time for a design request?', a: 'Simple social creatives are usually delivered within 24 to 48 hours, while brochures, packaging, or multi-page print collateral take 3 to 5 working days depending on complexity and revisions.' },
]

export default function GraphicDesign() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="ss">
      <Seo
        title="Graphic Design Services for Brands"
        description="Social media creatives, ad banners, brochures, flyers and business cards designed on-brand and print-ready. Most designs land in 24-48 hours. Get your designs today."
        path="/services/graphic-design"
      />
      <section className="ss-hero" style={{ textAlign: 'center' }}>
        <span className="ss-hero__orb ss-hero__orb--1" /><span className="ss-hero__orb ss-hero__orb--2" />
        <div className="ss-container" style={{ position: 'relative' }} data-aos="fade-up">
          <span className="ss-tag"><FiImage /> Graphic Design</span>
          <h1 className="ss-hero__title" style={{ maxWidth: 820, margin: '0 auto 18px' }}>Creative Designs That <span>Strengthen Your Brand</span></h1>
          <p className="ss-hero__sub" style={{ margin: '0 auto 28px' }}>Professional graphics designed to attract attention, communicate effectively, and support your marketing goals.</p>
          <div className="ss-hero__actions" style={{ justifyContent: 'center' }}><Link to="/contact" className="ss-btn ss-btn--primary">Get Designs <FiArrowRight /></Link></div>
        </div>
      </section>

      <section className="ss-sec ss-sec--soft">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Services</span><h2 className="ss-h2">Designs For Every Need</h2></div>
          <div className="ss-list">
            {SERVICES.map((s) => <div className="ss-list__item" key={s} data-aos="fade-up"><span className="ss-list__dot"><FiCheck size={14} /></span>{s}</div>)}
          </div>
        </div>
      </section>

      {/* Creatives gallery */}
      <section className="ss-sec">
        <div className="ss-container">
          <div className="ss-head" data-aos="fade-up"><span className="ss-eyebrow">Our Work</span><h2 className="ss-h2">Creatives We've Designed</h2></div>
          <div className="gd-gallery">
            {GALLERY.map((src, i) => (
              <div className="gd-gallery__item" key={src} data-aos="zoom-in" data-aos-delay={(i % 4) * 60}>
                <img src={src} alt="Creative design" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design categories — icon tile grid */}
      <section className="gd-block">
        <div className="ss-container">
          <div className="gd-head" data-aos="fade-up">
            <span className="ss-eyebrow">What We Design</span>
            <h2 className="ss-h2">Every Format, On-Brand</h2>
          </div>
          <div className="gd-tiles">
            {DESIGN_TILES.map((t, i) => (
              <div className="gd-tile" key={t.label} data-aos="zoom-in" data-aos-delay={(i % 3) * 60}>
                <span className="gd-tile__icon">{t.icon}</span>
                <span className="gd-tile__label">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq service="Graphic Design" faqs={FAQS} />

      <section className="ss-cta">
        <div className="ss-container"><div className="ss-cta__box" data-aos="zoom-in">
          <h2>Make Your Brand Look Premium</h2>
          <p>Professional, on-brand graphics that get noticed and drive engagement.</p>
          <Link to="/contact" className="ss-btn">Start Your Design Project <FiArrowUpRight /></Link>
        </div></div>
      </section>
    </main>
  )
}
