import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiShoppingBag, FiSearch, FiEdit3, FiTag, FiTrendingUp, FiStar, FiCheck, FiArrowRight, FiArrowUpRight, FiAward } from 'react-icons/fi'
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

export default function AmazonListing() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="amz">
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
          <div className="ec-listing" data-aos="fade-left">
            <div className="ec-listing__bar"><FiSearch /> your product keyword</div>
            <div className="ec-listing__item ec-listing__item--top">
              <span className="ec-listing__img"><FiShoppingBag /></span>
              <div className="ec-listing__info"><b>Your Optimised Product</b><span className="ec-listing__stars">★★★★★</span><span className="ec-listing__price">₹1,299 <s>₹2,499</s></span><span className="ec-listing__badge">Best Seller</span></div>
            </div>
            <div className="ec-listing__item"><span className="ec-listing__img"><FiShoppingBag /></span><div className="ec-listing__info"><b>Competitor</b><span className="ec-listing__stars">★★★☆☆</span><span className="ec-listing__price">₹1,499</span></div></div>
            <div className="ec-listing__foot"><FiTrendingUp /> Ranked #1 · +180% sales</div>
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
      <section className="amz-band"><div className="amz-container amz-band__inner" data-aos="fade-up"><div><b>+180%</b><span>Avg Sales Lift</span></div><div><b>Buy Box</b><span>Optimised</span></div><div><b>Page 1</b><span>Rankings</span></div></div></section>
      <ServiceFaq service="Amazon Product Listing" faqs={FAQS} />
      <section className="amz-cta"><div className="amz-container"><div className="amz-cta__box" data-aos="zoom-in"><FiShoppingBag className="amz-cta__ic" /><h2>Win More Sales on Amazon</h2><p>Get a free listing review — we'll show you exactly what's holding your products back.</p><Link to="/contact" className="amz-btn amz-btn--light">Get My Free Review <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
