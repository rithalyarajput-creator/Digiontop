import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiSearch, FiTag, FiTrendingUp, FiEye, FiEdit3, FiTarget, FiCheck, FiArrowRight, FiArrowUpRight, FiShoppingBag } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/EcomPages.css'

const FAQS = [
  { q: 'What is product SEO?', a: 'Optimising your product listings with the right keywords, titles and content so they rank higher in marketplace and Google search.' },
  { q: 'Does it work on all marketplaces?', a: 'Yes — Amazon, Flipkart, Meesho and your own store all benefit from proper product SEO.' },
  { q: 'How do you find the keywords?', a: 'We research the exact terms buyers use, including long-tail and high-intent phrases that convert.' },
  { q: 'Will it increase sales?', a: 'Higher rankings mean more views from ready-to-buy shoppers — which directly lifts sales.' },
  { q: 'How soon do rankings improve?', a: 'Marketplaces re-index optimised listings quickly — often within a few weeks.' },
]
const FEATURES = [
  { icon: <FiSearch />, t: 'Keyword Research', d: 'The exact terms buyers search, mapped to your products.' },
  { icon: <FiEdit3 />, t: 'Title Optimisation', d: 'Search-friendly titles that rank and convert.' },
  { icon: <FiTag />, t: 'Backend Keywords', d: 'Hidden search terms that widen your reach.' },
  { icon: <FiEye />, t: 'Content Optimisation', d: 'Descriptions and bullets tuned for search and buyers.' },
  { icon: <FiTarget />, t: 'Competitor Analysis', d: 'Find and close the gaps your competitors leave open.' },
  { icon: <FiTrendingUp />, t: 'Rank Tracking', d: 'Monitor positions and keep improving over time.' },
]

export default function ProductSeo() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="pse">
      <section className="pse-hero pse-hero--dark">
        <div className="pse-container pse-hero__inner">
          <div className="pse-hero__text" data-aos="fade-right">
            <span className="pse-tag pse-tag--light"><FiSearch /> Product SEO Optimization</span>
            <h1 className="pse-hero__title pse-hero__title--light">Get Your Products<br /><span>Found First</span></h1>
            <p className="pse-hero__sub pse-hero__sub--light">Rank your products higher on Amazon, Flipkart, Meesho and Google — with keyword-driven optimisation that puts you in front of ready-to-buy shoppers.</p>
            <div className="pse-hero__cta">
              <Link to="/contact" className="pse-btn pse-btn--solid">Rank My Products <FiArrowRight /></Link>
              <Link to="/contact" className="pse-btn pse-btn--ghost-l">Free SEO Audit</Link>
            </div>
          </div>
          <div className="ec-listing" data-aos="fade-left">
            <div className="ec-listing__bar"><FiSearch /> your product keyword</div>
            <div className="ec-listing__item ec-listing__item--top"><span className="ec-listing__img"><FiShoppingBag /></span><div className="ec-listing__info"><b>Your Product · Rank #1</b><span className="ec-listing__stars">★★★★★</span><span className="ec-listing__price">↑ +240% views</span></div></div>
            <div className="ec-listing__item"><span className="ec-listing__img"><FiShoppingBag /></span><div className="ec-listing__info"><b>Competitor · #4</b><span className="ec-listing__stars">★★★☆☆</span><span className="ec-listing__price">falling</span></div></div>
            <div className="ec-listing__foot"><FiTrendingUp /> Page 1 · more buyers</div>
          </div>
        </div>
      </section>
      <section className="pse-features">
        <div className="pse-container">
          <div className="pse-head" data-aos="fade-up"><span className="pse-eyebrow">How We Rank You</span><h2>Optimisation That Sells</h2></div>
          <div className="pse-features__grid">
            {FEATURES.map((f, i) => (<div className="pse-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}><span className="pse-feature__icon">{f.icon}</span><h3>{f.t}</h3><p>{f.d}</p></div>))}
          </div>
        </div>
      </section>
      <section className="pse-band"><div className="pse-container pse-band__inner" data-aos="fade-up"><div><b>+240%</b><span>More Product Views</span></div><div><b>Page 1</b><span>Rankings</span></div><div><b>All</b><span>Marketplaces</span></div></div></section>
      <ServiceFaq service="Product SEO Optimization" faqs={FAQS} />
      <section className="pse-cta"><div className="pse-container"><div className="pse-cta__box" data-aos="zoom-in"><FiSearch className="pse-cta__ic" /><h2>Ready to Rank Higher?</h2><p>Get a free product SEO audit — we'll show you exactly how to climb the rankings.</p><Link to="/contact" className="pse-btn pse-btn--light">Get My Free Audit <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
