import { useEffect } from 'react'
import Seo from '../../components/Seo'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiShoppingBag, FiSearch, FiEdit3, FiTag, FiTrendingUp, FiStar, FiCheck, FiArrowRight, FiArrowUpRight, FiAward, FiLayers, FiTarget, FiShield, FiZap } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/EcomPages.css'

const FAQS = [
  { q: 'Why does Amazon listing optimisation matter?', a: 'A great listing means more visibility, trust and conversions — the difference between page 1 and invisible on Amazon.' },
  { q: 'What does the service include?', a: 'Keyword-rich titles, bullet points, descriptions, backend search terms, category selection and A+ content guidance.' },
  { q: 'Will it improve my ranking?', a: 'Yes — proper keywords and optimisation help you rank higher in Amazon search and win the Buy Box.' },
  { q: 'Do you handle images too?', a: 'We advise on and can arrange optimised product images and infographics that boost conversions.' },
  { q: 'How soon will I see results?', a: 'Optimised listings often lift visibility and sales within a few weeks as Amazon re-indexes.' },
]
const FEATURES = [
  { icon: <FiSearch />, t: 'Keyword-Rich Titles', d: 'Titles built around what buyers actually search on Amazon.' },
  { icon: <FiEdit3 />, t: 'SEO Bullet Points', d: 'Persuasive, keyword-optimised bullets that convert.' },
  { icon: <FiTag />, t: 'Backend Search Terms', d: 'Hidden keywords that expand your discoverability.' },
  { icon: <FiAward />, t: 'A+ Content Guidance', d: 'Enhanced brand content that builds trust and sells.' },
  { icon: <FiStar />, t: 'Category & Attributes', d: 'Correct placement so you show up in the right searches.' },
  { icon: <FiTrendingUp />, t: 'Conversion Focused', d: 'Everything tuned to turn views into orders.' },
]
const PROCESS = [
  { n: '01', t: 'Listing Audit', d: 'We review your current titles, bullets, images and backend terms against top-ranking competitors.' },
  { n: '02', t: 'Keyword Research', d: 'We mine high-intent search terms using Amazon and third-party indexing data to target real buyer queries.' },
  { n: '03', t: 'Copy & A+ Build', d: 'We rewrite titles, bullets and descriptions, then design A+ Content that builds trust and lifts conversions.' },
  { n: '04', t: 'Index & Monitor', d: 'We track keyword indexing, search rank and Buy Box share, then refine copy based on real performance.' },
]
const STACK = ['Title Optimisation', 'Bullet Points', 'Backend Search Terms', 'A+ Content', 'Keyword Indexing', 'Buy Box Share', 'Category Mapping', 'Image & Infographic Briefs', 'Search Rank Tracking', 'Competitor Benchmarking']
const WHY = [
  { icon: <FiTarget />, t: 'Buyer-Intent Keywords', d: 'We target the exact phrases shoppers type before they click "Buy Now", not vanity search terms.' },
  { icon: <FiLayers />, t: 'Full Listing Coverage', d: 'Titles, bullets, backend terms and A+ Content are optimised together as one consistent listing.' },
  { icon: <FiShield />, t: 'Policy-Safe Copy', d: 'Every listing follows Amazon style and keyword guidelines to avoid suppression or listing flags.' },
  { icon: <FiZap />, t: 'Faster Re-Indexing', d: 'Structured keyword placement helps Amazon re-index your listing and reflect ranking gains sooner.' },
]

export default function AmazonListing() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="amz">
      <Seo
        title="Amazon Listing Optimization Services in India"
        description="Rank higher and win the Buy Box with keyword-rich Amazon titles, SEO bullet points, backend search terms and A+ Content built to convert. Get a free listing review."
        path="/services/ecom/amazon"
      />
      <section className="amz-hero amz-hero--light">
        <div className="amz-container amz-hero__inner">
          <div className="amz-hero__text" data-aos="fade-right">
            <span className="amz-tag"><FiShoppingBag /> Amazon Product Listing</span>
            <h1 className="amz-hero__title">Listings That<br /><span>Rank &amp; Sell on Amazon</span></h1>
            <p className="amz-hero__sub">Professionally optimised Amazon listings — better visibility, higher trust and more conversions in the world's biggest marketplace.</p>
            <div className="amz-hero__cta">
              <Link to="/contact" className="amz-btn amz-btn--solid">Optimise My Listings <FiArrowRight /></Link>
              <Link to="/contact" className="amz-btn amz-btn--ghost">Free Listing Review</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="amz-features">
        <div className="amz-container">
          <div className="amz-head" data-aos="fade-up"><span className="amz-eyebrow">What We Optimise</span><h2>Every Part of Your Listing</h2></div>
          <div className="amz-features__grid">
            {FEATURES.map((f, i) => (<div className="amz-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}><span className="amz-feature__icon">{f.icon}</span><h3>{f.t}</h3><p>{f.d}</p></div>))}
          </div>
        </div>
      </section>
      <section className="amz-process">
        <div className="amz-container">
          <div className="amz-head" data-aos="fade-up">
            <span className="amz-eyebrow">Our Process</span>
            <h2>How We Work</h2>
          </div>
          <div className="amz-process__track">
            {PROCESS.map((s, i) => (
              <div className="amz-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="amz-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="amz-stack">
        <div className="amz-container">
          <div className="amz-head" data-aos="fade-up">
            <span className="amz-eyebrow">What We Cover</span>
            <h2>Everything That Moves The Needle</h2>
          </div>
          <div className="amz-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="amz-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>
      <section className="amz-why">
        <div className="amz-container">
          <div className="amz-head" data-aos="fade-up">
            <span className="amz-eyebrow">Why Us</span>
            <h2>Why Sellers Choose Us</h2>
          </div>
          <div className="amz-why__grid">
            {WHY.map((w, i) => (
              <div className="amz-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="amz-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceFaq service="Amazon Product Listing" faqs={FAQS} />
      <section className="amz-cta"><div className="amz-container"><div className="amz-cta__box" data-aos="zoom-in"><FiShoppingBag className="amz-cta__ic" /><h2>Win More Sales on Amazon</h2><p>Get a free listing review — we'll show you exactly what's holding your products back.</p><Link to="/contact" className="amz-btn amz-btn--light">Get My Free Review <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
