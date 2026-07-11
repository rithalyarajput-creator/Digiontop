import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiShoppingBag, FiUploadCloud, FiGrid, FiZap, FiTrendingUp, FiTag, FiArrowRight, FiArrowUpRight, FiDollarSign, FiUsers, FiShield, FiHeadphones } from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import '../../styles/EcomPages.css'

const FAQS = [
  { q: 'Why sell on Meesho?', a: 'Meesho is one of India\'s fastest-growing marketplaces — great for reaching value-conscious buyers across tier-2 and tier-3 cities.' },
  { q: 'What does the service include?', a: 'Product uploading, catalogue setup, information optimisation, category selection and listing management.' },
  { q: 'Will my products get approved faster?', a: 'Yes — accurate, complete listings help you clear Meesho\'s approval process quickly.' },
  { q: 'Can you handle a large catalogue?', a: 'Absolutely — we upload and optimise bulk catalogues efficiently and accurately.' },
  { q: 'How soon will I see sales?', a: 'Optimised, approved listings start reaching buyers within days of going live.' },
]
const FEATURES = [
  { icon: <FiUploadCloud />, t: 'Product Uploading', d: 'Fast, accurate bulk uploading of your entire catalogue.' },
  { icon: <FiGrid />, t: 'Catalogue Setup', d: 'Organised catalogue structure built for Meesho.' },
  { icon: <FiTag />, t: 'Info Optimisation', d: 'Complete, optimised product information that converts.' },
  { icon: <FiZap />, t: 'Faster Approval', d: 'Accurate listings that clear approval quickly.' },
  { icon: <FiShoppingBag />, t: 'Category Selection', d: 'Correct categories so buyers find your products.' },
  { icon: <FiTrendingUp />, t: 'Listing Management', d: 'Ongoing management to keep listings performing.' },
]
const PROCESS = [
  { n: '01', t: 'Catalogue Audit', d: 'We review your product range, images and current pricing to spot gaps against top-selling Meesho catalogues.' },
  { n: '02', t: 'Supplier Panel Setup', d: 'Your Meesho Supplier Panel is configured correctly — GST, bank details, shipping preferences and category permissions.' },
  { n: '03', t: 'Bulk Upload & Pricing', d: 'Products are uploaded in bulk with competitive pricing strategy built around Meesho\'s commission and margin structure.' },
  { n: '04', t: 'Reseller Network Push', d: 'Listings are optimised to appeal to Meesho\'s reseller network, driving repeat orders and wider organic reach.' },
]
const STACK = ['Supplier Panel', 'Bulk Catalogue Upload', 'Pricing Strategy', 'Reseller Network', 'Category Mapping', 'Order & Return Rate', 'GST Compliance', 'Return-Adjusted Pricing', 'Catalogue Quality Score', 'Ads & Boost Tools']
const WHY = [
  { icon: <FiDollarSign />, t: 'Margin-Safe Pricing', d: 'Pricing built to absorb Meesho commission and return rates without eating into your profit.' },
  { icon: <FiUsers />, t: 'Reseller-Ready Listings', d: 'Catalogues crafted to attract and retain Meesho\'s reseller network for repeat bulk orders.' },
  { icon: <FiShield />, t: 'Supplier Panel Expertise', d: 'End-to-end handling of your Supplier Panel so compliance and payouts never stall your sales.' },
  { icon: <FiHeadphones />, t: 'Dedicated Catalogue Support', d: 'A dedicated team monitors approvals, rejections and catalogue health so nothing slips through.' },
]

export default function MeeshoListing() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="msh">
      <section className="msh-hero msh-hero--light">
        <div className="msh-container msh-hero__inner">
          <div className="msh-hero__text" data-aos="fade-right">
            <span className="msh-tag"><FiShoppingBag /> Meesho Product Listing</span>
            <h1 className="msh-hero__title">Scale Fast on<br /><span>Meesho</span></h1>
            <p className="msh-hero__sub">Reach millions of value-conscious buyers with accurate, optimised Meesho listings — uploaded fast, approved quickly and built to sell.</p>
            <div className="msh-hero__cta">
              <Link to="/contact" className="msh-btn msh-btn--solid">List on Meesho <FiArrowRight /></Link>
              <Link to="/contact" className="msh-btn msh-btn--ghost">Free Consultation</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="msh-features">
        <div className="msh-container">
          <div className="msh-head" data-aos="fade-up"><span className="msh-eyebrow">What We Do</span><h2>Everything to Sell on Meesho</h2></div>
          <div className="msh-features__grid">
            {FEATURES.map((f, i) => (<div className="msh-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}><span className="msh-feature__icon">{f.icon}</span><h3>{f.t}</h3><p>{f.d}</p></div>))}
          </div>
        </div>
      </section>
      <section className="msh-process">
        <div className="msh-container">
          <div className="msh-head" data-aos="fade-up">
            <span className="msh-eyebrow">Our Process</span>
            <h2>How We Work</h2>
          </div>
          <div className="msh-process__track">
            {PROCESS.map((s, i) => (
              <div className="msh-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="msh-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="msh-stack">
        <div className="msh-container">
          <div className="msh-head" data-aos="fade-up">
            <span className="msh-eyebrow">What We Cover</span>
            <h2>Everything That Moves The Needle</h2>
          </div>
          <div className="msh-stack__grid" data-aos="fade-up">
            {STACK.map(t => (<span className="msh-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>
      <section className="msh-why">
        <div className="msh-container">
          <div className="msh-head" data-aos="fade-up">
            <span className="msh-eyebrow">Why Us</span>
            <h2>Why Sellers Choose Us</h2>
          </div>
          <div className="msh-why__grid">
            {WHY.map((w, i) => (
              <div className="msh-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="msh-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ServiceFaq service="Meesho Product Listing" faqs={FAQS} />
      <section className="msh-cta"><div className="msh-container"><div className="msh-cta__box" data-aos="zoom-in"><FiShoppingBag className="msh-cta__ic" /><h2>Scale Faster on Meesho</h2><p>Get a free consultation — we'll get your catalogue live and selling on Meesho.</p><Link to="/contact" className="msh-btn msh-btn--light">Get Started <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
