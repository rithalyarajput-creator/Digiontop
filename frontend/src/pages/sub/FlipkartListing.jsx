import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiShoppingBag, FiSearch, FiEdit3, FiGrid, FiTrendingUp, FiStar, FiCheck, FiArrowRight, FiArrowUpRight, FiShield, FiTarget, FiLayers, FiZap } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/EcomPages.css'

const FAQS = [
  { q: 'How is Flipkart listing different?', a: 'Flipkart has its own catalogue structure, category mapping and search algorithm — we optimise specifically for its ecosystem.' },
  { q: 'What does the service include?', a: 'Listing setup, title optimisation, category mapping, descriptions, specifications and product SEO.' },
  { q: 'Will it improve discoverability?', a: 'Yes — correct mapping and keywords help your products surface in more relevant Flipkart searches.' },
  { q: 'Can you manage bulk listings?', a: 'Absolutely — we handle large catalogues with accurate, optimised bulk listing.' },
  { q: 'How soon will I see results?', a: 'Improved discoverability and orders typically follow within a few weeks.' },
]
const FEATURES = [
  { icon: <FiEdit3 />, t: 'Listing Setup', d: 'Complete, accurate product listings that meet Flipkart standards.' },
  { icon: <FiSearch />, t: 'Title Optimisation', d: 'Search-friendly titles that improve discoverability.' },
  { icon: <FiGrid />, t: 'Category Mapping', d: 'Correct placement so buyers find you in the right categories.' },
  { icon: <FiStar />, t: 'Specifications Setup', d: 'Complete attributes that build buyer confidence.' },
  { icon: <FiTrendingUp />, t: 'Product SEO', d: 'Keyword optimisation for higher Flipkart rankings.' },
  { icon: <FiShoppingBag />, t: 'Listing Updates', d: 'Ongoing improvements to keep listings performing.' },
]
const PROCESS = [
  { n: '01', t: 'Catalogue Audit', d: 'We review your existing SKUs, category mapping and GTIN data to flag listing quality and policy gaps.' },
  { n: '02', t: 'Title & Content Build', d: 'Search-weighted titles, bullet specs and A+ style descriptions are written to match Flipkart\'s ranking signals.' },
  { n: '03', t: 'F-Assured & Compliance Setup', d: 'We align packaging, quality and fulfilment documentation so eligible SKUs qualify for F-Assured badging.' },
  { n: '04', t: 'Ads & Performance Tracking', d: 'Flipkart Ads campaigns are launched and listings are monitored weekly against search rank and conversion data.' },
]
const STACK = ['Flipkart Seller Hub', 'Flipkart Ads Manager', 'Category & GTIN Mapping', 'F-Assured Compliance', 'Keyword Rank Tracking', 'Catalogue Quality Score', 'A+ Content Blocks', 'Bulk Listing Uploader', 'Search CTR Analysis', 'Buy Box Monitoring']
const WHY = [
  { icon: <FiTarget />, t: 'Category-Accurate Mapping', d: 'We place every SKU in the exact Flipkart category and sub-type buyers actually search in.' },
  { icon: <FiShield />, t: 'F-Assured Ready', d: 'Listings and documentation are structured to meet F-Assured quality and fulfilment criteria.' },
  { icon: <FiZap />, t: 'Ads That Convert', d: 'Flipkart Ads budgets are directed at listings already optimised to close the sale.' },
  { icon: <FiLayers />, t: 'Bulk Catalogue Expertise', d: 'We manage large, multi-variant catalogues without losing listing accuracy or speed.' },
]

export default function FlipkartListing() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="flp">
      <section className="flp-hero flp-hero--dark">
        <div className="flp-container flp-hero__inner">
          <div className="flp-hero__text" data-aos="fade-right">
            <span className="flp-tag flp-tag--light"><FiShoppingBag /> Flipkart Product Listing</span>
            <h1 className="flp-hero__title flp-hero__title--light">Get Discovered on<br /><span>Flipkart</span></h1>
            <p className="flp-hero__sub flp-hero__sub--light">Optimised Flipkart listings that improve discoverability, presentation and sales — mapped correctly and built to convert browsers into buyers.</p>
            <div className="flp-hero__cta">
              <Link to="/contact" className="flp-btn flp-btn--solid">Optimise My Listings <FiArrowRight /></Link>
              <Link to="/contact" className="flp-btn flp-btn--ghost-l">Free Review</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="flp-features">
        <div className="flp-container">
          <div className="flp-head" data-aos="fade-up"><span className="flp-eyebrow">What We Do</span><h2>Built for the Flipkart Ecosystem</h2></div>
          <div className="flp-features__grid">
            {FEATURES.map((f, i) => (<div className="flp-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}><span className="flp-feature__icon">{f.icon}</span><h3>{f.t}</h3><p>{f.d}</p></div>))}
          </div>
        </div>
      </section>
      <section className="flp-process">
        <div className="flp-container">
          <div className="flp-head" data-aos="fade-up">
            <span className="flp-eyebrow">Our Process</span>
            <h2>How We Work</h2>
          </div>
          <div className="flp-process__track">
            {PROCESS.map((s, i) => (
              <div className="flp-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="flp-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="flp-stack">
        <div className="flp-container">
          <div className="flp-head" data-aos="fade-up">
            <span className="flp-eyebrow">What We Cover</span>
            <h2>Everything That Moves The Needle</h2>
          </div>
          <div className="flp-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="flp-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>
      <section className="flp-why">
        <div className="flp-container">
          <div className="flp-head" data-aos="fade-up">
            <span className="flp-eyebrow">Why Us</span>
            <h2>Why Sellers Choose Us</h2>
          </div>
          <div className="flp-why__grid">
            {WHY.map((w, i) => (
              <div className="flp-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="flp-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceFaq service="Flipkart Product Listing" faqs={FAQS} />
      <section className="flp-cta"><div className="flp-container"><div className="flp-cta__box" data-aos="zoom-in"><FiShoppingBag className="flp-cta__ic" /><h2>Grow Your Sales on Flipkart</h2><p>Get a free listing review — we'll show you how to reach more buyers on Flipkart.</p><Link to="/contact" className="flp-btn flp-btn--light">Get My Free Review <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
