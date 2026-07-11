import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiArrowRight, FiArrowUpRight, FiCheck, FiPlus, FiMinus,
  FiCode, FiBriefcase, FiGlobe, FiShoppingBag, FiTarget, FiRefreshCw,
  FiLayers, FiGrid, FiDatabase, FiSettings,
  FiTrendingUp, FiAward, FiSearch, FiZap, FiUnlock, FiHeadphones,
} from 'react-icons/fi'
import ServiceWork from '../components/ServiceWork'
import RelatedServices from '../components/RelatedServices'
import '../styles/WebDevelopment.css'

const SERVICES = [
  { icon: <FiCode />, title: 'Custom Website Development', desc: 'Fully customized websites built around your business requirements, workflows, and goals.' },
  { icon: <FiBriefcase />, title: 'Business Website Development', desc: 'Professional business websites designed to build credibility, showcase services, and generate leads.' },
  { icon: <FiGlobe />, title: 'WordPress Development', desc: 'Flexible and easy-to-manage WordPress websites optimized for performance and scalability.' },
  { icon: <FiShoppingBag />, title: 'Shopify Store Development', desc: 'Conversion-focused Shopify stores designed to create better shopping experiences and increase online sales.' },
  { icon: <FiShoppingBag />, title: 'E-Commerce Website Development', desc: 'Powerful online stores with product management, payment integration, and user-friendly shopping experiences.' },
  { icon: <FiTarget />, title: 'Landing Page Development', desc: 'High-converting landing pages built specifically for lead generation and marketing campaigns.' },
  { icon: <FiRefreshCw />, title: 'Website Redesign & Optimization', desc: 'Transform outdated websites into modern, faster, and more engaging digital experiences.' },
  { icon: <FiLayers />, title: 'Custom Web Applications', desc: 'Custom-built web platforms, dashboards, and applications tailored to your business operations.' },
  { icon: <FiGrid />, title: 'Admin Panel Development', desc: 'Secure and user-friendly admin dashboards for managing products, customers, orders, and business data.' },
  { icon: <FiDatabase />, title: 'CRM & Business Management Systems', desc: 'Custom CRM and management systems designed to streamline workflows and improve business efficiency.' },
]

const WHY = [
  { icon: <FiTrendingUp />, title: 'Business-Focused Development', desc: 'Every project is built with business growth, customer experience, and long-term scalability in mind.' },
  { icon: <FiAward />, title: 'Modern Design Standards', desc: 'Clean, professional, and responsive designs that strengthen your brand image.' },
  { icon: <FiSearch />, title: 'SEO-Friendly Structure', desc: 'Built with search engine best practices to support online visibility and future growth.' },
  { icon: <FiZap />, title: 'Fast Loading Performance', desc: 'Optimized websites that provide a smooth experience across desktop and mobile devices.' },
  { icon: <FiUnlock />, title: 'Complete Ownership', desc: 'You own your website, content, and assets without platform lock-ins or hidden restrictions.' },
  { icon: <FiHeadphones />, title: 'Reliable Support', desc: 'Ongoing assistance, updates, and guidance whenever your business needs it.' },
]

const PROCESS = [
  { n: '01', title: 'Discovery', desc: 'We understand your business, goals, and audience.' },
  { n: '02', title: 'Planning', desc: 'We map the structure, features, and strategy.' },
  { n: '03', title: 'Design', desc: 'We craft a modern, on-brand visual experience.' },
  { n: '04', title: 'Development', desc: 'We build a fast, secure, scalable website.' },
  { n: '05', title: 'Testing', desc: 'We test across devices, speed, and SEO.' },
  { n: '06', title: 'Launch', desc: 'We go live and support your growth.' },
]

const FAQS = [
  { q: 'How long does it take to build a website?', a: 'Most business websites take 2–4 weeks. Larger e-commerce stores or custom web apps may take 4–8 weeks depending on scope and features.' },
  { q: 'Will my website be mobile-friendly?', a: 'Absolutely. Every website we build is fully responsive and tested across mobiles, tablets, and desktops for a seamless experience.' },
  { q: 'Do I own my website after it is built?', a: 'Yes — you get complete ownership of your website, content, and assets. No platform lock-ins or hidden restrictions.' },
  { q: 'Is the website SEO-ready?', a: 'Yes. We build with clean code, fast loading, and SEO best practices so your site is ready to rank and grow.' },
  { q: 'Do you provide support after launch?', a: 'Yes, we offer ongoing maintenance, updates, and guidance whenever your business needs it.' },
]

export default function WebDevelopment() {
  useEffect(() => {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 })
  }, [])

  const [openFaq, setOpenFaq] = useState(0)

  // Sequential reveal for the process steps (step 1 -> line -> step 2 -> ...)
  const processRef = useRef(null)
  const [activeStep, setActiveStep] = useState(-1)
  useEffect(() => {
    const el = processRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          PROCESS.forEach((_, i) => {
            setTimeout(() => setActiveStep(i), 350 * (i + 1))
          })
          obs.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <main className="wd">
      <Seo title="Website Development Company in India | DigionTop" description="Fast, mobile-first websites that convert visitors into customers. Business sites, WordPress, custom web apps & landing pages from ₹8,000. Get a free quote." path="/services/website-development" />
      {/* ── HERO ── */}
      <section className="wd-hero">
        <div className="wd-hero__bg">
          <span className="wd-hero__orb wd-hero__orb--1" />
          <span className="wd-hero__orb wd-hero__orb--2" />
          <div className="wd-hero__grid-lines" />
        </div>
        <div className="wd-container wd-hero__inner">
          <div className="wd-hero__content" data-aos="fade-up">
            <span className="wd-tag">Web Development</span>
            <h1 className="wd-hero__title">
              Websites Built to <span>Grow Your Business</span>
            </h1>
            <p className="wd-hero__sub">
              A website is more than just an online presence. It is your digital storefront,
              sales representative, and brand identity working 24/7.
            </p>
            <div className="wd-hero__actions">
              <Link to="/contact" className="wd-btn wd-btn--primary">
                Get Free Consultation <FiArrowRight />
              </Link>
              <a href="#wd-services" className="wd-btn wd-btn--ghost">View Services</a>
            </div>
            <div className="wd-hero__stats">
              <div><b>250+</b><span>Websites Delivered</span></div>
              <div><b>100%</b><span>Mobile-Friendly</span></div>
              <div><b>24/7</b><span>Working for You</span></div>
            </div>
          </div>

        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="wd-intro">
        <div className="wd-container wd-intro__grid">
          <div data-aos="fade-up">
            <h2 className="wd-h2">Build a Website That Works for Your Business</h2>
            <p>
              At DigionTop Agency, we create modern, high-performance websites that help businesses
              attract customers, build trust, and generate more leads and sales. Whether you need a
              business website, e-commerce store, landing page, or custom web application, we develop
              solutions designed around your goals.
            </p>
          </div>
          <div data-aos="fade-up" data-aos-delay="100">
            <p>
              Our team combines design, development, and digital strategy to create websites that not
              only look professional but also support long-term business growth. From startups and local
              businesses to growing brands and e-commerce companies, we help you establish a strong
              online presence and stand out in a competitive market.
            </p>
            <ul className="wd-intro__points">
              <li><FiCheck /> Fast, mobile-friendly & SEO-ready</li>
              <li><FiCheck /> Seamless experience on every device</li>
              <li><FiCheck /> Designed around your business goals</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="wd-services" id="wd-services">
        <div className="wd-container">
          <div className="wd-head" data-aos="fade-up">
            <span className="wd-eyebrow">Our Web Development Services</span>
            <h2 className="wd-h2">Everything You Need to Go Online & Grow</h2>
          </div>
          <div className="wd-services__grid">
            {SERVICES.map((s, i) => (
              <div className="wd-card" key={s.title} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="wd-card__icon">{s.icon}</span>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="wd-why">
        <div className="wd-container">
          <div className="wd-head" data-aos="fade-up">
            <span className="wd-eyebrow">Why Choose DigionTop?</span>
            <h2 className="wd-h2">Built for Performance. Designed for Growth.</h2>
          </div>
          <div className="wd-why__grid">
            {WHY.map((w, i) => (
              <div className="wd-why__card" key={w.title} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="wd-why__icon">{w.icon}</span>
                <div>
                  <h3>{w.title}</h3>
                  <p>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="wd-process">
        <div className="wd-container">
          <div className="wd-head" data-aos="fade-up">
            <span className="wd-eyebrow">Our Development Process</span>
            <h2 className="wd-h2">From Idea to Live in 6 Steps</h2>
          </div>
          <div className="wd-process__track" ref={processRef}>
            {PROCESS.map((p, i) => (
              <div className={`wd-step${i <= activeStep ? ' is-active' : ''}${i < activeStep ? ' is-done' : ''}`} key={p.n}>
                <span className="wd-step__num">{p.n}</span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO (websites) ── */}
      <ServiceWork
        variant="websites"
        accent="#F5A800"
        accentSoft="#FFF3CC"
        heading="Recent Websites We've Delivered"
        subtitle="A glimpse of the live websites we've designed & developed for real businesses."
      />

      {/* ── FAQ ── */}
      <section className="wd-faq">
        <div className="wd-container wd-faq__inner">
          <div className="wd-faq__left" data-aos="fade-up">
            <span className="wd-eyebrow">FAQ</span>
            <h2 className="wd-h2">Questions? We've Got Answers.</h2>
            <p>Everything you need to know before starting your web project with us.</p>
            <Link to="/contact" className="wd-btn wd-btn--primary">Still have questions? <FiArrowRight /></Link>
          </div>
          <div className="wd-faq__list" data-aos="fade-up" data-aos-delay="100">
            {FAQS.map((f, i) => (
              <div className={`wd-faq__item${openFaq === i ? ' is-open' : ''}`} key={f.q}>
                <button className="wd-faq__q" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  {f.q}
                  <span className="wd-faq__icon">{openFaq === i ? <FiMinus /> : <FiPlus />}</span>
                </button>
                <div className="wd-faq__a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services */}
      <RelatedServices categoryHeading="Web Development" />

      {/* ── CTA ── */}
      <section className="wd-cta">
        <div className="wd-container">
          <div className="wd-cta__box" data-aos="zoom-in">
            <h2>Let's Build Something Great</h2>
            <p>
              Whether you're launching a new business, upgrading an existing website, or building a
              custom platform, DigionTop Agency is ready to help you create a digital presence that
              drives real business results.
            </p>
            <Link to="/contact" className="wd-btn wd-btn--dark">
              Start Your Project Today <FiArrowUpRight />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
