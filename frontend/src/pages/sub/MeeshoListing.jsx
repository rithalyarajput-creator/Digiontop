import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { FiShoppingBag, FiUploadCloud, FiGrid, FiZap, FiTrendingUp, FiTag, FiCheck, FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
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
          <div className="ec-listing" data-aos="fade-left">
            <div className="ec-listing__bar"><FiUploadCloud /> bulk upload · 240 products</div>
            <div className="ec-listing__item ec-listing__item--top"><span className="ec-listing__img"><FiShoppingBag /></span><div className="ec-listing__info"><b>Your Catalogue</b><span className="ec-listing__stars">★★★★★</span><span className="ec-listing__price">₹399</span><span className="ec-listing__badge">Approved</span></div></div>
            <div className="ec-listing__item"><span className="ec-listing__img"><FiShoppingBag /></span><div className="ec-listing__info"><b>Product</b><span className="ec-listing__stars">★★★★☆</span><span className="ec-listing__price">₹549</span></div></div>
            <div className="ec-listing__foot"><FiCheck /> Fast approval · wide reach</div>
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
      <section className="msh-band"><div className="msh-container msh-band__inner" data-aos="fade-up"><div><b>Fast</b><span>Product Approval</span></div><div><b>Wide</b><span>Buyer Reach</span></div><div><b>Bulk</b><span>Upload Ready</span></div></div></section>
      <ServiceFaq service="Meesho Product Listing" faqs={FAQS} />
      <section className="msh-cta"><div className="msh-container"><div className="msh-cta__box" data-aos="zoom-in"><FiShoppingBag className="msh-cta__ic" /><h2>Scale Faster on Meesho</h2><p>Get a free consultation — we'll get your catalogue live and selling on Meesho.</p><Link to="/contact" className="msh-btn msh-btn--light">Get Started <FiArrowUpRight /></Link></div></div></section>
    </main>
  )
}
