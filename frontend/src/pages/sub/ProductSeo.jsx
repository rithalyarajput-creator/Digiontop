import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiSearch, FiTag, FiTrendingUp, FiEye, FiEdit3, FiTarget, FiArrowRight, FiArrowUpRight, FiLayers, FiPenTool, FiBarChart2, FiRefreshCw } from 'react-icons/fi'
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
const PROCESS = [
  { n: '01', t: 'Marketplace Audit', d: 'We pull every live listing and score titles, backend terms and content against current search-ranking factors.' },
  { n: '02', t: 'Keyword Research', d: 'We mine buyer search data across Amazon, Flipkart and Google to find high-intent, high-volume terms competitors miss.' },
  { n: '03', t: 'Listing Rewrite', d: 'Titles, bullets and descriptions are rebuilt around those keywords while staying persuasive enough to convert.' },
  { n: '04', t: 'Rank & Refine', d: 'We track keyword positions weekly and adjust copy as algorithms and competitor listings shift.' },
]
const STACK = ['Amazon A9 Algorithm', 'Flipkart Search Ranking', 'Meesho Discovery', 'Google Shopping Feed', 'Backend Search Terms', 'Long-Tail Keywords', 'Click-Through Rate', 'Conversion Copy', 'Competitor Listings', 'Search Query Reports']
const WHY = [
  { icon: <FiLayers />, t: 'Marketplace-Specific Rules', d: 'We optimise for each platform\'s own ranking logic instead of a one-size-fits-all keyword list.' },
  { icon: <FiPenTool />, t: 'Copy That Converts', d: 'Keywords are woven into titles and bullets that still read naturally and push buyers to click.' },
  { icon: <FiBarChart2 />, t: 'Data-Backed Keywords', d: 'Every term we target is chosen from real buyer search volume, not guesswork.' },
  { icon: <FiRefreshCw />, t: 'Continuous Rank Tracking', d: 'We monitor positions weekly and refine listings as algorithms and competitors change.' },
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
      <section className="pse-process">
        <div className="pse-container">
          <div className="pse-head" data-aos="fade-up">
            <span className="pse-eyebrow">Our Process</span>
            <h2>How We Work</h2>
          </div>
          <div className="pse-process__track">
            {PROCESS.map((s, i) => (
              <div className="pse-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="pse-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="pse-stack">
        <div className="pse-container">
          <div className="pse-head" data-aos="fade-up">
            <span className="pse-eyebrow">What We Cover</span>
            <h2>Everything That Moves The Needle</h2>
          </div>
          <div className="pse-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="pse-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>
      <section className="pse-why">
        <div className="pse-container">
          <div className="pse-head" data-aos="fade-up">
            <span className="pse-eyebrow">Why Us</span>
            <h2>Why Sellers Choose Us</h2>
          </div>
          <div className="pse-why__grid">
            {WHY.map((w, i) => (
              <div className="pse-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="pse-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceFaq service="Product SEO Optimization" faqs={FAQS} />
      <section className="pse-cta"><div className="pse-container"><div className="pse-cta__box" data-aos="zoom-in"><FiSearch className="pse-cta__ic" /><h2>Ready to Rank Higher?</h2><p>Get a free product SEO audit — we'll show you exactly how to climb the rankings.</p><Link to="/contact" className="pse-btn pse-btn--light">Get My Free Audit <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
