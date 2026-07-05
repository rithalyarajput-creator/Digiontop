import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiShoppingBag, FiSearch, FiEdit3, FiGrid, FiTrendingUp, FiStar, FiCheck, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
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
          <div className="ec-listing" data-aos="fade-left">
            <div className="ec-listing__bar"><FiSearch /> flipkart search</div>
            <div className="ec-listing__item ec-listing__item--top"><span className="ec-listing__img"><FiShoppingBag /></span><div className="ec-listing__info"><b>Your Product</b><span className="ec-listing__stars">★★★★★</span><span className="ec-listing__price">₹899 <s>₹1,799</s></span><span className="ec-listing__badge">Assured</span></div></div>
            <div className="ec-listing__item"><span className="ec-listing__img"><FiShoppingBag /></span><div className="ec-listing__info"><b>Competitor</b><span className="ec-listing__stars">★★★★☆</span><span className="ec-listing__price">₹1,099</span></div></div>
            <div className="ec-listing__foot"><FiTrendingUp /> Top of category · more orders</div>
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
      <section className="flp-band"><div className="flp-container flp-band__inner" data-aos="fade-up"><div><b>Better</b><span>Discoverability</span></div><div><b>Correct</b><span>Category Mapping</span></div><div><b>More</b><span>Orders</span></div></div></section>
      <ServiceFaq service="Flipkart Product Listing" faqs={FAQS} />
      <section className="flp-cta"><div className="flp-container"><div className="flp-cta__box" data-aos="zoom-in"><FiShoppingBag className="flp-cta__ic" /><h2>Grow Your Sales on Flipkart</h2><p>Get a free listing review — we'll show you how to reach more buyers on Flipkart.</p><Link to="/contact" className="flp-btn flp-btn--light">Get My Free Review <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
