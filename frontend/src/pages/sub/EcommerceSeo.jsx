import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiShoppingBag, FiSearch, FiStar, FiTag, FiFilter, FiTrendingUp,
  FiCheck, FiArrowRight, FiArrowUpRight, FiGrid, FiDollarSign,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/EcommerceSeo.css'

const FAQS = [
  { q: 'How is e-commerce SEO different?', a: 'It focuses on product & category pages, faceted navigation, product schema and buyer-intent keywords, driving high-intent shoppers, not just traffic.' },
  { q: 'Which platforms do you optimise?', a: 'Shopify, WooCommerce, Magento, BigCommerce and custom stores, the tactics are tailored to each platform\'s structure.' },
  { q: 'Do you handle duplicate content from variants?', a: 'Yes, canonical tags, parameter handling and smart indexation rules stop product variants from cannibalising each other.' },
  { q: 'Can you get me rich results (stars, price)?', a: 'Absolutely. Product, review and offer schema help you win rich snippets, stars, price and stock, that boost click-through.' },
  { q: 'How soon will sales improve?', a: 'Category and product optimisation often lifts organic traffic within 6–10 weeks; revenue follows as high-intent rankings compound.' },
]

const PILLARS = [
  { icon: <FiGrid />, t: 'Category Page SEO', d: 'Optimised category pages that rank for high-volume buyer terms and funnel shoppers to products.' },
  { icon: <FiTag />, t: 'Product Page Optimisation', d: 'Titles, descriptions, images & schema tuned for both Google and conversions.' },
  { icon: <FiFilter />, t: 'Faceted Navigation', d: 'Smart handling of filters & parameters so crawl budget and rankings aren\'t wasted.' },
  { icon: <FiStar />, t: 'Review & Rich Snippets', d: 'Star ratings, price & stock in search results to dominate the SERP and win clicks.' },
  { icon: <FiSearch />, t: 'Buyer-Intent Keywords', d: 'We target terms with real purchase intent, "buy", "best", "price", not vanity traffic.' },
  { icon: <FiTrendingUp />, t: 'Technical Store Health', d: 'Speed, mobile & indexation fixes built for large catalogues at scale.' },
]

export default function EcommerceSeo() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="eseo">
      <Seo
        title="E-Commerce SEO Services for Online Stores"
        description="Category and product page SEO, faceted navigation fixes and product schema that wins rich snippets, for Shopify, WooCommerce and Magento. Get a free store audit."
        path="/services/ecommerce-seo"
      />
      {/* HERO — search result with product cards */}
      <section className="eseo-hero">
        <div className="eseo-container eseo-hero__inner">
          <div className="eseo-hero__text" data-aos="fade-right">
            <span className="eseo-tag"><FiShoppingBag /> E-Commerce SEO</span>
            <h1 className="eseo-hero__title">Turn Search Into <span>Sales</span></h1>
            <p className="eseo-hero__sub">We put your products in front of shoppers who are ready to buy, optimising every category and product page for rankings and revenue.</p>
            <div className="eseo-hero__cta">
              <Link to="/contact" className="eseo-btn eseo-btn--solid">Grow My Store <FiArrowRight /></Link>
              <Link to="/contact" className="eseo-btn eseo-btn--ghost">Free Store Audit</Link>
            </div>
            <div className="eseo-hero__mini">
              <div><b>+140%</b><span>Organic Revenue</span></div>
              <div><b>Rich</b><span>Snippet Wins</span></div>
              <div><b>Page 1</b><span>Product Rankings</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* pillars */}
      <section className="eseo-pillars">
        <div className="eseo-container">
          <div className="eseo-head" data-aos="fade-up">
            <span className="eseo-eyebrow">What We Optimise</span>
            <h2>Every Page Built to Rank &amp; Sell</h2>
          </div>
          <div className="eseo-pillars__grid">
            {PILLARS.map((p, i) => (
              <div className="eseo-pillar" key={p.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="eseo-pillar__icon">{p.icon}</span>
                <h3>{p.t}</h3><p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* funnel band */}
      <section className="eseo-funnel">
        <div className="eseo-container eseo-funnel__inner">
          <div data-aos="fade-right">
            <span className="eseo-eyebrow eseo-eyebrow--light">Buyer-Intent First</span>
            <h2>We Chase Revenue, Not Vanity Traffic</h2>
            <p>Any agency can bring clicks. We target the keywords shoppers use right before they buy, so your traffic actually converts.</p>
          </div>
          <div className="eseo-steps" data-aos="fade-left">
            {[{ n: 'Discover', d: 'Buyer-intent keyword & competitor gap research' }, { n: 'Optimise', d: 'Category, product & schema on-page work' }, { n: 'Convert', d: 'CRO signals + rich snippets that win the click' }].map((s, i) => (
              <div className="eseo-step" key={s.n}><span>{i + 1}</span><div><b>{s.n}</b><p>{s.d}</p></div></div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFaq service="E-Commerce SEO" faqs={FAQS} />

      <section className="eseo-cta">
        <div className="eseo-container">
          <div className="eseo-cta__box" data-aos="zoom-in">
            <FiDollarSign className="eseo-cta__ic" />
            <h2>Ready to Sell More Through Search?</h2>
            <p>Get a free e-commerce SEO audit, we'll show you the exact product pages leaking revenue and how to fix them.</p>
            <Link to="/contact" className="eseo-btn eseo-btn--light">Get My Free Store Audit <FiArrowUpRight /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}
