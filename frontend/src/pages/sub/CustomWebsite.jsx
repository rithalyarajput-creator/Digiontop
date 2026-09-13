import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import {
  FiCode, FiZap, FiSmartphone, FiLayers, FiTrendingUp,
  FiCheck, FiArrowRight, FiArrowUpRight, FiCpu, FiFeather,
  FiShield, FiMapPin, FiBriefcase,
} from 'react-icons/fi'
import ServiceFaq from '../../components/ServiceFaq'
import Seo from '../../components/Seo'
import '../../styles/WebDevPages.css'

const FAQS = [
  { q: 'What is a custom website?', a: 'A custom website is designed and developed around a specific business, brand, audience, and feature set instead of relying on a fixed template. This gives you more control over design, functionality, user experience, and future improvements.' },
  { q: 'How long does a website take to build?', a: 'The timeline depends on the number of pages, design requirements, content, integrations, and functionality. After understanding your project, we can provide a realistic development timeline with clear milestones.' },
  { q: 'Will the website work on mobile devices?', a: 'Yes. Our responsive website development ensures the layout adapts to phones, tablets, laptops, and desktop screens. We test important pages and interactions across different screen sizes before the website goes live.' },
  { q: 'Can I update the website after launch?', a: 'Yes. With CMS website development, your team can update suitable content such as pages, images, services, and blog posts. We can also provide guidance so routine website updates are easier to manage.' },
  { q: 'Can you add SEO to the website?', a: 'Yes. We can build an SEO-friendly foundation into the website, including logical page organization, headings, URLs, internal linking opportunities, and other foundational elements. Ongoing SEO can be handled as a separate service.' },
]

const SOLUTIONS = [
  { icon: <FiFeather />, t: 'Custom Website Design', d: 'A unique interface created around your brand, audience, services, and conversion goals. We focus on clean layouts, clear navigation, strong calls to action, and a professional visual identity.' },
  { icon: <FiSmartphone />, t: 'Responsive Website Development', d: 'Your website should provide a smooth experience on phones, tablets, laptops, and desktops. We create responsive layouts that adapt naturally to different screen sizes.' },
  { icon: <FiZap />, t: 'Fast Website Development', d: 'Clean code, optimized images, and a lightweight structure help create a faster browsing experience. Our fast website development approach keeps performance in mind from the planning stage.' },
  { icon: <FiTrendingUp />, t: 'SEO-Friendly Website Structure', d: 'A well-planned website needs more than attractive visuals. An SEO-friendly website structure gives important pages a clear hierarchy and helps users navigate the site.' },
  { icon: <FiLayers />, t: 'CMS Website Development', d: 'Need to update pages, services, blogs, or images yourself? Our CMS website development setup can make routine content updates simpler for your team.' },
  { icon: <FiCpu />, t: 'Website Integration & Features', d: 'From contact forms and analytics to booking tools, payment options, CRM connections, and other business features, we can plan integrations around your actual workflow.' },
]

const WHY = [
  { icon: <FiFeather />, t: 'Custom Website Design for Your Brand', d: 'Instead of forcing your business into a standard layout, we create a custom website design that reflects your brand and gives visitors a clear path toward taking action.' },
  { icon: <FiZap />, t: 'Performance-Focused Development', d: 'We pay attention to page structure, assets, responsive behavior, and technical implementation. A fast website development process helps us address performance early.' },
  { icon: <FiLayers />, t: 'Flexible and Scalable', d: 'Your website may need new pages, features, integrations, or content later. We build with flexibility in mind so the platform can support future changes.' },
  { icon: <FiShield />, t: 'Ownership and Easy Management', d: 'You should have control over your website. We can structure the project so your team can manage content and understand the system without unnecessary restrictions.' },
]

const PROCESS = [
  { n: '01', t: 'Discovery & Planning', d: 'We understand your business, audience, goals, pages, features, and conversion requirements before development begins.' },
  { n: '02', t: 'Sitemap & Wireframes', d: 'We organize the website structure and user journey, then prepare wireframes to establish content placement and navigation.' },
  { n: '03', t: 'UI Design', d: 'We create the visual direction, layouts, typography, components, and page designs around your brand identity.' },
  { n: '04', t: 'Development', d: 'The approved designs are converted into a functional website with responsive layouts, clean implementation, integrations, and content management features.' },
  { n: '05', t: 'Testing & Optimization', d: 'We check mobile responsiveness, browser compatibility, forms, navigation, page performance, and important technical elements before launch.' },
  { n: '06', t: 'Launch & Support', d: 'After final approval, we help prepare the website for launch and provide guidance for managing future updates.' },
]

const BUILD_LIST = [
  'Business websites', 'Service-based websites', 'Professional portfolios', 'Startup websites',
  'Corporate websites', 'Landing pages', 'Brand websites', 'Custom online platforms',
]

const WHO_FOR = [
  { icon: <FiMapPin />, t: 'Local Businesses', d: 'Build a professional online presence that makes services, contact details, and business information easy to find.' },
  { icon: <FiZap />, t: 'Startups', d: 'Launch with a flexible website that can evolve as your brand, products, and audience grow.' },
  { icon: <FiBriefcase />, t: 'Professional Services', d: 'Present your expertise clearly with focused service pages, strong calls to action, and simple navigation.' },
  { icon: <FiTrendingUp />, t: 'Growing Brands', d: 'Create a strong digital foundation that can support marketing campaigns, integrations, new pages, and future expansion.' },
]

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Custom Website Development',
  provider: { '@type': 'ProfessionalService', name: 'DigionTop', url: 'https://www.digiontop.com' },
  areaServed: 'Delhi, India',
  description: 'Custom website design and development services including responsive development, fast website development, SEO-friendly structure, CMS setup, and website integrations.',
}

export default function CustomWebsite() {
  useEffect(() => { AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 50 }) }, [])
  return (
    <main className="wd">
      <Seo
        title="Custom Website Service in Delhi | Expert Web Design"
        description="Get a custom website service in Delhi with unique design, responsive development, SEO-ready structure, fast performance, and scalable features."
        path="/services/custom-website"
      />
      <Helmet>
        <meta property="og:title" content="Custom Website Service in Delhi | Expert Web Design" />
        <meta property="og:description" content="Original design, responsive development, speed, security, and SEO-ready structure — without relying on ready-made templates." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.digiontop.com/services/custom-website" />
        <script type="application/ld+json">{JSON.stringify(serviceSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section className="wd-hero wd-hero--dark">
        <div className="wd-hero__grid" />
        <div className="wd-container wd-hero__inner">
          <div className="wd-hero__text" data-aos="fade-right">
            <span className="wd-tag wd-tag--light"><FiCode /> Custom Website Development</span>
            <h1 className="wd-hero__title wd-hero__title--light">Custom Website Service in <span>Delhi</span></h1>
            <p className="wd-hero__sub wd-hero__sub--light">
              Build a website that looks unique, works smoothly, and supports your business goals. Our custom website
              service in Delhi focuses on original design, responsive development, speed, security, SEO-ready structure,
              and flexible features without depending on ready-made templates.
            </p>
            <div className="wd-hero__cta">
              <Link to="/contact" className="wd-btn wd-btn--solid">Get a Free Quote <FiArrowRight /></Link>
              <Link to="/contact" className="wd-btn wd-btn--ghost-l">Start Your Website</Link>
            </div>
            <div className="wd-hero__trust">
              <span><FiCheck /> Unique Design</span>
              <span><FiCheck /> Mobile Responsive</span>
              <span><FiCheck /> SEO-Ready</span>
              <span><FiCheck /> Fast &amp; Secure</span>
              <span><FiCheck /> Scalable Development</span>
            </div>
          </div>
        </div>
      </section>

      {/* EVERYTHING YOUR WEBSITE NEEDS */}
      <section className="wd-features">
        <div className="wd-container">
          <div className="wd-head" data-aos="fade-up">
            <span className="wd-eyebrow">Why Custom</span>
            <h2>Everything Your Website Needs</h2>
          </div>
          <div className="wd-features__grid">
            {SOLUTIONS.map((f, i) => (
              <div className="wd-feature" key={f.t} data-aos="fade-up" data-aos-delay={(i % 3) * 70}>
                <span className="wd-feature__icon">{f.icon}</span>
                <h3>{f.t}</h3><p>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY BUSINESSES CHOOSE US */}
      <section className="wd-why">
        <div className="wd-container">
          <div className="wd-head" data-aos="fade-up">
            <span className="wd-eyebrow">Why Us</span>
            <h2>Why Businesses Choose Us</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginTop: 14 }}>
              A website should be useful for both your customers and your team. Our custom website service in Delhi
              combines design, development, usability, and business thinking in one workflow.
            </p>
          </div>
          <div className="wd-why__grid">
            {WHY.map((w, i) => (
              <div className="wd-why__card" key={w.t} data-aos="fade-up" data-aos-delay={i * 70}>
                <span className="wd-why__ic">{w.icon}</span>
                <h3>{w.t}</h3><p>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="wd-process">
        <div className="wd-container">
          <div className="wd-head" data-aos="fade-up">
            <span className="wd-eyebrow">Our Process</span>
            <h2>Our Website Development Process</h2>
          </div>
          <div className="wd-process__track">
            {PROCESS.map((s, i) => (
              <div className="wd-step" key={s.n} data-aos="fade-up" data-aos-delay={i * 60}>
                <span className="wd-step__num">{s.n}</span>
                <h3>{s.t}</h3><p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE CAN BUILD */}
      <section className="wd-stack">
        <div className="wd-container">
          <div className="wd-head" data-aos="fade-up">
            <span className="wd-eyebrow">What We Can Build</span>
            <h2>Our Website Solutions Can Support</h2>
            <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginTop: 14 }}>
              Every project is planned according to the business goals, required features, audience, and future growth needs.
            </p>
          </div>
          <div className="wd-stack__grid" data-aos="fade-up">
            {BUILD_LIST.map((t) => (<span className="wd-chip" key={t}>{t}</span>))}
          </div>
        </div>
      </section>

      {/* BUSINESSES WE HELP */}
      <section className="wd-features">
        <div className="wd-container">
          <div className="wd-head" data-aos="fade-up">
            <h2>Businesses We Help</h2>
          </div>
          <div className="wd-mini-grid">
            {WHO_FOR.map((w, i) => (
              <div className="wd-mini" key={w.t} data-aos="fade-up" data-aos-delay={(i % 3) * 60}>
                <span className="wd-mini__icon">{w.icon}</span>
                <div><h3>{w.t}</h3><p>{w.d}</p></div>
              </div>
            ))}
          </div>
          <p className="wd-note">
            Explore our related services: <Link to="/services/website-development">Website Development</Link>,{' '}
            <Link to="/services/website-redesign">Website Redesign</Link>,{' '}
            <Link to="/services/seo-services">SEO Services</Link>,{' '}
            <Link to="/services/local-seo">Local SEO</Link>,{' '}
            <Link to="/services/ecommerce-seo">Ecommerce SEO</Link>,{' '}
            <Link to="/services/social-media-marketing">Social Media Marketing</Link>, and{' '}
            <Link to="/services/google-ads">Google Ads</Link>.
          </p>
        </div>
      </section>

      {/* RESULTS & TRUST */}
      <section className="wd-band">
        <div className="wd-container">
          <div className="wd-trustbox" data-aos="fade-up">
            <h2>Results &amp; Trust</h2>
            <p>
              Project goals, timelines, and outcomes vary by business. We focus on clear communication, practical
              planning, quality implementation, and an SEO-friendly website structure built around your actual
              requirements.
            </p>
          </div>
        </div>
      </section>

      <ServiceFaq service="Custom Website Development" faqs={FAQS} />

      <section className="wd-cta">
        <div className="wd-container">
          <div className="wd-cta__box" data-aos="zoom-in">
            <FiCode className="wd-cta__ic" />
            <h2>Ready to Build Your Website?</h2>
            <p>
              Ready to create a website that fits your business instead of a generic template? Talk to our team
              about your goals, required features, and preferred design.
            </p>
            <div className="wd-hero__cta">
              <Link to="/contact" className="wd-btn wd-btn--light">Get a Free Consultation <FiArrowUpRight /></Link>
              <Link to="/contact" className="wd-btn wd-btn--ghost-l">Get Your Free Quote</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
